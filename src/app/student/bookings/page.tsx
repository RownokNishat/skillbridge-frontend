"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studentService } from "@/services/student.service";
import { Calendar, Clock, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StudentBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);

    const status = activeTab === "all" ? undefined : activeTab.toUpperCase();
    const { data, error } = await studentService.getMyBookings({ status });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setBookings(data || []);
    setLoading(false);
  };

  const handleCancelBooking = async (bookingId: number) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setCancellingId(bookingId);

    const { error } = await studentService.cancelBooking(bookingId.toString());

    if (error) {
      toast.error(error.message);
      setCancellingId(null);
      return;
    }

    toast.success("Booking cancelled successfully");
    setCancellingId(null);
    fetchBookings();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "CANCELLED":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bookings
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your session bookings
          </p>
        </div>
        <Card className="border-2">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
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
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bookings
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your session bookings
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
          My{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bookings
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your session bookings
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="confirmed">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {bookings.length === 0 ? (
            <Card className="border-2">
              <CardContent className="p-12 text-center text-gray-600 dark:text-gray-400">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="mb-4">No bookings found</p>
                <Button asChild>
                  <a href="/student/tutors">Find a Tutor</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                        {booking.tutor?.name?.charAt(0) || "T"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {booking.tutor?.name || "Unknown Tutor"}
                          </h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {booking.tutor?.email}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(booking.startTime).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(booking.startTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}{" "}
                              -{" "}
                              {new Date(booking.endTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {booking.status === "CONFIRMED" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={cancellingId === booking.id}
                        >
                          {cancellingId === booking.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </>
                          )}
                        </Button>
                      )}
                      {booking.status === "COMPLETED" && (
                        <Button
                          size="sm"
                          asChild
                          className="bg-gradient-to-r from-blue-600 to-indigo-600"
                        >
                          <a
                            href={`/student/tutors/${booking.tutor?.id}?review=true`}
                          >
                            Leave Review
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
