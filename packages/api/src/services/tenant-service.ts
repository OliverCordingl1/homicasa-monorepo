import { BaseService } from "./base-service";
import {
  TenantRepository,
  type TenantProfile,
  type NewTenantProfile,
} from "@homicasa/db/repositories/tenant-repository";
import { db } from "@homicasa/db";

export class TenantService extends BaseService {
  private tenantRepository: TenantRepository;

  constructor(ctx: any) {
    super(ctx);
    this.tenantRepository = new TenantRepository(db);
  }

  /**
   * Get a tenant profile by ID
   */
  async getTenantById(id: string): Promise<TenantProfile | undefined> {
    return this.tenantRepository.findById(id);
  }

  /**
   * Get a tenant profile by user ID
   */
  async getTenantByUserId(userId: string): Promise<TenantProfile | undefined> {
    return this.tenantRepository.findByUserId(userId);
  }

  /**
   * Get all tenant profiles
   */
  async getAllTenants(): Promise<TenantProfile[]> {
    return this.tenantRepository.findAll();
  }

  /**
   * Create a new tenant profile
   */
  async createTenant(data: NewTenantProfile): Promise<TenantProfile> {
    // Add any business logic here (validation, authorization, etc.)
    this.getCurrentUserId(); // Ensure user is authenticated

    // Check if tenant profile already exists for this user
    const existing = await this.tenantRepository.findByUserId(data.userId);
    if (existing) {
      throw new Error(`Tenant profile for user ${data.userId} already exists`);
    }

    return this.tenantRepository.create(data);
  }

  /**
   * Update an existing tenant profile
   */
  async updateTenant(
    id: string,
    data: Partial<NewTenantProfile>
  ): Promise<TenantProfile> {
    this.getCurrentUserId(); // Ensure user is authenticated

    const updated = await this.tenantRepository.update(id, data);
    if (!updated) {
      throw new Error(`Tenant profile with id ${id} not found`);
    }

    return updated;
  }

  /**
   * Delete a tenant profile
   */
  async deleteTenant(id: string): Promise<TenantProfile> {
    this.getCurrentUserId(); // Ensure user is authenticated

    const deleted = await this.tenantRepository.delete(id);
    if (!deleted) {
      throw new Error(`Tenant profile with id ${id} not found`);
    }

    return deleted;
  }

  /**
   * Get the current user's tenant profile
   */
  async getCurrentTenantProfile(): Promise<TenantProfile | undefined> {
    const userId = this.getCurrentUserId();
    return this.tenantRepository.findByUserId(userId);
  }
}
