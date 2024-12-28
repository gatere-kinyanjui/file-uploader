import { prismaClientInstance } from "../db-services/prismaClientInstance";
// import { faker } from "@faker-js/faker";

async function main() {
  const alice = await prismaClientInstance.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "alice",
      password: "12345678",
    },
  });

  const bob = await prismaClientInstance.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "bob",
      password: "12345678",
    },
  });

  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prismaClientInstance.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClientInstance.$disconnect();
    process.exit(1);
  });
