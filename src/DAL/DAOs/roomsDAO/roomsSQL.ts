import { OkPacket } from "mysql2";
import { DBQuery } from "@src/DAL/MySQL/config";
import { IPhotos, IRoom, IRoomSQL, IRoomsDAO } from "@src/types/rooms";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class RoomSQL implements IRoomsDAO {
  async getAllRooms() {
    try {
      const photos = await DBQuery<
        IPhotos[]
      >(`select rooms.id, concat("[",GROUP_CONCAT(room_photos.url),"]") as photos from rooms
          inner join room_photos on rooms.id=room_photos.roomId
          group by rooms.id`);
      const rooms = await DBQuery<
        IRoomSQL[]
      >(`select rooms.*,  concat("[",GROUP_CONCAT(amenities.item),"]") as amenities from rooms
          inner join rooms_amenities on rooms.id=rooms_amenities.roomId
          inner join amenities on amenities.id=rooms_amenities.amenityId
          group by rooms.id`);
      const completeRooms = rooms.map((room) => {
        const photoArr = photos.find((img) => img.id === room.id);
        return {
          ...room,
          offer: room.offer === 1 ? true : false,
          photos: photoArr?.photos ?? [""],
        };
      });
      return completeRooms;
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
      const photos = await DBQuery<IPhotos[]>(
        `select rooms.id, concat("[",GROUP_CONCAT(room_photos.url),"]") as photos from rooms
          inner join room_photos on rooms.id=room_photos.roomId
          where rooms.id =?
          group by rooms.id`,
        [id]
      );
      const rooms = await DBQuery<IRoomSQL[]>(
        `select rooms.*, concat("[",GROUP_CONCAT(amenities.item),"]") as amenities from rooms
          inner join rooms_amenities on rooms.id=rooms_amenities.roomId
          inner join amenities on amenities.id=rooms_amenities.amenityId
          where rooms.id=?
          group by rooms.id`,
        [id]
      );
      if (rooms.length === 0)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Room not found",
        });
      const completeRoom = {
        ...rooms[0],
        offer: rooms[0].offer === 1,
        photos: photos[0].photos,
      };
      return completeRoom;
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
}
