import DAOs from "@src/DAL/DAOs/factory";
import { IUser } from "@src/types/users";

class UsersService {
  dao = DAOs.UsersDAO;

  async getAllUsers() {
    const data = await this.dao.getAllUsers();
    return data;
  }
  async getUserDetail(id: string) {
    const user = await this.dao.getUserDetail(id);
    return user;
  }
  async updateUser(id: string, UserObj: IUser) {
    const newUser = await this.dao.updateUser(id, UserObj);
    return newUser;
  }
  async createUser(UserObj: IUser) {
    const newUser = await this.dao.createUser(UserObj);
    return newUser;
  }
  async deleteUser(id: string) {
    const res = await this.dao.deleteUser(id);
    return res;
  }
}

export default new UsersService();
