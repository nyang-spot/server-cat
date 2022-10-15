import { type PrismaClient } from "@prisma/client";

export const loginService = async ({ name, location }: { name: string; location: string }, prisma: PrismaClient) => {
  const user = await prisma.users.create({ data: { name, location } });
  // const user = await prisma.users.findFirst({ where: { name } });

  return user;
};
