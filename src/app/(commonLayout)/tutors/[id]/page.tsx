"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Star,
    Award,
    Clock,
    BookOpen,
    Languages,
    GraduationCap,
    Calendar,
    MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Mock tutor data
const mockTutor = {
    id: "1",
    userId: "1",
    bio: "Experienced mathematics tutor with 10+ years of teaching experience. I specialize in helping students understand complex mathematical concepts through practical examples and patient guidance. My teaching philosophy focuses on building strong foundations and developing problem-solving skills.",
    expertise: ["Calculus", "Algebra", "Geometry", "Trigonometry", "Statistics"],
    hourlyRate: 45,
    experience: 10,
    education: "PhD in Mathematics, MIT",
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
};

const mockReviews = [
    {
        id: "1",
        rating: 5,
        comment: "Excellent tutor! Very patient and explains concepts clearly.",
        studentName: "John Doe",
        date: "2026-01-15",
    },
    {
        id: "2",
        rating: 5,
        comment: "Helped me improve my calculus grade significantly. Highly recommend!",
        studentName: "Jane Smith",
        date: "2026-01-10",
    },
    {
        id: "3",
        rating: 4,
        comment: "Great teaching style and very knowledgeable.",
        studentName: "Mike Wilson",
        date: "2026-01-05",
    },
];

export default function TutorDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Header */}
                        <Card className="border-2">
                            <CardContent className="p-8">
                                <div className="flex items-start gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                                            {mockTutor.user?.name.charAt(0)}
                                        </div>
                                        {mockTutor.isVerified && (
                                            <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                                                <Award className="w-6 h-6 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                                    {mockTutor.user?.name}
                                                </h1>
                                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                                                    {mockTutor.education}
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                        <span className="font-bold text-xl text-gray-900 dark:text-white">
                                                            {mockTutor.rating}
                                                        </span>
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            ({mockTutor.totalReviews} reviews)
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                                        <BookOpen className="w-5 h-5" />
                                                        <span>{mockTutor.totalSessions} sessions</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* About */}
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle>About Me</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {mockTutor.bio}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Expertise */}
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle>Expertise</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-3">
                                    {mockTutor.expertise.map((skill) => (
                                        <Badge
                                            key={skill}
                                            className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Reviews */}
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle>Student Reviews</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {mockReviews.map((review, index) => (
                                    <div key={review.id}>
                                        {index > 0 && <Separator className="my-6" />}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                                                        {review.studentName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 dark:text-white">
                                                            {review.studentName}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {new Date(review.date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating
                                                                    ? "fill-yellow-400 text-yellow-400"
                                                                    : "text-gray-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 ml-12">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Booking Card */}
                        <Card className="border-2 sticky top-6">
                            <CardContent className="p-6 space-y-6">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                                        ${mockTutor.hourlyRate}
                                        <span className="text-xl font-normal text-gray-600 dark:text-gray-400">
                                            /hour
                                        </span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                        <Clock className="w-5 h-5" />
                                        <span>{mockTutor.experience}+ years experience</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                        <Languages className="w-5 h-5" />
                                        <span>{mockTutor.languages.join(", ")}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                        <GraduationCap className="w-5 h-5" />
                                        <span>{mockTutor.education}</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <Button
                                        asChild
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 text-lg"
                                    >
                                        <Link href={`/tutors/${id}/book`}>
                                            <Calendar className="mr-2" />
                                            Book a Session
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="w-full h-12 border-2">
                                        <MessageSquare className="mr-2" />
                                        Send Message
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
