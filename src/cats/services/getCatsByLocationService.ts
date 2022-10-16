import type { PrismaClient } from "@prisma/client";

export const getCatsByLocationService = async ({ location }: { location: string }, prisma: PrismaClient) => {
  const cat = await prisma.cats.findMany({
    where: { location },
    select: { id: true, image: true, latitude: true, longitude: true, _count: { select: { likes: true } } },
    orderBy: { likes: { _count: "desc" } }
  });
  return cat;
};
