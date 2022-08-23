import express from "express";
import { users } from "../src/dummyData/usersData";
import User from "./database/Schema/user";
import asyncHandler from "express-async-handler";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.deleteMany({});
    const seedUser = await User.insertMany(users);
    res.send({ seedUser });
  })
);


export default ImportData;
