import { BaseService } from "./base-service";
import {
  BusinessRepository,
  type Business,
  type NewBusiness,
} from "@homicasa/db/repositories/business-repository";
import { db } from "@homicasa/db";

export class BusinessService extends BaseService {
  private businessRepository: BusinessRepository;

  constructor(ctx: any) {
    super(ctx);
    this.businessRepository = new BusinessRepository(db);
  }

  /**
   * Get a business by ID
   */
  async getBusinessById(id: string): Promise<Business | undefined> {
    return this.businessRepository.findById(id);
  }

  /**
   * Get all businesses
   */
  async getAllBusinesses(): Promise<Business[]> {
    return this.businessRepository.findAll();
  }

  /**
   * Get a business by email
   */
  async getBusinessByEmail(email: string): Promise<Business | undefined> {
    return this.businessRepository.findByEmail(email);
  }

  /**
   * Create a new business
   */
  async createBusiness(data: NewBusiness): Promise<Business> {
    // Add any business logic here (validation, authorization, etc.)
    this.getCurrentUserId(); // Ensure user is authenticated

    // Check if business with email already exists
    const existing = await this.businessRepository.findByEmail(data.email);
    if (existing) {
      throw new Error(`Business with email ${data.email} already exists`);
    }

    return this.businessRepository.create(data);
  }

  /**
   * Update an existing business
   */
  async updateBusiness(
    id: string,
    data: Partial<NewBusiness>
  ): Promise<Business> {
    this.getCurrentUserId(); // Ensure user is authenticated

    // If updating email, check it doesn't conflict
    if (data.email) {
      const existing = await this.businessRepository.findByEmail(data.email);
      if (existing && existing.id !== id) {
        throw new Error(`Business with email ${data.email} already exists`);
      }
    }

    const updated = await this.businessRepository.update(id, data);
    if (!updated) {
      throw new Error(`Business with id ${id} not found`);
    }

    return updated;
  }

  /**
   * Delete a business
   */
  async deleteBusiness(id: string): Promise<Business> {
    this.getCurrentUserId(); // Ensure user is authenticated

    const deleted = await this.businessRepository.delete(id);
    if (!deleted) {
      throw new Error(`Business with id ${id} not found`);
    }

    return deleted;
  }
}
