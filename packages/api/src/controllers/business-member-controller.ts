import { BaseController } from "./base-controller";
import { BusinessMemberService } from "../services/business-member-service";
import { z } from "zod";

// Validation schemas
const businessMemberIdSchema = z.object({
  id: z.string(),
});

const businessIdSchema = z.object({
  businessId: z.string(),
});

const userIdSchema = z.object({
  userId: z.string(),
});

const createBusinessMemberSchema = z.object({
  businessId: z.string(),
  userId: z.string(),
  role: z.enum(["owner", "admin", "member"]),
  permissions: z.array(z.string()).optional(),
});

const updateBusinessMemberSchema = z.object({
  role: z.enum(["owner", "admin", "member"]).optional(),
  permissions: z.array(z.string()).optional(),
});

export class BusinessMemberController extends BaseController {
  private businessMemberService: BusinessMemberService;

  constructor(ctx: any) {
    super(ctx);
    this.businessMemberService = new BusinessMemberService(ctx);
  }

  async getUserMemberships() {
    try {
      const memberships = await this.businessMemberService.getUserMemberships();
      console.log("Memberships:", memberships);
      return memberships;
    } catch (error) {
      return this.handleError(error, "Failed to get user memberships");
    }
  }
}

// Export schemas for use in routers
export const businessMemberSchemas = {
  businessMemberIdSchema,
  businessIdSchema,
  userIdSchema,
  createBusinessMemberSchema,
  updateBusinessMemberSchema,
};
