import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import crypto from "crypto";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { User } from "./src/models/userModel";
import { Contract } from "./src/models/contractModel";

import userRoutes from "./src/routes/user";
// import {
//   createContractsTableIfNotExists,
//   createUsersTableIfNotExists,
// } from "./src/service/createTableService";
// import { createContractsTableIfNotExists } from "./db/index";
// import { createUsersTableIfNotExists } from "./db/index";
// const createContractTableIfNotExists = require("./db/index");
// const createUsersTableIfNotExists = require("./db/index");
dotenv.config();

// express app
const app = express();

// middleware
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    const privateKey = fs.existsSync("./config/private.pem");
    const publicKey = fs.existsSync("./config/public.pem");
    if (privateKey && publicKey) {
      console.log("RSA 256-bit key-pair already exists");
    } else if (!privateKey && !publicKey) {
      console.log("Generating RSA 256-bit key-pair...");
      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      });
      fs.writeFileSync("./config/private.pem", privateKey);
      fs.writeFileSync("./config/public.pem", publicKey);
    }
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/users", userRoutes);

// User.createCollection().then(() => {
//   console.log("users collection created");
// });
// Contract.createCollection().then(() => {
//   console.log("contracts collection created");
// });

Promise.all([User.createCollection(), Contract.createCollection()]).then(() => {
  console.log("Collections created");
});
