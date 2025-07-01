import { Request, Response } from "express";
import UserService from "../services/user.service";
import { CreateUserDto } from "../dtos/create-user.dto";
import { IUser } from "../types/user.types";

export const createUser = async (req: Request, res: Response) => {
  try {
    const userDto: CreateUserDto = req.body;
    const newUser: IUser = await UserService.createUser(userDto);
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (typeof email !== "string") {
      res.status(400).json({ error: "Invalid email" });
      return;
    }

    const user = await UserService.getUserByEmail(email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updated = await UserService.updateUser(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ message: "User updated", user: updated });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const promoteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.promoteToAdmin(req.params.id);
    res.status(200).json({ message: "User promoted to admin", user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const demoteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.demoteToUser(req.params.id);
    res.status(200).json({ message: "User demoted to user", user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
