import z from "zod";

export const businessMembershipSwitchButtonSchema = z.object({
  membershipId: z.cuid2(),
  businessId: z.cuid2(),
  businessName: z.string().min(1),
});

export type BusinessMembershipSwitchButtonSchemaType = z.infer<
  typeof businessMembershipSwitchButtonSchema
>;
