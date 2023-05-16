import usersModel from "@src/DAL/Mongo/models/users.model";
import { IUser, IUsersDAO } from "@src/types/users";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class UsersMongo implements IUsersDAO {
  model = usersModel;

  async getAllUsers() {
    const users = await this.model.find<IUser>();
    return users;
  }
  async getUserDetail(id: string) {
    const user = await this.model.findById<IUser>(id);
    if (!user)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User not found",
      });
    return user;
  }
  async getUserByEmail(email: string) {
    const user = await this.model.find<IUser>({ email });
    if (!user[0])
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User not found",
      });
    return user[0];
  }
  async updateUser(id: string, obj: IUser) {
    const newUser = await this.model.findByIdAndUpdate<IUser>(
      id,
      { ...obj, id },
      { new: true }
    );
    if (!newUser)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User not found",
      });
    return newUser;
  }
  async createUser(obj: IUser) {
    const newUser = await this.model.create(obj);
    return newUser;
  }
  async deleteUser(id: string) {
    const resp = await this.model.findByIdAndDelete(id);
    if (!resp)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User not found",
      });
    return id;
  }
}
