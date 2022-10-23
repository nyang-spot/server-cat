import prisma from "./index";

if (require.main === module) {
  (async () => {
    const user = await prisma.users.create({
      data: {
        email: "test@gmail.com",
        name: "test user",
        location: "gannamgu"
      }
    });
    const cats = await prisma.cats.createMany({
      data: [
        {
          description: "seed 1",
          location: user.location!,
          image: "이미지파일?",
          latitude: 10,
          longitude: 10,
          authorId: user.id
        }
      ]
    });

    await prisma.likes.create({
      data: { userId: user.id, catId: 1 }
    });

    console.log("cats :", cats);
  })();
}
