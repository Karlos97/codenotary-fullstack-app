import { z } from "zod";

enum TransactionType {
  SENDING = "sending",
  RECEIVING = "receiving",
}

export const putAccountingSchema = z.object({
  accountNumber: z
    .string()
    .min(1, "Account Number is required")
    .regex(/^\d+$/, "Account Number must contain only digits"),
  accountName: z.string().min(1, "Account name is required"),
  iban: z
    .string()
    .length(32, "IBAN must be 32 characters long")
    .refine((value) => /^[A-Z]{2}\d{30}$/.test(value), {
      message:
        "IBAN must start with two uppercase letters followed by 30 digits",
    }),
  address: z.string().min(1, "Address is required"),
  amount: z.number().positive("Amount must be a positive number"),
  type: z.enum([TransactionType.SENDING, TransactionType.RECEIVING], {
    errorMap: () => ({ message: "Type is required" }),
  }),
});

export const getAccountingSchema = z.object({
  page: z.preprocess(
    (val) => Number(val),
    z.number().min(1).positive("Amount must be a positive number")
  ),
  perPage: z.preprocess(
    (val) => Number(val),
    z.number().min(1).positive("Amount must be a positive number")
  ),
});
