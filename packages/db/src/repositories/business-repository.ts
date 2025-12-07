import { eq } from "drizzle-orm";
import { BaseRepository } from "./base-repository";
import { businesses } from "../schema/businesses";

export type Business = typeof businesses.$inferSelect;
export type NewBusiness = typeof businesses.$inferInsert;

export class BusinessRepository extends BaseRepository<Business> {
  protected readonly table = businesses;

  async findById(id: string): Promise<Business | undefined> {
    const [record] = await this.db
      .select()
      .from(businesses)
      .where(eq(businesses.id, id))
      .limit(1);

    return record as Business | undefined;
  }

  async create(data: NewBusiness): Promise<Business> {
    const result = await this.db.insert(businesses).values(data).returning();

    return result[0]!;
  }

  async update(
    id: string,
    data: Partial<NewBusiness>
  ): Promise<Business | undefined> {
    const result = await this.db
      .update(businesses)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(businesses.id, id))
      .returning();

    return result[0];
  }

  async delete(id: string): Promise<Business | undefined> {
    const result = await this.db
      .delete(businesses)
      .where(eq(businesses.id, id))
      .returning();

    return result[0];
  }

  async findByEmail(email: string): Promise<Business | undefined> {
    const [record] = await this.db
      .select()
      .from(businesses)
      .where(eq(businesses.email, email))
      .limit(1);

    return record as Business | undefined;
  }
}
