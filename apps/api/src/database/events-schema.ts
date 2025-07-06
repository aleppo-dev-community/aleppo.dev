// apps/api/src/database/events-schema.ts

import { pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";

export const event = pgTable("event", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
});

