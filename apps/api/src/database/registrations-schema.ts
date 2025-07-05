// apps/api/src/database/registrations-schema.ts

import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { user, event } from "./schema";

export const registration = pgTable("registration", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  eventId: integer("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),
  registeredAt: timestamp("registered_at").$defaultFn(() => new Date()).notNull(),
});
