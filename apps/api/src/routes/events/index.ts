import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { authMiddleware } from "../../auth/middleware";
import { db } from "../../database";
import { eventRegistrations, events, userDetails } from "../../database/schema";

export const eventRoutes = new Hono()
  .use(authMiddleware(["user"]))
  .get("/:eventSlug/status", async (c) => {
    const eventSlug = c.req.param("eventSlug");
    const user = c.get("user");
    const [profile] = await db.select({}).from(userDetails).where(eq(userDetails.userId, user.id));

    const [existingRegistration] = await db
      .select({})
      .from(eventRegistrations)
      .innerJoin(events, eq(eventRegistrations.eventId, events.id))
      .where(and(eq(eventRegistrations.userId, user.id), eq(events.slug, eventSlug)));

    return c.json({
      isRegistered: !!existingRegistration,
      isProfileComplete: !!profile,
    });
  })
  .post("/:eventSlug", async (c) => {
    const eventSlug = c.req.param("eventSlug");
    const user = c.get("user");

    const [details] = await db.select({}).from(userDetails).where(eq(userDetails.userId, user.id));

    if (!details) {
      return c.json({ message: "يجب إكمال الملف الشخصي أولاً" }, 401);
    }

    const existingRegistration = await db
      .select({
        eventId: events.id,
        eventRegistrationId: eventRegistrations.id,
      })
      .from(events)
      .leftJoin(
        eventRegistrations,
        and(eq(eventRegistrations.eventId, events.id), eq(eventRegistrations.userId, user.id)),
      )
      .where(and(eq(events.slug, eventSlug)));
    if (!existingRegistration[0]) {
      return c.json({ message: "الفعالية غير موجودة" }, 404);
    }
    if (existingRegistration[0]?.eventRegistrationId) {
      return c.json({ message: "أنت مسجل بالفعل في هذه الفعالية" }, 400);
    }

    await db.insert(eventRegistrations).values({
      userId: user.id,
      eventId: existingRegistration[0].eventId,
    });

    return c.json({ message: "تم تسجيلك في الفعالية بنجاح" }, 201);
  });
