import { cuid2 } from "drizzle-cuid2/postgres";
import { jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user as users } from "./auth";

export const businesses = pgTable("businesses", {
  id: cuid2("id").defaultRandom().primaryKey(),
  displayName: varchar("display_name", { length: 255 }).notNull(),

  businessType: varchar("business_type", { length: 50 })
    .default("sole_trader")
    .notNull(),
  legalName: varchar("legal_name", { length: 255 }),
  legalIndividualFirstName: varchar("legal_individual_first_name", {
    length: 100,
  }),
  legalIndividualLastName: varchar("legal_individual_last_name", {
    length: 100,
  }),
  taxNumber: varchar("tax_id", { length: 100 }),

  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 50 }),

  // Business Address Fields. Consider normalising into a separate table if needed in future
  // Fields are optional to accommodate businesses without a physical address, although at
  //   present, we require at least addressLine1, city, postcode, and country during onboarding
  addressLine1: varchar("address_line_1", { length: 255 }),
  addressLine2: varchar("address_line_2", { length: 255 }),
  addressLine3: varchar("address_line_3", { length: 255 }),
  addressLine4: varchar("address_line_4", { length: 255 }),
  city: varchar("city", { length: 100 }),
  county: varchar("county", { length: 100 }),
  state: varchar("state", { length: 100 }),
  postcode: varchar("postcode", { length: 20 }),
  country: varchar("country", { length: 2 }), // ISO 3166-1 alpha-2 country code

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const businessMembers = pgTable("business_members", {
  id: cuid2("id").defaultRandom().primaryKey(),
  businessId: cuid2("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),

  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  role: varchar("role", { length: 100 }).notNull().default("member"),
  permissions: jsonb("permissions").notNull().default({}),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
