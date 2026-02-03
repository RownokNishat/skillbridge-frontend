"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Tutors",
      value: "156",
      change: "+8%",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Sessions",
      value: "3,456",
      change: "+23%",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+15%",
      icon: DollarSign,
      color: "from-orange-500 to-red-500",
    },
  ];

  const recentUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "student",
      joinedAt: "2026-02-01",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "tutor",
      joinedAt: "2026-01-31",
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@example.com",
      role: "student",
      joinedAt: "2026-01-30",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Admin{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Platform overview and management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">{stat.change}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Users */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border-2 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                    {user.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(user?.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
