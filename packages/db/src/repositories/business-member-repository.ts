import { eq } from "drizzle-orm";
import { businessMembers, businesses } from "../schema/businesses";
import { user as users } from "../schema/auth";
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

  /**
   * Find business members for a user with optional joins.
   * When includeBusiness/includeUser are true, performs LEFT JOINs to return related data.
   */
  async findByUserIdWithJoins(
    userId: string,
    options: { includeBusiness?: boolean; includeUser?: boolean } = {}
  ): Promise<
    Array<{
      member: BusinessMember;
      business: typeof businesses.$inferSelect | null;
      user: typeof users.$inferSelect | null;
    }>
  > {
    const { includeBusiness = false, includeUser = false } = options;

    // Build select shape and joins dynamically, but always return stable keys
    if (!includeBusiness && !includeUser) {
      const rows = await this.db
        .select({ member: businessMembers })
        .from(businessMembers)
        .where(eq(businessMembers.userId, userId));
      return rows.map((r) => ({
        member: r.member,
        business: null,
        user: null,
      }));
    }

    if (includeBusiness && !includeUser) {
      const rows = await this.db
        .select({ member: businessMembers, business: businesses })
        .from(businessMembers)
        .leftJoin(businesses, eq(businessMembers.businessId, businesses.id))
        .where(eq(businessMembers.userId, userId));
      return rows.map((r) => ({
        member: r.member,
        business: r.business ?? null,
        user: null,
      }));
    }

    if (!includeBusiness && includeUser) {
      const rows = await this.db
        .select({ member: businessMembers, user: users })
        .from(businessMembers)
        .leftJoin(users, eq(businessMembers.userId, users.id))
        .where(eq(businessMembers.userId, userId));
      return rows.map((r) => ({
        member: r.member,
        business: null,
        user: r.user ?? null,
      }));
    }

    const rows = await this.db
      .select({ member: businessMembers, business: businesses, user: users })
      .from(businessMembers)
      .leftJoin(businesses, eq(businessMembers.businessId, businesses.id))
      .leftJoin(users, eq(businessMembers.userId, users.id))
      .where(eq(businessMembers.userId, userId));

    return rows.map((r) => ({
      member: r.member,
      business: r.business ?? null,
      user: r.user ?? null,
    }));
  }

  async create(data: NewBusinessMember): Promise<BusinessMember> {
    const result = await this.db
      .insert(businessMembers)
      .values(data)
      .returning();

    return result[0]!;
  }

  async delete(id: string): Promise<BusinessMember | undefined> {
    const result = await this.db
      .delete(businessMembers)
      .where(eq(businessMembers.id, id))
      .returning();

    return result[0];
  }
}
