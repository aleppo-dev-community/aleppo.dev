import "dotenv/config";
import { drizzle as neonDrizzle } from "drizzle-orm/neon-serverless";
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const isNeon = process.env.DB_URL?.includes("neon");

export const db = isNeon
  ? neonDrizzle(process.env.DB_URL!, {
      schema,
    })
  : pgDrizzle(process.env.DB_URL!, {
      schema,
    });
