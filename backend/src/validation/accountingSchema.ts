import Joi from "joi";

export const putAccountingSchema = Joi.object({
  accountNumber: Joi.string().required(),
  accountName: Joi.string().required(),
  iban: Joi.string().required(),
  address: Joi.string().required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("sending", "receiving").required(),
});

export const getAccountingSchema = Joi.object({
  page: Joi.number().positive().required(),
  perPage: Joi.number().positive().required(),
});
