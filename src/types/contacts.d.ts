import { RowDataPacket } from "mysql2";

export interface IContact {
  id: string | number;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string | number;
  _read: boolean;
  archived: boolean;
}

export interface IContactSQL extends RowDataPacket {
  id: string | number;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string | number;
  _read: number;
  archived: number;
}

export interface IContactDAO {
  path?: string;
  getAllContacts: () => Promise<IContact[]>;
  updateContact: (id: string, obj: IContact) => Promise<IContact>;
}
