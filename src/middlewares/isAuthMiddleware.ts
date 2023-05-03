import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";
import { IUser } from "@src/types/users";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate("jwtAuth", {
    session: false,
    passReqToCallback: true,
    failWithError: true,
  })(req, res, next);
};
