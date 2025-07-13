import { Hono } from "hono";
import { auth } from "../../auth";

export const authRoutes = new Hono().on(["POST", "GET"], "/*", (c) => {
  // TODO add openapi docs
  return auth.handler(c.req.raw);
});
