import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const posts = [
  {
    title: "How To Build A Weekly Study Rhythm",
    excerpt:
      "Design a practical weekly plan that balances class, revision, and skill practice with less burnout.",
    date: "April 2026",
  },
  {
    title: "What Top Tutors Do Differently In Session Planning",
    excerpt:
      "A breakdown of preparation habits, lesson pacing, and feedback loops used by high-rated tutors.",
    date: "March 2026",
  },
  {
    title: "From Confusion To Confidence: 5 Reflection Prompts",
    excerpt:
      "Use these prompts after every class to improve retention and quickly spot weak areas.",
    date: "March 2026",
  },
];

export default function BlogPage() {
  return (
    <main className="app-shell min-h-screen py-14">
      <motion.section
        className="section-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-4xl font-bold">SkillBridge Blog</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Actionable learning strategies, tutor insights, and student success frameworks.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <motion.div key={post.title} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
            <Card className="uniform-card h-full">
              <CardHeader>
                <p className="text-sm text-muted-foreground">{post.date}</p>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex h-full flex-col">
                <p className="flex-1 text-muted-foreground">{post.excerpt}</p>
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/contact">Request Full Article</Link>
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
