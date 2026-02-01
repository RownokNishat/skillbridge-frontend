"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, DollarSign, MessageSquare } from "lucide-react";

const mockBookings = [
    {
        id: "1",
        tutorName: "Dr. Sarah Johnson",
        subject: "Mathematics",
        date: "2026-02-05",
        time: "10:00 AM - 11:00 AM",
        status: "confirmed",
        amount: 45,
        tutorImage: "",
    },
    {
        id: "2",
        tutorName: "Michael Chen",
        subject: "Programming",
        date: "2026-02-07",
        time: "2:00 PM - 3:00 PM",
        status: "confirmed",
        amount: 60,
        tutorImage: "",
    },
];

const pastBookings = [
    {
        id: "3",
        tutorName: "Maria Garcia",
        subject: "Spanish",
        date: "2026-01-28",
        time: "3:00 PM - 4:00 PM",
        status: "completed",
        amount: 35,
        tutorImage: "",
        rated: true,
    },
    {
        id: "4",
        tutorName: "Dr. Sarah Johnson",
        subject: "Mathematics",
        date: "2026-01-25",
        time: "10:00 AM - 11:00 AM",
        status: "completed",
        amount: 45,
        tutorImage: "",
        rated: false,
    },
];

export default function BookingsPage() {
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
                    Manage your tutoring sessions
                </p>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past Sessions</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4 mt-6">
                    {mockBookings.map((booking) => (
                        <Card key={booking.id} className="border-2">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                                            {booking.tutorName.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                {booking.tutorName}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                                                {booking.subject}
                                            </p>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {new Date(booking.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-sm">{booking.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                    <DollarSign className="w-4 h-4" />
                                                    <span className="text-sm">${booking.amount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            {booking.status}
                                        </Badge>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <MessageSquare className="w-4 h-4 mr-1" />
                                                Message
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="past" className="space-y-4 mt-6">
                    {pastBookings.map((booking) => (
                        <Card key={booking.id} className="border-2">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-2xl">
                                            {booking.tutorName.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                {booking.tutorName}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                                                {booking.subject}
                                            </p>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {new Date(booking.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-sm">{booking.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                    <DollarSign className="w-4 h-4" />
                                                    <span className="text-sm">${booking.amount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                        <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                            {booking.status}
                                        </Badge>
                                        {!booking.rated && (
                                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                                                Leave Review
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
