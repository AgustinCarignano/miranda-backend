import { OkPacket } from "mysql2";
import { IUser, IUserSQL, IUsersDAO } from "@src/types/users";
import { DBQuery } from "@src/DAL/MySQL/config";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

export default class UsersSQL implements IUsersDAO {
  async getAllUsers() {
    try {
      const users = await DBQuery<IUserSQL[]>("SELECT * FROM users");
      return users;
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.mesagge,
      });
    }
  }

  async getUserDetail(id: string | number) {
    if (typeof id === "string") id = Number(id);
    try {
      const users = await DBQuery<IUserSQL[]>(
        "SELECT * FROM users WHERE _id=?",
        [id]
      );
      if (users.length === 0)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        });
      return users[0];
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
      const users = await DBQuery<IUserSQL[]>(
        "SELECT * FROM users WHERE email=?",
        [email]
      );
      if (users.length === 0)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        });
      return users[0];
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else
        throw new CustomError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          description: error.mesagge,
        });
    }
  }

  async updateUser(id: string | number, obj: IUser) {
    if (typeof id === "string") id = Number(id);
    if (typeof obj.startDate === "number")
      obj.startDate = new Date(obj.startDate).toISOString();
    try {
      const resp = await DBQuery<OkPacket>(
        "UPDATE users SET photo=?, fullName=?, email=?, startDate=?, description=?, contact=?, status=?, role=?, password=? WHERE _id = ?",
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
      if (!resp)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        });
      return this.getUserDetail(id);
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
    if (typeof obj.startDate === "number")
      obj.startDate = new Date(obj.startDate).toISOString();
    try {
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
      return this.getUserDetail(resp.insertId);
    } catch (error) {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.message,
      });
    }
  }

  async deleteUser(id: string | number) {
    if (typeof id === "string") id = Number(id);
    try {
      const resp = await DBQuery<OkPacket>("DELETE FROM users WHERE _id= ?", [
        id,
      ]);
      if (!resp)
        throw new CustomError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        });
      return id;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.message,
      });
    }
  }
}
