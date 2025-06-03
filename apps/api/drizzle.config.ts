import { defineConfig } from "drizzle-kit";
const isNeon = process.env.DB_URL?.includes("neon");

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    ssl: isNeon ? "require" : false,
    database: "adc",
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  },
});
