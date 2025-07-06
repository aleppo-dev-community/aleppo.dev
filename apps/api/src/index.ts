// apps/api/src/index.ts

import { Hono } from "hono";
import type { SessionUser } from "./auth";
import { auth } from "./auth";
import { db } from './database';
import { userDetails, event, registration, zodUserDetails } from './database/schema'
import { and, eq } from "drizzle-orm";
import { swaggerUI } from "@hono/swagger-ui";
import { user } from './database/auth-schema';
import { openApiDoc } from "./constants/open-api-doc";

interface SessionResponse {
  user: SessionUser;
}

const app = new Hono();

const route = app
  .basePath("/api")
  .get("/doc", (c) => c.json(openApiDoc))
  .get('/ui', swaggerUI({ url: '/api/doc' }))
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .get("/events", async (c) => {
    const session = await auth.api.getSession(c.req.raw);
    const userId = session?.user.id;

    try {
      const now = new Date(); // Get the current date and time

      // Fetch all events
      const allEvents = await db.select().from(event);

      // Separate events into upcoming and recent
      const upcomingEvents = allEvents.filter((e) => new Date(e.date) > now);
      const recentEvents = allEvents.filter((e) => new Date(e.date) <= now);

      // If no user is logged in, mark all upcoming events as unregistered
      if (!userId) {
        return c.json({
          upcomingEvents: upcomingEvents.map((e) => ({ ...e, registered: false })),
          recentEvents: recentEvents,
        });
      }

      // Otherwise, fetch registrations for the user, only for upcoming events
      const regs = await db
        .select({ eventId: registration.eventId })
        .from(registration)
        .where(eq(registration.userId, userId));

      const registeredIds = new Set(regs.map((r) => r.eventId));

      // Annotate only the upcoming events
      const annotatedUpcoming = upcomingEvents.map((e) => ({
        ...e,
        registered: registeredIds.has(e.id),
      }));

      return c.json({
        upcomingEvents: annotatedUpcoming,
        recentEvents: recentEvents,
      });
    } catch (error) {
      console.error("Error fetching events:", error);
      return c.json({ error: "Failed to fetch events" }, 500);
    }
  })
  .get("/", (c) => {
    return c.json({ message: "Hello!" });
  })
  // Protected Routes
  .get('/profile', async (c) => {
    const session = await auth.api.getSession(c.req.raw);
    if (!session) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const [details] = await db
      .select()
      .from(userDetails)
      .where(eq(userDetails.userId, session.user.id));

    return c.json({
      profileComplete: !!details,
      userDetails: details ?? null
    });
  })
  .post('/profile', async (c) => {
    try {
      const session = await auth.api.getSession(c.req.raw);
      if (!session) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const body = await c.req.json();

      const parsed = zodUserDetails.safeParse(body);
      if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return c.json({ error: 'Validation failed', details: errors }, 400);
      }

      // Create or update user details
      await db.insert(userDetails)
        .values({
          userId: session.user.id,
          ...body,
        })
        .onConflictDoUpdate({
          target: userDetails.userId,
          set: { ...body }
        });

      return c.json({ success: true });
    } catch (error) {
      console.error('Profile update error:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .post("/events", async (c) => {
    try {
      const session = await auth.api.getSession(c.req.raw);
      if (!session) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      // Check if the user has an admin role
      const userId = session.user.id;
      const curUser = await db.select().from(user).where(eq(user.id, userId)).limit(1).execute();

      if (!curUser || curUser[0].role !== 'admin') {
        return c.json({ error: 'Forbidden: You must be an admin to create events' }, 403);
      }

      const { title, description, date, image } = await c.req.json();

      const newEvent = await db.insert(event).values({
        title,
        description,
        date: new Date(date),
        image,
      });

      return c.json({ success: true, event: newEvent });
    } catch (error) {
      console.error("Event creation error:", error);
      return c.json({ error: "Failed to create event" }, 500);
    }
  })
  .put('/register', async (c) => {
    try {
      const session = await auth.api.getSession(c.req.raw);
      if (!session) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const [details] = await db
        .select()
        .from(userDetails)
        .where(eq(userDetails.userId, session.user.id));

      if (!details) {
        return c.json({ error: 'Complete your profile' }, 401);
      }

      const body = await c.req.json();
      const { eventId } = body;

      // Check if the user is already registered for the event
      const existingRegistration = await db
        .select()
        .from(registration)
        .where(and(eq(registration.userId, session.user.id), eq(registration.eventId, eventId)));

      if (existingRegistration.length > 0) {
        return c.json({ error: 'Already registered for this event' }, 400);
      }

      // Register user for the event
      await db.insert(registration).values({
        userId: session.user.id,
        eventId,
      });

      return c.json({ success: true });
    } catch (error) {
      console.error("Error registering for the event:", error);
      return c.json({ error: 'Failed to register for the event' }, 500);
    }
  })


export type AppType = typeof route;
export default app;
