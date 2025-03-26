import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const user1 = await prisma.user.create({
    data: {
      login: "user-1",
      passwordHash: "asdasdasddsasd",
      rating: 1000,
    },
  });
  const user2 = await prisma.user.create({
    data: {
      login: "user-2",
      passwordHash: "asdasdasddsasd",
      rating: 600,
    },
  });
  await prisma.game.create({
    data: {
      field: Array(9).fill(null),
      players: {
        connect: {
          id: user1.id,
        },
      },
      status: "idle",
    },
  });
  await prisma.game.create({
    data: {
      field: Array(9).fill(null),
      players: {
        connect: {
          id: user2.id,
        },
      },
      status: "idle",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
