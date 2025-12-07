import { eq } from "drizzle-orm";
import { businessMembers } from "../schema/businesses";
import { BaseRepository } from "./base-repository";

export type BusinessMember = typeof businessMembers.$inferSelect;
export type NewBusinessMember = typeof businessMembers.$inferInsert;

export class BusinessMemberRepository extends BaseRepository<BusinessMember> {
  protected readonly table = businessMembers;

  async findByBusinessId(businessId: string): Promise<BusinessMember[]> {
    return this.db
      .select()
      .from(businessMembers)
      .where(eq(businessMembers.businessId, businessId));
  }

  async findByUserId(userId: string): Promise<BusinessMember[]> {
    return this.db
      .select()
      .from(businessMembers)
      .where(eq(businessMembers.userId, userId));
  }

  async create(data: NewBusinessMember): Promise<BusinessMember> {
    const result = await this.db
      .insert(businessMembers)
      .values(data)
      .returning();

    return result[0]!;
  }

  async update(
    id: string,
    data: Partial<NewBusinessMember>
  ): Promise<BusinessMember | undefined> {
    const result = await this.db
      .update(businessMembers)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(businessMembers.id, id))
      .returning();

    return result[0];
  }

  async delete(id: string): Promise<BusinessMember | undefined> {
    const result = await this.db
      .delete(businessMembers)
      .where(eq(businessMembers.id, id))
      .returning();

    return result[0];
  }
}
