import { eq, SQL } from "drizzle-orm";
import { db } from "..";

export abstract class BaseRepository<T> {
  protected abstract readonly table: any;
  protected readonly db = db;

  constructor(dbInstance?: typeof db) {
    if (dbInstance) {
      this.db = dbInstance;
    }
  }

  async findAll(options?: {
    where?: SQL | undefined;
    limit?: number;
    offset?: number;
  }): Promise<T[]> {
    const { where, limit, offset } = options || {};
    let query = this.db.select().from(this.table).$dynamic();

    if (where) {
      query = query.where(where);
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.offset(offset);
    }

    return query as unknown as T[];
  }

  async findById(id: string): Promise<T | undefined> {
    const [record] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .limit(1);

    return record as unknown as T | undefined;
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const result = await this.db.insert(this.table).values(data).returning();

    return (result as unknown as T[])[0]!;
  }

  async update(
    id: string,
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ): Promise<T | undefined> {
    const result = await this.db
      .update(this.table)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(this.table.id, id))
      .returning();

    return (result as unknown as T[])[0];
  }

  async delete(id: string): Promise<T | undefined> {
    const result = await this.db
      .delete(this.table)
      .where(eq(this.table.id, id))
      .returning();

    return (result as unknown as T[])[0];
  }
}
