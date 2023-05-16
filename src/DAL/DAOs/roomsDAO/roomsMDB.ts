import roomsModel from "@src/DAL/Mongo/models/rooms.model";
import { IRoom, IRoomsDAO } from "@src/types/rooms";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class RoomsMongo implements IRoomsDAO {
  model = roomsModel;

  async getAllRooms() {
    const rooms = await this.model.find<IRoom>();
    return rooms;
  }
  async getRoomDetail(id: string) {
    const room = await this.model.findById<IRoom>(id);
    if (!room)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Room not found",
      });
    return room;
  }
  async updateRoom(id: string, obj: IRoom) {
    const newRoom = await this.model.findByIdAndUpdate<IRoom>(
      id,
      { ...obj, id },
      { new: true }
    );
    if (!newRoom)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Room not found",
      });
    return newRoom;
  }
  async createRoom(obj: IRoom) {
    const newRoom = await this.model.create<IRoom>(obj);
    return newRoom;
  }
  async deleteRoom(id: string) {
    const resp = await this.model.findByIdAndDelete(id);
    if (!resp)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Room not found",
      });
    return id;
  }
}
