import { protectedProcedure, publicProcedure, router } from "../index";
import {
  PropertyController,
  propertySchemas,
} from "../controllers/property-controller";

export const propertyRouter = router({
  // Public endpoints
  getById: publicProcedure
    .input(propertySchemas.propertyIdSchema)
    .query(async ({ ctx, input }) => {
      const controller = new PropertyController(ctx);
      return controller.getById(input);
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const controller = new PropertyController(ctx);
    return controller.getAll();
  }),

  getByCity: publicProcedure
    .input(propertySchemas.citySchema)
    .query(async ({ ctx, input }) => {
      const controller = new PropertyController(ctx);
      return controller.getByCity(input);
    }),

  getByCountry: publicProcedure
    .input(propertySchemas.countrySchema)
    .query(async ({ ctx, input }) => {
      const controller = new PropertyController(ctx);
      return controller.getByCountry(input);
    }),

  // Protected endpoints
  create: protectedProcedure
    .input(propertySchemas.createPropertySchema)
    .mutation(async ({ ctx, input }) => {
      const controller = new PropertyController(ctx);
      return controller.create(input);
    }),

  update: protectedProcedure
    .input(
      propertySchemas.updatePropertySchema.extend(
        propertySchemas.propertyIdSchema.shape
      )
    )
    .mutation(async ({ ctx, input }) => {
      const controller = new PropertyController(ctx);
      return controller.update(input);
    }),

  delete: protectedProcedure
    .input(propertySchemas.propertyIdSchema)
    .mutation(async ({ ctx, input }) => {
      const controller = new PropertyController(ctx);
      return controller.delete(input);
    }),
});
