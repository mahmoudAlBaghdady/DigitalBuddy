import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
const { JWT_SECRET } = config;
declare global {
  namespace Express {
    interface Request {
      isAuth: boolean;
      userId: string;
    }
  }
}
interface JwtPayload {
  userId: string;
}
export default module.exports = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1]; //Authorization : Bearer  token value(afajsfnjkab)

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET!) as JwtPayload;
  } catch (error) {
    console.log(error);
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  console.log(req.userId)
  next();
};
