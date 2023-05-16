import passport from "passport";
import { Request, Response, NextFunction } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate("jwtAuth", {
    session: false,
    passReqToCallback: true,
    failWithError: true,
  })(req, res, next);
};
