import { OkPacket } from "mysql2";
import { IUser, IUserSQL, IUsersDAO } from "@src/types/users";
import { DBQuery } from "@src/DAL/MySQL/config";

export default class UsersSQL implements IUsersDAO {
  async getAllUsers() {
    const users = await DBQuery<IUserSQL[]>("SELECT * FROM users");
    return users;
  }

  async getUserDetail(id: string | number) {
    const users = await DBQuery<IUserSQL[]>("SELECT * FROM users WHERE id=?", [
      id,
    ]);
    return users[0];
  }

  async getUserByEmail(email: string) {
    const users = await DBQuery<IUserSQL[]>(
      "SELECT * FROM users WHERE email=?",
      [email]
    );
    return users[0];
  }

  async updateUser(id: string | number, obj: IUser) {
    if (typeof id === "string") id = Number(id);
    if (typeof obj.startDate === "number")
      obj.startDate = new Date(obj.startDate).toISOString();
    const resp = await DBQuery<OkPacket>(
      "UPDATE users SET photo=?, fullName=?, email=?, startDate=?, description=?, contact=?, status=?, role=?, password=? WHERE id = ?",
      [
        obj.photo,
        obj.fullName,
        obj.email,
        obj.startDate.replace("T", " ").replace("Z", ""),
        obj.description,
        obj.contact,
        obj.status,
        obj.role,
        obj.password,
        id,
      ]
    );
    if (!resp) throw new Error();
    return this.getUserDetail(id);
  }

  async createUser(obj: IUser) {
    if (typeof obj.startDate === "number")
      obj.startDate = new Date(obj.startDate).toISOString();
    const resp = await DBQuery<OkPacket>(
      "INSERT INTO users (photo, fullName, email, startDate, description, contact, status, role, password) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        obj.photo,
        obj.fullName,
        obj.email,
        obj.startDate.replace("T", " ").replace("Z", ""),
        obj.description,
        obj.contact,
        obj.status,
        obj.role,
        obj.password,
      ]
    );
    if (!resp) throw new Error();
    return this.getUserDetail(resp.insertId);
  }

  async deleteUser(id: string | number) {
    if (typeof id === "string") id = Number(id);
    const resp = await DBQuery<OkPacket>("DELETE FROM users WHERE id= ?", [id]);
    if (!resp) throw new Error();
    return id.toString();
  }
}
