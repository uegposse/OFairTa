import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const accessLevelData: Prisma.AccessLevelCreateInput[] = [
  {
    name: "Comprador",
  },
  {
    name: "Vendedor",
  },
  {
    name: "adm",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const access of accessLevelData) {
    const accessLevel = await prisma.accessLevel.create({
      data: access,
    });
    console.log(`Created user with id: ${accessLevel.name}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
