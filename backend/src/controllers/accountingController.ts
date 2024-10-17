import { Request, Response } from "express";
import { ZodError } from "zod";

import { putAccountingSchema } from "../validation/accountingSchema";
import { setValue } from "../config/immudbSetup";
import logger from "../logger";
import zodErrorMessageConverter from "../helpers/zodErrorMessageConverter";

export const addAccountingInfo = async (req: Request, res: Response) => {
  try {
    const data = putAccountingSchema.parse(req.body);

    await setValue(data);
    logger.info("Accounting information added.");

    res.status(201).json({ message: "Accounting information added." });
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = zodErrorMessageConverter(error);
      res.status(400).json({ error: errorMessage });
      logger.error(
        `This is a Zod validation error log message: ${errorMessage}`
      );
    } else {
      logger.error(`Error adding data: ${error}`);
      res.status(500).json({ error: "Failed to add data." });
    }
  }
};
