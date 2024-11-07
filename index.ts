import express from "express";
import path from "path";

import { userRouter } from "./routes/userRouter";
import { authRouter } from "./routes/authRouter";
import passport, { use } from "passport";

import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
// import { PrismaClient } from "@prisma/client";

// this export RESOLVES error TS2345: Argument of type 'PrismaClient<PrismaClientOptions, never, DefaultArgs>'
// is not assignable to parameter of type 'IPrisma<"session">'.
const PrismaClient = require("@prisma/client").PrismaClient; // Add this import

const app = express();

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routing middleware
app.use("/", userRouter);
app.use("/auth", authRouter);

// passport middleware setup ( it is mandatory to put it after session middleware setup)
app.use(passport.initialize());

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.session());

// TODO: DEBUGGING SERIALISATION AND SESSIONS
// passport.serializeUser((user, done) => {
//   process.nextTick(() => {
//     console.log("Serialising user");
//     console.log(user);

//     return done(null, user.id);
//   });
// });

// passport.deserializeUser(async (id, done) => {
//   console.log("deserialisig user");
//   console.log(id);

//   try {
//     const deserialisedUser = await PrismaClient.findUnique(id);
//     if (!deserialisedUser) {
//       throw new Error("User to deserialised not found!");
//     }
//     done(null, deserialisedUser);
//   } catch (err: any) {
//     console.log("Error deserialsing: ", err);
//     done(err, null);
//   }
// });

app.listen(5000, () => console.log("Uploader listening on port 5000!"));
