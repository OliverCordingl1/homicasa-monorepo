import { BaseController } from "./base-controller";
import { BusinessService } from "../services/business-service";
import { z } from "zod";

// Validation schemas
const createBusinessSchema = z.object({
  displayName: z.string().min(1).max(255),
  legalName: z.string().max(255).optional(),
  taxNumber: z.string().max(100).optional(),
  email: z.string().email().max(255),
  phoneNumber: z.string().max(50).optional(),
});

const updateBusinessSchema = createBusinessSchema.partial();

const businessIdSchema = z.object({
  id: z.string(),
});

const businessEmailSchema = z.object({
  email: z.string().email(),
});

export class BusinessController extends BaseController {
  private businessService: BusinessService;

  constructor(ctx: any) {
    super(ctx);
    this.businessService = new BusinessService(ctx);
  }

  /**
   * Get a business by ID
   */
  async getById(input: z.infer<typeof businessIdSchema>) {
    try {
      const { id } = businessIdSchema.parse(input);
      const business = await this.businessService.getBusinessById(id);

      if (!business) {
        throw new Error(`Business with id ${id} not found`);
      }

      return business;
    } catch (error) {
      return this.handleError(error, "Failed to get business");
    }
  }

  /**
   * Get all businesses
   */
  async getAll() {
    try {
      return await this.businessService.getAllBusinesses();
    } catch (error) {
      return this.handleError(error, "Failed to get businesses");
    }
  }

  /**
   * Get a business by email
   */
  async getByEmail(input: z.infer<typeof businessEmailSchema>) {
    try {
      const { email } = businessEmailSchema.parse(input);
      const business = await this.businessService.getBusinessByEmail(email);

      if (!business) {
        throw new Error(`Business with email ${email} not found`);
      }

      return business;
    } catch (error) {
      return this.handleError(error, "Failed to get business by email");
    }
  }

  /**
   * Create a new business
   */
  async create(input: z.infer<typeof createBusinessSchema>) {
    try {
      const validatedData = createBusinessSchema.parse(input);
      return await this.businessService.createBusiness(validatedData);
    } catch (error) {
      return this.handleError(error, "Failed to create business");
    }
  }

  /**
   * Update a business
   */
  async update(
    input: z.infer<typeof businessIdSchema> &
      z.infer<typeof updateBusinessSchema>
  ) {
    try {
      const { id } = businessIdSchema.parse(input);
      const updateData = updateBusinessSchema.parse(input);
      return await this.businessService.updateBusiness(id, updateData);
    } catch (error) {
      return this.handleError(error, "Failed to update business");
    }
  }

  /**
   * Delete a business
   */
  async delete(input: z.infer<typeof businessIdSchema>) {
    try {
      const { id } = businessIdSchema.parse(input);
      return await this.businessService.deleteBusiness(id);
    } catch (error) {
      return this.handleError(error, "Failed to delete business");
    }
  }
}

// Export schemas for use in routers
export const businessSchemas = {
  createBusinessSchema,
  updateBusinessSchema,
  businessIdSchema,
  businessEmailSchema,
};
