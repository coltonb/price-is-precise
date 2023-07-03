import { PrismaClient } from "@prisma/client";

declare global {
  /* eslint no-var: off */
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
