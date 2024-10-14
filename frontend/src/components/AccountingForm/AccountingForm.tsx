import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@atoms/Input/Input";
import Select from "@atoms/Select/Select";
import Button from "@atoms/Button/Button";
import useErrorNotification from "@hooks/useErrorNotification";
import ErrorNotification from "@atoms/ErrorNotification/ErrorNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  accountNumber: z.string().min(1, "Account Number is required"),
  accountName: z.string().min(1, "Account Name is required"),
  iban: z.string().min(1, "IBAN is required"), // could be improved to real IBAN pattern, but it doesn't really matter in this example project
  address: z.string().min(1, "Address is required"),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than zero"),
  type: z.enum(["sending", "receiving"], {
    errorMap: () => ({ message: "Type is required" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

const AccountingForm = () => {
  const queryClient = useQueryClient();
  const { error, visible, triggerError } = useErrorNotification();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(
        `${import.meta.env.VITE_IMMUDB_LOCALHOST_BACKEND_LINK}/api/accounting`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add record");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
    onError: (error: { message: string }) => {
      triggerError(error.message || "Failed to add record. Please try again.");
    },
  });

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
      <Button type="submit">Add Record</Button>
      <ErrorNotification error={error} visible={visible} />
    </form>
  );
};

export default AccountingForm;
