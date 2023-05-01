import envVars from "@src/envVars";
import usersService from "@src/services/usersService";
import { IUser } from "@src/types/users";
import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";

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
