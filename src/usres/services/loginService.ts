import { type PrismaClient } from "@prisma/client";

export const loginService = async ({ name }: { name: string }, prisma: PrismaClient) => {
  const user = await prisma.users.create({ data: { name } });
  // const user = await prisma.users.findFirst({ where: { name } });

  return user;
};
