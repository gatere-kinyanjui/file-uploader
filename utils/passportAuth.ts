import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

// this export RESOLVES error TS2345: Argument of type 'PrismaClient<PrismaClientOptions, never, DefaultArgs>'
// is not assignable to parameter of type 'IPrisma<"session">'.
import { PrismaClient } from "@prisma/client"; // Add this import

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
          return done(null, { message: "Invalid credentials!" });
        }

        if (userLoginResult.password !== userLoginPassword) {
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
      id: number;
      email: string;
      name: string;
    }
  }
}

passport.serializeUser((user: Express.User, done) => {
  process.nextTick(() => {
    console.log("Serialising user");
    console.log(user);

    return done(null, user.id);
  });
});

passport.deserializeUser(async (id: string, done) => {
  console.log("Deserialising user");
  console.log(id);

  try {
    const deserialisedUser = await prisma.user.findUnique({ where: { id } });
    if (!deserialisedUser) {
      throw new Error("User to deserialised not found!");
    }
    done(null, deserialisedUser);
  } catch (err: any) {
    console.log("Error deserialising: ", err);
    done(err, null);
  }
});
