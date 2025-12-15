"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-brand-600 via-brand-700 to-brand-800" />
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-500/20 rounded-full blur-[96px]" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            Ready to transform your property management?
          </h2>
          <p className="text-xl text-brand-100 mb-10 text-pretty">
            Join hundreds of property professionals who are already on the
            waitlist. Be the first to experience the future of property
            management.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-brand-700 hover:bg-brand-50 shadow-xl shadow-brand-900/20"
              asChild
            >
              <Link href="/waitlist" className="gap-2">
                Get Early Access
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10"
              asChild
            >
              <Link href="/features">Learn More</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
