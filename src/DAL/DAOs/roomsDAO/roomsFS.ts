import { IRoom, IRoomsDAO } from "@src/types/rooms";
import fs from "fs-extra";
import { __rootDir } from "@src/utils/pathUtils";

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
    const allRooms = await this.getAllRooms();
    const room = allRooms.find((item) => item.id === id);
    if (room) return room;
    else throw new Error("Room not found");
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
