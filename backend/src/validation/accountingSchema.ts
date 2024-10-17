import { z } from "zod";

enum TransactionType {
  SENDING = "sending",
  RECEIVING = "receiving",
}

export const putAccountingSchema = z.object({
  accountNumber: z.string().nonempty("Account number is required"),
  accountName: z.string().nonempty("Account name is required"),
  iban: z
    .string()
    .length(32, "IBAN must be 32 characters long")
    .refine((value) => /^[A-Z]{2}\d{30}$/.test(value), {
      message:
        "IBAN must start with two uppercase letters followed by 30 digits",
    }),
  address: z.string().nonempty("Address is required"),
  amount: z.number().positive("Amount must be a positive number"),
  type: z.enum([TransactionType.SENDING, TransactionType.RECEIVING], {
    errorMap: () => ({ message: "Type is required" }),
  }),
});

// Use in case of getting records via this dummy backend
// export const getAccountingSchema = Joi.object({
//   page: Joi.number().positive().required(),
//   perPage: Joi.number().positive().required(),
// });
