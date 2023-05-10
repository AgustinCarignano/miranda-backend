import { IUser, IUsersDAO } from "@src/types/users";
import fs from "fs-extra";
import { __rootDir } from "@src/utils/pathUtils";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class UsersFS implements IUsersDAO {
  path = `${__rootDir}/src/jsonData/usersData.json`;

  async getAllUsers() {
    try {
      const jsonData = await fs.promises.readFile(this.path, "utf-8");
      const data: IUser[] = JSON.parse(jsonData);
      return data;
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.mesagge,
      });
    }
  }

  async getUserDetail(id: string) {
    try {
      const allUser = await this.getAllUsers();
      const user = allUser.find((item) => item.id === id);
      if (!user)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        });
      return user;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.mesagge,
        });
    }
  }

  async getUserByEmail(email: string) {
    try {
      const allUser = await this.getAllUsers();
      const user = allUser.find((item) => item.email === email);
      if (!user)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        });
      return user;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.mesagge,
        });
    }
  }

  async updateUser(id: string, obj: IUser) {
    try {
      const allUser = await this.getAllUsers();
      const user = allUser.find((item) => item.id === id);
      if (!user)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        });
      const newUser = { ...user, ...obj, id };
      const newArray = allUser.map((item) => {
        if (item.id === id) return newUser;
        else return item;
      });
      await this.#writeFile(newArray);
      return newUser;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.mesagge,
        });
    }
  }

  async createUser(obj: IUser) {
    try {
      const allUser = await this.getAllUsers();
      if (allUser.some((item) => item.id === obj.id))
        throw new CustomError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Duplicate user id",
        });
      allUser.push(obj);
      await this.#writeFile(allUser);
      return obj;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.message,
      });
    }
  }

  async deleteUser(id: string) {
    try {
      const allUser = await this.getAllUsers();
      if (!allUser.some((item) => item.id === id))
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        });
      const newArray = allUser.filter((item) => item.id !== id);
      await this.#writeFile(newArray);
      return id;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.message,
      });
    }
  }

  async #writeFile(data: IUser[]) {
    await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
  }
}
