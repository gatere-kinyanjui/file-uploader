import express, { Request, Response } from "express";
import { Router } from "express";

import { DisplayLoginForm } from "../controllers/loginController";

export const loginRouter: Router = express.Router();

loginRouter.get("/", DisplayLoginForm);
