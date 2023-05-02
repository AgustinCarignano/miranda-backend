import * as e from "express";
import { Send } from "express-serve-static-core";
import { IUser } from "./users";

export interface IReq<T> extends e.Request {
  body: T;
  params: {
    id: string;
  };
}

export interface IRes<T> extends e.Response {
  json: Send<{ message: string; payload: T }, this>;
}
