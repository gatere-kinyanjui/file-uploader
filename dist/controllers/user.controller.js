"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.UserByIdGet = exports.AllUsersGet = exports.HomePageGet = void 0;
const db = __importStar(require("../db-services/queries"));
const prismaClientInstance_1 = require("../db-services/prismaClientInstance");
const HomePageGet = (req, res) => {
    res.render("pages/index");
    console.log("Live from User Router");
};
exports.HomePageGet = HomePageGet;
// get all users
const AllUsersGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield db.AllUsers();
        // EITHER
        res.json(allUsers);
        // OR
        // res.render("pages/index", { users: allUsers });
        console.log("Users retrieved: ", allUsers);
    }
    catch (err) {
        console.error("Error fetching users", err);
        // res.status(500).json({ error: "Failed to fetch users" });
    }
});
exports.AllUsersGet = AllUsersGet;
//get user by id
const UserByIdGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log("Users retrieved by id: ", owner);
        res.status(200).json({ data: owner });
    }
    catch (error) {
        console.log("[USER CONTROLLER] error: ", error);
    }
});
exports.UserByIdGet = UserByIdGet;
