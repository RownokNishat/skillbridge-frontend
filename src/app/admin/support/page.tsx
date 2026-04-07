import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSupportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Support Queue</h1>
        <p className="text-muted-foreground">Track incoming support requests and response status.</p>
      </div>

      <Card className="uniform-card">
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Support responses are currently managed through the contact and help workflows.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
