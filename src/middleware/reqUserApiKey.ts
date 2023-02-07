const express = require("express");
import { Request, Response, NextFunction } from "express";
const app = express();

// Store the API key in the environment
const apiUserKey = process.env.USER_SECRET;

// Middleware to check for the API key in the request header
export const checkUserApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerApiKey = req.headers["X-API-Key"];
  if (!headerApiKey || headerApiKey !== apiUserKey) {
    return res.status(401).send("Unauthorized: Invalid API Key");
  }
  next();
};
