import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center font-semibold",
          "transition-all duration-300 ease-out-expo",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          "active:scale-[0.98]",

          // Size variants
          {
            "text-sm px-4 py-2 rounded-lg gap-1.5": size === "sm",
            "text-base px-6 py-3 rounded-xl gap-2": size === "md",
            "text-lg px-8 py-4 rounded-2xl gap-2.5": size === "lg",
          },

          // Style variants
          {
            // Primary - rich gradient with subtle animation
            "bg-linear-to-br from-brand-600 via-brand-700 to-brand-800 text-white shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30 hover:from-brand-500 hover:via-brand-600 hover:to-brand-700":
              variant === "primary",

            // Secondary - soft, inviting
            "bg-surface-100 text-surface-800 hover:bg-surface-200 border border-surface-200":
              variant === "secondary",

            // Ghost - minimal
            "text-surface-700 hover:text-surface-900 hover:bg-surface-100":
              variant === "ghost",

            // Outline - refined border
            "bg-transparent border-2 border-surface-300 text-surface-800 hover:border-brand-500 hover:text-brand-700 hover:bg-brand-50":
              variant === "outline",
          },

          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
