import { config } from "./env.config.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaMariaDb({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });
