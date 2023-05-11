import DAOs from "@src/DAL/DAOs/factory";
import { IReq, IRes } from "@src/types/request";
import { IRoom } from "@src/types/rooms";
//import checkProperties from "@src/utils/checkPropertiesUtils";
import { validateUtils } from "@src/utils/validate";
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
    try {
      const validatedRoom = await validateUtils.roomSchema.validateAsync(obj, {
        abortEarly: false,
      });
      const newRoom = await DAOs.RoomsDAO.updateRoom(id, validatedRoom);
      res.json({ message: "Success updating the room", payload: newRoom });
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: error.message,
      });
    }
  }
  async createRoom(req: IReq<IRoom>, res: IRes<IRoom>) {
    const obj = req.body;
    try {
      const validatedRoom = await validateUtils.roomSchema.validateAsync(obj, {
        abortEarly: false,
      });
      const newRoom = await DAOs.RoomsDAO.createRoom(validatedRoom);
      res.json({ message: "Success creating the room", payload: newRoom });
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: error.message,
      });
    }
  }
  async deleteRoom(req: IReq<IRoom>, res: IRes<string | number>) {
    const { id } = req.params;
    const resId = await DAOs.RoomsDAO.deleteRoom(id);
    res.json({ message: "Success deleting the room", payload: resId });
  }
}

export default new RoomsController();
