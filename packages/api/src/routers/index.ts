import { protectedProcedure, publicProcedure, router } from "../index";
import { propertyRouter } from "./property-router";
import { businessRouter } from "./business-router";
import { businessMemberRouter } from "./business-member-router";
import { tenantRouter } from "./tenant-router";
import { accountRouter } from "./account-router";

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
  businessMembers: businessMemberRouter,
  tenants: tenantRouter,
  accounts: accountRouter,
});

export type AppRouter = typeof appRouter;
