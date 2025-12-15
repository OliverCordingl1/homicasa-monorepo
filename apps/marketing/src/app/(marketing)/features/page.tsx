import type { Metadata } from "next";
import { FeaturesSection, CTASection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Discover the powerful features that make Homicasa the best property management platform for landlords and property managers.",
};

export default function FeaturesPage() {
  return (
    <>
      {/* Hero for Features page */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-600 font-semibold mb-4">Features</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 mb-6 text-balance">
              Built for modern property management
            </h1>
            <p className="text-xl text-surface-600 text-pretty">
              Everything you need to manage your properties efficiently, all in
              one beautiful, easy-to-use platform.
            </p>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <CTASection />
    </>
  );
}
