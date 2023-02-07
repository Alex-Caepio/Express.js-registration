import { Request, Response } from "express";
import { User } from "../models/userModel";
import { checkAuthUser } from "../middleware/authUser";

export const updateUser = async (req: Request, res: Response) => {
  if (req.header("authorization") || req.header("x-api-key") === "admin") {
    try {
      let userId = req.params.id;
      let userObj = req.body;
      await User.findByIdAndUpdate(userId, userObj, { new: true });
      return res.status(200).json({
        message: "User Updated Successfully",
        user: userObj,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
};
