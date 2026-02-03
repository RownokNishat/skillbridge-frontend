"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Star, Clock, Search, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { studentService } from "@/services/student.service";

export default function StudentDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    const [profileResult, bookingsResult] = await Promise.all([
      studentService.getMyProfile(),
      studentService.getMyBookings({
        status: "CONFIRMED",
        sortBy: "startTime",
        order: "asc",
      }),
    ]);

    if (profileResult.error) {
      setError(profileResult.error.message);
      setLoading(false);
      return;
    }

    setProfile(profileResult.data);
    setUpcomingBookings(bookingsResult.data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Student{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Manage your learning journey
          </p>
        </div>
        <Card className="border-2">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              Loading dashboard...
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
            Student{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Manage your learning journey
          </p>
        </div>
        <Card className="border-2 border-red-200 dark:border-red-800">
          <CardContent className="p-12 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <p className="text-lg font-semibold">Error loading dashboard</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button
              onClick={fetchDashboardData}
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

  const stats = [
    {
      title: "Total Bookings",
      value: profile?.totalBookings || 0,
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Upcoming",
      value: profile?.upcomingBookings || 0,
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Completed",
      value: profile?.completedBookings || 0,
      icon: Clock,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Reviews Given",
      value: profile?.reviewsGiven || 0,
      icon: Star,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {profile?.name}
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Continue your learning journey
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Upcoming Sessions */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Sessions</CardTitle>
            <Button asChild variant="outline">
              <Link href="/student/bookings">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No upcoming sessions
              </p>
              <Button asChild>
                <Link href="/student/tutors">Find a Tutor</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.slice(0, 5).map((booking: any) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {booking.tutor?.name?.charAt(0) || "T"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {booking.tutor?.name || "Unknown Tutor"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {booking.tutor?.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(booking.startTime).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(booking.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(booking.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              asChild
              className="h-20 bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <Link href="/student/tutors">
                <Search className="mr-2" />
                Find Tutors
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-2">
              <Link href="/student/bookings">
                <Calendar className="mr-2" />
                My Bookings
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-2">
              <Link href="/student/profile">
                <User className="mr-2" />
                My Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
