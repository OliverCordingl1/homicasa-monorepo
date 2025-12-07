import { protectedProcedure, router } from "../index";
import {
  TenantController,
  tenantSchemas,
} from "../controllers/tenant-controller";

export const tenantRouter = router({
  // All tenant endpoints are protected
  getById: protectedProcedure
    .input(tenantSchemas.tenantIdSchema)
    .query(async ({ ctx, input }) => {
      const controller = new TenantController(ctx);
      return controller.getById(input);
    }),

  getByUserId: protectedProcedure
    .input(tenantSchemas.userIdSchema)
    .query(async ({ ctx, input }) => {
      const controller = new TenantController(ctx);
      return controller.getByUserId(input);
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const controller = new TenantController(ctx);
    return controller.getAll();
  }),

  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const controller = new TenantController(ctx);
    return controller.getCurrent();
  }),

  create: protectedProcedure
    .input(tenantSchemas.createTenantSchema)
    .mutation(async ({ ctx, input }) => {
      const controller = new TenantController(ctx);
      return controller.create(input);
    }),

  update: protectedProcedure
    .input(tenantSchemas.tenantIdSchema)
    .mutation(async ({ ctx, input }) => {
      const controller = new TenantController(ctx);
      return controller.update(input);
    }),

  delete: protectedProcedure
    .input(tenantSchemas.tenantIdSchema)
    .mutation(async ({ ctx, input }) => {
      const controller = new TenantController(ctx);
      return controller.delete(input);
    }),
});
