import { cuid2 } from "drizzle-cuid2/postgres";
import { user as users } from "./auth";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const tenantProfiles = pgTable("tenant_profiles", {
  id: cuid2("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
