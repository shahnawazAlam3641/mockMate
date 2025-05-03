import express, { Request, Response } from "express";
import { z } from "zod";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters"),
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error.errors[0].message,
        errors: result.error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
      return;
    }

    const { name, email, password } = result.data;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        _id: user._id,
        email: user.email,
        token: token,
        name: user.name,
      },
    });

    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while registering",
      error,
    });
    console.log(error);
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error.errors[0].message,
        errors: result.error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
      return;
    }

    const { email, password } = result.data;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User with this email does not exist",
      });
      return;
    }

    const isPasswordRight = bcrypt.compare(password, user.password);

    if (!isPasswordRight) {
      res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
      return;
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET!
    );

    res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      user: {
        _id: user._id,
        email: user.email,
        token: token,
        name: user.name,
      },
    });

    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while Logging in",
      error,
    });
    console.log(error);
  }
});

export default router;
