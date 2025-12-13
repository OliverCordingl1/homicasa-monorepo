import z from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const stepOneSchema = z.discriminatedUnion("businessType", [
  z.object({
    businessDisplayName: z.string().min(1, "Business Display Name is required"),
    businessType: z.literal("sole_trader"),
    businessLegalName: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
    }),
    businessEmail: z.email("Invalid email address"),
    businessPhone: z
      .string()
      .min(1, "Business Phone is required")
      .transform((val, ctx) => {
        const phoneNumber = parsePhoneNumberFromString(val, {
          defaultCountry: "GB",
          extract: false,
        });

        if (!phoneNumber?.isValid()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid phone number",
          });
          return z.NEVER;
        }

        return phoneNumber.number;
      }),
  }),
  z.object({
    businessDisplayName: z.string().min(1, "Business Display Name is required"),
    businessType: z.enum(["partnership", "limited_company", "llp", "other"]),
    businessLegalName: z.string().min(1, "Business Legal Name is required"),
    businessEmail: z.email("Invalid email address"),
    businessPhone: z
      .string()
      .min(1, "Business Phone is required")
      .transform((val, ctx) => {
        const phoneNumber = parsePhoneNumberFromString(val, {
          defaultCountry: "GB",
          extract: false,
        });

        if (!phoneNumber?.isValid()) {
          ctx.addIssue({
            code: "custom",
            message: "Invalid phone number",
          });
          return z.NEVER;
        }

        return phoneNumber.number;
      }),
  }),
]);

export type StepOneSchemaType = z.infer<typeof stepOneSchema>;
