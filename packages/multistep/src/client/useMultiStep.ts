"use client";

import { useContext } from "react";
import { MultiStepContext } from "./provider";
import type { ContextValue } from "../core/types";

/**
 * Hook to access the multi-step form context.
 * Must be used within a MultiStepFormProvider component.
 *
 * @template T - The type of the form data
 * @returns {ContextValue<T>} The multi-step form context containing:
 *   - step: Current step index
 *   - next: Function to advance to next step
 *   - back: Function to go to previous step
 *   - config: The multi-step form configuration
 *   - form: The TanStack Form API instance
 *
 * @throws {Error} If used outside of MultiStepFormProvider
 *
 * @example
 * ```tsx
 * function MyStepComponent() {
 *   const { step, next, back, form } = useMultiStep<FormData>();
 *   return (
 *     <div>
 *       <p>Current step: {step}</p>
 *       <button onClick={back}>Back</button>
 *       <button onClick={next}>Next</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useMultiStep<
  T extends Record<string, unknown> = Record<string, unknown>
>() {
  const ctx = useContext(MultiStepContext);
  if (!ctx)
    throw new Error("useMultiStep must be inside MultiStepFormProvider");
  return ctx as ContextValue<T>;
}
