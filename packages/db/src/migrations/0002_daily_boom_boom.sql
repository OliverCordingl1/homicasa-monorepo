ALTER TABLE "businesses" ADD COLUMN "business_type" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "legal_individual_first_name" varchar(100);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "legal_individual_last_name" varchar(100);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "address_line_1" varchar(255);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "address_line_2" varchar(255);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "address_line_3" varchar(255);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "address_line_4" varchar(255);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "city" varchar(100);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "county" varchar(100);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "state" varchar(100);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "postcode" varchar(20);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "country" varchar(2);