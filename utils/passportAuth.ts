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
          return done(null, null, { message: "Invalid credentials!" });
        }

        if (userLoginResult.password !== userLoginPassword) {
          return done(null, null, { message: "Incorrect password!" });
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
    process.nextTick(() => {
      console.log("Seriealising from auth.ts");
      console.log(user);

      done(null, user.id);
    });
  }
);

passport.deserializeUser(
  async (id: number, done: (err: any, user?: Express.User | null) => void) => {
    console.log("Deserialising from auth.ts");
    console.log(id);

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
        throw new Error("User to deserialise from auth.ts not found.");
      }
      done(null, user);
    } catch (err: any) {
      console.log("Error deserialising from auth.ts: ", err);

      done(err, null);
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
