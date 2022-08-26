import { RequestHandler } from "express";
import User from "../../database/Schema/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../../config";
const { JWT_SECRET } = config;
export const registerUser: RequestHandler = async (req, res) => {
  const { name, pic, _id, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User exists already.");
    }
    const user = await new User(req.body);
    const savedUser = await user.save();
    if (savedUser) {
      const token = jwt.sign(
        { email: savedUser.email, userId: savedUser._id },
        JWT_SECRET!,
        { expiresIn: "2h" }
      );
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("error occured");
  }
};

export const authUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user or password incorrect");
  }
  const isEqual = await bcryptjs.compare(password, user.password);
  if (!isEqual) {
    throw new Error("user or password incorrect");
  }
  const token = jwt.sign({ email: user.email, userId: user._id }, JWT_SECRET!, {
    expiresIn: "2h",
  });
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    token: token,
  });
};
