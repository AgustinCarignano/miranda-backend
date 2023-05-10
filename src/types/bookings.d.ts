import { RowDataPacket } from "mysql2";
import { IRoom } from "./rooms";

export interface IBookingsSQL extends RowDataPacket {
  id: number;
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
  id: string | number;
  guest: string;
  specialRequest: string;
  orderDate: string | number;
  roomType: string;
  status: string;
  checkIn: string | number;
  checkOut: string | number;
  roomId: string | number;
  roomNumber: number;
  roomImg: string;
}

export interface IBookingsDAO {
  path?: srting;
  getAllBookings: () => Promise<IBookings[]>;
  getBookingDetail: (id: string) => Promise<IBookings>;
  updateBooking: (id: string, obj: IBookings) => Promise<IBookings>;
  createBooking: (obj: IBookings) => Promise<IBookings>;
  deleteBooking: (id: string) => Promise<string>;
  getBookingDetailPopulated?: (id: string) => Promise<IBookings & IRoom>;
}
