import { BaseController } from "./base-controller";
import { TenantService } from "../services/tenant-service";
import { z } from "zod";

// Validation schemas
const createTenantSchema = z.object({
  userId: z.string(),
});

const updateTenantSchema = z.object({
  // Currently tenant profiles only have userId in schema
  // Add fields here as they're added to the schema
});

const tenantIdSchema = z.object({
  id: z.string(),
});

const userIdSchema = z.object({
  userId: z.string(),
});

export class TenantController extends BaseController {
  private tenantService: TenantService;

  constructor(ctx: any) {
    super(ctx);
    this.tenantService = new TenantService(ctx);
  }

  /**
   * Get a tenant profile by ID
   */
  async getById(input: z.infer<typeof tenantIdSchema>) {
    try {
      const { id } = tenantIdSchema.parse(input);
      const tenant = await this.tenantService.getTenantById(id);

      if (!tenant) {
        throw new Error(`Tenant profile with id ${id} not found`);
      }

      return tenant;
    } catch (error) {
      return this.handleError(error, "Failed to get tenant profile");
    }
  }

  /**
   * Get a tenant profile by user ID
   */
  async getByUserId(input: z.infer<typeof userIdSchema>) {
    try {
      const { userId } = userIdSchema.parse(input);
      const tenant = await this.tenantService.getTenantByUserId(userId);

      if (!tenant) {
        throw new Error(`Tenant profile for user ${userId} not found`);
      }

      return tenant;
    } catch (error) {
      return this.handleError(error, "Failed to get tenant profile by user ID");
    }
  }

  /**
   * Get all tenant profiles
   */
  async getAll() {
    try {
      return await this.tenantService.getAllTenants();
    } catch (error) {
      return this.handleError(error, "Failed to get tenant profiles");
    }
  }

  /**
   * Get the current user's tenant profile
   */
  async getCurrent() {
    try {
      const tenant = await this.tenantService.getCurrentTenantProfile();

      if (!tenant) {
        throw new Error("Current user does not have a tenant profile");
      }

      return tenant;
    } catch (error) {
      return this.handleError(error, "Failed to get current tenant profile");
    }
  }

  /**
   * Create a new tenant profile
   */
  async create(input: z.infer<typeof createTenantSchema>) {
    try {
      const validatedData = createTenantSchema.parse(input);
      return await this.tenantService.createTenant(validatedData);
    } catch (error) {
      return this.handleError(error, "Failed to create tenant profile");
    }
  }

  /**
   * Update a tenant profile
   */
  async update(input: z.infer<typeof tenantIdSchema>) {
    try {
      const { id } = tenantIdSchema.parse(input);
      // Currently no updateable fields in tenant profile schema
      // When fields are added to the schema, update this method
      return await this.tenantService.getTenantById(id);
    } catch (error) {
      return this.handleError(error, "Failed to update tenant profile");
    }
  }

  /**
   * Delete a tenant profile
   */
  async delete(input: z.infer<typeof tenantIdSchema>) {
    try {
      const { id } = tenantIdSchema.parse(input);
      return await this.tenantService.deleteTenant(id);
    } catch (error) {
      return this.handleError(error, "Failed to delete tenant profile");
    }
  }
}

// Export schemas for use in routers
export const tenantSchemas = {
  createTenantSchema,
  updateTenantSchema,
  tenantIdSchema,
  userIdSchema,
};
