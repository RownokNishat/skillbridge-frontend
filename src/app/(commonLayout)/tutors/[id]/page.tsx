"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { tutorService } from "@/services/tutor.service";
import { TutorProfile } from "@/types";
import { Calendar, Clock, Languages, Star } from "lucide-react";

export default function TutorDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [relatedTutors, setRelatedTutors] = useState<TutorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let { data, error } = await tutorService.getTutorById(id);

      if (error || !data?.success || !data.data) {
        const fallback = await tutorService.getTutors({
          search: id,
          sortBy: "rating",
          sortOrder: "desc",
        });

        const payload = fallback.data?.data as unknown;
        const fallbackList = Array.isArray(payload)
          ? payload
          : payload && typeof payload === "object" && "data" in payload && Array.isArray((payload as { data: unknown }).data)
            ? ((payload as { data: TutorProfile[] }).data ?? [])
            : [];

        const matchedTutor = fallbackList.find(
          (item: TutorProfile) => item.userId === id || item.id === id || item.user?.id === id,
        );

        if (matchedTutor?.id && matchedTutor.id !== id) {
          const secondTry = await tutorService.getTutorById(matchedTutor.id);
          data = secondTry.data;
          error = secondTry.error;
        }
      }

      if (error || !data?.success || !data.data) {
        setError(error?.message || "Tutor profile not found");
        setLoading(false);
        return;
      }

      const tutorProfile = data.data;
      setTutor(tutorProfile);

      const related = await tutorService.getTutors({
        categoryId: tutorProfile.categoryId || undefined,
        sortBy: "rating",
        sortOrder: "desc",
      });

      const relatedPayload = related.data?.data as unknown;
      const items = Array.isArray(relatedPayload)
        ? relatedPayload
        : relatedPayload && typeof relatedPayload === "object" && "data" in relatedPayload && Array.isArray((relatedPayload as { data: unknown }).data)
          ? ((relatedPayload as { data: TutorProfile[] }).data ?? [])
          : [];

      setRelatedTutors(
        items
          .filter((item) => item.id !== tutorProfile.id && item.userId !== tutorProfile.userId)
          .slice(0, 4),
      );
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const gallery = useMemo(() => {
    return [
      `https://picsum.photos/seed/profile-${id}/1200/720`,
      `https://picsum.photos/seed/class-${id}/1200/720`,
      `https://picsum.photos/seed/notes-${id}/1200/720`,
    ];
  }, [id]);

  if (loading) {
    return (
      <main className="app-shell min-h-screen py-12">
        <section className="section-wrap space-y-4">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-80 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </section>
      </main>
    );
  }

  if (error || !tutor) {
    return (
      <main className="app-shell min-h-screen py-12">
        <section className="section-wrap">
          <Card className="uniform-card border-destructive/30">
            <CardContent className="p-8">
              <p className="text-destructive">{error || "Tutor not found"}</p>
              <Button asChild className="mt-4">
                <Link href="/tutors">Back to Tutors</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    );
  }

  const rating = tutor.averageRating || tutor.rating || 0;

  return (
    <main className="app-shell min-h-screen py-12">
      <section className="section-wrap space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <h1 className="text-4xl font-bold">{tutor.user?.name}</h1>
            <p className="text-muted-foreground">
              {tutor.education || "Professional tutor"}
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {gallery.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={tutor.user?.name || "Tutor"}
                  className="h-44 w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </div>

          <Card className="uniform-card h-fit lg:sticky lg:top-24">
            <CardContent className="space-y-4 p-6">
              <p className="text-3xl font-bold">${tutor.hourlyRate}/hour</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Star className="h-4 w-4" /> {rating.toFixed(1)} rating
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {tutor.experience || 0}+ years experience
                </p>
                <p className="flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  {tutor.languages?.length ? tutor.languages.join(", ") : "English"}
                </p>
              </div>
              <Separator />
              <Button asChild className="w-full">
                <Link href={`/login?redirect=/student/tutors/${id}`}>
                  <Calendar className="mr-2 h-4 w-4" /> Book Session
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="uniform-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Description / Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {tutor.bio ||
                  "This tutor focuses on practical learning, concept clarity, and measurable student progress."}
              </p>
            </CardContent>
          </Card>

          <Card className="uniform-card">
            <CardHeader>
              <CardTitle>Key Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                <span className="font-medium">Session Count:</span> {tutor.totalSessions || 0}
              </p>
              <p>
                <span className="font-medium">Reviews:</span> {tutor.totalReviews || 0}
              </p>
              <p>
                <span className="font-medium">Verification:</span>{" "}
                {tutor.isVerified ? "Verified" : "Pending"}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {(tutor.expertise || []).slice(0, 6).map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="uniform-card">
          <CardHeader>
            <CardTitle>Reviews / Ratings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tutor.reviews?.length ? (
              tutor.reviews.slice(0, 4).map((review) => (
                <div key={review.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.student?.name || "Student"}</p>
                    <p className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Rating: {review.rating}/5</p>
                  <p className="mt-2 text-sm">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No reviews published yet.</p>
            )}
          </CardContent>
        </Card>

        <div>
          <h2 className="mb-4 text-2xl font-bold">Related Tutors</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {relatedTutors.map((item) => (
              <Card key={item.id} className="uniform-card">
                <CardContent className="space-y-3 p-4">
                  <img
                    src={`https://picsum.photos/seed/related-${item.id}/600/400`}
                    alt={item.user?.name || "Tutor"}
                    className="aspect-4/3 w-full rounded-lg object-cover"
                  />
                  <p className="font-semibold">{item.user?.name}</p>
                  <p className="text-sm text-muted-foreground">${item.hourlyRate}/hour</p>
                  <Button asChild className="w-full" variant="outline">
                    <Link href={`/tutors/${item.userId || item.user?.id || item.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
