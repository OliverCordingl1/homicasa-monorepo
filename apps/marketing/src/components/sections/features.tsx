"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  Bell,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Property Portfolio",
    description:
      "Manage all your properties in one place. Track units, amenities, and maintenance history effortlessly.",
  },
  {
    icon: Users,
    title: "Tenant Management",
    description:
      "Keep tenant information organized. From applications to renewals, streamline every interaction.",
  },
  {
    icon: FileText,
    title: "Smart Leases",
    description:
      "Create, send, and manage lease agreements digitally. E-signatures make it seamless.",
  },
  {
    icon: CreditCard,
    title: "Rent Collection",
    description:
      "Accept payments online. Automatic reminders and tracking for on-time payments.",
  },
  {
    icon: BarChart3,
    title: "Financial Insights",
    description:
      "Real-time dashboards showing income, expenses, and profitability across your portfolio.",
  },
  {
    icon: Bell,
    title: "Maintenance Tracking",
    description:
      "Handle repair requests efficiently. Assign vendors, track progress, and communicate with tenants.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-surface-50 to-white" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-brand-600 font-semibold mb-4">Features</p>
            <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-6 text-balance">
              Everything you need to manage properties professionally
            </h2>
            <p className="text-xl text-surface-600 text-pretty">
              Powerful tools designed for modern property management, without
              the complexity of legacy software.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card hover className="h-full">
                <CardContent>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand-100 to-brand-200 flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-brand-700" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-surface-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-surface-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 md:mt-24 p-8 md:p-12 rounded-3xl bg-linear-to-br from-surface-900 to-surface-800 text-white"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-400" />
                  <span className="text-sm font-medium text-brand-300">
                    Enterprise-ready
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent-400" />
                  <span className="text-sm font-medium text-accent-300">
                    Lightning fast
                  </span>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Built for scale, designed for simplicity
              </h3>
              <p className="text-surface-300 text-lg">
                Whether you manage 5 units or 500, Homicasa grows with you.
                Modern architecture means blazing fast performance, always.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 rounded-2xl bg-white/5">
                <div className="text-4xl font-bold text-brand-400 mb-2">
                  99.9%
                </div>
                <div className="text-sm text-surface-400">Uptime SLA</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/5">
                <div className="text-4xl font-bold text-brand-400 mb-2">
                  &lt;50ms
                </div>
                <div className="text-sm text-surface-400">Response time</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
