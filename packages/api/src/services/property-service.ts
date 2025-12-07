import { BaseService } from "./base-service";
import {
  PropertyRepository,
  type Property,
  type NewProperty,
} from "@homicasa/db/repositories/property-repository";
import { db } from "@homicasa/db";

export class PropertyService extends BaseService {
  private propertyRepository: PropertyRepository;

  constructor(ctx: any) {
    super(ctx);
    this.propertyRepository = new PropertyRepository(db);
  }

  /**
   * Get a property by ID
   */
  async getPropertyById(id: string): Promise<Property | undefined> {
    return this.propertyRepository.findById(id);
  }

  /**
   * Get all properties
   */
  async getAllProperties(): Promise<Property[]> {
    return this.propertyRepository.findAll();
  }

  /**
   * Get properties by city
   */
  async getPropertiesByCity(city: string): Promise<Property[]> {
    return this.propertyRepository.findByCity(city);
  }

  /**
   * Get properties by country
   */
  async getPropertiesByCountry(country: string): Promise<Property[]> {
    return this.propertyRepository.findByCountry(country);
  }

  /**
   * Create a new property
   */
  async createProperty(data: NewProperty): Promise<Property> {
    // Add any business logic here (validation, authorization, etc.)
    this.getCurrentUserId(); // Ensure user is authenticated

    return this.propertyRepository.create(data);
  }

  /**
   * Update an existing property
   */
  async updateProperty(
    id: string,
    data: Partial<NewProperty>
  ): Promise<Property> {
    this.getCurrentUserId(); // Ensure user is authenticated

    const updated = await this.propertyRepository.update(id, data);
    if (!updated) {
      throw new Error(`Property with id ${id} not found`);
    }

    return updated;
  }

  /**
   * Delete a property
   */
  async deleteProperty(id: string): Promise<Property> {
    this.getCurrentUserId(); // Ensure user is authenticated

    const deleted = await this.propertyRepository.delete(id);
    if (!deleted) {
      throw new Error(`Property with id ${id} not found`);
    }

    return deleted;
  }
}
