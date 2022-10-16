import type { PrismaClient } from "@prisma/client";

export const getCatByIdService = async ({ id, catId, location }: { id: number; catId: number; location: string }, prisma: PrismaClient) => {
  const cat = await prisma.cats.findFirst({ where: { id: catId, location }, select: { id: true, description: true, image: true, location: true } });
  // 좋아요 수, 내가 좋아요 했는지.
  const likes = await prisma.likes.count({ where: { userId: id, catId } });
  const myLike = await prisma.likes.findUnique({ where: { userId_catId: { userId: id, catId } } });
  return cat && { ...cat, likes, ...(myLike && { isLiked: true }) };
};
