import bcrypt from "bcryptjs";

export const users = [
  {
    name: "eva",
    email: "eva@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "mahmoud",
    email: "mahmoud@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "ali",
    email: "ali@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
