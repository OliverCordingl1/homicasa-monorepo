import { BaseController } from "./base-controller";
import { PropertyService } from "../services/property-service";
import { z } from "zod";

// Validation schemas
const createPropertySchema = z.object({
  displayName: z.string().min(1).max(255),
  addressLine1: z.string().min(1).max(255),
  addressLine2: z.string().max(255).optional(),
  city: z.string().min(1).max(100),
  state: z.string().max(100).optional(),
  postalCode: z.string().min(1).max(20),
  country: z.string().length(2), // ISO 3166-1 alpha-2
});

const updatePropertySchema = createPropertySchema.partial();

const propertyIdSchema = z.object({
  id: z.string(),
});

const citySchema = z.object({
  city: z.string(),
});

const countrySchema = z.object({
  country: z.string().length(2),
});

export class PropertyController extends BaseController {
  private propertyService: PropertyService;

  constructor(ctx: any) {
    super(ctx);
    this.propertyService = new PropertyService(ctx);
  }

  /**
   * Get a property by ID
   */
  async getById(input: z.infer<typeof propertyIdSchema>) {
    try {
      const { id } = propertyIdSchema.parse(input);
      const property = await this.propertyService.getPropertyById(id);

      if (!property) {
        throw new Error(`Property with id ${id} not found`);
      }

      return property;
    } catch (error) {
      return this.handleError(error, "Failed to get property");
    }
  }

  /**
   * Get all properties
   */
  async getAll() {
    try {
      return await this.propertyService.getAllProperties();
    } catch (error) {
      return this.handleError(error, "Failed to get properties");
    }
  }

  /**
   * Get properties by city
   */
  async getByCity(input: z.infer<typeof citySchema>) {
    try {
      const { city } = citySchema.parse(input);
      return await this.propertyService.getPropertiesByCity(city);
    } catch (error) {
      return this.handleError(error, "Failed to get properties by city");
    }
  }

  /**
   * Get properties by country
   */
  async getByCountry(input: z.infer<typeof countrySchema>) {
    try {
      const { country } = countrySchema.parse(input);
      return await this.propertyService.getPropertiesByCountry(country);
    } catch (error) {
      return this.handleError(error, "Failed to get properties by country");
    }
  }

  /**
   * Create a new property
   */
  async create(input: z.infer<typeof createPropertySchema>) {
    try {
      const validatedData = createPropertySchema.parse(input);
      return await this.propertyService.createProperty(validatedData);
    } catch (error) {
      return this.handleError(error, "Failed to create property");
    }
  }

  /**
   * Update a property
   */
  async update(
    input: z.infer<typeof propertyIdSchema> &
      z.infer<typeof updatePropertySchema>
  ) {
    try {
      const { id } = propertyIdSchema.parse(input);
      const updateData = updatePropertySchema.parse(input);
      return await this.propertyService.updateProperty(id, updateData);
    } catch (error) {
      return this.handleError(error, "Failed to update property");
    }
  }

  /**
   * Delete a property
   */
  async delete(input: z.infer<typeof propertyIdSchema>) {
    try {
      const { id } = propertyIdSchema.parse(input);
      return await this.propertyService.deleteProperty(id);
    } catch (error) {
      return this.handleError(error, "Failed to delete property");
    }
  }
}

// Export schemas for use in routers
export const propertySchemas = {
  createPropertySchema,
  updatePropertySchema,
  propertyIdSchema,
  citySchema,
  countrySchema,
};
