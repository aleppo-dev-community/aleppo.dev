import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { authMiddleware } from "../../auth/middleware";
import { db } from "../../database";
import { eventRegistrations, events, userDetails } from "../../database/schema";
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
  .get("/dashboard", async (c) => {
    const user = c.get("user");
    const [details] = await db
      .select({ fullName: userDetails.fullName })
      .from(userDetails)
      .where(eq(userDetails.userId, user.id));
    const userRegistrations = await db
      .select({
        eventSlug: events.slug,
        registeredAt: eventRegistrations.registeredAt,
        cancelledAt: eventRegistrations.cancelledAt,
        closeDate: events.closeDate,
        didAttend: eventRegistrations.didAttend,
      })
      .from(eventRegistrations)
      .innerJoin(events, eq(eventRegistrations.eventId, events.id))
      .where(eq(eventRegistrations.userId, user.id));

    const now = new Date();
    const totalRegistrations = userRegistrations.filter((r) => !r.cancelledAt).length;
    const attendedRegistrations = userRegistrations.filter((r) => r.didAttend);

    const activeRegistrations = userRegistrations
      .filter((r) => {
        if (r.cancelledAt) return false;
        if (!r.closeDate) return true;
        return new Date(r.closeDate) > now;
      })
      .map(({ eventSlug }) => ({ eventSlug }));

    return c.json({
      registrations: userRegistrations,
      userDetails: details,
      totalRegistrations,
      activeRegistrations,
      attendedRegistrations,
    });
  })
  .post("/", zValidator("json", userDetailsSchema), async (c) => {
    const body = c.req.valid("json");
    await db
      .insert(userDetails)
      .values({
        userId: c.get("user").id,
        ...body,
      })
      .onConflictDoUpdate({
        target: userDetails.userId,
        set: body,
      });

    return c.json({ message: "تم تحديث الملف الشخصي بنجاح" }, 201);
  });
