import { OkPacket } from "mysql2";
import { DBQuery } from "@src/DAL/MySQL/config";
import { IRoom, IRoomSQL, IRoomsDAO } from "@src/types/rooms";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class RoomSQL implements IRoomsDAO {
  async getAllRooms() {
    try {
      const rooms = await DBQuery<IRoomSQL[]>("SELECT * FROM rooms");
      const formatRooms = this.#formatRooms(rooms);
      return formatRooms;
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.mesagge,
      });
    }
  }

  async getRoomDetail(id: string | number) {
    if (typeof id === "string") id = Number(id);
    try {
      const rooms = await DBQuery<IRoomSQL[]>(
        "SELECT * FROM rooms WHERE id=?",
        [id]
      );
      if (rooms.length === 0)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Room not found",
        });
      const formatRooms = this.#formatRooms(rooms);
      return formatRooms[0];
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.message,
        });
    }
  }

  async updateRoom(id: string | number, obj: IRoom) {
    if (typeof id === "string") id = Number(id);
    try {
      const resp = await DBQuery<OkPacket>(
        "UPDATE rooms SET photos=?, roomType=?, description=?, roomNumber=?, offer=?, price=?, discount=?, cancellation=?, status=?, amenities=? WHERE id = ?",
        [
          obj.photos.join(","),
          obj.roomType,
          obj.description,
          obj.roomNumber,
          obj.offer ? 1 : 0,
          obj.price,
          obj.discount,
          obj.cancellation,
          obj.status,
          obj.amenities.join(","),
          id,
        ]
      );
      if (!resp)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Room not found",
        });
      return this.getRoomDetail(id);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.mesagge,
        });
    }
  }

  async createRoom(obj: IRoom) {
    try {
      const resp = await DBQuery<OkPacket>(
        "INSERT INTO rooms (photos, roomType, description, roomNumber, offer, price, discount, cancellation, status, amenities) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          obj.photos.join(","),
          obj.roomType,
          obj.description,
          obj.roomNumber,
          obj.offer ? 1 : 0,
          obj.price,
          obj.discount,
          obj.cancellation,
          obj.status,
          obj.amenities.join(","),
        ]
      );
      return this.getRoomDetail(resp.insertId);
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.message,
      });
    }
  }

  async deleteRoom(id: string | number) {
    if (typeof id === "string") id = Number(id);
    try {
      const resp = await DBQuery("DELETE FROM rooms WHERE id= ?", [id]);
      if (!resp)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Room not found",
        });
      return id;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.message,
      });
    }
  }

  #formatRooms(obj: IRoomSQL[]) {
    const rooms: IRoom[] = obj.map((room: IRoomSQL) => {
      return {
        ...room,
        offer: room.offer === 1 ? true : false,
        photos: room.photos.split(","),
        amenities: room.amenities.split(","),
      };
    });
    return rooms;
  }
}
