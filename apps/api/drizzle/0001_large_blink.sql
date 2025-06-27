CREATE TABLE "user_details" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"full_name" text NOT NULL,
	"phone" text NOT NULL,
	"telegram" text,
	"age" integer,
	"university" text,
	"faculty" text,
	"academic_year" text,
	"specialization" text,
	"years_of_experience" integer,
	"linkedin_url" text,
	"cv_url" text,
	"website_url" text,
	"can_share_data" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email_verified" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "full_name";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "telegram";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "age";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "university";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "faculty";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "academic_year";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "specialization";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "years_of_experience";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "linkedin";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "cv_url";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "portfolio_url";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "share_data";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");