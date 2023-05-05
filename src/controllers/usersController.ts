import DAOs from "@src/DAL/DAOs/factory";
import { IReq, IRes } from "@src/types/request";
import { IUser } from "@src/types/users";
import checkProperties from "@src/utils/checkPropertiesUtils";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

class UsersController {
  async getAllUsers(_req: IReq<IUser>, res: IRes<IUser[]>) {
    const users = await DAOs.UsersDAO.getAllUsers();
    res.json({ message: "Success getting all Users", payload: users });
  }
  async getUserDetail(req: IReq<IUser>, res: IRes<IUser>) {
    const { id } = req.params;
    const user = await DAOs.UsersDAO.getUserDetail(id);
    res.json({ message: "Success getting the user", payload: user });
  }
  async updateUser(req: IReq<IUser>, res: IRes<IUser>) {
    const { id } = req.params;
    const obj = req.body;
    const isValidUserObj = checkProperties.isValidUser(obj);
    if (!isValidUserObj)
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "User object has a wrong format",
      });
    const newUser = await DAOs.UsersDAO.updateUser(id, obj);
    res.json({ message: "Success updating the user", payload: newUser });
  }
  async createUser(req: IReq<IUser>, res: IRes<IUser>) {
    const obj = req.body;
    const isValidUserObj = checkProperties.isValidUser(obj);
    if (!isValidUserObj)
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "User object has a wrong format",
      });
    const newUser = await DAOs.UsersDAO.createUser(obj);
    res.json({ message: "Success creating the user", payload: newUser });
  }
  async deleteUser(req: IReq<IUser>, res: IRes<string>) {
    const { id } = req.params;
    const resId = await DAOs.UsersDAO.deleteUser(id);
    res.json({ message: "Success deleting the user", payload: resId });
  }
}

export default new UsersController();
