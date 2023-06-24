import express from "express";
import logger from "morgan";
import { config } from "dotenv";
import parser from "body-parser";
import cors from "cors";

config();
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";
import equipments from "./controllers/equipments";

// Routes
// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.API_PORT || process.env.PORT || 3000);
app.use(parser.json());
app.use(logger("dev"));
app.use(cors());
app.use("/equipments", equipments);
app.use(errorNotFoundHandler);
app.use(errorHandler);
