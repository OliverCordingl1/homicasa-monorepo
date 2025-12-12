/**
 * @packageDocumentation
 * Multi-step form library built on top of TanStack Form and Zod.
 * Provides a declarative way to create multi-step forms with per-step validation.
 *
 * @example
 * ```tsx
 * import { MultiStepFormProvider, useMultiStep, MultiStepConfig } from '@homicasa/multistep';
 * import { z } from 'zod';
 *
 * const config: MultiStepConfig<FormData> = {
 *   steps: [PersonalInfoStep, AddressStep, ReviewStep],
 *   stepSchemas: [personalSchema, addressSchema, null],
 *   fullSchema: completeFormSchema,
 *   defaultValues: { name: '', email: '', address: '' }
 * };
 *
 * function App() {
 *   return (
 *     <MultiStepFormProvider config={config}>
 *       <MyCustomForm />
 *     </MultiStepFormProvider>
 *   );
 * }
 * ```
 */

// Helper exports
export * from "./core/types";
export * from "./core/helpers";

// Client exports
export * from "./client/provider";
export * from "./client/useMultiStep";
export * from "./client/index";
