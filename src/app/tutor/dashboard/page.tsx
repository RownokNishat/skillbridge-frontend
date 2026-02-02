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

export default function TutorDashboard() {
  const stats = [
    {
      title: "Total Sessions",
      value: "450",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "This Month",
      value: "28",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Earnings",
      value: "$12,450",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Avg Rating",
      value: "4.9",
      icon: Star,
      color: "from-orange-500 to-red-500",
    },
  ];

  const upcomingSessions = [
    {
      id: "1",
      studentName: "Alice Johnson",
      subject: "Mathematics",
      date: "2026-02-05",
      time: "10:00 AM",
      status: "confirmed",
    },
    {
      id: "2",
      studentName: "Bob Smith",
      subject: "Algebra",
      date: "2026-02-05",
      time: "2:00 PM",
      status: "confirmed",
    },
    {
      id: "3",
      studentName: "Carol White",
      subject: "Calculus",
      date: "2026-02-06",
      time: "11:00 AM",
      status: "confirmed",
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

      {/* Upcoming Sessions */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Sessions</CardTitle>
            <Button asChild variant="outline">
              <Link href="/tutor/sessions">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {session.studentName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {session.studentName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.subject}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.time}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    {session.status}
                  </Badge>
                </div>
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
