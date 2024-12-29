"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const folderController_1 = require("../controllers/folderController");
const folderRouter = express_1.default.Router();
folderRouter.post("/", folderController_1.FolderPost);
folderRouter.get("/", folderController_1.FolderGet);
