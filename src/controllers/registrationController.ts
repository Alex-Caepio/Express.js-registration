import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

// export const signUpUser = async (req: Request, res: Response) => {
//   const exist = await User.findOne({ email: req.body.email });

//   if (exist) {
//     res.status(409).json({
//       message: "User already exists",
//     });
//   } else {
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(req.body.password, salt);
//     const user = new User({
//       email: req.body.email,
//       password: hashPassword,
//     });

//     try {
//       await user.save();
//       res.status(201).json({
//         message: "User created",
//       });
//     } catch (error) {
//       res.status(400).json({
//         message: "User not created",
//       });
//     }
//   }
// };

export const signUpUser = async (req: Request, res: Response) => {
  const exist = await User.findOne({ email: req.body.email });

  if (exist) {
    res.status(409).json({
      message: "User already exists",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    });

    // try {
    //   await user.save();
    //   res.status(201).json({
    //     message: "User created",
    //   });
    // } catch (error) {
    //   res.status(400).json({
    //     message: "User not created",
    //   });
    // }

    if (req.body.role === "admin") {
      await user.save();
      res.send({
        message: "Admin created",
        key: process.env.ADMIN_SECRET,
      });
    } else if (req.body.role === "user") {
      await user.save();
      res.send({
        message: "User created",
        key: process.env.USER_SECRET,
      });
    } else {
      res.send({
        message: "User not created",
      });
    }
  }
};
