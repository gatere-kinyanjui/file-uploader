import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import bcrypt from "bcrypt";
import { prismaClientInstance } from "../db-services/prismaClientInstance";

const saltRounds = 10;

// Define the done callback type
type DoneCallback = (
  error: any,
  user?: any,
  options?: { message: string }
) => void;

passport.use(
  "local",
  new LocalStrategy(
    // FIELD NAME USED IN POST REQUEST TO LOGIN SPECIFIED HERE, BECAUSE DEFAULT 'USERNAME' IS NOT IN USE
    { usernameField: "email", passwordField: "password" },
    async (
      userLoginEmail: string,
      userLoginPassword: string,
      done: DoneCallback
    ) => {
      try {
        const userLoginResult = await prismaClientInstance.user.findUnique({
          where: {
            email: userLoginEmail,
          },
        });

        if (!userLoginResult) {
          return done(null, { message: "Invalid credentials!" });
        }

        const cryptPassword = bcrypt.compareSync(
          userLoginPassword,
          userLoginResult.password
        );

        if (!cryptPassword) {
          return done(null, { message: "Incorrect password!" });
        }

        return done(null, userLoginResult);
      } catch (err: any) {
        done(err);
      }
    }
  )
);

// // Type declaration for extending Express.User
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
    }
  }
}

passport.serializeUser((user: Express.User, done) => {
  process.nextTick(() => {
    console.log("Serialising user: ", user);

    return done(null, user.id);
  });
});

passport.deserializeUser(async (id: string, done) => {
  console.log("Deserialising user: ", id);

  try {
    const deserialisedUser = await prismaClientInstance.user.findUnique({
      where: { id },
    });
    if (!deserialisedUser) {
      throw new Error("User to deserialise not found!");
    }
    done(null, deserialisedUser);
  } catch (err: any) {
    console.log("Error deserialising: ", err);
    done(err, null);
  }
});
