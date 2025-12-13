"use client";

import { MultiStepFormProvider, MultiStepForm } from "@homicasa/multistep";
import { Button } from "@/components/ui/button";
import { onboardingConfig } from "./config";

export function BusinessOnboardingForm() {
  return (
    <MultiStepFormProvider config={onboardingConfig}>
      <MultiStepForm
        className="w-full"
        renderNavigation={({
          canGoBack,
          onBack,
          onNext,
          onSubmit,
          isLast,
          isSubmitting,
        }) => (
          <div className="flex justify-between items-center gap-4 mt-8 pt-6 border-t">
            {canGoBack ? (
              <Button type="button" onClick={onBack} variant="outline">
                Back
              </Button>
            ) : (
              <div />
            )}
            {!isLast ? (
              <Button type="button" onClick={onNext} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="ml-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        )}
      />
    </MultiStepFormProvider>
  );
}
