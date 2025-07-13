import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { authMiddleware } from "../../auth/middleware";
import { db } from "../../database";
import { userDetails } from "../../database/schema";
import { userDetailsSchema } from "./dto/user-details";

export const profileRoutes = new Hono()
  .use(authMiddleware())
  .get("/status", async (c) => {
    const [details] = await db
      .select({})
      .from(userDetails)
      .where(eq(userDetails.userId, c.get("user").id));

    return c.json({
      isProfileComplete: !!details,
    });
  })
  .post("/", zValidator("json", userDetailsSchema), async (c) => {
    const body = c.req.valid("json");
    await db
      .insert(userDetails)
      .values({
        userId: c.get("user").id,
        ...body,
        dateOfBirth: new Date(body.dateOfBirth).toISOString(),
      })
      .onConflictDoUpdate({
        target: userDetails.userId,
        set: {
          ...body,
          dateOfBirth: new Date(body.dateOfBirth).toISOString(),
        },
      });

    return c.json({ message: "تم تحديث الملف الشخصي بنجاح" }, 201);
  });
