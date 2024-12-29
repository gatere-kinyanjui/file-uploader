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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutDelete = exports.UploaderPost = exports.UploaderPostBasic = exports.UploaderGet = exports.LoginUserGet = exports.CreateUserPost = exports.DisplayLoginForm = void 0;
const db = __importStar(require("../db-services/queries"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const DisplayLoginForm = (req, res) => {
    res.render("pages/authentication");
    console.log("Live from Auth Router", req.user);
};
exports.DisplayLoginForm = DisplayLoginForm;
// hashing password
const CreateUserPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // arguments' names consistent with query's names
    const { email, name, password } = req.body;
    console.log("[CONTROLLER] body: ", req.body);
    const saltRounds = 10;
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const hash = bcrypt_1.default.hashSync(password, salt);
    // Store hash in your password DB.
    const createdUser = yield db.AddUser(email, name, hash);
    console.log("[CONTROLLER] created user: ", createdUser);
    res.redirect("/auth");
});
exports.CreateUserPost = CreateUserPost;
const LoginUserGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const loggedInUser = yield db.LoginUser(email, password);
    console.log("[CONTROLLER] logged in user: ", loggedInUser);
    res.redirect("/auth");
});
exports.LoginUserGet = LoginUserGet;
const UploaderGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.isAuthenticated()) {
        res.render("pages/uploader", { user: req.user });
    }
    else {
        res.render("pages/authentication");
    }
});
exports.UploaderGet = UploaderGet;
// handling file upload as usual
const UploaderPostBasic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send("No file was selected!");
    }
    else {
        const uploadedFile = req.files.sampleFile;
        console.log("[CONTROLLER UPLOAD POST]: ", uploadedFile);
        res.json(uploadedFile);
    }
});
exports.UploaderPostBasic = UploaderPostBasic;
// handling the file upload as an object or array
const UploaderPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send("No file was selected!");
            return;
        }
        const sampleFile = req.files.sampleFile;
        if (Array.isArray(sampleFile)) {
            // Handle multiple files (array of UploadedFile)
            console.log("[CONTROLLER UPLOAD POST]: Multiple files uploaded");
            sampleFile.forEach((file) => {
                console.log("File name: ", file.name);
            });
            res.json(sampleFile);
        }
        else {
            // Handle single file (UploadedFile)
            console.log("[CONTROLLER UPLOAD POST]: Single file uploaded");
            console.log("File name: ", sampleFile.name);
            res.json(sampleFile);
        }
    }
    catch (error) {
        console.error("[CONTROLLER UPLOAD POST]: ", error);
        next(error);
    }
});
exports.UploaderPost = UploaderPost;
const LogoutDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        console.log(`User logged out successfully!`, req.user);
        res.redirect("/auth");
    });
});
exports.LogoutDelete = LogoutDelete;
