import { Request, Response } from "express";
import bcrypt from "bcrypt";
const nodemailer = require("nodemailer");
import { User } from "../models/userModel";
require("dotenv").config();

export const postUser = async (req: Request, res: Response) => {
  try {
    let userObj = req.body;
    let newUser = new User(userObj);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "cc3f1124768405",
        pass: "d7f29dac4498d3",
      },
    });

    // Sending Email
    let info = await transporter.sendMail({
      from: '"User Manager 👻" <foo@example.com>', // sender address
      to: newUser.email, // list of receivers
      subject: "Welcome to User Manager", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Hello, Welcome to User Manager</b>`, // html body
    });
    return res.status(201).json({
      message: "User Created successfully",
      user: newUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
