import { HOST, PORT } from "../config";
import prisma from "./index";

if (require.main === module) {
  (async () => {
    const user = await prisma.users.create({
      data: {
        name: "test-user-2",
        location: "gannamgu"
      }
    });
    const dataArr = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      const imageUrl = `${HOST}:${PORT}/${i}.jpg`;

      dataArr.push({
        description: `seed-${i}`,
        location: user.location,
        image: imageUrl,
        latitude: 37.496486063,
        longitude: 127.028361548,
        authorId: user.id
      });
    }
    const cats = await prisma.cats.createMany({
      data: [...dataArr]
    });

    await prisma.likes.create({
      data: { userId: user.id, catId: 1 }
    });

    console.log("cats :", cats);
  })();
}
