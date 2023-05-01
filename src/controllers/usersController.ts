import usersService from "@src/services/usersService";
import { IReq, IRes } from "@src/types/request";
import { IUser } from "@src/types/users";

class UsersController {
  async getAllUsers(_req: IReq<IUser>, res: IRes<IUser[]>) {
    const users = await usersService.getAllUsers();
    res.json({ message: "Success getting all Users", payload: users });
  }
  async getUserDetail(req: IReq<IUser>, res: IRes<IUser>) {
    const { id } = req.params;
    const user = await usersService.getUserDetail(id);
    res.json({ message: "Success getting the user", payload: user });
  }
  async updateUser(req: IReq<IUser>, res: IRes<IUser>) {
    const { id } = req.params;
    const obj = req.body;
    const newUser = await usersService.updateUser(id, obj);
    res.json({ message: "Success updating the user", payload: newUser });
  }
  async createUser(req: IReq<IUser>, res: IRes<IUser>) {
    const obj = req.body;
    const newUser = await usersService.createUser(obj);
    res.json({ message: "Success creating the user", payload: newUser });
  }
  async deleteUser(req: IReq<IUser>, res: IRes<string>) {
    const { id } = req.params;
    const resId = await usersService.deleteUser(id);
    res.json({ message: "Success deleting the user", payload: resId });
  }
}

export default new UsersController();
