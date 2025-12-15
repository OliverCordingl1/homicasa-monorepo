import { redirect } from "next/navigation";
import Dashboard from "./dashboard-example";
import { getSession } from "@/lib/get-session";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome {(session.user as any).firstName}{" "}
        {(session.user as any).lastName}
      </p>
      <Dashboard session={session} />
    </div>
  );
}
