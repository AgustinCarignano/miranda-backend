import authController from "@src/controllers/authController";
import passport from "passport";
import { Router } from "express";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", {
    failureMessage: true,
    passReqToCallback: true,
  }),
  authController.userLogin
);

export default router;
