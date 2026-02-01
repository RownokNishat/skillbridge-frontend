"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    BookOpen,
    Code,
    Languages,
    Music,
    Palette,
    Calculator,
    Globe,
    Dumbbell,
} from "lucide-react";
import Link from "next/link";

const categories = [
    {
        id: "1",
        name: "Mathematics",
        icon: Calculator,
        color: "from-blue-500 to-cyan-500",
        tutorCount: 120,
    },
    {
        id: "2",
        name: "Programming",
        icon: Code,
        color: "from-purple-500 to-pink-500",
        tutorCount: 95,
    },
    {
        id: "3",
        name: "Languages",
        icon: Languages,
        color: "from-green-500 to-emerald-500",
        tutorCount: 150,
    },
    {
        id: "4",
        name: "Music",
        icon: Music,
        color: "from-orange-500 to-red-500",
        tutorCount: 78,
    },
    {
        id: "5",
        name: "Art & Design",
        icon: Palette,
        color: "from-pink-500 to-rose-500",
        tutorCount: 65,
    },
    {
        id: "6",
        name: "Science",
        icon: BookOpen,
        color: "from-indigo-500 to-blue-500",
        tutorCount: 110,
    },
    {
        id: "7",
        name: "Social Studies",
        icon: Globe,
        color: "from-yellow-500 to-orange-500",
        tutorCount: 82,
    },
    {
        id: "8",
        name: "Fitness",
        icon: Dumbbell,
        color: "from-red-500 to-pink-500",
        tutorCount: 45,
    },
];

export default function CategoriesSection() {
    return (
        <section className="py-20 bg-white dark:bg-gray-900">
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
                        Explore{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Popular Categories
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Find expert tutors in various subjects and start your learning
                        journey today
                    </p>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/tutors?category=${category.id}`}>
                                    <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-500 dark:hover:border-blue-400 h-full">
                                        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                            <div
                                                className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} transform group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                                                    {category.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {category.tutorCount} tutors
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-center"
                >
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-2 hover:bg-blue-50 dark:hover:bg-blue-950"
                    >
                        <Link href="/tutors">View All Categories</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
