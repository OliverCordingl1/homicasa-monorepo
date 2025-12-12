import type { ZodType } from "zod";

/**
 * Validates form values against a Zod schema for a specific step.
 * @param {ZodType | null} schema - The Zod schema to validate against, or null to skip validation
 * @param {unknown} values - The form values to validate
 * @returns {{ success: true } | ZodIssue[]} Returns success object if validation passes or no schema provided,
 *          otherwise returns array of Zod validation issues
 * @example
 * ```ts
 * const schema = z.object({ email: z.string().email() });
 * const result = validateStepSchema(schema, { email: 'test@example.com' });
 * if (result.success) {
 *   // validation passed
 * } else {
 *   // result is array of ZodIssues
 * }
 * ```
 */
export function validateStepSchema(schema: ZodType | null, values: unknown) {
  if (!schema) return { success: true };

  const result = schema.safeParse(values);

  if (!result.success) return result.error.issues;

  return { success: true };
}
