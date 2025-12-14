"use client";

import * as React from "react";
import { ChevronsUpDown, House, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useMultiTenant } from "@/providers/multitenant-provider";
import { cn } from "@/lib/utils";

export function BusinessSwitcher() {
  const { isMobile } = useSidebar();
  const { memberships, activeMembership, setActiveMembership } =
    useMultiTenant();

  if (!activeMembership) {
    return null; // TODO: Loading state, skeleton?
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={cn(
                "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                {
                  "bg-sidebar-accent": memberships && memberships.length === 1,
                  "cursor-pointer": memberships && memberships.length > 1,
                }
              )}
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <House className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeMembership.businessName}
                </span>
              </div>
              {memberships && memberships.length > 1 && (
                <ChevronsUpDown className="ml-auto" />
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {memberships && memberships.length > 1 && (
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Profiles
              </DropdownMenuLabel>
              {memberships.map((business) => (
                <DropdownMenuItem
                  key={business.membershipId}
                  onClick={() => setActiveMembership(business)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <House className="size-3.5 shrink-0" />
                  </div>
                  {business.businessName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
