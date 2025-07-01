import { Request, Response } from "express";
import User from "../models/User.model";
import { CreateUserDto } from "../dtos/create-user.dto";
import { IUser } from "../types/user.types";

export const register = async (req: Request, res: Response) => {
  try {
    const userDto: CreateUserDto = req.body;

    const existing = await User.findOne({ email: userDto.email });
    if (existing) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const user = new User(userDto);
    await user.save();

    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email }).select(
      "+password"
    );
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = user.generateAuthToken();
    res.status(200).json({ user, token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
