import { Request, Response } from "express";
import { ZodError } from "zod";

import {
  getAccountingSchema,
  putAccountingSchema,
} from "../validation/accountingSchema";
import { getValueFromVault, setValueInVault } from "../config/immudbSetup";
import logger from "../logger";
import zodErrorMessageConverter from "../helpers/zodErrorMessageConverter";
import redisClient from "../config/redisSetup";

interface Record {
  _id: string;
  data?: {
    accountNumber: string;
    accountName: string;
    iban: string;
    address: string;
    amount: number;
    type: string;
  };
}

interface ResponseData {
  page: number;
  perPage: number;
  revisions: Record[];
}

export const addAccountingInfo = async (req: Request, res: Response) => {
  try {
    const data: Record["data"] = putAccountingSchema.parse(req.body);

    const cachedRecord = await redisClient.get(`record:${data.accountNumber}`);
    if (cachedRecord) {
      res.status(409).json({ error: "Record already exists" });
      return;
    }

    await setValueInVault(data);
    await redisClient.set(
      `record:${data.accountNumber}`,
      JSON.stringify({ data })
    );

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

export const getAccountingInfo = async (req: Request, res: Response) => {
  try {
    const bodyData = getAccountingSchema.parse(req.query);

    const data = (await getValueFromVault(bodyData)) as unknown as ResponseData;
    const revisions = data.revisions;

    revisions.forEach(async ({ data }) => {
      const reviosionData = data?.accountNumber ?? null;

      if (reviosionData === null) {
        return;
      }

      await redisClient.set(
        `record:${reviosionData}`,
        JSON.stringify(reviosionData)
      );
    });

    logger.info("Accounting information fetched and cached.");

    res.status(200).json({ ...data });
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = zodErrorMessageConverter(error);
      res.status(400).json({ error: errorMessage });
      logger.error(`Zod validation error log message: ${errorMessage}`);
    } else {
      logger.error(`Error fetching data: ${error}`);
      res.status(500).json({ error: "Failed to retrieve data." });
    }
  }
};
