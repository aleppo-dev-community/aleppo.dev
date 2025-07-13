import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";

export const docsRoutes = new Hono().get("/ui", swaggerUI({ url: "/api/docs" }));
