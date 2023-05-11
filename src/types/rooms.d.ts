import { RowDataPacket } from "mysql2";

export interface IRoomSQL extends RowDataPacket {
  id: number | string;
  photos: string;
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
  id: number | string;
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
}

export interface IRoomsDAO {
  path?: string;
  getAllRooms: () => Promise<IRoom[]>;
  getRoomDetail: (id: string) => Promise<IRoom>;
  updateRoom: (id: string, obj: IRoom) => Promise<IRoom>;
  createRoom: (obj: IRoom) => Promise<IRoom>;
  deleteRoom: (id: string) => Promise<string | number>;
}
