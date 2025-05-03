import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req?.header("Authorisation")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
        _id: string;
      };
      req.userId = decodedToken._id;
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
