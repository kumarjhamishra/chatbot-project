import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import { resolve } from "path";

export const generateToken = (
  id: string,
  email: string,
  expiresIn: string
): string => {
  const payload = { id, email };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(payload, secret as jwt.Secret, {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  });

  return token;
};

// middleware to verify the token of the user so he has no need to login again
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // signed cookies store the cookies data
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  //console.log(token)

  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        console.log("Token Verification Successfully");
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
