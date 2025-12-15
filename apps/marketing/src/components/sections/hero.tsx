"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-brand-200/40 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-accent-200/30 rounded-full blur-[128px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-surface-900) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-surface-900) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="brand" className="mb-8 gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Now accepting early access signups
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-surface-900 leading-[1.1] tracking-tight mb-8 text-balance"
          >
            Property management,{" "}
            <span className="gradient-text">reimagined</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-surface-600 leading-relaxed mb-12 max-w-2xl mx-auto text-pretty"
          >
            The all-in-one platform that helps landlords and property managers
            organize, automate, and grow their rental business.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/waitlist" className="gap-2">
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/features">See Features</Link>
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 pt-16 border-t border-surface-200"
          >
            <p className="text-sm text-surface-500 mb-6">
              Trusted by property professionals
            </p>
            <div className="flex items-center justify-center gap-12 opacity-60">
              {/* Placeholder logos - replace with actual partner logos */}
              {["Company A", "Company B", "Company C"].map((company) => (
                <div
                  key={company}
                  className="text-surface-400 font-semibold text-lg"
                >
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
