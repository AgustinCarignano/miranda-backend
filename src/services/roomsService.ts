import DAOs from "@src/DAL/DAOs/factory";
import { IRoom } from "@src/types/rooms";

class RoomsService {
  dao = DAOs.RoomsDAO;

  async getAllRooms() {
    const data = await this.dao.getAllRooms();
    return data;
  }
  async getRoomDetail(id: string) {
    const room = await this.dao.getRoomDetail(id);
    return room;
  }
  async updateRoom(id: string, RoomObj: IRoom) {
    const newRoom = await this.dao.updateRoom(id, RoomObj);
    return newRoom;
  }
  async createRoom(RoomObj: IRoom) {
    const newRoom = await this.dao.createRoom(RoomObj);
    return newRoom;
  }
  async deleteRoom(id: string) {
    const res = await this.dao.deleteRoom(id);
    return res;
  }
}

export default new RoomsService();
