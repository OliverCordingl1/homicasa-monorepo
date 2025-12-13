# @homicasa/schemas

Shared Zod validation schemas for the Homicasa application.

## Usage

```typescript
import { emailSchema, phoneSchema } from "@homicasa/schemas";

// Use in your forms, API endpoints, etc.
const result = emailSchema.safeParse("user@example.com");
```

## Organization

- `common.ts` - Reusable common schemas (email, phone, etc.)
- `business.ts` - Business-related validation schemas
- `property.ts` - Property-related validation schemas
- `tenant.ts` - Tenant-related validation schemas
