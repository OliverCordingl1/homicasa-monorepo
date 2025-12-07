"use client";
import { authClient } from "@/lib/auth-client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { trpc, queryClient } from "@/utils/trpc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard({
  session,
}: {
  session: typeof authClient.$Infer.Session;
}) {
  // Example: Fetch all properties
  const properties = useQuery(trpc.properties.getAll.queryOptions());

  // Example: Fetch all businesses
  const businesses = useQuery(trpc.businesses.getAll.queryOptions());

  // Example: Get current user's tenant profile (if exists)
  const tenantProfile = useQuery({
    ...trpc.tenants.getCurrent.queryOptions(),
    retry: false, // Don't retry if user doesn't have a profile
  });

  // Example mutation: Create tenant profile
  const createTenantProfile = useMutation({
    ...trpc.tenants.create.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.tenants.getCurrent.queryKey(),
      });
    },
  });
  const handleCreateTenantProfile = () => {
    if (session.user.id) {
      createTenantProfile.mutate({ userId: session.user.id });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {(session.user as any).firstName}{" "}
          {(session.user as any).lastName}
        </p>
      </div>{" "}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Properties Card */}
        <Card>
          <CardHeader>
            <CardTitle>Properties</CardTitle>
            <CardDescription>Total properties in system</CardDescription>
          </CardHeader>
          <CardContent>
            {properties.isPending && (
              <p className="text-sm text-muted-foreground">Loading...</p>
            )}
            {properties.error && (
              <p className="text-sm text-red-500">Error loading properties</p>
            )}
            {properties.data && (
              <div>
                <p className="text-3xl font-bold">{properties.data.length}</p>
                {properties.data.slice(0, 3).map((property) => (
                  <p
                    key={property.id}
                    className="text-sm text-muted-foreground mt-2"
                  >
                    {property.displayName}
                  </p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Businesses Card */}
        <Card>
          <CardHeader>
            <CardTitle>Businesses</CardTitle>
            <CardDescription>Total businesses in system</CardDescription>
          </CardHeader>
          <CardContent>
            {businesses.isPending && (
              <p className="text-sm text-muted-foreground">Loading...</p>
            )}
            {businesses.error && (
              <p className="text-sm text-red-500">Error loading businesses</p>
            )}
            {businesses.data && (
              <div>
                <p className="text-3xl font-bold">{businesses.data.length}</p>
                {businesses.data.slice(0, 3).map((business) => (
                  <p
                    key={business.id}
                    className="text-sm text-muted-foreground mt-2"
                  >
                    {business.displayName}
                  </p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tenant Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Tenant Profile</CardTitle>
            <CardDescription>Your tenant profile status</CardDescription>
          </CardHeader>
          <CardContent>
            {tenantProfile.isPending && (
              <p className="text-sm text-muted-foreground">Loading...</p>
            )}
            {tenantProfile.error && !tenantProfile.data && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  No profile found
                </p>
                <button
                  onClick={handleCreateTenantProfile}
                  disabled={createTenantProfile.isPending}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
                >
                  {createTenantProfile.isPending
                    ? "Creating..."
                    : "Create Profile"}
                </button>
              </div>
            )}
            {tenantProfile.data && (
              <div>
                <p className="text-sm text-green-600">✓ Profile exists</p>
                <p className="text-xs text-muted-foreground mt-1">
                  ID: {tenantProfile.data.id}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* API Test (existing) */}
      <Card>
        <CardHeader>
          <CardTitle>API Connection</CardTitle>
          <CardDescription>Testing protected endpoint</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">User: {session.user.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}
