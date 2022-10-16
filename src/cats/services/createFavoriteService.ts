import type { PrismaClient } from "@prisma/client";

export const createFavoriteService = async ({ userId, catId }: { userId: number; catId: number }, prisma: PrismaClient) => {
  const favorites = await prisma.likes.create({
    data: { userId, catId }
  });
  return favorites;
};
