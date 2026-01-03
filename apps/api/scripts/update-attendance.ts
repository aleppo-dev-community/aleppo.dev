import { eq } from "drizzle-orm";
import { readFileSync } from "fs";
import { db } from "../src/database";
import { eventRegistrations } from "../src/database/schema";

interface AttendanceRecord {
  id: string;
  attended: boolean;
  registered_at: string;
  attendance_certainty: string;
  fullname: string;
  email: string;
}

async function main() {
  try {
    const jsonPath = process.argv[2];

    if (!jsonPath) {
      console.error("❌ Error: JSON file path is required");
      console.error("Usage: bun run scripts/update-attendance.ts <path-to-json-file>");
      process.exit(1);
    }

    const fileContent = readFileSync(jsonPath, "utf-8");
    const records: AttendanceRecord[] = JSON.parse(fileContent);

    console.log(`📊 Found ${records.length} records to process`);

    let updated = 0;
    let errors = 0;

    await db.transaction(async (tx) => {
      for (const record of records) {
        try {
          await tx
            .update(eventRegistrations)
            .set({ didAttend: record.attended })
            .where(eq(eventRegistrations.id, record.id));

          updated++;
          console.log(`✅ Updated ${record.id}: didAttend = ${record.attended}`);
        } catch (error) {
          errors++;
          console.error(`❌ Error updating ${record.id}:`, error);
          throw error;
        }
      }
    });

    console.log("\n📈 Summary:");
    console.log(`   ✅ Updated: ${updated}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log(`   📊 Total processed: ${records.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Fatal error (transaction rolled back):", error);
    process.exit(1);
  }
}

main();
