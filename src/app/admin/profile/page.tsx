"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminProfilePage() {
  const [name, setName] = useState("Platform Administrator");
  const [email] = useState("admin@skillbridge.com");
  const [phone, setPhone] = useState("+8801700000000");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Profile</h1>
        <p className="text-muted-foreground">Update your account and communication details.</p>
      </div>

      <Card className="uniform-card max-w-2xl">
        <CardHeader>
          <CardTitle>Editable Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} disabled className="mt-2" />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2" />
          </div>
          <Button onClick={() => toast.success("Admin profile saved")}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
