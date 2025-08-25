import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { authMiddleware } from "../../auth/middleware";
import { db } from "../../database";
import { eventRegistrations, events, userDetails } from "../../database/schema";
import { registerEventSchema } from "./dto/event-registration";

export const eventRoutes = new Hono()
  .use(authMiddleware(["user"]))
  // TODO make status type safe
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
        cancelledAt: eventRegistrations.cancelledAt,
      })
      .from(events)
      .where(eq(events.slug, eventSlug))
      .leftJoin(
        eventRegistrations,
        and(eq(eventRegistrations.eventId, events.id), eq(eventRegistrations.userId, user.id)),
      );
    const isRegistrationClosed =
      !!existingRegistration?.closeDate && existingRegistration?.closeDate < new Date();
    const isCancelled = !!existingRegistration?.cancelledAt;
    const isRegistered = !!existingRegistration?.eventRegistrationId && !isCancelled;
    const isAccepted = isRegistrationClosed && existingRegistration?.isAccepted;
    const isNotAccepted = isRegistrationClosed && existingRegistration?.isAccepted === false;
    if (!profile && !isRegistrationClosed) {
      return c.json({ status: "PROFILE_INCOMPLETE", eventRegistrationId: null });
    }
    if (isCancelled) {
      return c.json({ status: "CANCELLED", eventRegistrationId: null });
    }
    if (isAccepted) {
      return c.json({
        status: "ACCEPTED",
        eventRegistrationId: existingRegistration.eventRegistrationId,
      });
    }
    if (isNotAccepted) {
      return c.json({
        status: "NOT_ACCEPTED",
        eventRegistrationId: null,
      });
    }
    if (isRegistrationClosed && isRegistered) {
      return c.json({
        status: "PENDING_ACCEPTANCE",
        eventRegistrationId: null,
      });
    }
    if (isRegistered) {
      return c.json({
        status: "REGISTERED",
        eventRegistrationId: null,
      });
    }

    if (isRegistrationClosed) {
      return c.json({ status: "REGISTRATION_CLOSED", eventRegistrationId: null });
    }

    return c.json({ status: "NOT_REGISTERED", eventRegistrationId: null });
  })
  .post("/:eventSlug", zValidator("json", registerEventSchema), async (c) => {
    const eventSlug = c.req.param("eventSlug");
    const user = c.get("user");
    const { attendanceCertainty } = c.req.valid("json");

    const [details] = await db.select({}).from(userDetails).where(eq(userDetails.userId, user.id));

    if (!details) {
      return c.json({ message: "يجب إكمال الملف الشخصي أولاً" }, 401);
    }

    const [existingRegistration] = await db
      .select({
        eventId: events.id,
        eventRegistrationId: eventRegistrations.id,
        closeDate: events.closeDate,
        cancelledAt: eventRegistrations.cancelledAt,
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
    if (existingRegistration?.eventRegistrationId && !existingRegistration?.cancelledAt) {
      return c.json({ message: "أنت مسجل بالفعل في هذه الفعالية" }, 400);
    }

    if (existingRegistration?.eventRegistrationId && existingRegistration?.cancelledAt) {
      return c.json({ message: "لا يمكنك تسجيل حضورك بعد الإلغاء" }, 400);
    }

    await db.insert(eventRegistrations).values({
      userId: user.id,
      eventId: existingRegistration.eventId,
      attendanceCertainty,
    });

    return c.json({ message: "تم تسجيلك في الفعالية بنجاح" }, 201);
  })
  .delete("/:eventSlug", async (c) => {
    const eventSlug = c.req.param("eventSlug");
    const user = c.get("user");

    const [existingRegistration] = await db
      .select({
        eventId: events.id,
        eventRegistrationId: eventRegistrations.id,
        closeDate: events.closeDate,
        cancelledAt: eventRegistrations.cancelledAt,
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
    if (!existingRegistration.eventRegistrationId) {
      return c.json({ message: "أنت غير مسجل في هذه الفعالية" }, 400);
    }
    if (existingRegistration.cancelledAt) {
      return c.json({ message: "تم إلغاء التسجيل بالفعل" }, 400);
    }
    if (existingRegistration?.closeDate && existingRegistration.closeDate < new Date()) {
      return c.json({ message: "لا يمكن الإلغاء بعد انتهاء فترة التسجيل" }, 400);
    }

    await db
      .update(eventRegistrations)
      .set({ cancelledAt: new Date() })
      .where(eq(eventRegistrations.id, existingRegistration.eventRegistrationId));

    return c.json({ message: "تم إلغاء التسجيل بنجاح" }, 200);
  });
