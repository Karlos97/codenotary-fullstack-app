import { Router, Request, Response } from "express";

import { putAccountingSchema } from "./validation/accountingSchema";
import { setValue } from "./immudbHelper";
import logger from "./logger";

const accountingRouter = Router();

/**
 * @swagger
 * /api/accounting:
 *   post:
 *     summary: Add accounting information
 *     description: This endpoint allows users to add new accounting information to cloud vault. It validates the input data against a defined schema and returns appropriate success or error messages.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNumber:
 *                 type: string
 *                 description: The account number. This field is required.
 *               accountName:
 *                 type: string
 *                 description: The name associated with the account. This field is required.
 *               iban:
 *                 type: string
 *                 description: The IBAN (International Bank Account Number). This field is required and must be exactly 32 characters long, starting with two uppercase letters.
 *               address:
 *                 type: string
 *                 description: The address associated with the account. This field is required.
 *               amount:
 *                 type: number
 *                 description: The amount of money for the transaction. This field is required and must be a positive number.
 *               type:
 *                 type: string
 *                 description: The type of transaction, which can either be "sending" or "receiving". This field is required.
 *             required:
 *               - accountNumber
 *               - accountName
 *               - iban
 *               - address
 *               - amount
 *               - type
 *     responses:
 *       201:
 *         description: Accounting information successfully added
 *       400:
 *         description: Bad request due to validation error
 *       500:
 *         description: Internal server error
 */

accountingRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { error, value } = putAccountingSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      res.status(400).json({ error: errorMessage });
      logger.error(`This is an error log message: ${errorMessage}`);
      return;
    }

    await setValue(value);
    logger.info("Accounting information added.");

    res.status(201).json({ message: "Accounting information added." });
  } catch (error) {
    logger.error("Error adding data:", error);
    res.status(500).json({ error: "Failed to add data." });
  }
});

// JUST AN EXAMPLE - I WILL ADD THIS GET REQUEST TO FRONTEND WITH PUBLIC KEY TO AVOID UNNECESSARY USAGE OF THIS API.
// IT COULD WORK AS A PROXY TO SEPARATE REAL API KEY, THOUGH.

// accountingRouter.get("/", async (req, res) => {
//   try {
//     const { error, value } = getAccountingSchema.validate(req.body);
//     if (error) {
//       res.status(400).json({ error: error.details[0].message });
//       return;
//     }

//     const data = await getValue(value);

//     res.status(200).json({ data });
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).json({ error: "Failed to retrieve data." });
//   }
// });

export default accountingRouter;
