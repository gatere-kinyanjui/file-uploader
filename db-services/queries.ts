import { prismaClientInstance } from "./prismaClientInstance";

export async function AllUsers() {
  try {
    const allUsers = await prismaClientInstance.user.findMany();
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
    const newUser = await prismaClientInstance.user.create({
      data: {
        email: email,
        name: name,
        password: password,
      },
    });
    // console.log("[QUERIES]: ", newUser.id);

    return newUser;
  } catch (err: any) {
    console.error("Trouble adding new user!", err);
  }
}

export async function LoginUser(email: string, password: string) {
  try {
    const userToLogin = await prismaClientInstance.user.findUnique({
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
