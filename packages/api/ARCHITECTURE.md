# API Architecture Diagram

## Request Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (tRPC)                           │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Routers (tRPC)                            │
│  - Define endpoints (queries/mutations)                         │
│  - Apply middleware (public/protected)                          │
│  - Wire schemas to controllers                                  │
│                                                                  │
│  Files: src/routers/*-router.ts                                 │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Controllers (OOP)                          │
│  - Validate input (Zod schemas)                                 │
│  - Handle errors                                                │
│  - Format responses                                             │
│  - Delegate to services                                         │
│                                                                  │
│  Files: src/controllers/*-controller.ts                         │
│  Base: BaseController                                           │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Services (OOP)                            │
│  - Business logic                                               │
│  - Authorization checks                                         │
│  - Data transformations                                         │
│  - Call repositories                                            │
│                                                                  │
│  Files: src/services/*-service.ts                               │
│  Base: BaseService                                              │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Repositories (@homicasa/db)                   │
│  - Database access                                              │
│  - CRUD operations                                              │
│  - Query building                                               │
│                                                                  │
│  Package: @homicasa/db/repositories                             │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Database (PostgreSQL)                    │
└─────────────────────────────────────────────────────────────────┘
```

## File Structure

```
packages/api/
├── src/
│   ├── controllers/
│   │   ├── base-controller.ts      ← Abstract base class
│   │   ├── property-controller.ts  ← Property endpoints
│   │   ├── business-controller.ts  ← Business endpoints
│   │   ├── tenant-controller.ts    ← Tenant endpoints
│   │   └── index.ts                ← Barrel export
│   │
│   ├── services/
│   │   ├── base-service.ts         ← Abstract base class
│   │   ├── property-service.ts     ← Property business logic
│   │   ├── business-service.ts     ← Business business logic
│   │   ├── tenant-service.ts       ← Tenant business logic
│   │   └── index.ts                ← Barrel export
│   │
│   ├── routers/
│   │   ├── property-router.ts      ← Property tRPC routes
│   │   ├── business-router.ts      ← Business tRPC routes
│   │   ├── tenant-router.ts        ← Tenant tRPC routes
│   │   └── index.ts                ← Main app router
│   │
│   ├── context.ts                  ← tRPC context (session, etc)
│   └── index.ts                    ← tRPC initialization
│
└── README.md                       ← Documentation
```

## OOP Design Principles

### Inheritance

- `BaseController` → All controllers inherit common functionality
- `BaseService` → All services inherit common functionality

### Encapsulation

- Controllers encapsulate request/response handling
- Services encapsulate business logic
- Repositories encapsulate data access

### Single Responsibility

- **Routers**: Define API structure
- **Controllers**: Handle I/O, validation
- **Services**: Implement business rules
- **Repositories**: Manage database operations

## Example: Property Creation Flow

```
1. Client calls:
   trpc.properties.create.mutate({ displayName: "...", ... })

2. Router (property-router.ts):
   - Receives request
   - Validates session (protectedProcedure)
   - Creates PropertyController with context

3. Controller (property-controller.ts):
   - Validates input with Zod schema
   - Calls PropertyService.createProperty()

4. Service (property-service.ts):
   - Checks user authentication
   - Applies business rules
   - Calls PropertyRepository.create()

5. Repository (@homicasa/db):
   - Executes SQL INSERT
   - Returns created property

6. Response flows back up the chain
```

## Benefits of This Architecture

✅ **Testable**: Each layer can be tested independently
✅ **Maintainable**: Clear separation of concerns
✅ **Scalable**: Easy to add new features
✅ **Type-safe**: Full TypeScript + Zod validation
✅ **Reusable**: Services can be used by multiple controllers
✅ **Organized**: OOP structure keeps code tidy
