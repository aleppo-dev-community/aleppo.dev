// apps/api/src/database/user-details-schema.ts

import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./schema";

export const userDetails = pgTable("user_details", {
  userId: text("user_id")
  .primaryKey()  // Make userId the primary key
  .references(() => user.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  telegram: text("telegram"),
  age: integer("age"),
  university: text("university"),
  faculty: text("faculty"),
  academicYear: text("academic_year"),
  specialization: text("specialization"),
  yearsOfExperience: integer("years_of_experience"),
  linkedinUrl: text("linkedin_url"),
  cvUrl: text("cv_url"),
  websiteUrl: text("website_url"),
  canShareData: boolean("can_share_data").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userDetailsRelations = relations(userDetails, ({ one }) => ({
  user: one(user, {
    fields: [userDetails.userId],
    references: [user.id],
  }),
}));
