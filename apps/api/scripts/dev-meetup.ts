import { and, eq } from "drizzle-orm";
import { readFileSync } from "fs";
import { join } from "path";
import { db } from "../src/database";
import { eventRegistrations, events, user } from "../src/database/schema";

interface AfterDataRecord {
  id: string;
  fullname: string;
  email: string;
  isVip: boolean;
  availableChairs: number;
}

async function main() {
  try {
    const jsonPath = process.argv[2] || join(process.cwd(), "after_data.json");

    const fileContent = readFileSync(jsonPath, "utf-8");
    const records: AfterDataRecord[] = JSON.parse(fileContent);

    console.log(`📊 Found ${records.length} records to process`);

    const eventSlug = "dev-meetup-2025-Q2";

    let registered = 0;
    let notFound = 0;
    let alreadyRegistered = 0;
    let skipped = 0;

    await db.transaction(async (tx) => {
      const [existingEvent] = await tx.select().from(events).where(eq(events.slug, eventSlug));

      let eventId: string;

      if (existingEvent) {
        eventId = existingEvent.id;
        console.log(`✅ Event already exists with ID: ${eventId}`);
      } else {
        const [newEvent] = await tx
          .insert(events)
          .values({
            slug: eventSlug,
          })
          .returning();

        if (!newEvent) {
          throw new Error("Failed to create event");
        }

        eventId = newEvent.id;
        console.log(`✅ Created new event with ID: ${eventId}`);
      }

      for (const record of records) {
        if (!record.email) {
          skipped++;
          console.log(`⚠️  Skipping record ${record.id}: no email`);
          continue;
        }

        const [foundUser] = await tx
          .select({ id: user.id })
          .from(user)
          .where(eq(user.email, record.email.toLowerCase().trim()));

        if (!foundUser) {
          notFound++;
          console.log(`❌ User not found for email: ${record.email}`);
          continue;
        }

        const [existingRegistration] = await tx
          .select()
          .from(eventRegistrations)
          .where(
            and(
              eq(eventRegistrations.eventId, eventId),
              eq(eventRegistrations.userId, foundUser.id),
            ),
          );

        if (existingRegistration) {
          alreadyRegistered++;
          console.log(`⚠️  User ${foundUser.id} already registered for this event`);
          continue;
        }

        await tx.insert(eventRegistrations).values({
          userId: foundUser.id,
          eventId: eventId,
          attendanceCertainty: "MAYBE",
          didAttend: true,
        });

        registered++;
        console.log(`✅ Registered user ${foundUser.id} (${record.email})`);
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
