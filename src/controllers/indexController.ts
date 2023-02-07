const mongoose = require("mongoose");
import { Request, Response, NextFunction } from "express";
import { parse, stringify, toJSON, fromJSON } from "flatted";
import { User } from "../models/userModel";
import { Error } from "mongoose";

// write a function that finds all users in the database
// and returns them as a JSON object

export const index = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
