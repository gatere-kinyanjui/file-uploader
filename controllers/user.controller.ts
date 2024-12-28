import { Request, Response } from "express";
import * as db from "../db-services/queries";
import { prismaClientInstance } from "../db-services/prismaClientInstance";

export const HomePageGet = (req: Request, res: Response) => {
  res.render("pages/index");

  console.log("Live from User Router");
};

// get all users
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

//get user by id
export const UserByIdGet = async (req: Request, res: Response) => {
  try {
    const ownerId = req.params.id;
    const owner = await prismaClientInstance.user.findUnique({
      where: {
        id: ownerId,
      },
      include: {
        folder: true,
      },
    });
    console.log("Users retrieved by id: ", owner);

    res.status(200).json({ data: owner });
  } catch (error: any) {
    console.log("[USER CONTROLLER] error: ", error);
  }
};
