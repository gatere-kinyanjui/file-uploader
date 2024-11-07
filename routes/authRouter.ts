import express, { Request, Response } from "express";
import { Router } from "express";

import {
  CreateUserPost,
  DisplayLoginForm,
} from "../controllers/authController";
import passport from "passport";

export const authRouter: Router = express.Router();

authRouter.get("/", DisplayLoginForm);

authRouter.post("/sign-up", CreateUserPost);

authRouter.post(
  "auth/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth",
  })
);