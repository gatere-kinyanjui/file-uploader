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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prismaClientInstance_1 = require("../db-services/prismaClientInstance");
const saltRounds = 10;
passport_1.default.use("local", new passport_local_1.Strategy(
// FIELD NAME USED IN POST REQUEST TO LOGIN SPECIFIED HERE, BECAUSE DEFAULT 'USERNAME' IS NOT IN USE
{ usernameField: "email", passwordField: "password" }, (userLoginEmail, userLoginPassword, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userLoginResult = yield prismaClientInstance_1.prismaClientInstance.user.findUnique({
            where: {
                email: userLoginEmail,
            },
        });
        if (!userLoginResult) {
            return done(null, { message: "Invalid credentials!" });
        }
        const cryptPassword = bcrypt_1.default.compareSync(userLoginPassword, userLoginResult.password);
        if (!cryptPassword) {
            return done(null, { message: "Incorrect password!" });
        }
        return done(null, userLoginResult);
    }
    catch (err) {
        done(err);
    }
})));
passport_1.default.serializeUser((user, done) => {
    process.nextTick(() => {
        console.log("Serialising user: ", user);
        return done(null, user.id);
    });
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Deserialising user: ", id);
    try {
        const deserialisedUser = yield prismaClientInstance_1.prismaClientInstance.user.findUnique({
            where: { id },
        });
        if (!deserialisedUser) {
            throw new Error("User to deserialise not found!");
        }
        done(null, deserialisedUser);
    }
    catch (err) {
        console.log("Error deserialising: ", err);
        done(err, null);
    }
}));
