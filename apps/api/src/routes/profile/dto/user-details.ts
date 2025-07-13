import { z } from "zod";

export const userDetailsSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(1),
  telegramId: z.string().min(3).optional(),
  dateOfBirth: z.coerce.date(),
  faculty: z.string().min(1),
  specialization: z.string().min(1),
  yearsOfExperience: z.coerce.number().int(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
});
