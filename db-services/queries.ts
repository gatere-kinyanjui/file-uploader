import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function AllUsers() {
  try {
    const allUsers = await prisma.user.findMany();
    if (allUsers) {
      console.log(allUsers);
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
        email,
        name,
        password,
      },
    });
    return newUser;
  } catch (err: any) {
    console.error("Trouble creating new user!", err);
  }
}

export async function testCreateUser(
  email: string,
  name: string,
  password: string
) {
  const testNewUser = await prisma.user.create({
    data: {
      email: "test@prisma.com",
      name: "test",
      password: "12345678",
    },
  });

  return testNewUser;
}
