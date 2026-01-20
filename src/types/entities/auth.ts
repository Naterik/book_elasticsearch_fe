import type { IUser } from "./user";

export interface ILogin {
  access_token: string;
  user: IUser;
}

export interface IRegister {
  id: number;
  username: string; // Changed from email to match consistent usage
  fullName: string | null;
}
