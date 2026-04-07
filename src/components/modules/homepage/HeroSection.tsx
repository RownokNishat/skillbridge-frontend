"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, BookOpen, Users, Award } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950 min-h-[65vh] flex items-center py-14 md:py-20">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-24 lg:px-24 xl:px-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-block">
                            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                                Live 1:1 tutoring in 40+ subjects
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            Connect with{" "}
                            <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                Expert Tutors
                            </span>
                            , Learn Anything
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Find qualified tutors for any subject. Book sessions instantly and
                            start learning from the best educators around the world.
                        </p>

                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-2xl shadow-xl border">
                            <div className="flex-1 flex items-center gap-3 px-4">
                                <Search className="text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search for subjects, tutors..."
                                    className="w-full py-3 bg-transparent outline-none text-foreground"
                                />
                            </div>
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl"
                            >
                                <Link href="/tutors">Find Tutors</Link>
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 pt-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        500+
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Expert Tutors
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-cyan-500/10 rounded-lg">
                                    <BookOpen className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        10,000+
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Sessions Completed
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-emerald-500/10 rounded-lg">
                                    <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        4.9/5
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Average Rating
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button asChild variant="ghost" className="mt-2">
                                <Link href="#featured-tutors">Explore featured tutors</Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Content - Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Floating cards animation */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute top-10 right-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full" />
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            Math Expert
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            ⭐ 4.9 (120 reviews)
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                className="absolute bottom-10 left-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            Science Tutor
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            ⭐ 5.0 (89 reviews)
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Central illustration placeholder */}
                            <div className="w-full h-96 bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-900/50 dark:via-indigo-900/50 dark:to-purple-900/50 rounded-3xl flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="text-6xl">📚</div>
                                    <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                        Start Learning Today
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
