import * as express from "express";
import { Request, Response } from "express";
import { User } from "../models/userModel";

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    let userId = req.params.id;
    let deletedUser = await User.findByIdAndRemove(userId);
    if (deletedUser) {
      return res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser,
      });
    } else {
      return res.status(404).json({
        error: "User not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
