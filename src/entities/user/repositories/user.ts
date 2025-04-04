import { prisma } from "@/shared/lib/db";
import { UserEntity } from "../domain";
import { Prisma } from "@prisma/client";

export async function saveUser(user: UserEntity): Promise<UserEntity> {
  const result = await prisma.user.upsert({
    where: {
      id: user.id,
    },
    create: user,
    update: user,
  });
  return result;
}

export function getUser(where: Prisma.UserWhereInput) {
  return prisma.user.findFirst({ where });
}

export const userRepository = { saveUser, getUser };
