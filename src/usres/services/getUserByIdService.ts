import type { PrismaClient } from "@prisma/client";

export const getUserByIdService = async ({ id }: { id: number }, prisma: PrismaClient) => {
  const user = await prisma.users.findUnique({ where: { id } });

  return user;
};
