// apps/api/src/database/registrations-schema.ts

import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user, event } from "./schema";

export const registration = pgTable("registration", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  eventId: uuid("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),
  registeredAt: timestamp("registered_at").$defaultFn(() => new Date()).notNull(),
});
