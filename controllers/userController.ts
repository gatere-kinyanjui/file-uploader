import { Request, Response } from "express";

export const GetUser = (req: Request, res: Response) => {
  res.render("pages/index");

  console.log("Live from User Router");
};
