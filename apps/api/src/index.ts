import { Hono } from "hono";
import { auth } from "./auth";
import { db } from "./database";
import { user as profile } from "./database/auth-schema";
import type { SessionUser } from "./auth";

interface SessionResponse {
  user: SessionUser;
}

const app = new Hono();

const route = app
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .post('/api/profile', async (c) => {
    const authResponse = await auth.handler(new Request(c.req.url, {
      method: 'GET',
      headers: c.req.raw.headers,
    }));
    
    const session = (await authResponse.json()) as SessionResponse;
    
    if (!session?.user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
  
    const data = await c.req.json();
    
    try {
      await db.insert(profile)
        .values({
          id: session.user.id,
          ...data,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: profile.id,
          set: {
            ...data,
            updatedAt: new Date(),
          }
        });
      
      return c.json({ success: true });
    } catch (error) {
      return c.json({ error: 'Failed to save profile' }, 500);
    }
  })
  .get("/", (c) => {
    return c.json({ message: "Hello!" });
  })
  

export type AppType = typeof route;
export default app;
