const express = require("express");
import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
const app = express();

// Store the API key in the environment
//const apiAdminKey = process.env.ADMIN_SECRET;
const apiAdminKey = "admin";

// Middleware to check for the API key in the request header
export const checkAdminApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerApiKey = req.header("x-api-key");

  console.log("headerApiKey:", headerApiKey);
  console.log("apiAdminKey:", apiAdminKey);

  if (!headerApiKey) {
    return res.status(401).json({ message: "Missing API key in header" });
  }

  if (headerApiKey !== apiAdminKey) {
    return res.status(401).json({ message: "Invalid API key" });
  }

  next();
};
