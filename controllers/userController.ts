import { Request, Response } from "express";

import * as db from "../db-services/queries";

export const HomePageGet = (req: Request, res: Response) => {
  res.render("pages/index");

  console.log("Live from User Router");
};

export const AllUsersGet = async (req: Request, res: Response) => {
  try {
    const allUsers = await db.AllUsers();

    // EITHER
    res.json(allUsers);

    // OR
    // res.render("pages/index", { users: allUsers });

    console.log("Users retrieved: ", allUsers);
  } catch (err: any) {
    console.error("Error fetching users", err);
    // res.status(500).json({ error: "Failed to fetch users" });
  }
};
