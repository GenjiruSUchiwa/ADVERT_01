import { useSession, signOut } from "next-auth/react";
import { Loader2, LogOut, User } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // Middleware handles redirect for unauthenticated users
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">ADVERT</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              {session.user.email}
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Welcome, {session.user.name ?? "User"}!
          </h2>
          <p className="text-muted-foreground">
            Your brand strategy dashboard
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Your Account</CardTitle>
              <CardDescription>Account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Email: </span>
                <span className="text-sm">{session.user.email}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Role: </span>
                <span className="text-sm">{session.user.role}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Tenant ID:{" "}
                </span>
                <span className="text-sm font-mono text-xs">
                  {session.user.tenantId}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Strategies</CardTitle>
              <CardDescription>Create and manage your strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No strategies yet. Create your first brand strategy to get
                started.
              </p>
              <Button className="mt-4" disabled>
                Create Strategy (Coming Soon)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Quick tips for new users</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Account created successfully</li>
                <li>○ Create your first brand strategy</li>
                <li>○ Complete the AI co-pilot interview</li>
                <li>○ Generate your 6-pillar strategy</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
