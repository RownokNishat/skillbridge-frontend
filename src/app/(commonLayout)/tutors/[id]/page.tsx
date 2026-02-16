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
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { tutorService } from "@/services/tutor.service";
import { TutorProfile } from "@/types";

export default function TutorDetailPage() {
    const params = useParams();
    const tutorId = params.id as string;
    const [tutor, setTutor] = useState<TutorProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTutor = async () => {
            setLoading(true);
            const { data, error } = await tutorService.getTutorById(tutorId);
            
            if (error || !data) {
                setError(error?.message || "Failed to load tutor");
                setLoading(false);
                return;
            }
            
            setTutor(data?.data);
            setLoading(false);
        };

        fetchTutor();
    }, [tutorId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-600" />
                    <p className="text-gray-600 dark:text-gray-400">Loading tutor profile...</p>
                </div>
            </div>
        );
    }

    if (error || !tutor) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="border-2 border-red-200 max-w-md">
                    <CardContent className="p-8 text-center">
                        <p className="text-red-600 mb-4">{error || "Tutor not found"}</p>
                        <Button asChild variant="outline">
                            <Link href="/tutors">Back to Tutors</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

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
                                            {tutor.user?.name.charAt(0) || "T"}
                                        </div>
                                        {tutor.isVerified && (
                                            <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                                                <Award className="w-6 h-6 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                                    {tutor.user?.name}
                                                </h1>
                                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                                                    {tutor.education || tutor.categories?.map(c => c.name).join(", ") || "Tutor"}
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                        <span className="font-bold text-xl text-gray-900 dark:text-white">
                                                            {(tutor.averageRating || 0).toFixed(1)}
                                                        </span>
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            ({tutor.totalReviews} reviews)
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                                        <Clock className="w-5 h-5" />
                                                        <span>{tutor.experience}+ years</span>
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
                                    {tutor.bio}
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
                                    {(tutor.expertise || tutor.categories?.map(c => c.name) || []).map((skill) => (
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
                                {(!tutor.reviews || tutor.reviews.length === 0) ? (
                                    <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                                        <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                        <p>No reviews yet</p>
                                    </div>
                                ) : (
                                    tutor.reviews.map((review, index) => (
                                    <div key={review.id}>
                                        {index > 0 && <Separator className="my-6" />}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                                                        {review.student?.name?.charAt(0) || "S"}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 dark:text-white">
                                                            {review.student?.name || "Anonymous"}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {new Date(review.createdAt).toLocaleDateString()}
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
                                    ))
                                )}
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
                                        ${tutor.hourlyRate}
                                        <span className="text-xl font-normal text-gray-600 dark:text-gray-400">
                                            /hour
                                        </span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                        <Clock className="w-5 h-5" />
                                        <span>{tutor.experience}+ years experience</span>
                                    </div>
                                    {tutor.languages && tutor.languages.length > 0 && (
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                            <Languages className="w-5 h-5" />
                                            <span>{tutor.languages.join(", ")}</span>
                                        </div>
                                    )}
                                    {tutor.education && (
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                            <GraduationCap className="w-5 h-5" />
                                            <span>{tutor.education}</span>
                                        </div>
                                    )}
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <Button
                                        asChild
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 text-lg"
                                    >
                                        <Link href={`/login?redirect=/student/tutors/${tutorId}`}>
                                            <Calendar className="mr-2" />
                                            Book a Session
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="w-full h-12 border-2" disabled>
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
