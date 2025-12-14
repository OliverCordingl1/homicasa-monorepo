"use client";
import { trpc } from "@/utils/trpc";
import type { BusinessMembershipSwitchButtonSchemaType } from "@homicasa/schemas";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { businessMembershipSwitchButtonSchema as smallMembershipSchema } from "../../../../packages/schemas/src/navigation";

// Key for storing active membership in localStorage
const ACTIVE_MEMBERSHIP_KEY = "activeMembership";

interface MultiTenantContextType {
  memberships?: BusinessMembershipSwitchButtonSchemaType[];
  activeMembership?: BusinessMembershipSwitchButtonSchemaType;
  setActiveMembership: (
    membership: BusinessMembershipSwitchButtonSchemaType
  ) => void;
}

const MultiTenantContext = createContext<MultiTenantContextType | undefined>(
  undefined
);

export const useMultiTenant = () => {
  const context = useContext(MultiTenantContext);
  if (!context) {
    throw new Error("useMultiTenant must be used within MultiTenantProvider");
  }
  return context;
};

export const MultiTenantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeMembership, setActiveMembership] =
    useState<BusinessMembershipSwitchButtonSchemaType>();

  const { data: memberships } = useQuery({
    ...trpc.businessMembers.getUserMemberships.queryOptions(),
    retry: 3,
    staleTime: 15 * 60 * 1000, // 15 minutes
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });

  // Load available memberships on update & validate
  useEffect(() => {
    if (!memberships || memberships.length === 0) return;

    const storedMembership = localStorage.getItem(ACTIVE_MEMBERSHIP_KEY);
    if (storedMembership) {
      try {
        const parsed = smallMembershipSchema.parse(
          JSON.parse(storedMembership)
        );
        const isValid = memberships.some((m) => {
          return (
            m.membershipId === parsed.membershipId &&
            m.businessId === parsed.businessId
          );
        });

        if (isValid) {
          const freshMembership = memberships.find(
            (m) =>
              m.membershipId === parsed.membershipId &&
              m.businessId === parsed.businessId
          );
          setActiveMembership(freshMembership);
        } else {
          throw new Error("Stored membership invalid or revoked");
        }
      } catch (e) {
        // Parsing error, default to first
        localStorage.removeItem(ACTIVE_MEMBERSHIP_KEY);
        setActiveMembership(memberships[0]);
      }
    } else {
      setActiveMembership(memberships[0]);
    }
  }, [memberships]);

  useEffect(() => {
    if (activeMembership) {
      localStorage.setItem(
        ACTIVE_MEMBERSHIP_KEY,
        JSON.stringify(activeMembership)
      );
    }
  }, [activeMembership]);

  // Placeholder for multi-tenant logic
  return (
    <MultiTenantContext.Provider
      value={{
        memberships,
        activeMembership,
        setActiveMembership,
      }}
    >
      {children}
    </MultiTenantContext.Provider>
  );
};
