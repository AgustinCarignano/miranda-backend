import { RowDataPacket } from "mysql2";
import { Schema } from "mongoose";

export interface IContact {
  _id: string | number | Schema.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string | number;
  _read: boolean;
  archived: boolean;
  __v?: number;
}

export interface IContactSQL extends RowDataPacket {
  _id: string | number;
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
