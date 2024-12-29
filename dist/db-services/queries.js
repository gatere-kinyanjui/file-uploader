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
exports.AllUsers = AllUsers;
exports.AddUser = AddUser;
exports.LoginUser = LoginUser;
const prismaClientInstance_1 = require("./prismaClientInstance");
function AllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield prismaClientInstance_1.prismaClientInstance.user.findMany();
            if (allUsers) {
            }
            else {
                console.log("No users were found.");
            }
            return allUsers;
        }
        catch (err) {
            console.error("Smh...trouble reading users", err);
            throw err;
        }
    });
}
function AddUser(email, name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield prismaClientInstance_1.prismaClientInstance.user.create({
                data: {
                    email: email,
                    name: name,
                    password: password,
                },
            });
            // console.log("[QUERIES]: ", newUser.id);
            return newUser;
        }
        catch (err) {
            console.error("Trouble adding new user!", err);
        }
    });
}
function LoginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userToLogin = yield prismaClientInstance_1.prismaClientInstance.user.findUnique({
                where: {
                    email: email,
                    password: password,
                },
            });
            return userToLogin;
        }
        catch (err) {
            console.error("Trouble logging in user: ", err);
        }
    });
}
