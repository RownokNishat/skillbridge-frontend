"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, MapPin, Clock, Award, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TutorProfile } from "@/types";

// Mock tutors data (same as featured tutors but extended)
const mockTutors: TutorProfile[] = [
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
];

export default function TutorsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [minRate, setMinRate] = useState("");
    const [maxRate, setMaxRate] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Find Your{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Perfect Tutor
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Browse through our verified expert tutors and start learning today
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search by subject, tutor name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 text-lg border-2"
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setShowFilters(!showFilters)}
                            className="border-2"
                        >
                            <SlidersHorizontal className="mr-2" />
                            Filters
                        </Button>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <Card className="border-2">
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <Label htmlFor="minRate">Min Rate ($/hr)</Label>
                                        <Input
                                            id="minRate"
                                            type="number"
                                            placeholder="0"
                                            value={minRate}
                                            onChange={(e) => setMinRate(e.target.value)}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="maxRate">Max Rate ($/hr)</Label>
                                        <Input
                                            id="maxRate"
                                            type="number"
                                            placeholder="100"
                                            value={maxRate}
                                            onChange={(e) => setMaxRate(e.target.value)}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                                            Apply Filters
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{mockTutors.length}</span> tutors
                    </p>
                </div>

                {/* Tutors Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockTutors.map((tutor) => (
                        <Card
                            key={tutor.id}
                            className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500 dark:hover:border-blue-400"
                        >
                            <CardContent className="p-6 space-y-4">
                                {/* Tutor Header */}
                                <div className="flex items-start gap-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                            {tutor.user?.name.charAt(0)}
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
                                                {tutor.rating}
                                            </span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                ({tutor.totalReviews})
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
                                    {tutor.expertise.slice(0, 3).map((skill) => (
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
                                        <span>{tutor.experience}+ years</span>
                                    </div>
                                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                                        ${tutor.hourlyRate}
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
                    ))}
                </div>
            </div>
        </div>
    );
}
