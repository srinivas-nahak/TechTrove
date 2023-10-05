import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generateToken = (res: Response, id: Types.ObjectId) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  //Setting JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });
};

export default generateToken;
