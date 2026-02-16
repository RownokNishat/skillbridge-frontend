"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categoryService } from "@/services/category.service";
import { api } from "@/lib/api";
import { Save, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateTutorProfilePage() {
  const router = useRouter();
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
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await categoryService.getAllCategories();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setCategories(data.data || []);
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

    try {
      await api.post("/api/register/setup-profile", {
        bio: bio.trim(),
        hourlyRate: parseFloat(hourlyRate),
        experience: parseInt(experience),
        categoryIds: selectedCategories,
      });

      toast.success("Profile created successfully");
      setSaving(false);

      try {
        const statusData = await api.get("/api/register/status");
        const nextStep = statusData?.data?.nextStep;

        if (nextStep === "SET_AVAILABILITY") {
          router.push("/tutor/availability");
        } else {
          router.push("/tutor/dashboard");
        }
      } catch (err) {
        router.push("/tutor/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create profile");
      setSaving(false);
    }
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-4xl border-2">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-4xl border-2 border-red-200 dark:border-red-800">
          <CardContent className="p-12 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <p className="text-lg font-semibold">Error loading categories</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button
              onClick={fetchCategories}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            Complete Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tutor Profile
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tell us about yourself to start teaching on SkillBridge
          </p>
        </div>

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
        <div className="flex justify-end">
          <Button
            size="lg"
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 min-w-40"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Profile...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Profile
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
