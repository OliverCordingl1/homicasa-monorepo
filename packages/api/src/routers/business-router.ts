import { protectedProcedure, publicProcedure, router } from "../index";
import {
  BusinessController,
  businessSchemas,
} from "../controllers/business-controller";
import { businessOnboarding } from "@homicasa/schemas";

export const businessRouter = router({
  // Public endpoints
  getById: publicProcedure
    .input(businessSchemas.businessIdSchema)
    .query(async ({ ctx, input }) => {
      const controller = new BusinessController(ctx);
      return controller.getById(input);
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const controller = new BusinessController(ctx);
    return controller.getAll();
  }),

  getByEmail: publicProcedure
    .input(businessSchemas.businessEmailSchema)
    .query(async ({ ctx, input }) => {
      const controller = new BusinessController(ctx);
      return controller.getByEmail(input);
    }),

  // Protected endpoints
  create: protectedProcedure
    .input(businessSchemas.createBusinessSchema)
    .mutation(async ({ ctx, input }) => {
      const controller = new BusinessController(ctx);
      return controller.create(input);
    }),

  update: protectedProcedure
    .input(
      businessSchemas.updateBusinessSchema.extend(
        businessSchemas.businessIdSchema.shape
      )
    )
    .mutation(async ({ ctx, input }) => {
      const controller = new BusinessController(ctx);
      return controller.update(input);
    }),

  delete: protectedProcedure
    .input(businessSchemas.businessIdSchema)
    .mutation(async ({ ctx, input }) => {
      const controller = new BusinessController(ctx);
      return controller.delete(input);
    }),

  onboard: protectedProcedure
    .input(businessOnboarding.fullSchema)
    .mutation(async ({ ctx, input }) => {
      const controller = new BusinessController(ctx);
      return controller.onboard(input);
    }),
});
