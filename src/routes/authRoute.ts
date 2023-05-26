import authController from "@src/controllers/authController";
import passport from "passport";
import { Router } from "express";
import { isAuth } from "@src/middlewares/isAuthMiddleware";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", {
    failureMessage: true,
    passReqToCallback: true,
  }),
  authController.userLogin
);

router.get("/refreshToken", isAuth, authController.refreshToken);

export default router;
