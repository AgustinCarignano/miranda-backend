import { RowDataPacket } from "mysql2";
import { Schema } from "mongoose";

export interface IRoomSQL extends RowDataPacket {
  _id: number | string;
  roomType: string;
  description: string;
  roomNumber: number;
  offer: number;
  price: number;
  discount: number;
  cancellation: string;
  status: string;
  amenities: string;
}

export interface IRoom {
  _id: number | string | Schema.Types.ObjectId;
  photos: string[];
  roomType: string;
  description: string;
  roomNumber: number;
  offer: boolean;
  price: number;
  discount: number;
  cancellation: string;
  status: string;
  amenities: string[];
  __v?: number;
}

export interface IRoomsDAO {
  path?: string;
  getAllRooms: () => Promise<IRoom[]>;
  getRoomDetail: (id: string) => Promise<IRoom>;
  updateRoom: (id: string, obj: IRoom) => Promise<IRoom>;
  createRoom: (obj: IRoom) => Promise<IRoom>;
  deleteRoom: (id: string) => Promise<string | number>;
}

export interface IPhotos extends RowDataPacket {
  id: string | number;
  photos: string;
}

export interface IRoom_Photos extends RowDataPacket {
  id: number;
  roomId: number;
  url: string;
}

export interface IRooms_Amenities extends RowDataPacket {
  id: number;
  roomId: number;
  amenityId: number;
}
