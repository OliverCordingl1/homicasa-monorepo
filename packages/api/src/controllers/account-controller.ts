import type { UpdateProfileFormValues } from "@homicasa/schemas";
import { AccountService } from "../services/account-service";
import { BaseController } from "./base-controller";

export class AccountController extends BaseController {
  private accountService: AccountService;

  constructor(ctx: any) {
    super(ctx);
    this.accountService = new AccountService(ctx);
  }

  async updateUserAccount(userData: UpdateProfileFormValues) {
    return this.accountService.updateUser(userData);
  }
}
