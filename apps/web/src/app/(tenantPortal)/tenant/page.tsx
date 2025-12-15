import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/get-session";

export default async function TenantPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="py-8 px-4 lg:px-16 max-w-6xl">
      <h1 className="font-bold text-3xl">Welcome, Oliver!</h1>
      <p className=" text-xl text-muted-foreground">123 Test Street</p>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 border">
          <h2 className="font-semibold text-xl">Property Details</h2>
          <div className="list-none text-sm mt-2 flex flex-col">
            <strong>Address:</strong>
            <span className="text-muted-foreground">
              123 Test Street, Nottingham, NG1 2AS
            </span>
            <strong>Rent:</strong>
            <span className="text-muted-foreground">£1,200 per month</span>
            <div className="grid grid-cols-2 gap-x-2 mt-2">
              <div className="flex flex-col">
                <strong>Lease Start Date:</strong>
                <span className="text-muted-foreground">1st January 2024</span>
              </div>
              <div className="flex flex-col">
                <strong>Lease Duration:</strong>
                <span className="text-muted-foreground">12 months</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border">
          <h2 className="font-semibold text-xl">Upcoming Rent Payments</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date Due</TableHead>
                <TableHead className="w-[100px]">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="">
                <TableCell className="font-semibold py-5">
                  1st January 2024{" "}
                  <Badge className="ml-2" variant="paid">
                    Paid
                  </Badge>
                </TableCell>
                <TableCell className="w-[100px] py-5">£1,200</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border">
          <h2 className="font-semibold text-xl">Maintenance Requests</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="">
                <TableCell className="font-regular py-5">
                  <strong className="font-semibold">Request #1234:</strong>{" "}
                  Leaky faucet in kitchen
                </TableCell>
                <TableCell className="py-5">
                  <Badge variant="secondary">In Progress</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
