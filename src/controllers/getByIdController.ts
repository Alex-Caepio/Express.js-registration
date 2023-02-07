import { Request, Response } from "express";
import dotenv from "dotenv";
import { User } from "../models/userModel";
dotenv.config();

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const ips = process.env.FORBIDDEN_IP?.split(",");
  const userIp = req.ip;

  if (ips?.includes(userIp)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  User.findById(id).then((user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  });
};
