import { Card } from "@/components/ui/card";
import { getSession } from "@/lib/get-session";
import { AccountForm } from "./account-form";
import { PasswordForm } from "./password-form";

export default async function AccountSettingsPage() {
  const session = await getSession();
  return (
    <>
      <h1 className="text-3xl font-bold my-6">Account Settings</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <AccountForm session={session} />
        </Card>
        <Card>
          <PasswordForm />
        </Card>
      </div>
    </>
  );
}
