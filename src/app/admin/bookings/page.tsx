"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminService } from "@/services/admin.service";
import { Search, Calendar, Clock, DollarSign, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Update Interface to match UI needs
interface UI_Booking {
  id: number;
  studentName: string;
  tutorName: string;
  subject: string; // Will fallback to 'General' if not in DB
  date: string;
  time: string;
  status: string;
  amount: number;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<UI_Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<UI_Booking[]>([]);
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
          booking.tutorName.toLowerCase().includes(query),
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (booking) =>
          booking.status.toLowerCase() === filterStatus.toLowerCase(),
      );
    }

    setFilteredBookings(filtered);
  }, [searchQuery, filterStatus, bookings]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await adminService.getAllBookings({
      cache: "no-store",
    });

    if (error) {
      setError(error.message);
      toast.error("Failed to fetch bookings");
      setLoading(false);
      return;
    }

    // MAP Backend Data (Nested) to UI Data (Flat)
    const mappedBookings: UI_Booking[] = (data.data || []).map((b: any) => {
      const start = new Date(b.startTime);
      const end = new Date(b.endTime);

      // Calculate duration in hours
      const durationHours =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      // Calculate estimated amount (Rate * Duration)
      const amount = b.tutor?.hourlyRate
        ? Math.round(b.tutor.hourlyRate * durationHours)
        : 0;

      return {
        id: b.id,
        studentName: b.student?.name || "Unknown Student",
        tutorName: b.tutor?.name || "Unknown Tutor",
        subject: "Tutoring Session", // Default subject
        date: start.toISOString(),
        time: `${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        status: b.status,
        amount: amount,
        createdAt: b.createdAt,
      };
    });

    setBookings(mappedBookings);
    setFilteredBookings(mappedBookings);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "COMPLETED":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "CANCELLED":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const totalRevenue = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((sum, b) => sum + b.amount, 0);

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Manage Bookings</h1>
        <Card className="border-2">
          <CardContent className="p-12 text-center">
            Loading bookings...
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          All <span className="text-primary">Bookings</span>
        </h1>
        <p className="text-muted-foreground">
          View and manage all platform bookings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
            <p className="text-3xl font-bold">{bookings.length}</p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Confirmed</p>
            <p className="text-3xl font-bold text-blue-600">
              {bookings.filter((b) => b.status === "CONFIRMED").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {bookings.filter((b) => b.status === "COMPLETED").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Est. Revenue</p>
            <p className="text-3xl font-bold text-primary">
              ${totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by student or tutor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-10 px-3 py-2 border rounded-md bg-background text-sm ring-offset-background focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <Button onClick={fetchBookings} variant="outline">
          Refresh
        </Button>
      </div>

      {/* Bookings List */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No bookings found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 border rounded-lg hover:border-primary/50 transition-colors bg-card"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {booking.studentName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{booking.tutorName}</h3>
                          <span className="text-xs text-muted-foreground">
                            (Tutor)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                          <User className="w-3 h-3" />
                          <span>Student: {booking.studentName}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pl-14 mt-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>${booking.amount} (Est.)</span>
                    </div>
                    <div className="text-muted-foreground text-xs flex items-center">
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
