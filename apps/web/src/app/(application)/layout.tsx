import { RenderBreadcrumbs } from "@/components/render-breadcrumbs";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BreadcrumbProvider } from "@/providers/breadcrumb-provider";
import { MultiTenantProvider } from "@/providers/multitenant-provider";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
      throw: true,
    },
  });

  return (
    <MultiTenantProvider>
      <BreadcrumbProvider>
        <SidebarProvider>
          <AppSidebar session={session} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <RenderBreadcrumbs />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </BreadcrumbProvider>
    </MultiTenantProvider>
  );
}
