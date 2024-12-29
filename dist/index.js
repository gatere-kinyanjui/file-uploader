"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const userRouter_1 = require("./routes/userRouter");
const authRouter_1 = require("./routes/authRouter");
const passport_1 = __importDefault(require("passport"));
require("./utils/passportAuth");
const express_session_1 = __importDefault(require("express-session"));
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const prismaClientInstance_1 = require("./db-services/prismaClientInstance");
const app = (0, express_1.default)();
// set view engine
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
// body parser
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new prisma_session_store_1.PrismaSessionStore(prismaClientInstance_1.prismaClientInstance, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    }),
}));
// passport middleware setup ( it is mandatory to put it after session middleware setup)
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// setting local variables
// TODO: conditional check for undefined values
app.use((req, res, next) => {
    var _a;
    res.locals.currentUserByName = (_a = req.user) === null || _a === void 0 ? void 0 : _a.name;
    console.log("[INDEX LOCALS VARIABLE USER BY NAME]: ", res.locals.currentUserByName);
    next();
});
//routing middleware
app.use("/", userRouter_1.userRouter);
app.use("/auth", authRouter_1.authRouter);
app.use((0, express_fileupload_1.default)());
app.listen(5000, () => console.log("Uploader listening on port 5000!"));
