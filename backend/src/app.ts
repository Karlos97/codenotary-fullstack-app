import express from "express";
import { json } from "body-parser";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import "dotenv/config";
import accountingRoutes from "./routes/accountingRoutes";
import { connectRedis } from "./config/redisSetup";

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "http://localhost:4173"
      : "http://localhost:5173", // frontend prod/dev
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

const app = express();

(async () => {
  try {
    await connectRedis();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    process.exit(1);
  }
})();

app.use(cors(corsOptions));
app.use(json());
app.use("/api/accounting", accountingRoutes);

if (process.env.NODE_ENV !== "production") {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Codenotary app",
        version: "1.0.0",
        description: "Documentation of this dummy backend",
      },
    },
    apis: ["./src/*.ts"],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

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
