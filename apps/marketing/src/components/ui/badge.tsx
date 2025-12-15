import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "brand" | "accent";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        {
          "bg-surface-100 text-surface-700": variant === "default",
          "bg-brand-100 text-brand-700": variant === "brand",
          "bg-accent-100 text-accent-700": variant === "accent",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
