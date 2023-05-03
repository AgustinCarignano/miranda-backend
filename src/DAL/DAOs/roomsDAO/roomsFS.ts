import { IRoom, IRoomsDAO } from "@src/types/rooms";
import fs from "fs-extra";
import { __rootDir } from "@src/utils/pathUtils";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class RoomsFS implements IRoomsDAO {
  path: string;
  constructor() {
    this.path = `${__rootDir}/src/jsonData/roomsData.json`;
  }
  async getAllRooms() {
    const jsonData = await fs.promises.readFile(this.path, "utf-8");
    const data: IRoom[] = JSON.parse(jsonData);
    return data;
  }
  async getRoomDetail(id: string) {
    try {
      const allRooms = await this.getAllRooms();
      const room = allRooms.find((item) => item.id === id);
      if (!room)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Room not found",
        });
      return room;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.message,
        });
    }
  }
  async updateRoom(id: string, obj: IRoom) {
    const allRooms = await this.getAllRooms();
    const room = allRooms.find((item) => item.id === id);
    const newRoom = { ...room, ...obj };
    const newArray = allRooms.map((item) => {
      if (item.id === id) return newRoom;
      else return item;
    });
    await this.#writeFile(newArray);
    return newRoom;
  }
  async createRoom(obj: IRoom) {
    const allRooms = await this.getAllRooms();
    allRooms.push(obj);
    await this.#writeFile(allRooms);
    return obj;
  }
  async deleteRoom(id: string) {
    const allRooms = await this.getAllRooms();
    const newArray = allRooms.filter((item) => item.id !== id);
    await this.#writeFile(newArray);
    return id;
  }
  async #writeFile(data: IRoom[]) {
    await fs.promises.writeFile(this.path, JSON.stringify(data));
  }
}
