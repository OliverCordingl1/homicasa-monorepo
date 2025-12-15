import { cache } from "react";
import { authClient } from "./auth-client";
import { headers } from "next/headers";

/**
 * Cached session getter for server components.
 * Uses React's cache() to deduplicate getSession calls during a single render.
 * This prevents duplicate API requests when both layout and pages need the session.
 */
export const getSession = cache(async () => {
  return authClient.getSession({
    fetchOptions: {
      headers: await headers(),
      throw: true,
    },
  });
});
