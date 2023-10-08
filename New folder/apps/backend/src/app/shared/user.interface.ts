import { Types } from 'mongoose';

export interface UserI {
  _id: Types.ObjectId;
  email: string;
}

export interface LoginResponseI {
  access_token: string;
  token_type: string;
  expires_in: number;
}
