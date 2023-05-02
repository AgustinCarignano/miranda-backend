import { IUser, IUsersDAO } from "@src/types/users";
import fs from "fs-extra";
import { __rootDir } from "@src/utils/pathUtils";

export default class UsersFS implements IUsersDAO {
  path = `${__rootDir}/src/jsonData/usersData.json`;
  async getAllUsers() {
    const jsonData = await fs.promises.readFile(this.path, "utf-8");
    const data: IUser[] = JSON.parse(jsonData);
    return data;
  }
  async getUserDetail(id: string) {
    const allUser = await this.getAllUsers();
    const user = allUser.find((item) => item.id === id);
    if (user) return user;
    else throw new Error("User not found");
  }
  async getUserByEmail(email: string) {
    const allUser = await this.getAllUsers();
    const user = allUser.find((item) => item.email === email);
    if (user) return user;
    else throw new Error("User not found");
  }
  async updateUser(id: string, obj: IUser) {
    const allUser = await this.getAllUsers();
    const user = allUser.find((item) => item.id === id);
    const newUser = { ...user, ...obj };
    const newArray = allUser.map((item) => {
      if (item.id === id) return newUser;
      else return item;
    });
    await this.#writeFile(newArray);
    return newUser;
  }
  async createUser(obj: IUser) {
    const allUser = await this.getAllUsers();
    allUser.push(obj);
    await this.#writeFile(allUser);
    return obj;
  }
  async deleteUser(id: string) {
    const allUser = await this.getAllUsers();
    const newArray = allUser.filter((item) => item.id !== id);
    await this.#writeFile(newArray);
    return id;
  }
  async #writeFile(data: IUser[]) {
    await fs.promises.writeFile(this.path, JSON.stringify(data));
  }
}
