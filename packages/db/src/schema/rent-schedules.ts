import { cuid2 } from "drizzle-cuid2/postgres";
import {
  pgTable,
  text,
  integer,
  date,
  timestamp,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";
import { agreements } from "./agreements";

// Define the frequency type enum
// The `interval` field multiplies the frequency (e.g., weekly + interval: 2 = bi-weekly)
export const frequencyTypeEnum = pgEnum("frequency_type", [
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "annual",
]);

export const rentSchedules = pgTable("rent_schedules", {
  id: cuid2("id").defaultRandom().primaryKey(),

  agreementId: cuid2("agreement_id")
    .notNull()
    .references(() => agreements.id, { onDelete: "cascade" }),

  frequencyType: frequencyTypeEnum("frequency_type").notNull(),

  // Multiplier for the frequency (e.g., weekly + interval: 2 = bi-weekly, weekly + interval: 3 = tri-weekly)
  interval: integer("interval").notNull().default(1),

  // Optional: iCalendar RRULE pattern for complex custom schedules
  // Example: "FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE,FR" for every 2 weeks on Mon/Wed/Fri
  rrulePattern: text("rrule_pattern"),

  // Day-of-month recurrence (1–31, null = end-of-month)
  dayOfMonth: integer("day_of_month"),

  // Weekday recurrence (0=Monday … 6=Sunday, null = not applicable)
  weekday: integer("weekday"),

  // First due date - anchor point for schedule calculations
  anchorDate: date("anchor_date").notNull(),

  // Currency code (ISO 4217, e.g., USD, GBP, EUR)
  currencyCode: varchar("currency_code", { length: 3 })
    .notNull()
    .default("USD"),

  // Rent amount in the lowest denomination of the currency (e.g., cents for USD)
  rentAmount: integer("rent_amount").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Overrides: temporary or permanent rent changes, holidays, date shifts.
export const rentScheduleOverrides = pgTable("rent_schedule_overrides", {
  id: cuid2("id").defaultRandom().primaryKey(),

  scheduleId: cuid2("schedule_id")
    .notNull()
    .references(() => rentSchedules.id, { onDelete: "cascade" }),

  // Effective date range for this override
  effectiveFrom: date("effective_from").notNull(),
  effectiveTo: date("effective_to"), // null = open-ended (permanent)

  // Optional overrides for specific fields
  currencyCode: varchar("currency_code", { length: 3 }), // ISO 4217
  rentAmount: integer("rent_amount"), // in lowest denomination of the currency
  frequencyType: frequencyTypeEnum("frequency_type"),
  interval: integer("interval"),
  dayOfMonth: integer("day_of_month"),
  weekday: integer("weekday"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
