import { Hono } from "hono";
import type { SessionUser } from "./auth";
import { authRoutes } from "./routes/auth";
import { docsRoutes } from "./routes/docs";
import { eventRoutes } from "./routes/events";
import { profileRoutes } from "./routes/profile";

interface SessionResponse {
  user: SessionUser;
}
const app = new Hono();

const route = app
  .basePath("/api")
  .route("/docs", docsRoutes)
  .route("/auth", authRoutes)
  .route("/profile", profileRoutes)
  .route("/events", eventRoutes);

export type AppType = typeof route;
export default app;
