import { tenantAgreements } from "../schema/agreements";
import { BaseRepository } from "./base-repository";
import { eq } from "drizzle-orm";

export type TenantAgreement = typeof tenantAgreements.$inferSelect;
export type NewTenantAgreement = typeof tenantAgreements.$inferInsert;

export class TenantAgreementRepository extends BaseRepository<TenantAgreement> {
  protected readonly table = tenantAgreements;

  async findByAgreementId(agreementId: string): Promise<TenantAgreement[]> {
    return this.db
      .select()
      .from(tenantAgreements)
      .where(eq(tenantAgreements.agreementId, agreementId));
  }

  async findByTenantProfileId(
    tenantProfileId: string
  ): Promise<TenantAgreement[]> {
    return this.db
      .select()
      .from(tenantAgreements)
      .where(eq(tenantAgreements.tenantProfileId, tenantProfileId));
  }
}
