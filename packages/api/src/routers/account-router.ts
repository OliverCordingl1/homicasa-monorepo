import { protectedProcedure, router } from "..";
import { updateProfileFormSchema } from "../../../schemas/src/account";
import { AccountController } from "../controllers/account-controller";

export const accountRouter = router({
  updateAccountInformation: protectedProcedure
    .input(updateProfileFormSchema)
    .mutation(async ({ ctx, input }) => {
      const controller = new AccountController(ctx);
      return controller.updateUserAccount(input);
    }),
});
