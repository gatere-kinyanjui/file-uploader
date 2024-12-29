"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const passport_1 = __importDefault(require("passport"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
exports.authRouter = express_1.default.Router();
exports.authRouter.get("/", authController_1.DisplayLoginForm);
exports.authRouter.post("/sign-up", authController_1.CreateUserPost);
exports.authRouter.post("/login", passport_1.default.authenticate("local", {
    successRedirect: "/auth/uploader",
    failureRedirect: "/auth",
}));
exports.authRouter.get("/uploader", authController_1.UploaderGet);
exports.authRouter.post("/uploader", (0, express_fileupload_1.default)({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
}), authController_1.UploaderPost);
exports.authRouter.post("/logout", authController_1.LogoutDelete);
