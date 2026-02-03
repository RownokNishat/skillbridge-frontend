"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  BookOpen,
  DollarSign,
  Star,
  Clock,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { tutorService } from "@/services/tutor.service";

export default function TutorDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await tutorService.getDashboardStats();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setDashboardData(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Tutor{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your teaching sessions and track your performance
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
            Tutor{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your teaching sessions and track your performance
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
      title: "Total Sessions",
      value: dashboardData?.totalSessions || 0,
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Upcoming",
      value: dashboardData?.upcomingSessions || 0,
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Earnings",
      value: `$${dashboardData?.totalEarnings?.toFixed(2) || "0.00"}`,
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Avg Rating",
      value: dashboardData?.averageRating?.toFixed(1) || "0.0",
      icon: Star,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Tutor{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your teaching sessions and track your performance
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

      {/* Recent Sessions */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Sessions</CardTitle>
            <Button asChild variant="outline">
              <Link href="/tutor/sessions">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {dashboardData?.recentSessions?.length === 0 ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              No recent sessions
            </div>
          ) : (
            <div className="space-y-4">
              {dashboardData?.recentSessions?.map((session: any) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {session.student?.name?.charAt(0) || "S"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {session.student?.name || "Unknown Student"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {session.student?.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(session.startTime).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(session.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Badge
                      className={
                        session.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          : session.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
                      }
                    >
                      {session.status}
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
              <Link href="/tutor/availability">
                <Clock className="mr-2" />
                Set Availability
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-2">
              <Link href="/tutor/profile">
                <Users className="mr-2" />
                Edit Profile
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-2">
              <Link href="/tutor/sessions">
                <Calendar className="mr-2" />
                My Sessions
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
