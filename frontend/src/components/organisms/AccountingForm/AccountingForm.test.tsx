import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AccountingForm from './AccountingForm';

jest.mock('@hooks/useErrorNotification', () => {
  return jest.fn().mockReturnValue({
    error: null,
    visible: false,
    triggerError: jest.fn(),
  });
});

const mockMutationFn = jest.fn();
jest.mock('@tanstack/react-query', () => {
  const originalModule = jest.requireActual('@tanstack/react-query');
  return {
    ...originalModule,
    useMutation: () => ({
      mutate: mockMutationFn,
    }),
    useQueryClient: () => ({
      invalidateQueries: jest.fn(),
    }),
  };
});

describe('AccountingForm', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AccountingForm />
      </QueryClientProvider>,
    );
  });

  test('renders form inputs', () => {
    expect(screen.getByLabelText(/Account Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Account Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/IBAN/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
  });

  test('shows validation errors on invalid submit', async () => {
    fireEvent.click(screen.getByText(/Add Record/i));
    await waitFor(() => {
      expect(
        screen.getByText('Account Number is required'),
      ).toBeInTheDocument();
      expect(screen.getByText('Account Name is required')).toBeInTheDocument();
      expect(
        screen.getByText('IBAN has to have 32 letters'),
      ).toBeInTheDocument();
      expect(screen.getByText('Address is required')).toBeInTheDocument();
      expect(screen.getByText('Amount must be a number')).toBeInTheDocument();
      expect(screen.getByText('Type is required')).toBeInTheDocument();
    });
  });

  test('calls mutation function on valid submit', async () => {
    fireEvent.input(screen.getByLabelText(/Account Number/i), {
      target: { value: '123456' },
    });
    fireEvent.input(screen.getByLabelText(/Account Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.input(screen.getByLabelText(/IBAN/i), {
      target: { value: 'DE893704004405320130001234124652' },
    });
    fireEvent.input(screen.getByLabelText(/Address/i), {
      target: { value: '123 Street' },
    });
    fireEvent.input(screen.getByLabelText(/Amount/i), {
      target: { value: '1000' },
    });
    fireEvent.change(screen.getByLabelText(/Type/i), {
      target: { value: 'sending' },
    });

    fireEvent.click(screen.getByText(/Add Record/i));

    await waitFor(() => {
      expect(mockMutationFn).toHaveBeenCalledWith({
        accountNumber: '123456',
        accountName: 'John Doe',
        iban: 'DE893704004405320130001234124652',
        address: '123 Street',
        amount: 1000,
        type: 'sending',
      });
    });
  });
});
