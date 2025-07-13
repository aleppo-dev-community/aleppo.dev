ALTER TABLE "registration" RENAME TO "event_registrations";--> statement-breakpoint
ALTER TABLE "event" RENAME TO "events";--> statement-breakpoint
ALTER TABLE "user_details" RENAME COLUMN "telegram" TO "telegram_id";--> statement-breakpoint
ALTER TABLE "event_registrations" DROP CONSTRAINT "registration_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "event_registrations" DROP CONSTRAINT "registration_event_id_event_id_fk";
--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "date_of_birth" date NOT NULL;--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "github_url" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_details" DROP COLUMN "age";--> statement-breakpoint
ALTER TABLE "user_details" DROP COLUMN "university";--> statement-breakpoint
ALTER TABLE "user_details" DROP COLUMN "academic_year";--> statement-breakpoint
ALTER TABLE "user_details" DROP COLUMN "cv_url";--> statement-breakpoint
ALTER TABLE "user_details" DROP COLUMN "can_share_data";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "date";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "image";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "updated_at";