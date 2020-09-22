import express, { Request, Response } from "express";
import authRouter from "./routes/auth";
import apiRouter from "./routes/api";
import config from "./config";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.listen(config.APP_PORT);
