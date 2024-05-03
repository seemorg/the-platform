import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { env } from "@/env";

export let db: PrismaClient;

if (env.NODE_ENV === "development" && env.DATABASE_URL.includes("localhost")) {
  // we're not using neon
  db = new PrismaClient();
} else {
  const pool = new Pool({ connectionString: env.DATABASE_URL });
  const adapter = new PrismaNeon(pool);

  db = new PrismaClient({ adapter });
}
