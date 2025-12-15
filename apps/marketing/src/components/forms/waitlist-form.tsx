"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitWaitlistForm } from "@/lib/actions";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  showExtendedFields?: boolean;
  className?: string;
}

export function WaitlistForm({
  showExtendedFields = false,
  className,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const response = await submitWaitlistForm({
      email,
      name: showExtendedFields ? name : undefined,
      company: showExtendedFields ? company : undefined,
      role: showExtendedFields ? role : undefined,
    });

    setIsLoading(false);
    setResult(response);

    if (response.success) {
      setEmail("");
      setName("");
      setCompany("");
      setRole("");
    }
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <AnimatePresence mode="wait">
        {result?.success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-2xl bg-green-50 border border-green-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-green-800">You're in!</span>
            </div>
            <p className="text-green-700">{result.message}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {showExtendedFields && (
              <>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Company (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl appearance-none",
                      "bg-white border-2 border-surface-200",
                      "text-surface-900",
                      "transition-all duration-200 ease-out",
                      "hover:border-surface-300",
                      "focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10",
                      !role && "text-surface-400"
                    )}
                  >
                    <option value="">What best describes you?</option>
                    <option value="owner">Property Owner</option>
                    <option value="manager">Property Manager</option>
                    <option value="agent">Real Estate Agent</option>
                    <option value="tenant">Tenant</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-surface-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </>
            )}

            <div className={showExtendedFields ? "" : "flex gap-3"}>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={showExtendedFields ? "" : "flex-1"}
              />
              {showExtendedFields && <div className="h-2" />}
              <Button
                type="submit"
                disabled={isLoading}
                className={cn(showExtendedFields && "w-full")}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {result && !result.success && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600"
              >
                {result.message}
              </motion.p>
            )}

            <p className="text-sm text-surface-500 text-center">
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
