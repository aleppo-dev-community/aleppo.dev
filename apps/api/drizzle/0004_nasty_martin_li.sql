ALTER TABLE "user_details" ALTER COLUMN "age" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "registration" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "registration" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "registration" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "registration" ALTER COLUMN "event_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text DEFAULT 'user' NOT NULL;