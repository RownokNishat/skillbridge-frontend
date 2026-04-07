"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, ShieldCheck, Database } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="app-shell min-h-screen py-14">
      <motion.section
        className="section-wrap max-w-4xl space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-background to-emerald-500/10 p-8">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-3 text-muted-foreground">
            This policy explains how SkillBridge handles account, booking, and communication data.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="uniform-card transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database className="h-5 w-5 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We collect profile details, booking activity, and support communications required to deliver tutoring services.
              </p>
            </CardContent>
          </Card>

          <Card className="uniform-card transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="h-5 w-5 text-primary" />
                How We Use Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Data supports account management, scheduling, support workflows, and service quality improvements.
              </p>
            </CardContent>
          </Card>

          <Card className="uniform-card transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Security & Retention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We apply standard access controls and retain data only for required service and compliance periods.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </main>
  );
}
