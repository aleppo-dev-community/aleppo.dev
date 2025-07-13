import { relations } from "drizzle-orm";
import { date, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from ".";

export const userDetails = pgTable("user_details", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  faculty: text("faculty"),
  specialization: text("specialization"),
  yearsOfExperience: integer("years_of_experience"),
  telegramId: text("telegram_id"),
  websiteUrl: text("website_url"),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userDetailsRelations = relations(userDetails, ({ one }) => ({
  user: one(user, {
    fields: [userDetails.userId],
    references: [user.id],
  }),
}));
