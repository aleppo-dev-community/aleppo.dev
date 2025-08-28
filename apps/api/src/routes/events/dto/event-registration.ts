import { z } from "zod";

export const registerEventSchema = z.object({
  attendanceCertainty: z.enum(["SURE", "MAYBE"]).default("MAYBE"),
});

export type RegisterEventData = z.infer<typeof registerEventSchema>;
