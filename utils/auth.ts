import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        const userLoginResult = await prisma.user.findUnique({
          where: {
            email: userLoginEmail,
          },
        });

        if (!userLoginResult) {
          return done(null, false, { message: "Invalid credentials!" });
        }

        if (userLoginResult.password !== userLoginPassword) {
          return done(null, false, { message: "Incorrect password!" });
        }

        return done(null, userLoginResult);
      } catch (err: any) {
        done(err);
      }
    }
  )
);

// Serialization for session handling
passport.serializeUser(
  (user: Express.User, done: (err: any, id?: number) => void) => {
    done(null, user.id);
  }
);

passport.deserializeUser(
  async (id: number, done: (err: any, user?: Express.User | false) => void) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
          id: true,
          email: true,
          name: true,
          // Don't include password in deserialized user
        },
      });

      // Handle the case where user is null
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

// Type declaration for extending Express.User
declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      name: string;
    }
  }
}
