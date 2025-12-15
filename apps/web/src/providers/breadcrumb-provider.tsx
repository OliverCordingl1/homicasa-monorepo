"use client";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { createContext, useContext, useState } from "react";

export type BreadcrumbItem = {
  title: string;
  href?: string;
};

const BreadcrumbContext = createContext<
  | {
      breadcrumbs: BreadcrumbItem[];
      setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
    }
  | undefined
>(undefined);

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbs() {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider");
  }
  return context;
}
