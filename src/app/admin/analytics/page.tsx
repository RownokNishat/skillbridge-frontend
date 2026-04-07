"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const monthly = [32, 45, 54, 61, 58, 74];

export default function AdminAnalyticsPage() {
  const max = Math.max(...monthly);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Platform performance trends and demand insights.</p>
      </div>

      <Card className="uniform-card">
        <CardHeader>
          <CardTitle>Bookings Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-end gap-3">
            {monthly.map((value, idx) => (
              <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-primary/80"
                  style={{ height: `${(value / max) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">M{idx + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
