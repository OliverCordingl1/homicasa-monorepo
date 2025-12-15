"use client";

import * as React from "react";

import { BusinessSwitcher } from "@/components/business-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import type { authClient } from "@/lib/auth-client";

export function AppSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  session: typeof authClient.$Infer.Session | null;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BusinessSwitcher />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>{session && <NavUser session={session} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
