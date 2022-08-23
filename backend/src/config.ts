import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 4000,
  MOVIES_API: process.env.MOVIES_API,
  JWT_SECRET: process.env.JWT_SECRET,
};
