import express, { Request, Response } from "express";

import * as db from "../db-services/queries";

export const DisplayLoginForm = (req: Request, res: Response) => {
  res.render("pages/login");

  console.log("Live from Login Router");
};

export const CreateUserPost = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  await db.AddUser(email, name, password);
};

export const TestUserPost = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  await db.testCreateUser(email, name, password);
};
