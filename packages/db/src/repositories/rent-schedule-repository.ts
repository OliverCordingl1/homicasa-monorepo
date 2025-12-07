import { eq } from "drizzle-orm";
import { BaseRepository } from "./base-repository";
import { rentSchedules } from "../schema/rent-schedules";

export type RentSchedule = typeof rentSchedules.$inferSelect;
export type NewRentSchedule = typeof rentSchedules.$inferInsert;

export class RentScheduleRepository extends BaseRepository<RentSchedule> {
  protected readonly table = rentSchedules;

  async findById(id: string): Promise<RentSchedule | undefined> {
    const [record] = await this.db
      .select()
      .from(rentSchedules)
      .where(eq(rentSchedules.id, id))
      .limit(1);

    return record as RentSchedule | undefined;
  }

  async findByAgreementId(agreementId: string): Promise<RentSchedule[]> {
    return this.db
      .select()
      .from(rentSchedules)
      .where(eq(rentSchedules.agreementId, agreementId));
  }

  async create(data: NewRentSchedule): Promise<RentSchedule> {
    const result = await this.db.insert(rentSchedules).values(data).returning();

    return result[0]!;
  }

  async update(
    id: string,
    data: Partial<NewRentSchedule>
  ): Promise<RentSchedule | undefined> {
    const result = await this.db
      .update(rentSchedules)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(rentSchedules.id, id))
      .returning();

    return result[0];
  }

  async delete(id: string): Promise<RentSchedule | undefined> {
    const result = await this.db
      .delete(rentSchedules)
      .where(eq(rentSchedules.id, id))
      .returning();

    return result[0];
  }
}
