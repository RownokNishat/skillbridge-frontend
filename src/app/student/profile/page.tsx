"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studentService } from "@/services/student.service";
import { Save, Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await studentService.getMyProfile();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setProfile(data);
    // Populate form fields
    setName(data?.name || "");
    setEmail(data?.email || "");
    setPhone(data?.phone || "");
    setBio(data?.bio || "");
    setLoading(false);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setSaving(true);

    const { error } = await studentService.updateProfile({
      name: name.trim(),
      phone: phone.trim() || undefined,
      bio: bio.trim() || undefined,
    });

    if (error) {
      toast.error(error.message);
      setSaving(false);
      return;
    }

    toast.success("Profile updated successfully!");
    setSaving(false);
    fetchProfile();
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile information
          </p>
        </div>
        <Card className="border-2">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
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
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile information
          </p>
        </div>
        <Card className="border-2 border-red-200 dark:border-red-800">
          <CardContent className="p-12 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <p className="text-lg font-semibold">Error loading profile</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button
              onClick={fetchProfile}
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
          My{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Profile
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your profile information
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Avatar */}
        <div className="space-y-6">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-5xl mb-4">
                  {name?.charAt(0) || "S"}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Student</p>
                <div className="w-full space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Bookings
                    </span>
                    <span className="font-semibold">
                      {profile?.totalBookings || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Completed
                    </span>
                    <span className="font-semibold">
                      {profile?.completedBookings || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Reviews Given
                    </span>
                    <span className="font-semibold">
                      {profile?.reviewsGiven || 0}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="mt-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself and your learning goals..."
                  className="w-full min-h-32 px-3 py-2 border-2 rounded-md bg-background mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>User ID</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {profile?.id || "N/A"}
                  </p>
                </div>
                <div>
                  <Label>Role</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Student
                  </p>
                </div>
                <div>
                  <Label>Member Since</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <Label>Last Updated</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {profile?.updatedAt
                      ? new Date(profile.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 min-w-40"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
