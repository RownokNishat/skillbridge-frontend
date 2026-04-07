"use client";

import Link from "next/link";
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { categoryService } from "@/services/category.service";
import { tutorService } from "@/services/tutor.service";
import { Category, TutorProfile } from "@/types";
import { Search, Star, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const PAGE_SIZE = 8;

interface TutorExploreClientProps {
  detailsBasePath: string;
  title?: string;
  description?: string;
}

export default function TutorExploreClient({
  detailsBasePath,
  title = "Explore Tutors",
  description = "Use search, filters, and sorting to find the best tutor for your goals.",
}: TutorExploreClientProps) {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [rating, setRating] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [page, setPage] = useState(1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sb_recent_searches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const [categoryResult, tutorResult] = await Promise.all([
        categoryService.getAllCategories({ cache: "no-store" }),
        tutorService.getTutors({
          search: activeSearch || undefined,
          categoryId: categoryId === "all" ? undefined : categoryId,
          minRating: rating === "all" ? undefined : Number(rating),
          sortBy: sortBy as "rating" | "price" | "experience",
          sortOrder: sortBy === "price" ? "asc" : "desc",
        }),
      ]);

      if (categoryResult.data?.data) {
        setCategories(categoryResult.data.data);
      }

      if (tutorResult.error || !tutorResult.data?.success) {
        setError(tutorResult.error?.message || "Unable to load tutors");
        setTutors([]);
      } else {
        const payload = tutorResult.data.data as unknown;
        let tutorData: TutorProfile[] = [];

        if (Array.isArray(payload)) {
          tutorData = payload as TutorProfile[];
        } else if (
          payload &&
          typeof payload === "object" &&
          "data" in payload &&
          Array.isArray((payload as { data: unknown }).data)
        ) {
          tutorData = (payload as { data: TutorProfile[] }).data;
        }

        setTutors(tutorData);
      }

      setLoading(false);
    };

    fetchData();
  }, [activeSearch, categoryId, rating, sortBy]);

  const aiSuggestions = useMemo(() => {
    const fromData = tutors
      .flatMap((tutor: TutorProfile) => [
        tutor.user?.name,
        ...(tutor.expertise || []),
        ...(tutor.categories?.map((item: Category) => item.name) || []),
      ])
      .filter(Boolean)
      .map((value: string | undefined) => String(value));

    const unique = [...new Set([...recentSearches, ...fromData])];

    if (!search.trim()) {
      return unique.slice(0, 6);
    }

    return unique
      .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 6);
  }, [tutors, recentSearches, search]);

  const sortedTutors = useMemo(() => {
    const list = [...tutors];

    if (sortBy === "price") {
      return list.sort((a, b) => a.hourlyRate - b.hourlyRate);
    }

    if (sortBy === "experience") {
      return list.sort((a, b) => (b.experience || 0) - (a.experience || 0));
    }

    return list.sort(
      (a, b) =>
        (b.averageRating || b.rating || 0) - (a.averageRating || a.rating || 0),
    );
  }, [sortBy, tutors]);

  const totalPages = Math.max(1, Math.ceil(sortedTutors.length / PAGE_SIZE));
  const paginatedTutors = sortedTutors.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [activeSearch, categoryId, rating, sortBy]);

  const applySearch = (value: string) => {
    const normalized = value.trim();
    setActiveSearch(normalized);

    if (!normalized) {
      return;
    }

    const next = [
      normalized,
      ...recentSearches.filter((item: string) => item !== normalized),
    ].slice(0, 8);
    setRecentSearches(next);
    localStorage.setItem("sb_recent_searches", JSON.stringify(next));
  };

  return (
    <main className="app-shell min-h-screen py-12">
      <motion.section
        className="section-wrap space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>

        <Card className="uniform-card">
          <CardContent className="space-y-4 p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    applySearch(search);
                  }
                }}
                className="pl-10"
                placeholder="Search by tutor, topic, or skill"
              />
            </div>

            {aiSuggestions.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  AI suggestions
                </p>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.map((item: string) => (
                    <Button
                      key={item}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearch(item);
                        applySearch(item);
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label>Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((category: Category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Minimum rating</Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any rating</SelectItem>
                    <SelectItem value="4.5">4.5+</SelectItem>
                    <SelectItem value="4">4.0+</SelectItem>
                    <SelectItem value="3.5">3.5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sort by</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Top rating</SelectItem>
                    <SelectItem value="price">Lowest price</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end gap-2">
                <Button className="w-full" onClick={() => applySearch(search)}>
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="uniform-card border-destructive/30">
            <CardContent className="p-6">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="uniform-card">
                <CardContent className="space-y-4 p-4">
                  <Skeleton className="aspect-4/3 w-full rounded-lg" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {paginatedTutors.length} of {sortedTutors.length} tutors
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {paginatedTutors.map((tutor: TutorProfile) => {
                const tutorRating = tutor.averageRating || tutor.rating || 0;
                const tutorCategories =
                  tutor.categories?.map((item: Category) => item.name) || [];
                const categoryText = tutorCategories.join(", ") || tutor.education || "General";
                const detailId = tutor.userId || tutor.user?.id || tutor.id;

                return (
                  <motion.div
                    key={tutor.id}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                  <Card className="uniform-card h-full overflow-hidden">
                    <CardContent className="flex h-full flex-col p-4">
                      <img
                        src={`https://picsum.photos/seed/tutor-${tutor.id}/640/420`}
                        alt={tutor.user?.name || "Tutor"}
                        className="aspect-4/3 w-full rounded-lg object-cover"
                      />

                      <h3 className="mt-4 text-lg font-semibold">{tutor.user?.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {tutor.bio || "Focused tutor with a practical, student-first teaching approach."}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="secondary">${tutor.hourlyRate}/hr</Badge>
                        <Badge variant="secondary" className="gap-1">
                          <Star className="h-3 w-3" /> {tutorRating.toFixed(1)}
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="h-3 w-3" /> {tutor.experience || 0} yrs
                        </Badge>
                      </div>

                      <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="mt-0.5 h-4 w-4" />
                        <span className="line-clamp-1">{categoryText}</span>
                      </div>

                      <Button asChild className="mt-4 w-full">
                        <Link href={`${detailsBasePath}/${detailId}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </motion.section>
    </main>
  );
}
