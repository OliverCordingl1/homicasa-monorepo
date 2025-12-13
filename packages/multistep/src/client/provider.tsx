"use client";

import { useForm } from "@tanstack/react-form";
import { createContext, useState } from "react";
import type { ContextValue, MultiStepConfig } from "../core/types";
import { validateStepSchema } from "../core/helpers";

/**
 * React Context that provides multi-step form state and actions to child components.
 * Use the `useMultiStep` hook to access this context.
 */
export const MultiStepContext = createContext<ContextValue | null>(null);

/**
 * Provider component that manages multi-step form state and navigation.
 * Wraps TanStack Form with additional step management and per-step validation logic.
 *
 * @template T - The type of the complete form data
 * @param {Object} props - Component props
 * @param {MultiStepConfig<T>} props.config - Configuration for the multi-step form including steps, schemas, and default values
 * @param {React.ReactNode} props.children - Child components that will have access to the form context
 *
 * @example
 * ```tsx
 * const config = {
 *   steps: [StepOne, StepTwo, StepThree],
 *   stepSchemas: [stepOneSchema, stepTwoSchema, null],
 *   fullSchema: completeFormSchema,
 *   defaultValues: { name: '', email: '' }
 * };
 *
 * <MultiStepFormProvider config={config}>
 *   <YourFormComponent />
 * </MultiStepFormProvider>
 * ```
 */
export function MultiStepFormProvider<T extends Record<string, unknown>>({
  config,
  children,
  onSubmit: overrideOnSubmit,
}: {
  config: MultiStepConfig<T>;
  children: React.ReactNode;
  onSubmit?: (submission: { value: T }) => Promise<void | any>;
}) {
  const [step, setStep] = useState(0);
  const { defaultValues, stepSchemas } = config;

  const form = useForm({
    defaultValues,
    onSubmit: async (submission) => {
      const handler = overrideOnSubmit || config.onSubmit;
      if (handler) {
        return handler(submission);
      }
      console.log("Form submitted:", submission.value);
    },
  });

  /**
   * Validates the current step's form data against its schema.
   * If validation fails, sets field-level errors in the form state.
   * @returns {Promise<boolean>} True if validation passes or no schema exists, false otherwise
   */
  const validateCurrentStep = async () => {
    const values = form.state.values;
    const currentSchema = stepSchemas[step];
    if (!currentSchema) return true;
    const issues = validateStepSchema(currentSchema, values);

    if (Array.isArray(issues)) {
      issues.forEach((issue) => {
        const fieldName = issue.path.join(".");
        form.setFieldMeta(fieldName, (prev: any) => ({
          ...prev,
          isTouched: true,
          errorMap: {
            onChange: issue.message,
          },
        }));
      });
      return false;
    }
    return true;
  };

  /**
   * Advances to the next step if current step validation passes.
   * Does nothing if validation fails or already on the last step.
   * @returns {Promise<void>}
   */
  const next = async () => {
    if (await validateCurrentStep()) {
      setStep((s) => s + 1);
    }
  };

  /**
   * Goes back to the previous step.
   * Does nothing if already on the first step.
   */
  const back = () => setStep((s) => s - 1);

  return (
    <MultiStepContext.Provider
      value={
        {
          step,
          next,
          back,
          config,
          form,
        } as ContextValue
      }
    >
      {children}
    </MultiStepContext.Provider>
  );
}
