// apps/api/src/index.ts

import { Hono } from "hono";
import type { SessionUser } from "./auth";
import { auth } from "./auth";
import { db } from './database';
import { userDetails, event, registration } from './database/schema'
import { and, eq } from "drizzle-orm";
import { swaggerUI } from "@hono/swagger-ui";
import { openApiDoc } from './constants/open-api-doc';

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
      const allEvents = await db.select().from(event);

      if (!userId) {
        return c.json({ events: allEvents.map(e => ({ ...e, registered: false })) });
      }

      // Otherwise fetch registrations for this user
      const regs = await db
        .select({ eventId: registration.eventId })
        .from(registration)
        .where(eq(registration.userId, userId));

      const registeredIds = new Set(regs.map(r => r.eventId));

      // Annotate each event
      const annotated = allEvents.map((e) => ({
        ...e,
        registered: registeredIds.has(e.id),
      }));

      return c.json({ events: annotated });
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
