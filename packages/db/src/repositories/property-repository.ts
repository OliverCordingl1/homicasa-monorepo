import { eq } from "drizzle-orm";
import { BaseRepository } from "./base-repository";
import { properties } from "../schema/properties";

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;

export class PropertyRepository extends BaseRepository<Property> {
  protected readonly table = properties;

  async findById(id: string): Promise<Property | undefined> {
    const [record] = await this.db
      .select()
      .from(properties)
      .where(eq(properties.id, id))
      .limit(1);

    return record as Property | undefined;
  }

  async create(data: NewProperty): Promise<Property> {
    const result = await this.db.insert(properties).values(data).returning();

    return result[0]!;
  }

  async update(
    id: string,
    data: Partial<NewProperty>
  ): Promise<Property | undefined> {
    const result = await this.db
      .update(properties)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();

    return result[0];
  }

  async delete(id: string): Promise<Property | undefined> {
    const result = await this.db
      .delete(properties)
      .where(eq(properties.id, id))
      .returning();

    return result[0];
  }

  async findByCity(city: string): Promise<Property[]> {
    return this.db.select().from(properties).where(eq(properties.city, city));
  }

  async findByCountry(country: string): Promise<Property[]> {
    return this.db
      .select()
      .from(properties)
      .where(eq(properties.country, country));
  }
}
