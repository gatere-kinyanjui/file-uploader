import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function AllUsers() {
  try {
    const allUsers = await prisma.user.findMany();
    if (allUsers) {
    } else {
      console.log("No users were found.");
    }
    return allUsers;
  } catch (err: any) {
    console.error("Smh...trouble reading users", err);
    throw err;
  }
}

export async function AddUser(email: string, name: string, password: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password,
      },
    });

    return newUser;
  } catch (err: any) {
    console.error("Trouble adding new user!", err);
  }
}

export async function LoginUser(email: string, password: string) {
  try {
    const userToLogin = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    return userToLogin;
  } catch (err: any) {
    console.error("Trouble logging in user: ", err);
  }
}
