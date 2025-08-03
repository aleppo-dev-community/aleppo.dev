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
      .select({
        eventId: events.id,
        eventRegistrationId: eventRegistrations.id,
        closeDate: events.closeDate,
        isAccepted: eventRegistrations.isAccepted,
      })
      .from(events)
      .where(eq(events.slug, eventSlug))
      .leftJoin(
        eventRegistrations,
        and(eq(eventRegistrations.eventId, events.id), eq(eventRegistrations.userId, user.id)),
      );
    const isRegistrationClosed =
      !!existingRegistration?.closeDate && existingRegistration?.closeDate < new Date();
    return c.json({
      isRegistered: !!existingRegistration?.eventRegistrationId,
      isProfileComplete: !!profile,
      isRegistrationClosed,
      eventRegistrationId:
        existingRegistration?.isAccepted && isRegistrationClosed
          ? existingRegistration?.eventRegistrationId
          : null,
    });
  })
  .post("/:eventSlug", async (c) => {
    const eventSlug = c.req.param("eventSlug");
    const user = c.get("user");

    const [details] = await db.select({}).from(userDetails).where(eq(userDetails.userId, user.id));

    if (!details) {
      return c.json({ message: "يجب إكمال الملف الشخصي أولاً" }, 401);
    }

    const [existingRegistration] = await db
      .select({
        eventId: events.id,
        eventRegistrationId: eventRegistrations.id,
        closeDate: events.closeDate,
      })
      .from(events)
      .leftJoin(
        eventRegistrations,
        and(eq(eventRegistrations.eventId, events.id), eq(eventRegistrations.userId, user.id)),
      )
      .where(and(eq(events.slug, eventSlug)));
    if (!existingRegistration) {
      return c.json({ message: "الفعالية غير موجودة" }, 404);
    }
    if (existingRegistration?.closeDate && existingRegistration.closeDate < new Date()) {
      return c.json({ message: "انتهى التسجيل لهذه الفعالية" }, 400);
    }
    if (existingRegistration?.eventRegistrationId) {
      return c.json({ message: "أنت مسجل بالفعل في هذه الفعالية" }, 400);
    }

    await db.insert(eventRegistrations).values({
      userId: user.id,
      eventId: existingRegistration.eventId,
    });

    return c.json({ message: "تم تسجيلك في الفعالية بنجاح" }, 201);
  });
