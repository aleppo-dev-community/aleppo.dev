import { zValidator } from "@hono/zod-validator";
import { and, eq, or, sql } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../../auth/middleware";
import { db } from "../../database";
import { eventRegistrations, events, friends, userDetails } from "../../database/schema";
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
  .get("/", async (c) => {
    const user = c.get("user");
    const [details] = await db
      .select({
        fullName: userDetails.fullName,
        phone: userDetails.phone,
        telegramId: userDetails.telegramId,
        yearOfBirth: userDetails.yearOfBirth,
        faculty: userDetails.faculty,
        specialization: userDetails.specialization,
        yearsOfExperience: userDetails.yearsOfExperience,
        linkedinUrl: userDetails.linkedinUrl,
        githubUrl: userDetails.githubUrl,
        websiteUrl: userDetails.websiteUrl,
      })
      .from(userDetails)
      .where(eq(userDetails.userId, user.id));

    return c.json(details || null);
  })
  .get("/dashboard", async (c) => {
    const user = c.get("user");
    const [details] = await db
      .select({
        fullName: userDetails.fullName,
        linkedinUrl: userDetails.linkedinUrl,
        telegramId: userDetails.telegramId,
        githubUrl: userDetails.githubUrl,
        websiteUrl: userDetails.websiteUrl,
      })
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
      userId: user.id,
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
  })
  .post(
    "/friends",
    zValidator(
      "json",
      z.object({
        friendId: z.string().min(1),
      }),
    ),
    async (c) => {
      const user = c.get("user");
      const { friendId } = c.req.valid("json");

      if (user.id === friendId) {
        return c.json({ error: "لا يمكنك إضافة نفسك كصديق" }, 400);
      }

      const existingFriend = await db
        .select()
        .from(friends)
        .where(
          or(
            and(eq(friends.userId, user.id), eq(friends.friendId, friendId)),
            and(eq(friends.userId, friendId), eq(friends.friendId, user.id)),
          ),
        )
        .limit(1);

      if (existingFriend.length > 0) {
        return c.json({ error: "هذا المستخدم موجود بالفعل في قائمة أصدقائك" }, 400);
      }

      await db.insert(friends).values({
        userId: user.id,
        friendId: friendId,
      });

      return c.json({ message: "تم إضافة الصديق بنجاح" }, 201);
    },
  )
  .get("/friends", async (c) => {
    const user = c.get("user");

    const userFriends = await db
      .select({
        fullName: userDetails.fullName,
        linkedinUrl: userDetails.linkedinUrl,
        telegramId: userDetails.telegramId,
        githubUrl: userDetails.githubUrl,
        websiteUrl: userDetails.websiteUrl,
        specialization: userDetails.specialization,
        faculty: userDetails.faculty,
        yearsOfExperience: userDetails.yearsOfExperience,
      })
      .from(friends)
      .innerJoin(
        userDetails,
        sql`${userDetails.userId} = CASE
          WHEN ${friends.userId} = ${sql.raw(`'${user.id}'`)} THEN ${friends.friendId}
          WHEN ${friends.friendId} = ${sql.raw(`'${user.id}'`)} THEN ${friends.userId}
        END`,
      )
      .where(or(eq(friends.userId, user.id), eq(friends.friendId, user.id)));

    return c.json(userFriends);
  });
