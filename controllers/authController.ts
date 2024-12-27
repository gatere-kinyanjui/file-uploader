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

// handling file upload as usual
export const UploaderPostBasic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No file was selected!");
  } else {
    const uploadedFile = req.files.sampleFile;
    console.log("[CONTROLLER UPLOAD POST]: ", uploadedFile);

    res.json(uploadedFile);
  }
};

// handling the file upload as an object or array
export const UploaderPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No file was selected!");
      return;
    }

    const sampleFile = req.files.sampleFile;

    if (Array.isArray(sampleFile)) {
      // Handle multiple files (array of UploadedFile)
      console.log("[CONTROLLER UPLOAD POST]: Multiple files uploaded");
      sampleFile.forEach((file) => {
        console.log("File name: ", file.name);
      });

      res.json(sampleFile);
    } else {
      // Handle single file (UploadedFile)
      console.log("[CONTROLLER UPLOAD POST]: Single file uploaded");
      console.log("File name: ", sampleFile.name);
      res.json(sampleFile);
    }
  } catch (error: any) {
    console.error("[CONTROLLER UPLOAD POST]: ", error);
    next(error);
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
