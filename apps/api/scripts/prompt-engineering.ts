import { and, eq } from "drizzle-orm";
import { readFileSync } from "fs";
import { join } from "path";
import { db } from "../src/database";
import { eventRegistrations, events, user } from "../src/database/schema";

interface GoogleFormsRecord {
  id: string;
  "طابع زمني": string;
  "عنوان البريد الإلكتروني": string;
  "الاسم الكامل باللغة العربية": string;
  "ما مدى تأكدك من حضور الجلسة؟": string;
  "الدرجة العلمية"?: string;
  "مجالات استخدامك لتقنيات الذكاء الاصطناعي"?: string;
  "اختر جامعتك"?: string;
  الاختصاص?: string;
}

function mapAttendanceCertainty(arabicValue: string): "YES" | "MAYBE" | "NO" {
  const normalized = arabicValue.trim();
  if (normalized === "متأكد") {
    return "YES";
  }
  if (normalized === "ربما أحضر" || normalized === "ربما") {
    return "MAYBE";
  }
  if (normalized === "لن أحضر" || normalized === "لا") {
    return "NO";
  }
  return "MAYBE";
}

async function main() {
  try {
    const jsonPath =
      process.argv[2] || join(process.cwd(), "data-2025-10-17T19-03-32-088Z-ab3f26e1.json");

    const fileContent = readFileSync(jsonPath, "utf-8");
    const records: GoogleFormsRecord[] = JSON.parse(fileContent);

    console.log(`📊 Found ${records.length} records to process`);

    const lectureSlug = "prompt-engineering-2025-10";

    let registered = 0;
    let notFound = 0;
    let alreadyRegistered = 0;
    let skipped = 0;

    await db.transaction(async (tx) => {
      const [existingLecture] = await tx.select().from(events).where(eq(events.slug, lectureSlug));

      let lectureId: string;

      if (existingLecture) {
        lectureId = existingLecture.id;
        console.log(`✅ Lecture already exists with ID: ${lectureId}`);
      } else {
        const [newLecture] = await tx
          .insert(events)
          .values({
            slug: lectureSlug,
          })
          .returning();

        if (!newLecture) {
          throw new Error("Failed to create lecture");
        }

        lectureId = newLecture.id;
        console.log(`✅ Created new lecture with ID: ${lectureId}`);
      }

      for (const record of records) {
        const email = record["عنوان البريد الإلكتروني"];
        if (!email) {
          skipped++;
          console.log(`⚠️  Skipping record ${record.id}: no email`);
          continue;
        }

        const normalizedEmail = email.toLowerCase().trim();
        const [foundUser] = await tx
          .select({ id: user.id })
          .from(user)
          .where(eq(user.email, normalizedEmail));

        if (!foundUser) {
          notFound++;
          console.log(`❌ User not found for email: ${normalizedEmail}`);
          continue;
        }

        const [existingRegistration] = await tx
          .select()
          .from(eventRegistrations)
          .where(
            and(
              eq(eventRegistrations.eventId, lectureId),
              eq(eventRegistrations.userId, foundUser.id),
            ),
          );

        if (existingRegistration) {
          alreadyRegistered++;
          console.log(`⚠️  User ${foundUser.id} already registered for this lecture`);
          continue;
        }

        const attendanceCertainty = mapAttendanceCertainty(
          record["ما مدى تأكدك من حضور الجلسة؟"] || "MAYBE",
        );

        await tx.insert(eventRegistrations).values({
          userId: foundUser.id,
          eventId: lectureId,
          attendanceCertainty,
        });

        registered++;
        console.log(
          `✅ Registered user ${foundUser.id} (${normalizedEmail}) - ${attendanceCertainty}`,
        );
      }
    });

    console.log("\n📈 Summary:");
    console.log(`   ✅ Registered: ${registered}`);
    console.log(`   ⚠️  Already registered: ${alreadyRegistered}`);
    console.log(`   ❌ Users not found: ${notFound}`);
    console.log(`   ⚠️  Skipped (no email): ${skipped}`);
    console.log(`   📊 Total processed: ${records.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Fatal error (transaction rolled back):", error);
    process.exit(1);
  }
}

main();
