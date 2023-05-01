export interface IRoom {
  photos: string[];
  roomType: string;
  description: string;
  roomNumber: number;
  id: string;
  offer: boolean;
  price: number;
  discount: string;
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
  deleteRoom: (id: string) => Promise<string>;
}
