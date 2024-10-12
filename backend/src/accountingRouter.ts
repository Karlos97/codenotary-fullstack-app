import { Router, Request, Response } from "express";

import { putAccountingSchema } from "./validation/accountingSchema";
import { setValue } from "./immudbHelper";

const accountingRouter = Router();

accountingRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { error, value } = putAccountingSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { data } = value;

    await setValue(data);

    res.status(201).json({ message: "Accounting information added." });
  } catch (error) {
    console.error("Error adding data:", error);
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
