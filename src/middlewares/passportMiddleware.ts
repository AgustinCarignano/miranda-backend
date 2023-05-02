import envVars from "@src/envVars";
import usersService from "@src/services/usersService";
import { IUser } from "@src/types/users";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import bcryptUtils from "@src/utils/bcryptUtils";

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await usersService.getUserByEmail(email);
        if (!user) return done(null, false, { message: "User not found" });
        const isValidPass = await bcryptUtils.compare(password, user.password);
        if (!isValidPass)
          return done(null, false, { message: "Incorrect credentials" });
        return done(null, user, { message: "Logged in successfully" });
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
      done(null, payload.user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (SerUser: IUser, done) => {
  const user = await usersService.getUserDetail(SerUser.id);
  done(null, user);
});
