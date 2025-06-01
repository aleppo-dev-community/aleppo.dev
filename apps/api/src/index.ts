import { Hono } from "hono";

const app = new Hono();

const route = app.basePath("/api").get("/", (c) => {
  return c.json({ message: "Hello!" });
});

export type AppType = typeof route;
export default app;
