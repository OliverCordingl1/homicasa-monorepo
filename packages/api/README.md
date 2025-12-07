# API Package

This package contains the API layer for the Homicasa application, built with tRPC and following an object-oriented architecture.

## Structure

```
src/
├── controllers/        # Request handlers and validation
│   ├── base-controller.ts
│   ├── property-controller.ts
│   ├── business-controller.ts
│   └── tenant-controller.ts
├── services/          # Business logic layer
│   ├── base-service.ts
│   ├── property-service.ts
│   ├── business-service.ts
│   └── tenant-service.ts
├── routers/           # tRPC router definitions
│   ├── property-router.ts
│   ├── business-router.ts
│   ├── tenant-router.ts
│   └── index.ts
├── context.ts         # tRPC context setup
└── index.ts          # tRPC initialization
```

## Architecture

The API follows a layered OOP architecture:

### Controllers

- Handle request validation using Zod schemas
- Format responses
- Delegate business logic to services
- Export validation schemas for use in routers
- Extend `BaseController` for common functionality

### Services

- Contain business logic
- Interact with repositories from `@homicasa/db`
- Handle data transformations and business rules
- Manage authorization checks
- Extend `BaseService` for common functionality

### Routers

- Define tRPC endpoints (queries and mutations)
- Wire up controllers with tRPC procedures
- Specify public vs protected endpoints
- Apply input validation schemas

## Usage Examples

### Calling from the client (tRPC)

```typescript
// Get all properties
const properties = await trpc.properties.getAll.query();

// Get property by ID
const property = await trpc.properties.getById.query({ id: "123" });

// Create a new property (protected)
const newProperty = await trpc.properties.create.mutate({
  displayName: "123 Main St",
  addressLine1: "123 Main Street",
  city: "San Francisco",
  postalCode: "94102",
  country: "US",
});

// Update a property (protected)
const updated = await trpc.properties.update.mutate({
  id: "123",
  displayName: "456 Main St",
});
```

### Available Routers

#### Properties (`properties.*`)

- `getById` - Get property by ID
- `getAll` - Get all properties
- `getByCity` - Get properties by city
- `getByCountry` - Get properties by country
- `create` - Create new property (protected)
- `update` - Update property (protected)
- `delete` - Delete property (protected)

#### Businesses (`businesses.*`)

- `getById` - Get business by ID
- `getAll` - Get all businesses
- `getByEmail` - Get business by email
- `create` - Create new business (protected)
- `update` - Update business (protected)
- `delete` - Delete business (protected)

#### Tenants (`tenants.*`)

- `getById` - Get tenant profile by ID (protected)
- `getByUserId` - Get tenant profile by user ID (protected)
- `getAll` - Get all tenant profiles (protected)
- `getCurrent` - Get current user's tenant profile (protected)
- `create` - Create new tenant profile (protected)
- `update` - Update tenant profile (protected)
- `delete` - Delete tenant profile (protected)

## Adding New Endpoints

1. **Create a Service** (`src/services/your-service.ts`)

   ```typescript
   import { BaseService } from "./base-service";

   export class YourService extends BaseService {
     async yourMethod() {
       // Business logic here
     }
   }
   ```

2. **Create a Controller** (`src/controllers/your-controller.ts`)

   ```typescript
   import { BaseController } from "./base-controller";
   import { z } from "zod";

   const yourSchema = z.object({
     /* ... */
   });

   export class YourController extends BaseController {
     private yourService: YourService;

     constructor(ctx: any) {
       super(ctx);
       this.yourService = new YourService(ctx);
     }

     async yourMethod(input: z.infer<typeof yourSchema>) {
       const data = yourSchema.parse(input);
       return this.yourService.yourMethod(data);
     }
   }

   export const yourSchemas = { yourSchema };
   ```

3. **Create a Router** (`src/routers/your-router.ts`)

   ```typescript
   import { router, publicProcedure } from "../index";
   import { YourController, yourSchemas } from "../controllers/your-controller";

   export const yourRouter = router({
     yourEndpoint: publicProcedure
       .input(yourSchemas.yourSchema)
       .query(async ({ ctx, input }) => {
         const controller = new YourController(ctx);
         return controller.yourMethod(input);
       }),
   });
   ```

4. **Add to Main Router** (`src/routers/index.ts`)

   ```typescript
   import { yourRouter } from "./your-router";

   export const appRouter = router({
     // ... existing routers
     yours: yourRouter,
   });
   ```

## Best Practices

- **Services** handle business logic, **Controllers** handle I/O
- Always validate input using Zod schemas in controllers
- Use `protectedProcedure` for endpoints requiring authentication
- Keep controllers thin - delegate to services
- Use meaningful error messages
- Export schemas for reuse and type safety
