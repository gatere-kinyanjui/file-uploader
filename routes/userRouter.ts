import express from "express";
import { Router } from "express";

import { GetUser } from "../controllers/userController";

export const userRouter: Router = express.Router();

userRouter.get("/", GetUser);
