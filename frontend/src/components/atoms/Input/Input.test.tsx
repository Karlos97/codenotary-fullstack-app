import { render, screen } from '@testing-library/react';
import Input from './Input';

test('renders Input component', () => {
  render(<Input label="Account Number" name="accountNumber" />);
  const inputElement = screen.getByLabelText(/Account Number/i);
  expect(inputElement).toBeInTheDocument();
});
