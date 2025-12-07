import type { Context } from "../context";

/**
 * Base controller class providing common functionality for all controllers.
 * Controllers handle request validation, response formatting, and delegate to services.
 */
export abstract class BaseController {
  protected ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  /**
   * Handle errors consistently across all controllers.
   */
  protected handleError(
    error: unknown,
    defaultMessage = "An error occurred"
  ): never {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(defaultMessage);
  }
}
