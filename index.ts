import express from "express";
import path from "path";
import { userRouter } from "./routes/userRouter";
import { authRouter } from "./routes/authRouter";
import passport from "passport";
import "./utils/passportAuth";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import fileUpload from "express-fileupload";
import { prismaClientInstance } from "./db-services/prismaClientInstance";

const app = express();

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prismaClientInstance, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// passport middleware setup ( it is mandatory to put it after session middleware setup)
app.use(passport.initialize());
app.use(passport.session());

// setting local variables
// TODO: conditional check for undefined values
app.use((req, res, next) => {
  res.locals.currentUserByName = req.user?.name;

  console.log(
    "[INDEX LOCALS VARIABLE USER BY NAME]: ",
    res.locals.currentUserByName
  );

  next();
});

//routing middleware
app.use("/", userRouter);
app.use("/auth", authRouter);

app.use(fileUpload());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Uploader running on port ${PORT}`);
});
