import express from "express";
import { Router } from "express";

import { AllUsersGet, HomePageGet } from "../controllers/userController";

export const userRouter: Router = express.Router();

userRouter.get("/", HomePageGet);

userRouter.get("/users", AllUsersGet);
