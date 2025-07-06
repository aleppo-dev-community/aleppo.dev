// apps/api/src/database/user-details-schema.ts

import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./schema";

import { z } from "zod";

export const zodUserDetails = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone is required"),

  // Allow telegram URL if provided
  telegram: z.string().url("Telegram must be a valid URL").optional(),

  age: z.number().int().min(0).max(150, "Invalid age"),

  university: z.string().min(1, "University is required"),
  faculty: z.string().min(1, "faculty is required"),
  specialization: z.string().min(1, "Specialization is required"),

  academicYear: z.string(),

  yearsOfExperience: z.number().int().min(0).max(30),

  linkedinUrl: z
    .string()
    .regex(
      /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
      "LinkedIn URL must be in the form: linkedin.com/in/name"
    )
    .optional(),

  cvUrl: z.string().url("CV URL must be a valid URL").optional(),
  websiteUrl: z.string().url("Website URL must be a valid URL").optional(),

  canShareData: z.boolean().optional(),
});


export const userDetails = pgTable("user_details", {
  userId: text("user_id")
    .primaryKey()  // Make userId the primary key
    .references(() => user.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  telegram: text("telegram"),
  age: integer("age").notNull(),
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
