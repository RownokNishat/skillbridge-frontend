"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tutorService } from "@/services/tutor.service";
import { studentService } from "@/services/student.service";
import {
  Star,
  Clock,
  DollarSign,
  BookOpen,
  Calendar,
  Loader2,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TutorProfile } from "@/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function TutorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tutorId = params.id as string;
  const showReviewForm = searchParams.get("review") === "true";

  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  // Booking form state
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchTutorData();
  }, [tutorId]);

  const fetchTutorData = async () => {
    setLoading(true);
    setError(null);

    const [tutorResult, reviewsResult] = await Promise.all([
      tutorService.getTutorById(tutorId),
      // Assuming there's a method to get reviews, otherwise we'll handle it
      fetch(`http://localhost:5000/api/tutors/${tutorId}/reviews`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .catch(() => ({ data: [] })),
    ]);

    if (tutorResult.error) {
      setError(tutorResult.error.message);
      setLoading(false);
      return;
    }

    setTutor(tutorResult.data?.data || null);
    setReviews(reviewsResult?.data || []);
    setLoading(false);
  };

  const handleBooking = async () => {
    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please fill in all booking details");
      return;
    }

    // Combine date and time to create ISO strings
    const startDateTime = new Date(`${bookingDate}T${startTime}`).toISOString();
    const endDateTime = new Date(`${bookingDate}T${endTime}`).toISOString();

    setBookingLoading(true);

    const { error } = await studentService.createBooking({
      tutorId,
      startTime: startDateTime,
      endTime: endDateTime,
    });

    if (error) {
      toast.error(error.message);
      setBookingLoading(false);
      return;
    }

    toast.success("Booking created successfully!");
    setBookingLoading(false);
    setBookingDate("");
    setStartTime("");
    setEndTime("");

    // Redirect to bookings page
    setTimeout(() => {
      router.push("/student/bookings");
    }, 1500);
  };

  const handleReviewSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setReviewLoading(true);

    const { error } = await studentService.createReview({
      tutorId,
      rating,
      comment: comment.trim(),
    });

    if (error) {
      toast.error(error.message);
      setReviewLoading(false);
      return;
    }

    toast.success("Review submitted successfully!");
    setReviewLoading(false);
    setRating(5);
    setComment("");

    // Refresh reviews
    fetchTutorData();

    // Remove review query param
    router.push(`/student/tutors/${tutorId}`);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Link href="/student/tutors">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tutors
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">
            Tutor{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
        </div>
        <Card className="border-2">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading tutor profile...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="space-y-8">
        <div>
          <Link href="/student/tutors">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tutors
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">
            Tutor{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
        </div>
        <Card className="border-2 border-red-200 dark:border-red-800">
          <CardContent className="p-12 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <p className="text-lg font-semibold">Error loading tutor</p>
              <p className="text-sm">{error || "Tutor not found"}</p>
            </div>
            <Link href="/student/tutors">
              <Button
                variant="outline"
                className="border-red-200 dark:border-red-800"
              >
                Back to Tutors
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link href="/student/tutors">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tutors
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">
          Tutor{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Profile
          </span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-4xl flex-shrink-0">
                  {tutor.user?.name?.charAt(0) || "T"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {tutor.user?.name || "Unknown Tutor"}
                    </h2>
                    {tutor.isVerified && (
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    {tutor.category?.name || "General"}
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-lg font-semibold">
                        {tutor.rating?.toFixed(1) || "0.0"}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({tutor.totalReviews || 0} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">
                        {tutor.totalSessions || 0} sessions
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-500" />
                      <span className="text-sm">
                        {tutor.experience || 0} years exp.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {tutor.bio}
                  </p>
                </div>

                {tutor.education && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Education</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tutor.education}
                    </p>
                  </div>
                )}

                {tutor.languages && tutor.languages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {tutor.languages.map((lang, idx) => (
                        <Badge key={idx} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {tutor.expertise && tutor.expertise.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {tutor.expertise.map((skill, idx) => (
                        <Badge
                          key={idx}
                          className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Reviews ({reviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                  <Star className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review: any) => (
                    <div
                      key={review.id}
                      className="border-b pb-4 last:border-0"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          by {review.student?.name || "Anonymous"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Review Form (if from completed booking) */}
          {showReviewForm && (
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle>Leave a Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            value <= rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="comment">Comment</Label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this tutor..."
                    className="w-full min-h-32 px-3 py-2 border-2 rounded-md bg-background mt-2"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleReviewSubmit}
                    disabled={reviewLoading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600"
                  >
                    {reviewLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/student/tutors/${tutorId}`)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Booking */}
        <div className="space-y-6">
          {/* Price Card */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-6">
                <DollarSign className="w-8 h-8 text-green-500" />
                <span className="text-4xl font-bold">{tutor.hourlyRate}</span>
                <span className="text-gray-600 dark:text-gray-400">/hour</span>
              </div>
            </CardContent>
          </Card>

          {/* Booking Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Book a Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                {bookingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
