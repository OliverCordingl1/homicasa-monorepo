import { cuid2 } from "drizzle-cuid2/postgres";
import { jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { businessMembers } from "./businesses";

export const properties = pgTable("properties", {
  id: cuid2("id").defaultRandom().primaryKey(),

  displayName: varchar("display_name", { length: 255 }).notNull(),
  addressLine1: varchar("address_line_1", { length: 255 }).notNull(),
  addressLine2: varchar("address_line_2", { length: 255 }),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }),
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  country: varchar("country", { length: 2 }).notNull(), // ISO 3166-1 alpha-2

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const propertyManagers = pgTable("property_managers", {
  id: cuid2("id").defaultRandom().primaryKey(),

  propertyId: cuid2("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  businessMemberId: cuid2("business_member_id").references(
    () => businessMembers.id,
    {
      onDelete: "cascade", // TODO: decide on appropriate action. deleting this on cascade will cause data loss.
    }
  ),

  permissions: jsonb("permissions").notNull().default({}),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
