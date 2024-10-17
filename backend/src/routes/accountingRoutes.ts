import { Router } from "express";
import {
  addAccountingInfo,
  getAccountingInfo,
} from "../controllers/accountingController";

const accountingRoutes = Router();

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

accountingRoutes.post("/", addAccountingInfo);

/**
 * @swagger
 * /api/accounting:
 *   get:
 *     summary: Get accounting information
 *     description: This endpoint allows users to get accounting information from cloud vault. It validates the input data against a defined schema and returns appropriate success or error messages.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: number
 *                 description: Page number
 *               perPage:
 *                 type: number
 *                 description: Elements per page
 *             required:
 *               - page
 *               - perPage
 *     responses:
 *       201:
 *         description: Accounting information successfully fetched
 *       400:
 *         description: Bad request due to validation error
 *       500:
 *         description: Internal server error
 */
accountingRoutes.get("/", getAccountingInfo);

export default accountingRoutes;
