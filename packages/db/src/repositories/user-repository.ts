import { eq } from "drizzle-orm";
import { BaseRepository } from "./base-repository";

export interface User {
  id: string;

  firstName: string;
  lastName: string;

  email: string;
  emailVerified: boolean;
  image?: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export class UserRepository extends BaseRepository<User> {
  protected table: any;

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.email, email))
      .limit(1);

    return user as unknown as User | undefined;
  }
}
