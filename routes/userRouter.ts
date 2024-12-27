import express from "express";
import { Router } from "express";

import {
  AllUsersGet,
  HomePageGet,
  UserByIdGet,
} from "../controllers/user.controller";

export const userRouter: Router = express.Router();

userRouter.get("/", HomePageGet);

userRouter.get("/users", AllUsersGet);
userRouter.get("/users/:id", UserByIdGet);
