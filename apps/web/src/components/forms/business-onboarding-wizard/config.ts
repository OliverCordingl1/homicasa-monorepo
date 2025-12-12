import { z } from "zod";
import { StepOne, stepOneSchema } from "./steps/step-one";
import { StepTwo, stepTwoSchema } from "./steps/step-two";
import type { E164Number } from "libphonenumber-js";

export const fullSchema = z.intersection(stepOneSchema, stepTwoSchema);

export const onboardingConfig = {
  steps: [StepOne, StepTwo],
  stepSchemas: [stepOneSchema, stepTwoSchema, null],
  fullSchema,
  defaultValues: {
    businessDisplayName: "",
    businessType: "sole_trader" as const,
    businessLegalName: { firstName: "", lastName: "" },
    businessEmail: "",
    businessPhone: "" as E164Number,
    businessAddressLine1: "",
    businessAddressLine2: "",
    businessAddressLine3: "",
    businessAddressLine4: "",
    businessCity: "",
    businessCounty: "",
    businessState: "",
    businessPostcode: "",
    businessCountry: "",
  },
};
