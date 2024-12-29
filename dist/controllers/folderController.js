"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderGet = exports.ValidateFolderOwnership = exports.FolderPost = void 0;
const prismaClientInstance_1 = require("../db-services/prismaClientInstance");
// create folder
const FolderPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.FolderPost = FolderPost;
// folder ownership validation
const ValidateFolderOwnership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ownerId = req.params.id;
        const owner = yield prismaClientInstance_1.prismaClientInstance.user.findUnique({
            where: {
                id: ownerId,
            },
            include: {
                folder: true,
            },
        });
        res.status(200).json({ data: owner });
    }
    catch (error) {
        console.log("[FOLDER CONTROLLER] error: ", error);
    }
});
exports.ValidateFolderOwnership = ValidateFolderOwnership;
const FolderGet = (req, res, next) => {
    console.log("[FOLDER CONTROLLER GET]: ", req, res);
    next();
};
exports.FolderGet = FolderGet;
