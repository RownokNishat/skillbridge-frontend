"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tutorService } from "@/services/tutor.service";
import { Save, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function TutorAvailabilityPage() {
  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await tutorService.getMyProfile();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      const parsedAvailability = data?.availability
        ? JSON.parse(data.availability)
        : {};
      setAvailability(parsedAvailability);
    } catch (err) {
      setAvailability({});
    }

    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const availabilityString = JSON.stringify(availability);

    const { error } = await tutorService.updateAvailability([availability]);

    if (error) {
      toast.error(error.message);
      setSaving(false);
      return;
    }

    toast.success("Availability updated successfully");
    setSaving(false);
  };

  const toggleTimeSlot = (day: string, slot: string) => {
    setAvailability((prev) => {
      const daySlots = prev[day] || [];
      const newSlots = daySlots.includes(slot)
        ? daySlots.filter((s) => s !== slot)
        : [...daySlots, slot].sort();

      return {
        ...prev,
        [day]: newSlots,
      };
    });
  };

  const TIME_SLOTS = [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
    "18:00-19:00",
    "19:00-20:00",
    "20:00-21:00",
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Set{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Availability
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your teaching schedule
          </p>
        </div>
        <Card className="border-2">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              Loading availability...
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
            Set{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Availability
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your teaching schedule
          </p>
        </div>
        <Card className="border-2 border-red-200 dark:border-red-800">
          <CardContent className="p-12 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <p className="text-lg font-semibold">Error loading availability</p>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Set{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Availability
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Click on time slots to set your availability
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save
            </>
          )}
        </Button>
      </div>

      {/* Availability Grid */}
      <div className="space-y-6">
        {DAYS_OF_WEEK.map((day) => (
          <Card key={day} className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 capitalize">
                <Clock className="w-5 h-5" />
                {day}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = availability[day]?.includes(slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => toggleTimeSlot(day, slot)}
                      className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-gray-200 dark:border-gray-700 hover:border-blue-300 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {(!availability[day] || availability[day].length === 0) && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  No availability set for this day
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
