"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tutorService } from "@/services/tutor.service";
import { categoryService } from "@/services/category.service";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TutorProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const [profileResult, categoriesResult] = await Promise.all([
      tutorService.getMyProfile(),
      categoryService.getAllCategories(),
    ]);

    if (profileResult.error) {
      setError(profileResult.error.message);
      setLoading(false);
      return;
    }

    if (categoriesResult.error) {
      setError(categoriesResult.error.message);
      setLoading(false);
      return;
    }

    setProfile(profileResult.data);
    setCategories(categoriesResult.data || []);

    // Set form values
    if (profileResult.data) {
      setBio(profileResult.data.bio || "");
      setHourlyRate(profileResult.data.hourlyRate?.toString() || "");
      setExperience(profileResult.data.experience?.toString() || "");
      setSelectedCategories(
        profileResult.data.categories?.map((c: any) => c.id) || []
      );
    }

    setLoading(false);
  };

  const handleSave = async () => {
    if (!bio.trim() || !hourlyRate || !experience) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    setSaving(true);

    const { error } = await tutorService.updateProfile({
      bio: bio.trim(),
      hourlyRate: parseFloat(hourlyRate),
      experience: parseInt(experience),
      categoryIds: selectedCategories,
    });

    if (error) {
      toast.error(error.message);
      setSaving(false);
      return;
    }

    toast.success("Profile updated successfully");
    setSaving(false);
    fetchData();
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Tutor{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tutor profile and settings
          </p>
        </div>
        <Card className="border-2">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              Loading profile...
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
            Tutor{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tutor profile and settings
          </p>
        </div>
        <Card className="border-2 border-red-200 dark:border-red-800">
          <CardContent className="p-12 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <p className="text-lg font-semibold">Error loading profile</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button
              onClick={fetchData}
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
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Tutor{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Profile
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your tutor profile and settings
        </p>
      </div>

      {/* Profile Stats */}
      {profile && (
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {profile.averageRating?.toFixed(1) || "0.0"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {profile.totalReviews || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Reviews
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  ${profile.hourlyRate || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Hourly Rate
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Basic Information */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bio">Bio *</Label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell students about your teaching experience and expertise..."
              className="w-full min-h-32 px-3 py-2 border-2 rounded-md bg-background mt-2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
              <Input
                id="hourlyRate"
                type="number"
                min="0"
                step="0.01"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="50"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience *</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="5"
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Teaching Categories *</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedCategories.includes(category.id)
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedCategories.includes(category.id)
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedCategories.includes(category.id) && (
                      <X className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {categories.length === 0 && (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              No categories available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => fetchData()}
          disabled={saving}
        >
          Reset
        </Button>
        <Button
          size="lg"
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
