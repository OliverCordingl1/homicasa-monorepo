import { eq } from "drizzle-orm";
import { rentScheduleOverrides } from "../schema/rent-schedules";
import { BaseRepository } from "./base-repository";

export type RentScheduleOverride = typeof rentScheduleOverrides.$inferSelect;
export type NewRentScheduleOverride = typeof rentScheduleOverrides.$inferInsert;

export class RentScheduleOverrideRepository extends BaseRepository<RentScheduleOverride> {
  protected readonly table = rentScheduleOverrides;

  async findByScheduleId(scheduleId: string): Promise<RentScheduleOverride[]> {
    return this.db
      .select()
      .from(rentScheduleOverrides)
      .where(eq(rentScheduleOverrides.scheduleId, scheduleId));
  }
}
