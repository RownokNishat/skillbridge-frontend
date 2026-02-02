"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  BookOpen,
  Star,
  Clock,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const stats = [
    {
      title: "Total Sessions",
      value: "12",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Upcoming",
      value: "3",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Hours Learned",
      value: "24",
      icon: Clock,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Certificates",
      value: "2",
      icon: Award,
      color: "from-orange-500 to-red-500",
    },
  ];

  const upcomingBookings = [
    {
      id: "1",
      tutorName: "Dr. Sarah Johnson",
      subject: "Mathematics",
      date: "2026-02-05",
      time: "10:00 AM",
      status: "confirmed",
    },
    {
      id: "2",
      tutorName: "Michael Chen",
      subject: "Programming",
      date: "2026-02-07",
      time: "2:00 PM",
      status: "confirmed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Welcome Back,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your learning progress overview
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
              <Link href="/dashboard/bookings">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {booking.tutorName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {booking.tutorName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.subject}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {booking.time}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  {booking.status}
                </Badge>
              </div>
            ))}
          </div>
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
              <Link href="/tutors">
                <BookOpen className="mr-2" />
                Find a Tutor
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-2">
              <Link href="/dashboard/bookings">
                <Calendar className="mr-2" />
                My Bookings
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 border-2">
              <Link href="/dashboard/profile">
                <Star className="mr-2" />
                My Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
