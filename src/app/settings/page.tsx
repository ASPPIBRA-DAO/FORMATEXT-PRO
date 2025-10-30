import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 font-headline text-3xl font-bold tracking-tight">
          Settings
        </h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">
              Application Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Application settings will be available here in a future update.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
