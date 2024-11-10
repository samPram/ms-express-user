import { Request, Response } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserByAccNumber,
  getUserByIdNumber,
  updateUserById,
} from "../services/user.service";
import { producer } from "../config/kafka.config";
import dotenv from "dotenv";

dotenv.config();

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const getByAccountNumber = async (req: Request, res: Response) => {
  try {
    const { acc_number } = req.params;
    const user = await getUserByAccNumber(Number(acc_number));

    if (!user) {
      res.status(404).json({ message: "Data Not Found!" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const getByIdentityNumber = async (req: Request, res: Response) => {
  const { iden_number } = req.params;
  const user = await getUserByIdNumber(iden_number);

  if (!user) {
    res.status(404).json({ message: "Data Not Found!" });
    return;
  }

  res.status(200).json(user);
  try {
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const postUser = async (req: Request, res: Response) => {
  try {
    // send event
    await producer.send({
      topic: `${process.env.K_TOPIC}`,
      messages: [
        {
          value: JSON.stringify({
            event: "signup",
            data: req.body,
          }),
        },
      ],
    });

    res.status(201).json({ message: "Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const patchUser = async (req: Request, res: Response) => {
  try {
    const { iden_number } = req.params;

    const user = await getUserByIdNumber(iden_number);

    if (!user) {
      res.status(404).json({ message: "Data Not Found!" });
      return;
    }

    await updateUserById(iden_number, req.body);

    res.status(200).json({ message: "Updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { iden_number } = req.params;
    const deleted = await deleteUserById(iden_number);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

export {
  getUsers,
  getByAccountNumber,
  getByIdentityNumber,
  postUser,
  patchUser,
  deleteUser,
};
