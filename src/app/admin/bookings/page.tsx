"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminService } from "@/services/admin.service";
import { Search, Calendar, Clock, DollarSign, User } from "lucide-react";
import { useEffect, useState } from "react";

interface Booking {
  id: string;
  studentName: string;
  tutorName: string;
  subject: string;
  date: string;
  time: string;
  status: string;
  amount: number;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.studentName.toLowerCase().includes(query) ||
          booking.tutorName.toLowerCase().includes(query) ||
          booking.subject.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((booking) => booking.status === filterStatus);
    }

    setFilteredBookings(filtered);
  }, [searchQuery, filterStatus, bookings]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await adminService.getAllBookings({ cache: "no-store" });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setBookings(data || []);
    setFilteredBookings(data || []);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const totalRevenue = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.amount, 0);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            All{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bookings
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all platform bookings
          </p>
        </div>
        <Card className="border-2">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              Loading bookings...
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
            All{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bookings
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all platform bookings
          </p>
        </div>
        <Card className="border-2 border-red-200 dark:border-red-800">
          <CardContent className="p-12 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <p className="text-lg font-semibold">Error loading bookings</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button
              onClick={fetchBookings}
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
      <div>
        <h1 className="text-4xl font-bold mb-2">
          All{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bookings
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage all platform bookings
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Total Bookings
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {bookings.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Confirmed
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {bookings.filter((b) => b.status === "confirmed").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Completed
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {bookings.filter((b) => b.status === "completed").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Total Revenue
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by student, tutor, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 border-2"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-12 px-4 border-2 rounded-md bg-background"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <Button onClick={fetchBookings} variant="outline" className="border-2">
          Refresh
        </Button>
      </div>

      {/* Bookings List */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>
            Bookings ({filteredBookings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              No bookings found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 border-2 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {booking.studentName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {booking.subject}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <User className="w-4 h-4" />
                          <span>
                            {booking.studentName} → {booking.tutorName}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 pl-16">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>${booking.amount}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Booked: {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
