"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, UserRound } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="app-shell min-h-screen py-14">
      <motion.section
        className="section-wrap space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10 p-8 lg:p-10">
          <h1 className="text-4xl font-bold lg:text-5xl">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Need help choosing tutors, managing sessions, or account support? Reach out directly and our team will respond quickly.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Typical response time: within 1 business day.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="uniform-card transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Primary Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="flex items-center gap-2"><UserRound className="h-4 w-4 text-primary" /> Rownok Jahan Nishat</p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a className="text-primary underline" href="mailto:rowonokjahannishat17@gmail.com">
                  rowonokjahannishat17@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a className="text-primary underline" href="tel:+8801722310450">01722310450</a>
              </p>
            </CardContent>
          </Card>

          <Card className="uniform-card transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Support Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>For booking issues, include tutor name and session date in your email so we can assist faster.</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="mailto:rowonokjahannishat17@gmail.com">Send Email</a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/help">Open Help Center</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </main>
  );
}
