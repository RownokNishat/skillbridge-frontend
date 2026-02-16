"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Star, Clock, Award, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TutorProfile, TutorFilters, Category } from "@/types";
import { useDebounce } from "@/hooks/use-debounce";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api`;

function TutorsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State
    const [tutors, setTutors] = useState<TutorProfile[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [showFilters, setShowFilters] = useState(false);

    // Filter state from URL params
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
    const [minRate, setMinRate] = useState(searchParams.get("minRate") || "");
    const [maxRate, setMaxRate] = useState(searchParams.get("maxRate") || "");
    const [minRating, setMinRating] = useState(searchParams.get("minRating") || "any");
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "relevance");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "desc");

    // Debounced values for API calls
    const debouncedSearch = useDebounce(searchQuery, 500);
    const debouncedMinRate = useDebounce(minRate, 500);
    const debouncedMaxRate = useDebounce(maxRate, 500);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${API_URL}/categories`);
                const data = await res.json();
                if (data.success) {
                    setCategories(data.data || []);
                }
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // Build filters from state
    const buildFilters = useCallback((): TutorFilters => {
        const filters: TutorFilters = {};
        if (debouncedSearch) filters.search = debouncedSearch;
        if (selectedCategory) filters.categoryId = selectedCategory;
        if (debouncedMinRate) filters.minRate = parseFloat(debouncedMinRate);
        if (debouncedMaxRate) filters.maxRate = parseFloat(debouncedMaxRate);
        if (minRating) filters.minRating = parseFloat(minRating);
        if (sortBy) filters.sortBy = sortBy as TutorFilters["sortBy"];
        if (sortOrder) filters.sortOrder = sortOrder as TutorFilters["sortOrder"];
        return filters;
    }, [debouncedSearch, selectedCategory, debouncedMinRate, debouncedMaxRate, minRating, sortBy, sortOrder]);

    const fetchTutors = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const filters = buildFilters();
            const params = new URLSearchParams();

            if (filters.search) params.append("search", filters.search);
            if (filters.categoryId && filters.categoryId !== "all") params.append("categoryId", filters.categoryId);
            if (filters.minRate) params.append("minRate", filters.minRate.toString());
            if (filters.maxRate) params.append("maxRate", filters.maxRate.toString());
            if (filters.minRating && filters.minRating !== "any") params.append("minRating", filters.minRating.toString());
            if (filters.sortBy && filters.sortBy !== "relevance") params.append("sortBy", filters.sortBy);
            if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

            const queryString = params.toString();
            const url = `${API_URL}/tutors${queryString ? `?${queryString}` : ""}`;

            const res = await fetch(url);
            const data = await res.json();

            if (data.success) {
                const tutorData = data.data?.data || data.data || [];
                setTutors(Array.isArray(tutorData) ? tutorData : []);
                setTotalCount(data.data?.total || tutorData.length || 0);
            } else {
                setError(data.message || "Failed to fetch tutors");
                setTutors([]);
            }
        } catch (err) {
            console.error("Failed to fetch tutors:", err);
            setError("Failed to load tutors. Please try again.");
            setTutors([]);
        } finally {
            setLoading(false);
        }
    }, [buildFilters]);

    const updateURL = useCallback(() => {
        const params = new URLSearchParams();
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory);
        if (debouncedMinRate) params.set("minRate", debouncedMinRate);
        if (debouncedMaxRate) params.set("maxRate", debouncedMaxRate);
        if (minRating && minRating !== "any") params.set("minRating", minRating);
        if (sortBy && sortBy !== "relevance") params.set("sortBy", sortBy);
        if (sortOrder && sortOrder !== "desc") params.set("sortOrder", sortOrder);

        const newURL = params.toString() ? `?${params.toString()}` : "/tutors";
        router.push(newURL, { scroll: false });
    }, [router, debouncedSearch, selectedCategory, debouncedMinRate, debouncedMaxRate, minRating, sortBy, sortOrder]);

    useEffect(() => {
        fetchTutors();
        updateURL();
    }, [fetchTutors, updateURL]);

    const handleApplyFilters = () => {
        updateURL();
        fetchTutors();
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setMinRate("");
        setMaxRate("");
        setMinRating("any");
        setSortBy("relevance");
        setSortOrder("desc");
        router.push("/tutors", { scroll: false });
    };

    const hasActiveFilters = searchQuery || selectedCategory || minRate || maxRate || minRating || sortBy;

    const getCategoryName = (categoryId: string) => {
        const category = categories.find((c) => c.id === categoryId);
        return category?.name || "";
    };

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
                            className={`border-2 ${showFilters ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : ""}`}
                        >
                            <SlidersHorizontal className="mr-2" />
                            Filters
                            {hasActiveFilters && (
                                <Badge className="ml-2 bg-blue-500">Active</Badge>
                            )}
                        </Button>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <Card className="border-2">
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {/* Category Filter */}
                                    <div>
                                        <Label>Category</Label>
                                        <Select
                                            value={selectedCategory}
                                            onValueChange={setSelectedCategory}
                                        >
                                            <SelectTrigger className="mt-2">
                                                <SelectValue placeholder="All Categories" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Categories</SelectItem>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <Label>Price Range ($/hr)</Label>
                                        <div className="flex gap-2 mt-2">
                                            <Input
                                                type="number"
                                                placeholder="Min"
                                                value={minRate}
                                                onChange={(e) => setMinRate(e.target.value)}
                                                min="0"
                                            />
                                            <Input
                                                type="number"
                                                placeholder="Max"
                                                value={maxRate}
                                                onChange={(e) => setMaxRate(e.target.value)}
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    {/* Min Rating */}
                                    <div>
                                        <Label>Minimum Rating</Label>
                                        <Select
                                            value={minRating}
                                            onValueChange={setMinRating}
                                        >
                                            <SelectTrigger className="mt-2">
                                                <SelectValue placeholder="Any Rating" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="any">Any Rating</SelectItem>
                                                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                                                <SelectItem value="4">4+ Stars</SelectItem>
                                                <SelectItem value="3.5">3.5+ Stars</SelectItem>
                                                <SelectItem value="3">3+ Stars</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Sort By */}
                                    <div>
                                        <Label>Sort By</Label>
                                        <Select
                                            value={sortBy}
                                            onValueChange={(value: string) => {
                                                setSortBy(value);
                                                // Default sort order based on field
                                                if (value === "price") {
                                                    setSortOrder("asc");
                                                } else {
                                                    setSortOrder("desc");
                                                }
                                            }}
                                        >
                                            <SelectTrigger className="mt-2">
                                                <SelectValue placeholder="Relevance" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="relevance">Relevance</SelectItem>
                                                <SelectItem value="rating">Highest Rated</SelectItem>
                                                <SelectItem value="price">Lowest Price</SelectItem>
                                                <SelectItem value="experience">Most Experienced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Filter Actions */}
                                <div className="flex gap-4 mt-6 pt-6 border-t">
                                    <Button
                                        onClick={handleApplyFilters}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600"
                                    >
                                        Apply Filters
                                    </Button>
                                    {hasActiveFilters && (
                                        <Button
                                            variant="outline"
                                            onClick={handleClearFilters}
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Clear All
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Active Filters Tags */}
                    {hasActiveFilters && (
                        <div className="flex flex-wrap gap-2">
                            {selectedCategory && (
                                <Badge variant="secondary" className="px-3 py-1">
                                    Category: {getCategoryName(selectedCategory)}
                                    <button
                                        onClick={() => {
                                            setSelectedCategory("");
                                            setTimeout(handleApplyFilters, 0);
                                        }}
                                        className="ml-2 hover:text-red-500"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            )}
                            {(minRate || maxRate) && (
                                <Badge variant="secondary" className="px-3 py-1">
                                    Price: ${minRate || "0"} - ${maxRate || "∞"}
                                    <button
                                        onClick={() => {
                                            setMinRate("");
                                            setMaxRate("");
                                            setTimeout(handleApplyFilters, 0);
                                        }}
                                        className="ml-2 hover:text-red-500"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            )}
                            {minRating && (
                                <Badge variant="secondary" className="px-3 py-1">
                                    Rating: {minRating}+ Stars
                                    <button
                                        onClick={() => {
                                            setMinRating("");
                                            setTimeout(handleApplyFilters, 0);
                                        }}
                                        className="ml-2 hover:text-red-500"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-gray-600 dark:text-gray-400">
                        {loading ? (
                            "Loading..."
                        ) : (
                            <>
                                Showing{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {tutors.length}
                                </span>{" "}
                                {totalCount > tutors.length && `of ${totalCount} `}
                                tutors
                            </>
                        )}
                    </p>
                </div>

                {/* Error State */}
                {error && (
                    <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-950/20">
                        <CardContent className="p-6 text-center">
                            <p className="text-red-600 dark:text-red-400">{error}</p>
                            <Button
                                variant="outline"
                                onClick={fetchTutors}
                                className="mt-4"
                            >
                                Try Again
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="border-2">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-start gap-4">
                                        <Skeleton className="w-16 h-16 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-4 w-20" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-12 w-full" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-6 w-16" />
                                    </div>
                                    <Skeleton className="h-10 w-full" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && tutors.length === 0 && (
                    <Card className="border-2">
                        <CardContent className="p-12 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No tutors found</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Try adjusting your search or filters to find what you're looking for.
                            </p>
                            {hasActiveFilters && (
                                <Button variant="outline" onClick={handleClearFilters}>
                                    Clear All Filters
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Tutors Grid */}
                {!loading && !error && tutors.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tutors.map((tutor) => (
                            <Card
                                key={tutor.id}
                                className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500 dark:hover:border-blue-400"
                            >
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
                                                {tutor.user?.name || "Unknown Tutor"}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {tutor.education || "Education not specified"}
                                            </p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {tutor.rating || tutor.averageRating || 0}
                                                </span>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    ({tutor.totalReviews || 0} reviews)
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                        {tutor.bio || "No bio available"}
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
                                        {(tutor.expertise?.length || 0) > 3 && (
                                            <Badge variant="outline">
                                                +{tutor.expertise!.length - 3} more
                                            </Badge>
                                        )}
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
                                        <Link href={`/tutors/${tutor.userId}`}>View Profile</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default function TutorsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <Skeleton className="h-12 w-96 mb-4" />
                        <Skeleton className="h-6 w-full max-w-2xl" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="border-2">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-start gap-4">
                                        <Skeleton className="w-16 h-16 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-4 w-20" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-12 w-full" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-6 w-16" />
                                    </div>
                                    <Skeleton className="h-10 w-full" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        }>
            <TutorsContent />
        </Suspense>
    );
}