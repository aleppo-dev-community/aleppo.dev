import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import type { SessionUser } from "./index";
import { auth } from "./index";

// TODO: make it type safe
export const authMiddleware = (roles: string[] = [], allowUnauthenticated = false) => {
  return createMiddleware<{
    Variables: {
      user: SessionUser;
    };
  }>(async (c, next) => {
    try {
      const session = await auth.api.getSession(c.req.raw);
      if (!session && !allowUnauthenticated) {
        return c.json(
          {
            message: "الجلسة غير صالحة أو منتهية",
          },
          401,
        );
      }

      const user = session?.user as SessionUser;

      if (!allowUnauthenticated && roles.length > 0 && !roles.includes(user.role ?? "")) {
        return c.json(
          {
            message: `غير مسموح بالدخول. الصلاحيات المطلوبة: ${roles.join(", ")}`,
          },
          403,
        );
      }
      if (user) {
        c.set("user", user);
      }
      await next();
    } catch (error) {
      if (error instanceof HTTPException) {
        throw error;
      }

      return c.json(
        {
          message: "فشل التحقق من الجلسة",
        },
        401,
      );
    }
  });
};
