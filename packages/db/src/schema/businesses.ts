import { cuid2 } from "drizzle-cuid2/postgres";
import { jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user as users } from "./auth";

export const businesses = pgTable("businesses", {
  id: cuid2("id").defaultRandom().primaryKey(),
  displayName: varchar("display_name", { length: 255 }).notNull(),

  legalName: varchar("legal_name", { length: 255 }),
  taxNumber: varchar("tax_id", { length: 100 }),

  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 50 }),

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
