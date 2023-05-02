export interface IUser {
  photo: string;
  fullName: string;
  id: string;
  email: string;
  startDate: number;
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
  deleteUser: (id: string) => Promise<string>;
}
