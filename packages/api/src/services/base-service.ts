import type { Context } from "../context";

/**
 * Base service class providing common functionality for all services.
 * Services contain business logic and interact with repositories.
 */
export abstract class BaseService {
  protected ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  /**
   * Get the current user ID from the session.
   * Throws if user is not authenticated.
   */
  protected getCurrentUserId(): string {
    if (!this.ctx.session?.user?.id) {
      throw new Error("User not authenticated");
    }
    return this.ctx.session.user.id;
  }

  /**
   * Check if user is authenticated.
   */
  protected isAuthenticated(): boolean {
    return !!this.ctx.session?.user;
  }
}
