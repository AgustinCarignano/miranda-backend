import "./pre-start";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import routes from "@src/routes/index";

import "@src/middlewares/passportMiddleware";
import envVars from "./envVars";
import { isAuth } from "./middlewares/isAuthMiddleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(cookieParser(envVars.CookieProps.Secret));
app.use(
  session({
    secret: envVars.session,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/bookings", isAuth, routes.bookingsRouter);
app.use("/api/rooms", isAuth, routes.roomsRouter);
app.use("/api/users", isAuth, routes.usersRouter);
app.use("/api/contacts", isAuth, routes.contactsRouter);
app.use("/api/auth", routes.authRouter);
app.use("/api/public", routes.publicRouter);

export default app;
