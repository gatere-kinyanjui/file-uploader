import express from "express";
import path from "path";

import { userRouter } from "./routes/userRouter";
import { authRouter } from "./routes/authRouter";
import passport from "passport";

import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// passport middleware setup ( it is mandatory to put it after session middleware setup)
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.user);
//   console.log(req.session);
//   next();
// });

//routing middleware
app.use("/", userRouter);
app.use("/auth", authRouter);

app.listen(5000, () => console.log("Uploader listening on port 5000!"));
