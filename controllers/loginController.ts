import express, { Request, Response } from "express";

export const DisplayLoginForm = (req: Request, res: Response) => {
  res.render("pages/login");

  console.log("Live from Login Router");
};

export const Login = (req: Request, res: Response) => {
  res.redirect("/");
};
