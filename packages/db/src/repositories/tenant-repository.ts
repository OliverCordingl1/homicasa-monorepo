import { eq } from "drizzle-orm";
import { BaseRepository } from "./base-repository";
import { tenantProfiles } from "../schema/tenants";

export type TenantProfile = typeof tenantProfiles.$inferSelect;
export type NewTenantProfile = typeof tenantProfiles.$inferInsert;

export class TenantRepository extends BaseRepository<TenantProfile> {
  protected readonly table = tenantProfiles;

  async findById(id: string): Promise<TenantProfile | undefined> {
    const [record] = await this.db
      .select()
      .from(tenantProfiles)
      .where(eq(tenantProfiles.id, id))
      .limit(1);

    return record as TenantProfile | undefined;
  }

  async findByUserId(userId: string): Promise<TenantProfile | undefined> {
    const [record] = await this.db
      .select()
      .from(tenantProfiles)
      .where(eq(tenantProfiles.userId, userId))
      .limit(1);

    return record as TenantProfile | undefined;
  }

  async create(data: NewTenantProfile): Promise<TenantProfile> {
    const result = await this.db
      .insert(tenantProfiles)
      .values(data)
      .returning();

    return result[0]!;
  }

  async update(
    id: string,
    data: Partial<NewTenantProfile>
  ): Promise<TenantProfile | undefined> {
    const result = await this.db
      .update(tenantProfiles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(tenantProfiles.id, id))
      .returning();

    return result[0];
  }

  async delete(id: string): Promise<TenantProfile | undefined> {
    const result = await this.db
      .delete(tenantProfiles)
      .where(eq(tenantProfiles.id, id))
      .returning();

    return result[0];
  }
}
