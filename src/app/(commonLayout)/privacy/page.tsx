"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <main className="app-shell min-h-screen py-14">
      <motion.section
        className="section-wrap max-w-3xl space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-3 text-muted-foreground">
            This policy explains how SkillBridge handles account, booking, and communication data.
          </p>
        </div>

        <article className="uniform-card p-6">
          <h2 className="text-xl font-semibold">Information We Collect</h2>
          <p className="mt-2 text-muted-foreground">
            We collect profile information, booking activity, and support communication required to deliver tutoring services.
          </p>
        </article>

        <article className="uniform-card p-6">
          <h2 className="text-xl font-semibold">How We Use Data</h2>
          <p className="mt-2 text-muted-foreground">
            Data is used for account management, session scheduling, service quality, and platform analytics.
          </p>
        </article>

        <article className="uniform-card p-6">
          <h2 className="text-xl font-semibold">Security & Retention</h2>
          <p className="mt-2 text-muted-foreground">
            We use standard access controls and retain data only as long as necessary for service and compliance needs.
          </p>
        </article>
      </motion.section>
    </main>
  );
}
