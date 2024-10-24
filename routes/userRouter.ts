import express from "express";
import { Router } from "express";

import { AllUsersGet, UserDashboardGet } from "../controllers/userController";
import { TestUserPost } from "../controllers/loginController";

export const userRouter: Router = express.Router();

userRouter.get("/", UserDashboardGet);

userRouter.get("/users", AllUsersGet);

userRouter.get("/test", TestUserPost);
