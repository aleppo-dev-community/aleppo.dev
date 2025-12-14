import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  closeDate: timestamp("close_date"),
});

export const eventRegistrations = pgTable("event_registrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  registeredAt: timestamp("registered_at")
    .$defaultFn(() => new Date())
    .notNull(),
  isAccepted: boolean("is_accepted"),
  cancelledAt: timestamp("cancelled_at"),
  attendanceCertainty: text("attendance_certainty").notNull().default("MAYBE"),
  didAttend: boolean("did_attend"),
});

export const eventRelations = relations(events, ({ many }) => ({
  registrations: many(eventRegistrations),
}));
