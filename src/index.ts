import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { HttpStatusCode, corsOptions } from "./utils";
import { authRouter } from "./auth/auth.routes";
import bodyParser from "body-parser";
import cors from "cors";
import { messageRouter } from "./messages/message.routes";
import { prisma } from "../prisma";

dotenv.config();
const app = express();
const port = parseInt(process.env.PORT as string, 10) || 9090;

app.use(
  express.json(),
  bodyParser.json(),
  express.urlencoded({ extended: true })
);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api", authRouter, messageRouter);
app.all("/", (req: Request, res: Response) => {
  return res.status(HttpStatusCode.Ok).send("Flow your mind API");
});
app.all("/ping", (req: Request, res: Response) => {
  return res.status(HttpStatusCode.Ok).send("pong");
});
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return res.status(HttpStatusCode.NotFound).send({
    status: false,
    message: "Route not found",
  });
});

app.listen(port, async () => {
  await prisma.$connect();
  console.log(`Server up and spinning on port: ${port}`);
});
