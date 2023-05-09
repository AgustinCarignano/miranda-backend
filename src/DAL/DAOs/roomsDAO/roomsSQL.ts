import { OkPacket } from "mysql2";
import { DBQuery } from "@src/DAL/MySQL/config";
import { IRoom, IRoomSQL, IRoomsDAO } from "@src/types/rooms";

export default class RoomSQL implements IRoomsDAO {
  async getAllRooms() {
    const rooms = await DBQuery<IRoomSQL[]>("SELECT * FROM rooms");
    const formatRooms = this.#formatRooms(rooms);
    return formatRooms;
  }

  async getRoomDetail(id: string | number) {
    if (typeof id === "string") id = Number(id);
    const rooms = await DBQuery<IRoomSQL[]>("SELECT * FROM rooms WHERE id=?", [
      id,
    ]);
    const formatRooms = this.#formatRooms(rooms);
    return formatRooms[0];
  }

  async updateRoom(id: string | number, obj: IRoom) {
    if (typeof id === "string") id = Number(id);
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
    if (!resp) throw new Error();
    return this.getRoomDetail(id);
  }

  async createRoom(obj: IRoom) {
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
    if (!resp) throw new Error();
    return this.getRoomDetail(resp.insertId);
  }

  async deleteRoom(id: string | number) {
    if (typeof id === "string") id = Number(id);
    const resp = await DBQuery("DELETE FROM rooms WHERE id= ?", [id]);
    if (!resp) throw new Error();
    return id.toString();
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
