import { eq } from "drizzle-orm";
import { BaseRepository } from "./base-repository";
import { user } from "../schema/auth";

export interface User {
  id: string;

  firstName: string;
  lastName: string;
  name: string;

  email: string;
  emailVerified: boolean;
  image?: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export class UserRepository extends BaseRepository<User> {
  protected table = user;

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.email, email))
      .limit(1);

    return user as unknown as User | undefined;
  }

  async updateUser(
    userId: string,
    updateData: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
  ): Promise<User> {
    const [updatedUser] = await this.db
      .update(this.table)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(this.table.id, userId))
      .returning();

    return updatedUser as unknown as User;
  }
}
