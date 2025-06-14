import { drizzle as neonDrizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
let driver = neonDrizzle;
if (process.env.NODE_ENV !== "production") {
  import("dotenv/config");
}
if (process.env.NODE_ENV !== "production" && process.env.DB_URL?.includes("localhost")) {
  driver = await import("drizzle-orm/node-postgres").then((module) => module.drizzle);
}
export const db = driver(process.env.DB_URL!, {
  schema,
});
