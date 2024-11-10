import { IUser } from "../interfaces/user.interface";
import UserSchema from "../models/user.schema";
import { UserType } from "../types/user.type";

const createUser = async (data: UserType): Promise<IUser | any> => {
  const new_user = new UserSchema(data);
  await new_user.save();
};

const updateUserById = async (
  id: string,
  data: Partial<UserType>
): Promise<IUser | any> => {
  return await UserSchema.findOneAndUpdate({ identityNumber: id }, data);
};

const getAllUsers = async (): Promise<IUser[]> => {
  return UserSchema.find();
};

const getUserByAccNumber = async (
  acc_number: number
): Promise<IUser | null> => {
  return UserSchema.findOne({ accountNumber: acc_number });
};

const getUserByIdNumber = async (id: string): Promise<IUser | null> => {
  return UserSchema.findOne({ identityNumber: id });
};

const deleteUserById = async (id: string) => {
  return UserSchema.deleteOne({ identityNumber: id });
};

export {
  createUser,
  getAllUsers,
  getUserByAccNumber,
  getUserByIdNumber,
  deleteUserById,
  updateUserById,
};
