import { RowDataPacket } from "mysql2";

export interface IUserSQL extends RowDataPacket {
  id: number | string;
  photo: string;
  fullName: string;
  email: string;
  startDate: number | string;
  description: string;
  contact: string;
  status: string;
  role: string;
  password: string;
}

export interface IUser {
  id: number | string;
  photo: string;
  fullName: string;
  email: string;
  startDate: number | string;
  description: string;
  contact: string;
  status: string;
  role: string;
  password: string;
}

export interface IUsersDAO {
  path?: string;
  getAllUsers: () => Promise<IUser[]>;
  getUserDetail: (id: string) => Promise<IUser>;
  getUserByEmail: (email: string) => Promise<IUser>;
  updateUser: (id: string, obj: IUser) => Promise<IUser>;
  createUser: (obj: IUser) => Promise<IUser>;
  deleteUser: (id: string) => Promise<string | number>;
}
