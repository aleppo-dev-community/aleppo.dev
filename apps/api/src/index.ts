import { Hono } from "hono";
import { auth } from "./auth";
const app = new Hono();

const route = app
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .get("/", (c) => {
    return c.json({ message: "Hello!" });
  });

export type AppType = typeof route;
export default app;
