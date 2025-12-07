import { cuid2 } from "drizzle-cuid2/postgres";
import { properties } from "./properties";
import {
  date,
  integer,
  pgTable,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { businesses } from "./businesses";
import { tenantProfiles } from "./tenants";

export const agreements = pgTable("agreements", {
  id: cuid2("id").defaultRandom().primaryKey(),

  propertyId: cuid2("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  businessId: cuid2("business_id").references(() => businesses.id, {
    onDelete: "set null", // TODO: decide on appropriate action. deleting this on cascade will cause data loss.
  }),

  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),

  rentAmount: integer("rent_amount").notNull(), // in pence
  currencyCode: varchar("currency_code", { length: 3 }).notNull(), // ISO 4217

  rentDueAfterDays: integer("rent_due_after_days").notNull().default(0), // e.g., 5 means rent is due 5 days after the due date

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tenantAgreements = pgTable("tenant_agreements", {
  id: cuid2("id").defaultRandom().primaryKey(),
  agreementId: cuid2("agreement_id")
    .notNull()
    .references(() => agreements.id, { onDelete: "cascade" }),
  tenantProfileId: cuid2("tenant_profile_id").references(
    () => tenantProfiles.id,
    {
      onDelete: "set null", // TODO: decide on appropriate action. deleting this on cascade will cause data loss.
    }
  ),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
