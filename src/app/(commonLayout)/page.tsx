import HeroSection from "@/components/modules/homepage/HeroSection";
import FeaturedTutorsSection from "@/components/modules/homepage/FeaturedTutorsSection";
import CategoriesSection from "@/components/modules/homepage/CategoriesSection";
import HowItWorksSection from "@/components/modules/homepage/HowItWorksSection";
import { tutorService } from "@/services/tutor.service";
import { categoryService } from "@/services/category.service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Compass, Sparkles, Star, Users } from "lucide-react";

export default async function Home() {
  const { data: tutorsResponse } = await tutorService.getFeaturedTutors({
    cache: "no-store",
  });
  const featuredTutors = tutorsResponse?.data || [];

  const { data: categoriesResponse } = await categoryService.getAllCategories({
    revalidate: 3600, // Revalidate every hour
  });
  const categories = categoriesResponse?.data || [];

  const learningPlaybooks = [
    {
      title: "10-Minute Tutor Selection System",
      summary: "Shortlist tutors quickly by matching style, availability, and outcomes.",
    },
    {
      title: "Weekly Study Planning Blueprint",
      summary: "Turn scattered prep into a simple weekly routine that you can sustain.",
    },
    {
      title: "Session Debrief Retention Loop",
      summary: "Use a short reflection format after every class to retain more and forget less.",
    },
  ];

  return (
    <main className="app-shell min-h-screen">
      <HeroSection />

      <section id="featured-tutors" className="py-12">
        <FeaturedTutorsSection tutors={featuredTutors} />
      </section>

      <section className="py-12">
        <CategoriesSection categories={categories} />
      </section>

      <section id="how-it-works" className="py-12">
        <HowItWorksSection />
      </section>

      <section className="py-12">
        <div className="section-wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="uniform-card border-primary/20 bg-linear-to-br from-primary/10 to-background transition hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Verified Tutors</p>
              <p className="mt-2 text-3xl font-bold">{featuredTutors.length}+</p>
            </CardContent>
          </Card>
          <Card className="uniform-card border-sky-500/20 bg-linear-to-br from-sky-500/10 to-background transition hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Active Categories</p>
              <p className="mt-2 text-3xl font-bold">{categories.length}+</p>
            </CardContent>
          </Card>
          <Card className="uniform-card border-amber-500/20 bg-linear-to-br from-amber-500/10 to-background transition hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Average Tutor Rating</p>
              <p className="mt-2 text-3xl font-bold">4.8</p>
            </CardContent>
          </Card>
          <Card className="uniform-card border-emerald-500/20 bg-linear-to-br from-emerald-500/10 to-background transition hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Student Satisfaction</p>
              <p className="mt-2 text-3xl font-bold">96%</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Personalized Learning Path",
              text: "Structured plans shaped around your goals, pace, and exam timeline.",
              icon: Compass,
            },
            {
              title: "Transparent Tutor Insights",
              text: "Clear tutor ratings, skills, and pricing so you can decide with confidence.",
              icon: Users,
            },
            {
              title: "Smooth Booking Workflow",
              text: "Book, track, and manage sessions with instant updates and less friction.",
              icon: Sparkles,
            },
          ].map((value) => (
            <Card key={value.title} className="uniform-card group transition hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <value.icon className="h-5 w-5 text-primary" />
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="section-wrap">
          <h2 className="mb-6 text-3xl font-bold">Student Testimonials</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Nadia Rahman",
                quote:
                  "I improved my exam scores in six weeks with a tutor who explained concepts in a practical way.",
              },
              {
                name: "Arif Hasan",
                quote:
                  "The filtering tools helped me find a tutor in my budget and schedule quickly.",
              },
              {
                name: "Tania Sultana",
                quote:
                  "The session structure and follow-up notes made each class productive and easy to revise.",
              },
            ].map((item) => (
              <Card key={item.name} className="uniform-card transition hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`${item.name}-${index}`} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">"{item.quote}"</p>
                  <p className="mt-4 font-semibold">{item.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="section-wrap">
          <h2 className="mb-6 text-3xl font-bold">Learning Playbooks</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {learningPlaybooks.map((post) => (
              <Card key={post.title} className="uniform-card h-full transition hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex h-full flex-col p-6">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">{post.summary}</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="/help">Use This Strategy</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="section-wrap grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-3 text-muted-foreground">
              Quick answers to help you start booking and learning without confusion.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I choose the right tutor?</AccordionTrigger>
              <AccordionContent>
                Compare tutor expertise, reviews, session price, and availability, then book a first session to validate fit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I reschedule a session?</AccordionTrigger>
              <AccordionContent>
                Yes. You can manage confirmed sessions from your student dashboard and update time slots when available.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is there support for beginners?</AccordionTrigger>
              <AccordionContent>
                SkillBridge supports beginner, intermediate, and advanced learners with topic-specific lesson paths.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-12">
        <div className="section-wrap">
          <Card className="uniform-card border-primary/20 bg-linear-to-r from-primary/10 via-cyan-500/10 to-emerald-500/10">
            <CardContent className="flex flex-col items-start justify-between gap-6 p-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-2xl font-bold">Get Weekly Learning Tips</h2>
                <p className="mt-2 text-muted-foreground">
                  Receive practical study workflows, tutor picks, and productivity strategies.
                </p>
              </div>
              <Button asChild>
                <Link href="/contact">Subscribe From Contact Page</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 pb-20">
        <div className="section-wrap text-center">
          <h2 className="text-3xl font-bold">Ready To Start Learning Smarter?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Explore tutors, compare profiles, and schedule your next session in minutes.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            No hidden fees
            <CheckCircle2 className="ml-3 h-4 w-4 text-emerald-500" />
            Verified profiles
            <CheckCircle2 className="ml-3 h-4 w-4 text-emerald-500" />
            Flexible schedules
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link href="/tutors">Explore Tutors</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
