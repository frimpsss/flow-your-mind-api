import { PrismaClient } from "@prisma/client";
import n from "nanoid";

export const dburl =
  process.env.NODE_ENV == "development"
    ? process.env.DATABASE_URL
    : process.env.PROD_DATABASE_URL;

export const prisma = new PrismaClient();
// generate message id
const generateId = () => n.nanoid(5);

prisma.$use(async (params, next) => {
  if (params.model === "Question" && params.action === "create") {
    params.args.data.id = generateId();
  }
  return next(params);
});
