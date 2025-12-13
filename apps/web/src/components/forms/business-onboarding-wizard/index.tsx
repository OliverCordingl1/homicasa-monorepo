"use client";

import { useMutation } from "@tanstack/react-query";
import { MultiStepFormProvider, MultiStepForm } from "@homicasa/multistep";
import { Button } from "@/components/ui/button";
import { onboardingConfig } from "./config";
import { trpc, queryClient } from "@/utils/trpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function BusinessOnboardingForm() {
  const router = useRouter();
  const onboardMutation = useMutation({
    ...trpc.businesses.onboard.mutationOptions(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: trpc.businesses.getAll.queryKey(),
      });
      toast.success("Business onboarded successfully!");
      router.push("/dashboard");
    },
  });

  return (
    <MultiStepFormProvider
      config={onboardingConfig}
      onSubmit={async ({ value }) => onboardMutation.mutateAsync(value)}
    >
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
