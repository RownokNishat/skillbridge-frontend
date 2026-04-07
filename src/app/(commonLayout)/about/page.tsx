"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="app-shell min-h-screen py-14">
      <motion.section
        className="section-wrap space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-sky-500/10 to-emerald-500/10 p-8 lg:p-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">About SkillBridge</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight lg:text-5xl">
            Better tutoring starts with better matching.
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            SkillBridge is built to make learning outcomes measurable, not random. We connect students with verified tutors, clear pricing, and guided booking so every session has purpose.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border bg-background/70 px-4 py-2">Verified profiles</span>
            <span className="rounded-full border bg-background/70 px-4 py-2">Structured learning goals</span>
            <span className="rounded-full border bg-background/70 px-4 py-2">Transparent progress flow</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="uniform-card transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Make high-quality, personalized learning accessible through reliable tutor matching.
              </p>
            </CardContent>
          </Card>

          <Card className="uniform-card transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                How We Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Students discover by expertise, rating, and budget, then book with confidence using a simple workflow.
              </p>
            </CardContent>
          </Card>

          <Card className="uniform-card transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Quality Promise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We prioritize verified profiles, clear communication, and consistently valuable sessions.
              </p>
            </CardContent>
          </Card>

          <Card className="uniform-card transition hover:-translate-y-1 hover:shadow-lg md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                What Makes Us Different
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
              <p>Clear tutor information before booking, so learners avoid guesswork.</p>
              <p>Flexible schedules for students balancing classes, work, and exams.</p>
              <p>Feedback-ready session flow that encourages continuous improvement.</p>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </main>
  );
}
