import DAOs from "@src/DAL/DAOs/factory";
import { IReq, IRes } from "@src/types/request";
import { IRoom } from "@src/types/rooms";
import checkProperties from "@src/utils/checkPropertiesUtils";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

class RoomsController {
  async getAllRooms(_req: IReq<IRoom>, res: IRes<IRoom[]>) {
    const rooms = await DAOs.RoomsDAO.getAllRooms();
    res.json({ message: "Success getting all Rooms", payload: rooms });
  }
  async getRoomDetail(req: IReq<IRoom>, res: IRes<IRoom>) {
    const { id } = req.params;
    const room = await DAOs.RoomsDAO.getRoomDetail(id);
    res.json({ message: "Success getting the room", payload: room });
  }
  async updateRoom(req: IReq<IRoom>, res: IRes<IRoom>) {
    const { id } = req.params;
    const obj = req.body;
    const isValidRoomObj = checkProperties.isValidRoom(obj);
    if (!isValidRoomObj)
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Room object has a wrong format",
      });
    const newRoom = await DAOs.RoomsDAO.updateRoom(id, obj);
    res.json({ message: "Success updating the room", payload: newRoom });
  }
  async createRoom(req: IReq<IRoom>, res: IRes<IRoom>) {
    const obj = req.body;
    const isValidRoomObj = checkProperties.isValidRoom(obj);
    if (!isValidRoomObj)
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Room object has a wrong format",
      });
    const newRoom = await DAOs.RoomsDAO.createRoom(obj);
    res.json({ message: "Success creating the room", payload: newRoom });
  }
  async deleteRoom(req: IReq<IRoom>, res: IRes<string>) {
    const { id } = req.params;
    const resId = await DAOs.RoomsDAO.deleteRoom(id);
    res.json({ message: "Success deleting the room", payload: resId });
  }
}

export default new RoomsController();
