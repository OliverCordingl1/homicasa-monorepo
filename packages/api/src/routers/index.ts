import { protectedProcedure, publicProcedure, router } from "../index";
import { propertyRouter } from "./property-router";
import { businessRouter } from "./business-router";
import { tenantRouter } from "./tenant-router";

export const appRouter = router({
  // Health check endpoint
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),

  // Example protected endpoint
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),

  // Domain routers
  properties: propertyRouter,
  businesses: businessRouter,
  tenants: tenantRouter,
});

export type AppRouter = typeof appRouter;
