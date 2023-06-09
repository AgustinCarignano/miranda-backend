import DAOs from "../DAL/DAOs/factory";
import { IReq, IRes } from "../types/request";
import { IUser } from "../types/users";
import bcryptUtils from "../utils/bcryptUtils";
import { CustomError } from "../utils/error/customError";
import { HttpCode } from "../utils/error/errorEnums";
import { validateUtils } from "../utils/validate";

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
    try {
      const validatedUser = await validateUtils.userSchema.validateAsync(obj, {
        abortEarly: false,
      });
      const newUser = await DAOs.UsersDAO.updateUser(id, validatedUser);
      res.json({ message: "Success updating the user", payload: newUser });
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: error.message,
      });
    }
  }
  async createUser(req: IReq<IUser>, res: IRes<IUser>) {
    const obj = req.body;
    try {
      const validatedUser = await validateUtils.userSchema.validateAsync(obj, {
        abortEarly: false,
      });
      const hashPass = await bcryptUtils.getHash(validatedUser.password);
      const newUser = await DAOs.UsersDAO.createUser({
        ...validatedUser,
        password: hashPass,
      });
      res.json({ message: "Success creating the user", payload: newUser });
    } catch (error) {
      console.log(error);
      throw new CustomError({
        httpCode: HttpCode.BAD_REQUEST,
        description: error.message,
      });
    }
  }
  async deleteUser(req: IReq<IUser>, res: IRes<string | number>) {
    const { id } = req.params;
    const resId = await DAOs.UsersDAO.deleteUser(id);
    res.json({ message: "Success deleting the user", payload: resId });
  }
}

export default new UsersController();
