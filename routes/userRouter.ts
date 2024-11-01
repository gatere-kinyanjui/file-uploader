import express from "express";
import { Router } from "express";

import { AllUsersGet, UserDashboardGet } from "../controllers/userController";

export const userRouter: Router = express.Router();

userRouter.get("/", UserDashboardGet);

userRouter.get("/users", AllUsersGet);
