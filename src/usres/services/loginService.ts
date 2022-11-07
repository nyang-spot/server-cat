import { type PrismaClient } from "@prisma/client";

/**
 * @depreated Use auth/routes
 */
export const loginService = async ({ email, name, location }: { email: string; name: string; location: string }, prisma: PrismaClient) => {
  // const email = "test@gmail.com";
  const user = await prisma.users.create({ data: { name, location, email }, select: { id: true, name: true, location: true } });

  return user;
};
