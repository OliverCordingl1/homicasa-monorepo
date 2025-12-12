"use client";

import { useMultiStep } from "./useMultiStep";

/**
 * Default multi-step form component with built-in navigation UI.
 * Renders the current step component and provides Back/Next/Submit buttons.
 *
 * @returns {JSX.Element} A form with the current step and navigation controls
 *
 * @remarks
 * This is a basic implementation with default styling. You can create your own
 * multi-step form component using the `useMultiStep` hook for custom UI.
 *
 * @example
 * ```tsx
 * import { MultiStepFormProvider, MultiStepForm } from '@homicasa/multistep';
 *
 * <MultiStepFormProvider config={config}>
 *   <MultiStepForm />
 * </MultiStepFormProvider>
 * ```
 */
export function MultiStepForm() {
  const { step, next, back, config, form } = useMultiStep();
  const Step = config.steps[step];
  const isLast = step === config.steps.length - 1;

  if (!Step) {
    return null;
  }

  return (
    <div>
      <Step />

      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button onClick={back} className="px-4 py-2 bg-gray-200 rounded">
            Back
          </button>
        )}

        {!isLast ? (
          <button
            onClick={next}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <form.Subscribe
            selector={(s: { isSubmitting: boolean }) => s.isSubmitting}
            children={(isSubmitting: unknown) => (
              <button
                onClick={form.handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </button>
            )}
          />
        )}
      </div>
    </div>
  );
}
