import { protectedProcedure, router } from "../index";
import { BusinessMemberController } from "../controllers/business-member-controller";

export const businessMemberRouter = router({
  getUserMemberships: protectedProcedure.query(async ({ ctx }) => {
    const controller = new BusinessMemberController(ctx);
    return controller.getUserMemberships();
  }),
});
