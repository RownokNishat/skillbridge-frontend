"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tutorService } from "@/services/tutor.service";
import { categoryService } from "@/services/category.service";
import { Search, Star, Clock, DollarSign, Loader2, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { TutorProfile, Category, TutorFilters } from "@/types";
import Link from "next/link";
import { useDebounce } from "@/hooks/use-debounce";

export default function BrowseTutorsPage() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "price" | "experience">(
    "rating",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Debounced values
  const debouncedSearch = useDebounce(search, 500);
  const debouncedMinRate = useDebounce(minRate, 500);
  const debouncedMaxRate = useDebounce(maxRate, 500);
  const debouncedMinRating = useDebounce(minRating, 500);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTutors();
  }, [
    debouncedSearch,
    selectedCategory,
    debouncedMinRate,
    debouncedMaxRate,
    debouncedMinRating,
    sortBy,
    sortOrder,
  ]);

  const fetchCategories = async () => {
    const { data, error } = await categoryService.getAllCategories();
    if (!error && data) {
      setCategories(data.data || []);
    }
  };

  const fetchTutors = async () => {
    setLoading(true);
    setError(null);

    const filters: TutorFilters = {
      search: debouncedSearch || undefined,
      categoryId: selectedCategory || undefined,
      minRate: debouncedMinRate ? parseFloat(debouncedMinRate) : undefined,
      maxRate: debouncedMaxRate ? parseFloat(debouncedMaxRate) : undefined,
      minRating: debouncedMinRating ? parseFloat(debouncedMinRating) : undefined,
      sortBy,
      sortOrder,
    };

    const { data, error: fetchError } = await tutorService.getTutors(filters);

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    console.log("Fetched tutors:", data);
    setTutors(Array.isArray(data?.data) && data.data  || []);
    setLoading(false);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setMinRate("");
    setMaxRate("");
    setMinRating("");
    setSortBy("rating");
    setSortOrder("desc");
  };

  if (loading && tutors.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Browse{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tutors
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find the perfect tutor for your learning journey
          </p>
        </div>
        <Card className="border-2">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading tutors...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Browse{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tutors
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find the perfect tutor for your learning journey
          </p>
        </div>
        <Card className="border-2 border-red-200 dark:border-red-800">
          <CardContent className="p-12 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <p className="text-lg font-semibold">Error loading tutors</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button
              onClick={fetchTutors}
              variant="outline"
              className="border-red-200 dark:border-red-800"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Browse{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tutors
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find the perfect tutor for your learning journey
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="border-2">
        <CardContent className="p-6 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tutors by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <Label>Category</Label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full mt-2 px-3 py-2 border-2 rounded-md bg-background"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Min Hourly Rate ($)</Label>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={minRate}
                  onChange={(e) => setMinRate(e.target.value)}
                  placeholder="0"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Max Hourly Rate ($)</Label>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={maxRate}
                  onChange={(e) => setMaxRate(e.target.value)}
                  placeholder="200"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Min Rating</Label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="w-full mt-2 px-3 py-2 border-2 rounded-md bg-background"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
              </div>

              <div>
                <Label>Sort By</Label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full mt-2 px-3 py-2 border-2 rounded-md bg-background"
                >
                  <option value="rating">Rating</option>
                  <option value="price">Price</option>
                  <option value="experience">Experience</option>
                </select>
              </div>

              <div>
                <Label>Sort Order</Label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="w-full mt-2 px-3 py-2 border-2 rounded-md bg-background"
                >
                  <option value="desc">High to Low</option>
                  <option value="asc">Low to High</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          {loading
            ? "Loading..."
            : `${tutors.length} tutor${tutors.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {/* Tutors Grid */}
      {tutors.length === 0 ? (
        <Card className="border-2">
          <CardContent className="p-12 text-center text-gray-600 dark:text-gray-400">
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="mb-4">No tutors found matching your criteria</p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <Card
              key={tutor.id}
              className="border-2 hover:border-blue-500 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  {/* Tutor Avatar & Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                      {tutor.user?.name?.charAt(0) || "T"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                        {tutor.user?.name || "Unknown Tutor"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tutor.category?.name || "General"}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {tutor.bio}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">
                        {tutor.averageRating?.toFixed(1) || "0.0"}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({tutor.totalReviews || 0})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">
                        {tutor.experience || 0} years
                      </span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold">
                        ${tutor.hourlyRate}/hour
                      </span>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  {tutor.isVerified && (
                    <Badge className="mb-4 w-fit bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      Verified
                    </Badge>
                  )}

                  {/* View Profile Button */}
                  <Button
                    asChild
                    className="w-full mt-auto bg-gradient-to-r from-blue-600 to-indigo-600"
                  >
                    <Link href={`/student/tutors/${tutor?.user?.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
