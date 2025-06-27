import { Hono } from "hono";
import type { SessionUser } from "./auth";
import { auth } from "./auth";

interface SessionResponse {
  user: SessionUser;
}

const app = new Hono();

const route = app
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .post("/api/profile", async (c) => {
    // TODO
  })
  .get("/", (c) => {
    return c.json({ message: "Hello!" });
  });

export type AppType = typeof route;
export default app;
