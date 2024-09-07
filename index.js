import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import fs from 'fs'; // Using promises for async file operations
import path from 'path';
import appRouter from "./routes/index.js";
import { connectDB } from "./db/connectDB.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";
import Lobby from './models/lobbyModel.js';
import Create from './models/createLobby.js';
import Team from './models/teamModel.js';
const PORT = process.env.PORT || 8080;
const dbConnectionString = process.env.MONGO_URI || "mongodb://localhost:27017/techwarstest";
import { fileURLToPath } from 'url';
const { readFile } = fs.promises;
const __filename = fileURLToPath(import.meta.url);


async function startServer() {
  try {
    // Connect to MongoDB first
    await connectDB(dbConnectionString);

    // Initialize data from JSON after DB connection


    // Start Express server
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use(logger);

    app.get('/', (req, res) => res.send("Welcome to Tech Wars BE"));

    app.use("/api/v1", appRouter);

    app.use(errorHandler);

    app.use("*", (req, res) => {
      res.status(404).json({
        success: false,
        message: "Error 404: Route does not exist"
      });
    });

    app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
