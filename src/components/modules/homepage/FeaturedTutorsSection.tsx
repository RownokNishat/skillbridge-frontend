"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Award } from "lucide-react";
import Link from "next/link";
import { TutorProfile } from "@/types";

interface FeaturedTutorsSectionProps {
    tutors?: TutorProfile[];
}

// Mock data for demonstration
const mockTutors = [
    {
        id: "1",
        userId: "1",
        bio: "Experienced mathematics tutor with 10+ years of teaching experience",
        expertise: ["Calculus", "Algebra", "Geometry"],
        hourlyRate: 45,
        experience: 10,
        education: "PhD in Mathematics",
        languages: ["English", "Spanish"],
        availability: [],
        categoryId: "1",
        rating: 4.9,
        totalReviews: 127,
        totalSessions: 450,
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
            id: "1",
            name: "Dr. Sarah Johnson",
            email: "sarah@example.com",
            image: "",
            role: "tutor" as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    },
    {
        id: "2",
        userId: "2",
        bio: "Full-stack developer and coding instructor passionate about teaching",
        expertise: ["JavaScript", "React", "Node.js", "Python"],
        hourlyRate: 60,
        experience: 8,
        education: "MSc Computer Science",
        languages: ["English"],
        availability: [],
        categoryId: "2",
        rating: 5.0,
        totalReviews: 89,
        totalSessions: 320,
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
            id: "2",
            name: "Michael Chen",
            email: "michael@example.com",
            image: "",
            role: "tutor" as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    },
    {
        id: "3",
        userId: "3",
        bio: "Native Spanish speaker with certification in language teaching",
        expertise: ["Spanish", "French", "Italian"],
        hourlyRate: 35,
        experience: 6,
        education: "BA in Linguistics",
        languages: ["English", "Spanish", "French"],
        availability: [],
        categoryId: "3",
        rating: 4.8,
        totalReviews: 156,
        totalSessions: 580,
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
            id: "3",
            name: "Maria Garcia",
            email: "maria@example.com",
            image: "",
            role: "tutor" as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    },
    {
        id: "4",
        userId: "4",
        bio: "Professional pianist and music theory instructor",
        expertise: ["Piano", "Music Theory", "Composition"],
        hourlyRate: 50,
        experience: 12,
        education: "Master of Music",
        languages: ["English", "German"],
        availability: [],
        categoryId: "4",
        rating: 4.9,
        totalReviews: 94,
        totalSessions: 410,
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
            id: "4",
            name: "David Williams",
            email: "david@example.com",
            image: "",
            role: "tutor" as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    },
    {
        id: "5",
        userId: "5",
        bio: "Award-winning graphic designer and UI/UX expert",
        expertise: ["Graphic Design", "UI/UX", "Adobe Suite"],
        hourlyRate: 55,
        experience: 9,
        education: "BFA in Graphic Design",
        languages: ["English"],
        availability: [],
        categoryId: "5",
        rating: 4.9,
        totalReviews: 112,
        totalSessions: 390,
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
            id: "5",
            name: "Emily Taylor",
            email: "emily@example.com",
            image: "",
            role: "tutor" as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    },
    {
        id: "6",
        userId: "6",
        bio: "PhD in Physics with passion for making science accessible",
        expertise: ["Physics", "Chemistry", "Biology"],
        hourlyRate: 48,
        experience: 11,
        education: "PhD in Physics",
        languages: ["English", "Mandarin"],
        availability: [],
        categoryId: "6",
        rating: 5.0,
        totalReviews: 78,
        totalSessions: 290,
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
            id: "6",
            name: "Dr. James Lee",
            email: "james@example.com",
            image: "",
            role: "tutor" as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    },
];

export default function FeaturedTutorsSection({
    tutors = mockTutors,
}: FeaturedTutorsSectionProps) {
    return (
        <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
                        Meet Our{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Top-Rated Tutors
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Learn from verified experts with proven track records of success
                    </p>
                </motion.div>

                {/* Tutors Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {tutors.length > 0 ? tutors.map((tutor, index) => (
                        <motion.div
                            key={tutor.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="group hover:shadow-2xl transition-all duration-300 h-full border-2 hover:border-blue-500 dark:hover:border-blue-400">
                                <CardContent className="p-6 space-y-4">
                                    {/* Tutor Header */}
                                    <div className="flex items-start gap-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                                {tutor.user?.name?.charAt(0) || "T"}
                                            </div>
                                            {tutor.isVerified && (
                                                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                                                    <Award className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                                {tutor.user?.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {tutor.education}
                                            </p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {tutor.rating || 0}
                                                </span>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    ({tutor.totalReviews || 0} reviews)
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                        {tutor.bio}
                                    </p>

                                    {/* Expertise Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {(tutor.expertise || []).slice(0, 3).map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="secondary"
                                                className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                            <Clock className="w-4 h-4" />
                                            <span>{tutor.experience || 0}+ years</span>
                                        </div>
                                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                                            ${tutor.hourlyRate || 0}
                                            <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                                /hr
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Button
                                        asChild
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                    >
                                        <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )) : (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No featured tutors available at the moment
                        </div>
                    )}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center"
                >
                    <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                        <Link href="/tutors">Browse All Tutors</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
