import express, { Request, Response } from "express";
import { Router } from "express";

import {
  CreateUserPost,
  DisplayLoginForm,
  LogoutDelete,
  UploaderGet,
  UploaderPost,
} from "../controllers/authController";
import passport from "passport";

export const authRouter: Router = express.Router();

authRouter.get("/", DisplayLoginForm);

authRouter.post("/sign-up", CreateUserPost);

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/uploader",
    failureRedirect: "/auth",
  })
);

authRouter.get("/uploader", UploaderGet);
authRouter.post("/uploader", UploaderPost);

authRouter.post("/logout", LogoutDelete);
