import Joi from "joi";

export const putAccountingSchema = Joi.object({
  accountNumber: Joi.string().required(),
  accountName: Joi.string().required(),
  iban: Joi.string()
    .length(32)
    .custom((value, helpers) => {
      const firstTwo = value.slice(0, 2);
      if (!/^[A-Z]{2}$/.test(firstTwo)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
  address: Joi.string().required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("sending", "receiving").required(),
});
// Use in case of getting records via this dummy backend
// export const getAccountingSchema = Joi.object({
//   page: Joi.number().positive().required(),
//   perPage: Joi.number().positive().required(),
// });
