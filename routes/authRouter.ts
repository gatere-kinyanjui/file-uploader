import express, { Request, Response } from "express";
import { Router } from "express";

import {
  CreateUserPost,
  DisplayLoginForm,
  LogoutDelete,
  ProtectedRouteGet,
} from "../controllers/authController";
import passport from "passport";

export const authRouter: Router = express.Router();

authRouter.get("/", DisplayLoginForm);

authRouter.post("/sign-up", CreateUserPost);

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/protected-route",
    failureRedirect: "/auth",
  })
);

authRouter.get("/protected-route", ProtectedRouteGet);

authRouter.post("/logout", LogoutDelete);
