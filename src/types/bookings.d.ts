import { RowDataPacket } from "mysql2";
import { IRoom } from "./rooms";
import { Schema } from "mongoose";

type idType = string | number | Schema.Types.ObjectId;

export interface IBookingsSQL extends RowDataPacket {
  _id: number;
  guest: string;
  specialRequest: string;
  orderDate: string;
  roomType: string;
  status: string;
  checkIn: string;
  checkOut: string;
  roomId: number;
  roomNumber: number;
  roomImg: string;
}

export interface IBookings {
  _id: idType;
  guest: string;
  specialRequest: string;
  orderDate: string | number;
  roomType: string;
  status: string;
  checkIn: string | number;
  checkOut: string | number;
  roomId: idType;
  roomNumber: number;
  roomImg: string;
  __v?: number;
}

export interface IBookingsDAO {
  path?: srting;
  getAllBookings: () => Promise<IBookings[]>;
  getBookingDetail: (id: string) => Promise<IBookings>;
  updateBooking: (id: string, obj: IBookings) => Promise<IBookings>;
  createBooking: (obj: IBookings) => Promise<IBookings>;
  deleteBooking: (id: string) => Promise<string | number>;
  getBookingDetailPopulated?: (
    id: string | number
  ) => Promise<IBookings & IRoom>;
}
//|(IBookings&IRoom)
