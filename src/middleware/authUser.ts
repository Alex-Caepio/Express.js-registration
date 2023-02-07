const express = require("express");
import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
const app = express();

// Store the API key in the environment
//const apiAdminKey = process.env.ADMIN_SECRET;
const apiAdminKey = "admin";

// Middleware to check for the API key in the request header
export const checkAuthUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerAuthUser = req.header("authorization");

  if (!headerAuthUser) {
    return res
      .status(401)
      .json({ message: "Missing Authorization key in header" });
  }

  next();
};
