import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@atoms/Input/Input";
import Select from "@atoms/Select/Select";
import Button from "@atoms/Button/Button";

const formSchema = z.object({
  accountNumber: z.string().nonempty("Account Number is required"),
  accountName: z.string().nonempty("Account Name is required"),
  iban: z.string().nonempty("IBAN is required"),
  address: z.string().nonempty("Address is required"),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than zero"),
  type: z.enum(["sending", "receiving"], {
    errorMap: () => ({ message: "Type is required" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

interface AccountingFormProps {
  onAddRecord: (data: FormData) => void;
}

const AccountingForm = ({ onAddRecord }: AccountingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    onAddRecord(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
      <Input
        label="Account Number"
        {...register("accountNumber")}
        error={errors.accountNumber}
      />
      <Input
        label="Account Name"
        {...register("accountName")}
        error={errors.accountName}
      />
      <Input label="IBAN" {...register("iban")} error={errors.iban} />
      <Input label="Address" {...register("address")} error={errors.address} />
      <Input
        label="Amount"
        type="number"
        step="any"
        {...register("amount", { valueAsNumber: true })}
        error={errors.amount}
      />
      <Select
        label="Type"
        options={[
          { value: "sending", label: "Sending" },
          { value: "receiving", label: "Receiving" },
        ]}
        {...register("type")}
        error={errors.type}
      />
      <Button type="submit" label="Add Record" />
    </form>
  );
};

export default AccountingForm;
