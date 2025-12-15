import { UserRepository } from "@homicasa/db/repositories/user-repository";
import { BaseService } from "./base-service";
import { db } from "@homicasa/db";
import type { Context } from "../context";
import {
  accountSchemas,
  type UpdateProfileFormValues,
} from "@homicasa/schemas";

export class AccountService extends BaseService {
  private repo: UserRepository;

  constructor(ctx: Context) {
    super(ctx);
    this.repo = new UserRepository(db);
  }

  async updateUser(userData: UpdateProfileFormValues) {
    const userId = this.getCurrentUserId();

    try {
      accountSchemas.updateProfileFormSchema.parse(userData);
    } catch (error) {
      throw new Error("Invalid user data");
    }

    const updatedUser = await this.repo.updateUser(userId, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
    });

    return updatedUser;
  }
}
