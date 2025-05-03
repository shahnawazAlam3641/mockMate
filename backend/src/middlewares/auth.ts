import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.header("Authorisation")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token is missing",
      });
      return;
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
        _id: string;
      };
      req.userId = decodedToken._id;
      req.token = req?.header("Authorisation")?.replace("Bearer ", "")!;
    } catch (err) {
      console.log(err);
      res.status(401).json({
        success: false,
        message: "token is invalid",
      });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
    return;
  }
};
