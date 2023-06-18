import roomsModel from "../../Mongo/models/rooms.model";
import { IRoom, IRoomsDAO } from "../../../types/rooms";
import { CustomError } from "../../../utils/error/customError";
import { HttpCode } from "../../../utils/error/errorEnums";

export default class RoomsMongo implements IRoomsDAO {
  model = roomsModel;

  async getAllRooms() {
    const roomsDB = await this.model.find<IRoom>();
    const rooms = roomsDB.map((item) => this.#sanitizateRoom(item));
    return rooms;
  }
  async getRoomDetail(id: string) {
    const roomDB = await this.model.findById<IRoom>(id);
    if (!roomDB)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "Room not found",
      });
    const room = this.#sanitizateRoom(roomDB);
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
    const room = this.#sanitizateRoom(newRoom);
    return room;
  }
  async createRoom(obj: IRoom) {
    const newRoom = await this.model.create<IRoom>(obj);
    const room = this.#sanitizateRoom(newRoom);
    return room;
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
  #sanitizateRoom(room: IRoom) {
    return {
      _id: room._id,
      photos: room.photos,
      roomType: room.roomType,
      description: room.description,
      roomNumber: room.roomNumber,
      offer: room.offer,
      price: room.price,
      discount: room.discount,
      cancellation: room.cancellation,
      status: room.status,
      amenities: room.amenities,
    };
  }
}
