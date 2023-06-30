import envVars from "../envVars";
import DAOs from "../DAL/DAOs/factory";
import { IUser } from "../types/users";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import bcryptUtils from "../utils/bcryptUtils";
import { CustomError } from "../utils/error/customError";
import { HttpCode } from "../utils/error/errorEnums";

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await DAOs.UsersDAO.getUserByEmail(email);
        if (!user) return done(null, false);
        const isValidPass = await bcryptUtils.compare(password, user.password);
        if (!isValidPass) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwtAuth",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envVars.jwt.Secret,
    },
    async (payload: { user: IUser }, done) => {
      try {
        done(null, payload.user);
      } catch (error) {
        throw new CustomError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: error.message,
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (SerUser: IUser, done) => {
  SerUser._id = SerUser._id.toString();
  const user = await DAOs.UsersDAO.getUserDetail(SerUser._id);
  done(null, user);
});
