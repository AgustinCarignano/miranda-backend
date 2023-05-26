import usersModel from "@src/DAL/Mongo/models/users.model";
import { IUser, IUsersDAO } from "@src/types/users";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class UsersMongo implements IUsersDAO {
  model = usersModel;

  async getAllUsers() {
    const usersDB = await this.model.find<IUser>();
    const users = usersDB.map((item) => this.#sanitizateUser(item));
    return users;
  }
  async getUserDetail(id: string) {
    const userDB = await this.model.findById<IUser>(id);
    if (!userDB)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User not found",
      });
    const user = this.#sanitizateUser(userDB);
    return user;
  }
  async getUserByEmail(email: string) {
    const userDB = await this.model.find<IUser>({ email });
    if (!userDB[0])
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User not found",
      });
    //const user = this.#sanitizateUser(userDB[0]);
    return userDB[0];
  }
  async updateUser(id: string, obj: IUser) {
    const cloneObj: Partial<IUser> = { ...obj };
    delete cloneObj.password;
    const newUser = await this.model.findByIdAndUpdate<IUser>(
      id,
      { ...cloneObj, id },
      { new: true }
    );
    if (!newUser)
      throw new CustomError({
        httpCode: HttpCode.NOT_FOUND,
        description: "User not found",
      });
    const user = this.#sanitizateUser(newUser);
    return user;
  }
  async createUser(obj: IUser) {
    const newUser = await this.model.create(obj);
    const user = this.#sanitizateUser(newUser);
    return user;
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
  #sanitizateUser(user: IUser) {
    return {
      _id: user._id,
      photo: user.photo,
      fullName: user.fullName,
      email: user.email,
      startDate: user.startDate,
      description: user.description,
      contact: user.contact,
      status: user.status,
      role: user.role,
      password: "-",
    };
  }
}
