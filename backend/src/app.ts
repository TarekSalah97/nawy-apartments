import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { config } from "./config/env";

export function createApp() {
  const app = express();
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/api/v1", routes);
  app.use(errorHandler);
  return app;
}
