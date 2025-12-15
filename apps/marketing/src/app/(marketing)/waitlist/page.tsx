import type { Metadata } from "next";
import { WaitlistForm } from "@/components/forms";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Join the Waitlist",
  description:
    "Be the first to experience Homicasa. Join our waitlist for early access to the modern property management platform.",
};

const benefits = [
  "Early access to all features",
  "Founding member pricing",
  "Direct input on product roadmap",
  "Priority support",
];

export default function WaitlistPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 md:pt-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-brand-100/50 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-accent-100/40 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left side - Content */}
            <div>
              <p className="text-brand-600 font-semibold mb-4">Early Access</p>
              <h1 className="text-4xl md:text-5xl font-bold text-surface-900 mb-6 text-balance">
                Be the first to experience the future of property management
              </h1>
              <p className="text-xl text-surface-600 mb-10 text-pretty">
                We're building something special. Join our waitlist to get
                exclusive early access and help shape the product.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-brand-700" />
                    </div>
                    <span className="text-surface-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Form */}
            <div className="lg:pl-8">
              <div className="p-8 md:p-10 rounded-3xl bg-white shadow-xl shadow-surface-200/50 border border-surface-200">
                <h2 className="text-2xl font-bold text-surface-900 mb-2">
                  Join the waitlist
                </h2>
                <p className="text-surface-600 mb-8">
                  We'll notify you as soon as we're ready to launch.
                </p>
                <WaitlistForm showExtendedFields className="max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
