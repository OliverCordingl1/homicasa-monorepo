"use client";

import { useMultiStep } from "./useMultiStep";
import type { ReactNode } from "react";

export interface MultiStepFormProps {
  className?: string;
  renderNavigation?: (props: {
    step: number;
    isLast: boolean;
    canGoBack: boolean;
    onBack: () => void;
    onNext: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
  }) => ReactNode;
}

/**
 * Unstyled multi-step form component that renders steps and navigation.
 * Accepts a renderNavigation prop for custom button styling.
 *
 * @example
 * ```tsx
 * <MultiStepForm
 *   renderNavigation={({ canGoBack, onBack, onNext, onSubmit, isLast, isSubmitting }) => (
 *     <div className="flex justify-between mt-6">
 *       {canGoBack && <Button onClick={onBack}>Back</Button>}
 *       {!isLast ? (
 *         <Button onClick={onNext}>Next</Button>
 *       ) : (
 *         <Button onClick={onSubmit} disabled={isSubmitting}>Submit</Button>
 *       )}
 *     </div>
 *   )}
 * />
 * ```
 */
export function MultiStepForm({
  className,
  renderNavigation,
}: MultiStepFormProps) {
  const { step, next, back, config, form } = useMultiStep();
  const Step = config.steps[step];
  const isLast = step === config.steps.length - 1;
  const canGoBack = step > 0;

  if (!Step) {
    return null;
  }

  return (
    <div className={className}>
      <Step />
      {renderNavigation ? (
        <form.Subscribe
          selector={(s: { isSubmitting: boolean }) => s.isSubmitting}
          children={(isSubmitting: unknown) =>
            renderNavigation({
              step,
              isLast,
              canGoBack,
              onBack: back,
              onNext: next,
              onSubmit: form.handleSubmit,
              isSubmitting: !!isSubmitting,
            })
          }
        />
      ) : null}
    </div>
  );
}
