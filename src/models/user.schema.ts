import mongoose, { Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";

const userSchema: Schema = new Schema({
  userName: { type: String, required: true, unique: true, index: true },
  accountNumber: { type: Number, index: true },
  emailAddress: { type: String, required: true, unique: true, index: true },
  identityNumber: { type: String, required: true, unique: true, index: true },
});

export default mongoose.model<IUser>("User", userSchema);
