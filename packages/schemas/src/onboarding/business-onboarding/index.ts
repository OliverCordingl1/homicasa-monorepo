import { z } from "zod";

import { stepOneSchema, type StepOneSchemaType } from "./step-one";
import { stepTwoSchema, type StepTwoSchemaType } from "./step-two";

export const fullSchema = z.intersection(stepOneSchema, stepTwoSchema);

export { stepOneSchema, stepTwoSchema };

export type BusinessOnboardingSchemaType = z.infer<typeof fullSchema>;
export type BusinessOnboardingStepOneSchemaType = StepOneSchemaType;
export type BusinessOnboardingStepTwoSchemaType = StepTwoSchemaType;
