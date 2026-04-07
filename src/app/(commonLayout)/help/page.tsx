"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LifeBuoy, MessageCircleQuestion } from "lucide-react";

export default function HelpPage() {
  return (
    <main className="app-shell min-h-screen py-14">
      <motion.section
        className="section-wrap grid gap-8 lg:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <h1 className="text-4xl font-bold">Help & Support</h1>
          <p className="mt-3 text-muted-foreground">
            Find clear answers for bookings, profiles, and tutor discovery
            workflows.
          </p>

          <Card className="uniform-card mt-6 border-primary/20 bg-linear-to-br from-primary/10 via-background to-cyan-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LifeBuoy className="h-5 w-5 text-primary" />
                Need direct support?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our team usually replies within one business day.
              </p>
              <div className="mt-4 flex gap-3">
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="mailto:support@skillbridge.com">Email Us</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <MessageCircleQuestion className="h-5 w-5 text-primary" />
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-xl border bg-card p-4"
          >
            <AccordionItem value="a">
              <AccordionTrigger>
                How do I book a tutor session?
              </AccordionTrigger>
              <AccordionContent>
                Open a tutor profile, review availability and pricing, then
                choose a schedule slot and confirm.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>
                Can I update my profile details?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Go to your dashboard profile page and save changes to your
                name, phone, and bio.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger>
                How do I cancel a confirmed booking?
              </AccordionTrigger>
              <AccordionContent>
                Open My Bookings in the dashboard and choose Cancel on an active
                session.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="d">
              <AccordionTrigger>How are tutors verified?</AccordionTrigger>
              <AccordionContent>
                Tutor onboarding includes profile review, expertise validation,
                and ongoing rating-based quality checks.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </motion.section>
    </main>
  );
}
