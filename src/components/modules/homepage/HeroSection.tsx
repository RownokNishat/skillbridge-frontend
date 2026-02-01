"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, BookOpen, Users, Award } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 py-20 md:py-32">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-block">
                            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                                🎓 Your Learning Journey Starts Here
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            Connect with{" "}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Expert Tutors
                            </span>
                            , Learn Anything
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            Find qualified tutors for any subject. Book sessions instantly and
                            start learning from the best educators around the world.
                        </p>

                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                            <div className="flex-1 flex items-center gap-3 px-4">
                                <Search className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for subjects, tutors..."
                                    className="w-full py-3 bg-transparent outline-none text-gray-700 dark:text-gray-200"
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
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        500+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Expert Tutors
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        10,000+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Sessions Completed
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                                    <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        4.9/5
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Average Rating
                                    </div>
                                </div>
                            </div>
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
