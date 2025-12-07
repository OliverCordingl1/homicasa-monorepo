import { propertyManagers } from "../schema/properties";
import { BaseRepository } from "./base-repository";
import { eq } from "drizzle-orm";

export type PropertyManager = typeof propertyManagers.$inferSelect;
export type NewPropertyManager = typeof propertyManagers.$inferInsert;

export class PropertyManagerRepository extends BaseRepository<PropertyManager> {
  protected readonly table = propertyManagers;

  async findByPropertyId(propertyId: string): Promise<PropertyManager[]> {
    return this.db
      .select()
      .from(propertyManagers)
      .where(eq(propertyManagers.propertyId, propertyId));
  }

  async findByBusinessMemberId(
    businessMemberId: string
  ): Promise<PropertyManager[]> {
    return this.db
      .select()
      .from(propertyManagers)
      .where(eq(propertyManagers.businessMemberId, businessMemberId));
  }
}
