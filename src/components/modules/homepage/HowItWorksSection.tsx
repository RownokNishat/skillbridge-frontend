"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, UserCheck, Calendar, GraduationCap } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Find Your Tutor",
        description:
            "Browse through our verified tutors and filter by subject, price, and rating to find the perfect match.",
        color: "from-blue-500 to-cyan-500",
        step: "01",
    },
    {
        icon: UserCheck,
        title: "Review Profiles",
        description:
            "Check tutor credentials, read reviews from other students, and view their availability.",
        color: "from-purple-500 to-pink-500",
        step: "02",
    },
    {
        icon: Calendar,
        title: "Book a Session",
        description:
            "Choose a convenient time slot and book your session instantly. No waiting for approval.",
        color: "from-green-500 to-emerald-500",
        step: "03",
    },
    {
        icon: GraduationCap,
        title: "Start Learning",
        description:
            "Attend your session, learn from experts, and achieve your educational goals.",
        color: "from-orange-500 to-red-500",
        step: "04",
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        How{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            SkillBridge Works
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Getting started is easy. Follow these simple steps to begin your
                        learning journey.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connection Lines (hidden on mobile) */}
                    <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 dark:from-blue-900 dark:via-purple-900 dark:to-orange-900 -z-10" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                            >
                                <Card className="relative group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500 dark:hover:border-blue-400 h-full">
                                    <CardContent className="p-6 text-center space-y-4">
                                        {/* Step Number */}
                                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            {step.step}
                                        </div>

                                        {/* Icon */}
                                        <div className="flex justify-center">
                                            <div
                                                className={`p-4 rounded-2xl bg-gradient-to-br ${step.color} transform group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl">
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                No hidden fees.
                            </span>{" "}
                            All sessions are confirmed instantly. Pay only for the time you
                            book.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
