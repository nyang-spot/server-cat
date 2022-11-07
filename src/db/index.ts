import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export default Prisma;

if (require.main === module) {
  (async () => {
    await Prisma.users.create({
      data: {
        name: "Im-JJang-goyangE",
        location: "gannamgu",
        email: "test@gmail.com"
      }
    });
    const users = await Prisma.users.findMany({});

    console.log("users :", users);
  })();
}
