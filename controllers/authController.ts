import { Request, Response, NextFunction } from "express";

import * as db from "../db-services/queries";

import bcrypt from "bcrypt";

export const DisplayLoginForm = (req: Request, res: Response) => {
  res.render("pages/authentication");

  console.log("Live from Auth Router", req.user);
};

// hashing password

export const CreateUserPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // arguments' names consistent with query's names
  const { email, name, password } = req.body;
  console.log("[CONTROLLER] body: ", req.body);

  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  // Store hash in your password DB.
  const createdUser = await db.AddUser(email, name, hash);

  console.log("[CONTROLLER] created user: ", createdUser);

  res.redirect("/auth");
};

export const LoginUserGet = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const loggedInUser = await db.LoginUser(email, password);

  console.log("[CONTROLLER] logged in user: ", loggedInUser);
  res.redirect("/auth");
};

export const UploaderGet = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.render("pages/uploader", { user: req.user });
  } else {
    res.render("pages/authentication");
  }
};

export const UploaderPost = async (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No file was selected!");
  } else {
    const uploadedFile = req.files.sampleFile;
    console.log("[CONTROLLER UPLOAD POST]: ", uploadedFile);
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
