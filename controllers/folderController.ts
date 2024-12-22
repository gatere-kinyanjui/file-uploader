import { Request, Response, NextFunction } from "express";
import * as db from "../db-services/queries";
import { PrismaClient } from "@prisma/client";

const userOwnerClient = new PrismaClient();

// creat folder
export const FolderPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// folder ownership validation
export const ValidateFolderOwnership = async (req: Request, res: Response) => {
  try {
    const ownerId = req.params.id;
    const owner = await userOwnerClient.user.findUnique({
      where: {
        id: ownerId,
      },
      include: {
        folder: true,
      },
    });

    res.status(200).json({ data: owner });
  } catch (error: any) {
    console.log("[FOLDER CONTROLLER] error: ", error);
  }
};

export const FolderGet = (req: Request, res: Response, next: NextFunction) => {
  console.log("[FOLDER CONTROLLER GET]: ", req, res);
  next();
};