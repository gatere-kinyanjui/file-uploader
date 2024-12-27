import express from "express";
import { Router } from "express";
import { FolderGet, FolderPost } from "../controllers/folderController";

const folderRouter: Router = express.Router();

folderRouter.post("/", FolderPost);

folderRouter.get("/", FolderGet);
