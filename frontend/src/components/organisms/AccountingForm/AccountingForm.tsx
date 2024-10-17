import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@atoms/Input/Input';
import Select from '@atoms/Select/Select';
import Button from '@atoms/Button/Button';
import useErrorNotification from '@hooks/useErrorNotification';
import ErrorNotification from '@atoms/ErrorNotification/ErrorNotification';
import useApiMutation from '@/helpers/hooks/useMutation';

enum TransactionType {
  SENDING = 'sending',
  RECEIVING = 'receiving',
}

const formSchema = z.object({
  accountNumber: z
    .string()
    .min(1, 'Account Number is required')
    .regex(/^\d+$/, 'Account Number must contain only digits'),
  accountName: z.string().min(1, 'Account Name is required'),
  iban: z
    .string()
    .min(32, 'IBAN has to have 32 letters')
    .regex(
      /^[A-Z]{2}[A-Z0-9]{1,30}$/,
      'IBAN must start with two capital letters followed by up to 30 alphanumeric characters',
    ),
  address: z.string().min(1, 'Address is required'),
  amount: z
    .number({ invalid_type_error: 'Amount must be a number' })
    .positive('Amount must be greater than zero'),
  type: z.enum([TransactionType.SENDING, TransactionType.RECEIVING], {
    errorMap: () => ({ message: 'Type is required' }),
  }),
});

type FormData = z.infer<typeof formSchema>;

const AccountingForm = () => {
  const { error, isErrorVisible, triggerError } = useErrorNotification();

  const mutation = useApiMutation({ queryKey: ['records'], triggerError });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    mutation.mutate(data);
    reset();
  };

  const formatTransactionType = (type: TransactionType) => {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Account Number"
        type="number"
        {...register('accountNumber')}
        error={errors.accountNumber}
      />
      <Input
        label="Account Name"
        {...register('accountName')}
        error={errors.accountName}
      />
      <Input label="IBAN" {...register('iban')} error={errors.iban} />
      <Input label="Address" {...register('address')} error={errors.address} />
      <Input
        label="Amount"
        type="number"
        step="any"
        {...register('amount', { valueAsNumber: true })}
        error={errors.amount}
      />
      <Select
        label="Type"
        options={[
          {
            value: TransactionType.SENDING,
            label: formatTransactionType(TransactionType.SENDING),
          },
          {
            value: TransactionType.RECEIVING,
            label: formatTransactionType(TransactionType.RECEIVING),
          },
        ]}
        {...register('type')}
        error={errors.type}
      />
      <Button type="submit">Add Record</Button>
      {isErrorVisible && error && <ErrorNotification error={error} />}
    </form>
  );
};

export default AccountingForm;
