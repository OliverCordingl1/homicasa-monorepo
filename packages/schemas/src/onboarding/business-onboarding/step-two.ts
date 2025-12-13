import z from "zod";

export const stepTwoSchema = z.object({
  businessAddressLine1: z.string().min(1, "Address Line 1 is required"),
  businessAddressLine2: z.string().optional(),
  businessAddressLine3: z.string().optional(),
  businessAddressLine4: z.string().optional(),
  businessCity: z.string().min(1, "City is required"),
  businessCounty: z.string().optional(),
  businessState: z.string().optional(),
  businessPostcode: z.string().min(1, "Postcode is required"),
  businessCountry: z.string().regex(/^[A-Z]{2}$/, "Invalid country code"), // ISO 3166-1 alpha-2
});

export type StepTwoSchemaType = z.infer<typeof stepTwoSchema>;
