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
    LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface Category {
    id: string;
    name: string;
    description?: string;
    _count?: {
        tutorProfiles: number;
    };
}

interface CategoriesSectionProps {
    categories?: Category[];
}

// Icon mapping based on category name
const iconMap: Record<string, LucideIcon> = {
    mathematics: Calculator,
    programming: Code,
    languages: Languages,
    music: Music,
    "art & design": Palette,
    art: Palette,
    design: Palette,
    science: BookOpen,
    "social studies": Globe,
    fitness: Dumbbell,
};

// Color mapping based on category name
const colorMap: Record<string, string> = {
    mathematics: "from-blue-500 to-cyan-500",
    programming: "from-purple-500 to-pink-500",
    languages: "from-green-500 to-emerald-500",
    music: "from-orange-500 to-red-500",
    "art & design": "from-pink-500 to-rose-500",
    art: "from-pink-500 to-rose-500",
    design: "from-pink-500 to-rose-500",
    science: "from-indigo-500 to-blue-500",
    "social studies": "from-yellow-500 to-orange-500",
    fitness: "from-red-500 to-pink-500",
};

// Default colors for categories without a specific mapping
const defaultColors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-blue-500",
    "from-yellow-500 to-orange-500",
    "from-red-500 to-pink-500",
];

export default function CategoriesSection({ categories = [] }: CategoriesSectionProps) {
    const getIcon = (name: string): LucideIcon => {
        return iconMap[name.toLowerCase()] || BookOpen;
    };

    const getColor = (name: string, index: number): string => {
        return colorMap[name.toLowerCase()] || defaultColors[index % defaultColors.length];
    };
    return (
        <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 md:px-24 lg:px-24 xl:px-32">
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
                    {categories.length > 0 ? (
                        categories.map((category, index) => {
                            const Icon = getIcon(category.name);
                            const color = getColor(category.name, index);
                            const tutorCount = category._count?.tutorProfiles || 0;
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
                                                    className={`p-4 rounded-2xl bg-gradient-to-br ${color} transform group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                                                        {category.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {tutorCount} tutors
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            No categories available
                        </div>
                    )}
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
