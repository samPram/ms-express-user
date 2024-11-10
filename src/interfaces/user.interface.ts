import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  accountNumber: number;
  emailAddress: string;
  identityNumber: string;
}
