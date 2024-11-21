import express, { Application, Request, Response } from "express";
import fs from "fs";
import userRouter from "./routers/userRouter";
const PORT: number = 2550;

const server: Application = express();
server.use(express.json()); //  middleware untuk membaca request.body

// Config routing
server.get("/", (request: Request, response: Response) => {
  response.status(200).send("<h1>Express API</h1>");
});

server.use("/user", userRouter);

server.listen(PORT, () => {
  console.log("API EXPRESS is Running", PORT);
});
