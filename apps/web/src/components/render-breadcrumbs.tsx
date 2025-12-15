"use client";

import { useBreadcrumbs } from "@/providers/breadcrumb-provider";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Fragment } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { isExternalLink } from "@/lib/utils";

// Function to render breadcrumbs for navigation, based on the current breadcrumb context.

export function RenderBreadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  // Function to truncate long breadcumb lists (>3 items) to show first, ellipsis, and last two items.
  const renderBreadcrumbItems = () => {
    const itemsToRender =
      breadcrumbs.length > 3
        ? [breadcrumbs[0], { truncated: true }, ...breadcrumbs.slice(-1)]
        : breadcrumbs;

    return itemsToRender.map((breadcrumb, index) => {
      const isLast = index === itemsToRender.length - 1;
      return (
        <Fragment key={index}>
          <BreadcrumbItem>
            {"truncated" in breadcrumb && breadcrumb.truncated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {breadcrumbs.slice(1, -2).map((bc, i) => (
                    <DropdownMenuItem key={i} className="gap-2 p-2">
                      {bc.href ? (
                        isExternalLink(bc.href) ? (
                          <a
                            href={bc.href}
                            className="w-full"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {bc.title}
                          </a>
                        ) : (
                          <Link href={bc.href as any} className="w-full">
                            {bc.title}
                          </Link>
                        )
                      ) : (
                        <span>{bc.title}</span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : "href" in breadcrumb && breadcrumb.href && !isLast ? (
              <BreadcrumbLink href={breadcrumb.href}>
                {breadcrumb.title}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>
                {"title" in breadcrumb && breadcrumb.title}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {!isLast && <BreadcrumbSeparator />}
        </Fragment>
      );
    });
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadcrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
}
