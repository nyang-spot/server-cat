import type { PrismaClient } from "@prisma/client";

export const getUserByEmail = async ({ email }: { email: string }, prisma: PrismaClient) => {
  const user = await prisma.users.findUnique({ where: { email } });

  return user;
};
