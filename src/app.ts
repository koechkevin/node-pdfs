import express from "express";
import logger from "morgan";
import { config } from "dotenv";
import parser from "body-parser";
import cors from "cors";

config();
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";
import invoice from "./controllers/invoice";
import { join } from "path";
import { generatePdf } from "./middlewares/pdfGenerator";
import { getUserDetails } from "./middlewares/getUserDetails";

// Routes
// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.API_PORT || process.env.PORT || 3000);
app.use(parser.json());
app.use(logger("dev"));
app.use(cors());
app.use("/invoice", getUserDetails, invoice);
app.use(/(.+)pdf/, generatePdf);
const DIST = join(__dirname, "..", "public");
app.use("/public", express.static(DIST));
app.use("/${baseUrl}", express.static(join(__dirname, "..", "${baseUrl}")));

console.error(DIST);
app.use(errorNotFoundHandler);
app.use(errorHandler);
