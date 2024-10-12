import express from "express";
import { json } from "body-parser";
import "dotenv/config";
// import accountingRouter from "./accountingRouter";

const app = express();
app.use(json());

// app.use("/api/accounting", accountingRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to immudb:", error);
  }
};

startServer();
