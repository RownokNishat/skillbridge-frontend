import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

          <Card className="uniform-card mt-6">
            <CardHeader>
              <CardTitle>Need direct support?</CardTitle>
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

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="a">
            <AccordionTrigger>How do I book a tutor session?</AccordionTrigger>
            <AccordionContent>
              Open a tutor profile, review availability and pricing, then choose
              a schedule slot and confirm.
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
      </motion.section>
    </main>
  );
}
