import { StepOne } from "./steps/step-one";
import { StepTwo } from "./steps/step-two";
import type { E164Number } from "libphonenumber-js";
import type { MultiStepConfig } from "@homicasa/multistep";
import {
  businessOnboarding,
  type BusinessOnboardingSchemaType,
} from "@homicasa/schemas";
export const onboardingConfig: MultiStepConfig<BusinessOnboardingSchemaType> = {
  steps: [StepOne, StepTwo],
  stepSchemas: [
    businessOnboarding.stepOneSchema,
    businessOnboarding.stepTwoSchema,
    null,
  ],
  fullSchema: businessOnboarding.fullSchema,
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
