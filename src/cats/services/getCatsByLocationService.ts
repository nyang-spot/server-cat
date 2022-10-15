import type { PrismaClient } from "@prisma/client";

export const getCatsByLocationService = async ({ location }: { location: string }, prisma: PrismaClient) => {
  const cats = await prisma.cats.findMany({ where: { location }, select: { id: true, latitude: true, longitude: true } });
  return cats;
};
