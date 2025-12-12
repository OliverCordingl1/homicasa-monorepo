import { type ReactFormExtendedApi } from "@tanstack/react-form";
import { z } from "zod";

/**
 * Configuration object for a multi-step form.
 * @template T - The type of the complete form data across all steps
 * @property {React.ComponentType[]} steps - Array of React components representing each step of the form
 * @property {(z.ZodTypeAny | null)[]} stepSchemas - Array of Zod schemas for validating each step. Use null for steps without validation
 * @property {z.ZodType<T>} fullSchema - The complete Zod schema for the entire form data
 * @property {T} defaultValues - Initial/default values for all form fields
 */
export type MultiStepConfig<T> = {
  steps: React.ComponentType[];
  stepSchemas: (z.ZodTypeAny | null)[];
  fullSchema: z.ZodType<T>;
  defaultValues: T;
};

/**
 * Context value provided by MultiStepFormProvider to all child components.
 * @template T - The type of the form data, defaults to a generic record
 * @property {number} step - Current step index (0-based)
 * @property {Function} next - Function to advance to the next step after validating current step
 * @property {Function} back - Function to go back to the previous step
 * @property {MultiStepConfig<T>} config - The multi-step form configuration
 * @property {ReactFormExtendedApi} form - The TanStack Form API instance with Field component
 */
export type ContextValue<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  step: number;
  next: () => Promise<void>;
  back: () => void;
  config: MultiStepConfig<T>;
  form: ReactFormExtendedApi<
    T,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >;
};
