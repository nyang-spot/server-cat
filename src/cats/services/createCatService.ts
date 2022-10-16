// import type { PrismaClient } from "@prisma/client";
import { HOST, PORT } from "../../config";
import prisma from "../../db";

export const createCatService = async (
  userInfo: { id: number },
  catInfo: { description: string; location: string; latitude: number; longitude: number; fileName: string }
) => {
  // 1. imageUrl 생성
  const imageUrl = `${HOST}:${PORT}/${catInfo.fileName}`;

  // 2. 고양이 생성
  const cat = prisma.cats.create({
    data: {
      description: catInfo.description,
      location: catInfo.location,
      latitude: catInfo.latitude,
      longitude: catInfo.longitude,
      image: imageUrl,
      authorId: userInfo.id
    }
  });
  return cat;
};
