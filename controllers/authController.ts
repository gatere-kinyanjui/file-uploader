import { Request, Response, NextFunction } from "express";

import * as db from "../db-services/queries";

export const DisplayLoginForm = (req: Request, res: Response) => {
  res.render("pages/authentication");

  console.log("Live from Auth Router");
};

export const CreateUserPost = async (req: Request, res: Response) => {
  // arguments' names consistent with query's names
  const { email, name, password } = req.body;
  console.log("[CONTROLLER] body: ", req.body);

  // creating user
  const createdUser = await db.AddUser(email, name, password);

  console.log("[CONTROLLER] created user: ", createdUser);
  res.redirect("/auth");
};

export const LoginUserGet = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const loggedInUser = await db.LoginUser(email, password);

  console.log("[CONTROLLER] logged in user: ", loggedInUser);
  res.redirect("/auth");
};

export const ProtectedRouteGet = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.render("pages/protected-route");
  } else {
    res.render("pages/authentication");
  }
};

export const LogoutDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    console.log(`User logged out successfully!`, req.user);

    res.redirect("/auth");
  });
};
