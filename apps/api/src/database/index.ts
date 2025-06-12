import { drizzle as neonDrizzle } from "drizzle-orm/neon-serverless";
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

if (process.env.NODE_ENV !== "production") {
  import("dotenv/config");
}
const isLocal = !process.env.DB_URL?.includes("neon");

export const db = isLocal
  ? pgDrizzle(process.env.DB_URL!, {
      schema,
    })
  : neonDrizzle(process.env.DB_URL!, {
      schema,
    });
