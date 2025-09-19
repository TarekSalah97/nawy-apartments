import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { config } from "./config/env";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

export function createApp() {
  const app = express();
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json());
  app.use(morgan("dev"));

  // Swagger Documentation UI
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use("/api/v1", routes);
  app.use(errorHandler);
  return app;
}
