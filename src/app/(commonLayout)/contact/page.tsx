import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="app-shell min-h-screen py-14">
      <motion.section
        className="section-wrap grid gap-8 lg:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-3 text-muted-foreground">
            Need help choosing tutors, managing sessions, or account support?
            Reach out directly.
          </p>

          <Card className="uniform-card mt-6">
            <CardHeader>
              <CardTitle>Primary Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                <span className="font-medium">Name:</span> Rownok Jahan Nishat
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a
                  className="text-primary underline"
                  href="mailto:rowonokjahannishat17@gmail.com"
                >
                  rowonokjahannishat17@gmail.com
                </a>
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                <a className="text-primary underline" href="tel:+8801722310450">
                  01722310450
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="uniform-card">
          <CardHeader>
            <CardTitle>Support Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>General support response time: within 1 business day.</p>
            <p>
              For booking issues, include tutor name and session date in your
              email.
            </p>
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
      </motion.section>
    </main>
  );
}
