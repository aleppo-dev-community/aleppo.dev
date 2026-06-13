import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const friends = pgTable(
  "friends",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    friendId: text("friend_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    uniqueUserFriend: unique().on(t.userId, t.friendId),
  }),
);

export const friendsRelations = relations(friends, ({ one }) => ({
  user: one(user, {
    fields: [friends.userId],
    references: [user.id],
  }),
  friend: one(user, {
    fields: [friends.friendId],
    references: [user.id],
  }),
}));
