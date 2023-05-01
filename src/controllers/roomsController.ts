import roomsService from "@src/services/roomsService";
import { IReq, IRes } from "@src/types/request";
import { IRoom } from "@src/types/rooms";

class RoomsController {
  async getAllRooms(_req: IReq<IRoom>, res: IRes<IRoom[]>) {
    const rooms = await roomsService.getAllRooms();
    res.json({ message: "Success getting all Rooms", payload: rooms });
  }
  async getRoomDetail(req: IReq<IRoom>, res: IRes<IRoom>) {
    const { id } = req.params;
    const room = await roomsService.getRoomDetail(id);
    res.json({ message: "Success getting the room", payload: room });
  }
  async updateRoom(req: IReq<IRoom>, res: IRes<IRoom>) {
    const { id } = req.params;
    const obj = req.body;
    const newRoom = await roomsService.updateRoom(id, obj);
    res.json({ message: "Success updating the room", payload: newRoom });
  }
  async createRoom(req: IReq<IRoom>, res: IRes<IRoom>) {
    const obj = req.body;
    const newRoom = await roomsService.createRoom(obj);
    res.json({ message: "Success creating the room", payload: newRoom });
  }
  async deleteRoom(req: IReq<IRoom>, res: IRes<string>) {
    const { id } = req.params;
    const resId = await roomsService.deleteRoom(id);
    res.json({ message: "Success deleting the room", payload: resId });
  }
}

export default new RoomsController();
