import { type PrismaClient } from "@prisma/client";

export const createUserService = async ({ location, name, email }: { location: string; name: string; email: string }, prisma: PrismaClient) => {
  const user = await prisma.users.create({ data: { location, name, email }, select: { id: true, name: true, email: true, location: true } });

  return user;
};
