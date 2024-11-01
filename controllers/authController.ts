import { Request, Response } from "express";

import * as db from "../db-services/queries";

export const DisplayLoginForm = (req: Request, res: Response) => {
  res.render("pages/authentication");

  console.log("Live from Auth Router");
};

export const CreateUserPost = async (req: Request, res: Response) => {
  // arguments' names consistent with query's names
  const { email, name, password } = req.body;
  console.log("[controller]", req.body);

  // creating user
  const createdUser = await db.AddUser(email, name, password);

  console.log(createdUser);
  res.redirect("/auth");
};

export const LoginUserGet = async (req: Request, res: Response) => {
  const { loginEmail, loginPassword } = req.body;

  const loggedInUser = await db.LoginUser(loginEmail, loginPassword);

  console.log(loggedInUser);
  res.redirect("/");
};
