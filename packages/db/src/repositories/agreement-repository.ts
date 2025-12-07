import { eq } from "drizzle-orm";
import { BaseRepository } from "./base-repository";
import { agreements } from "../schema/agreements";

export type Agreement = typeof agreements.$inferSelect;
export type NewAgreement = typeof agreements.$inferInsert;

export class AgreementRepository extends BaseRepository<Agreement> {
  protected readonly table = agreements;

  async findByPropertyId(propertyId: string): Promise<Agreement[]> {
    return this.db
      .select()
      .from(agreements)
      .where(eq(agreements.propertyId, propertyId));
  }

  async findByBusinessId(businessId: string): Promise<Agreement[]> {
    return this.db
      .select()
      .from(agreements)
      .where(eq(agreements.businessId, businessId));
  }
}
