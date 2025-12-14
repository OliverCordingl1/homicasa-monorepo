import { BusinessOnboardingForm } from "@/components/forms/business-onboarding-wizard";
import { Card, CardContent } from "@/components/ui/card";

export default async function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Let&apos;s get you set up.</h1>
      <p className="text-lg text-gray-700 mb-4">
        Let&apos;s get you set up with your new account.
      </p>

      <Card className="w-1/2">
        <CardContent className="pb-6">
          <BusinessOnboardingForm />
        </CardContent>
      </Card>
    </div>
  );
}
