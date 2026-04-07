"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="app-shell min-h-screen py-14">
      <motion.section
        className="section-wrap space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold">About SkillBridge</h1>
          <p className="mt-4 text-muted-foreground">
            SkillBridge is a modern tutoring platform focused on measurable
            learning outcomes. We connect students with verified tutors and
            provide a smooth, transparent experience for discovery, booking, and
            progress tracking.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="uniform-card">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Make high-quality, personalized learning accessible through
                reliable tutor matching.
              </p>
            </CardContent>
          </Card>

          <Card className="uniform-card">
            <CardHeader>
              <CardTitle>How We Work</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Students filter tutors by expertise, rating, and pricing; then
                book sessions with confidence.
              </p>
            </CardContent>
          </Card>

          <Card className="uniform-card">
            <CardHeader>
              <CardTitle>Quality Promise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We prioritize verified profiles, clear communication, and
                consistent session value.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </main>
  );
}
