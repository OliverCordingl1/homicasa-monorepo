# Using tRPC Queries in Next.js App

## Setup (Already Done ✓)

Your `apps/web/src/utils/trpc.ts` is already configured with the `AppRouter` type. You're ready to use the new endpoints!

## Basic Usage Examples

### 1. Query Data (GET operations)

```tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

export default function PropertiesPage() {
  // Get all properties
  const properties = useQuery(trpc.properties.getAll.queryOptions());

  // Get property by ID
  const property = useQuery(
    trpc.properties.getById.queryOptions({ id: "property123" })
  );

  // Get properties by city
  const sfProperties = useQuery(
    trpc.properties.getByCity.queryOptions({ city: "San Francisco" })
  );

  if (properties.isPending) return <div>Loading...</div>;
  if (properties.error) return <div>Error: {properties.error.message}</div>;

  return (
    <div>
      {properties.data?.map((prop) => (
        <div key={prop.id}>
          <h3>{prop.displayName}</h3>
          <p>
            {prop.city}, {prop.country}
          </p>
        </div>
      ))}
    </div>
  );
}
```

### 2. Mutations (CREATE/UPDATE/DELETE operations)

```tsx
"use client";
import { useMutation } from "@tanstack/react-query";
import { trpc, queryClient } from "@/utils/trpc";

export default function CreatePropertyForm() {
  const createProperty = useMutation({
    ...trpc.properties.create.mutationOptions(),
    onSuccess: () => {
      // Invalidate and refetch properties list
      queryClient.invalidateQueries({
        queryKey: trpc.properties.getAll.getQueryKey(),
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    createProperty.mutate({
      displayName: formData.get("displayName") as string,
      addressLine1: formData.get("addressLine1") as string,
      city: formData.get("city") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="displayName" placeholder="Property Name" required />
      <input name="addressLine1" placeholder="Address" required />
      <input name="city" placeholder="City" required />
      <input name="postalCode" placeholder="Postal Code" required />
      <input name="country" placeholder="US" maxLength={2} required />

      <button type="submit" disabled={createProperty.isPending}>
        {createProperty.isPending ? "Creating..." : "Create Property"}
      </button>

      {createProperty.error && (
        <p className="error">{createProperty.error.message}</p>
      )}
    </form>
  );
}
```

### 3. Update Mutation

```tsx
const updateProperty = useMutation({
  ...trpc.properties.update.mutationOptions(),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: trpc.properties.getAll.getQueryKey(),
    });
  },
});

// Usage
updateProperty.mutate({
  id: "property123",
  displayName: "Updated Name",
  city: "New City",
});
```

### 4. Delete Mutation

```tsx
const deleteProperty = useMutation({
  ...trpc.properties.delete.mutationOptions(),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: trpc.properties.getAll.getQueryKey(),
    });
  },
});

// Usage
deleteProperty.mutate({ id: "property123" });
```

## All Available Endpoints

### Properties (`trpc.properties.*`)

**Queries:**

- `getAll()` - Get all properties
- `getById({ id })` - Get property by ID
- `getByCity({ city })` - Get properties in a city
- `getByCountry({ country })` - Get properties in a country

**Mutations (require authentication):**

- `create({ displayName, addressLine1, city, postalCode, country, ... })`
- `update({ id, ...updates })`
- `delete({ id })`

### Businesses (`trpc.businesses.*`)

**Queries:**

- `getAll()` - Get all businesses
- `getById({ id })` - Get business by ID
- `getByEmail({ email })` - Get business by email

**Mutations (require authentication):**

- `create({ displayName, email, legalName?, phoneNumber?, ... })`
- `update({ id, ...updates })`
- `delete({ id })`

### Tenants (`trpc.tenants.*`)

**All require authentication:**

**Queries:**

- `getAll()` - Get all tenant profiles
- `getById({ id })` - Get tenant profile by ID
- `getByUserId({ userId })` - Get tenant profile by user ID
- `getCurrent()` - Get current user's tenant profile

**Mutations:**

- `create({ userId })`
- `delete({ id })`

## Advanced Patterns

### Dependent Queries

```tsx
export default function PropertyDetails({
  propertyId,
}: {
  propertyId: string;
}) {
  // First get the property
  const property = useQuery(
    trpc.properties.getById.queryOptions({ id: propertyId })
  );

  // Then get related data (example)
  const business = useQuery({
    ...trpc.businesses.getById.queryOptions({
      id: property.data?.businessId,
    }),
    enabled: !!property.data?.businessId, // Only run when we have the ID
  });

  return <div>{/* ... */}</div>;
}
```

### Optimistic Updates

```tsx
const updateProperty = useMutation({
  ...trpc.properties.update.mutationOptions(),
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({
      queryKey: trpc.properties.getById.getQueryKey({ id: newData.id }),
    });

    // Snapshot previous value
    const previousProperty = queryClient.getQueryData(
      trpc.properties.getById.getQueryKey({ id: newData.id })
    );

    // Optimistically update
    queryClient.setQueryData(
      trpc.properties.getById.getQueryKey({ id: newData.id }),
      (old: any) => ({ ...old, ...newData })
    );

    return { previousProperty };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(
      trpc.properties.getById.getQueryKey({ id: newData.id }),
      context?.previousProperty
    );
  },
});
```

### Server Components (if needed)

For server components, you'll need to create a server-side tRPC caller:

```ts
// lib/trpc-server.ts
import { appRouter } from "@homicasa/api/routers/index";
import { createContext } from "@homicasa/api/context";

export async function createServerCaller(req: Request) {
  const ctx = await createContext({
    req: req as any,
    res: {} as any,
  });

  return appRouter.createCaller(ctx);
}
```

Then use in Server Components:

```tsx
// app/properties/page.tsx (Server Component)
import { createServerCaller } from "@/lib/trpc-server";

export default async function PropertiesPage() {
  const trpc = await createServerCaller(new Request("http://localhost"));
  const properties = await trpc.properties.getAll();

  return (
    <div>
      {properties.map((prop) => (
        <div key={prop.id}>{prop.displayName}</div>
      ))}
    </div>
  );
}
```

## Type Safety

All queries are fully type-safe! TypeScript will autocomplete:

- Available endpoints
- Required/optional fields
- Response types

```tsx
// ✅ TypeScript knows the shape of the data
const properties = useQuery(trpc.properties.getAll.queryOptions());
// properties.data is Property[] | undefined

// ✅ TypeScript enforces required fields
createProperty.mutate({
  displayName: "Name", // ✓ required
  addressLine1: "123 Main St", // ✓ required
  city: "SF", // ✓ required
  postalCode: "94102", // ✓ required
  country: "US", // ✓ required
  addressLine2: "Apt 4", // ✓ optional
});

// ❌ TypeScript will error on invalid data
createProperty.mutate({
  // Error: missing required fields
  displayName: "Name",
});
```

## Error Handling

Your existing error toast setup in `trpc.ts` will automatically show errors. You can also handle them per-query:

```tsx
const properties = useQuery({
  ...trpc.properties.getAll.queryOptions(),
  onError: (error) => {
    console.error("Failed to fetch properties:", error);
  },
});
```
