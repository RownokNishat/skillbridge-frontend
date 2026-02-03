"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tutorService } from "@/services/tutor.service";
import { Calendar, Clock, CheckCircle, XCircle, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TutorSessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Track loading state for specific actions
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  useEffect(() => {
    fetchSessions();
  }, [activeTab]);

  const fetchSessions = async () => {
    setLoading(true);
    setError(null);
    const status = activeTab === "all" ? undefined : activeTab.toUpperCase();

    // Ensure your frontend service actually accepts this argument
    const { data, error } = await tutorService.getMySessions(status);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setSessions(data || []);
    setLoading(false);
  };

  // Generic handler for status updates
  const handleStatusUpdate = async (
    bookingId: number,
    action: "accept" | "cancel" | "complete",
  ) => {
    setActionLoadingId(bookingId);
    let response;

    // Assuming you update your frontend service to have these methods:
    if (action === "accept")
      response = await tutorService.acceptSession(bookingId);
    else if (action === "cancel")
      response = await tutorService.cancelSession(bookingId);
    else if (action === "complete")
      response = await tutorService.markSessionComplete(bookingId);

    if (response?.error) {
      toast.error(response.error.message);
    } else {
      toast.success(`Session ${action}ed successfully`);
      fetchSessions(); // Refresh list
    }
    setActionLoadingId(null);
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

  // ... (Keep your existing loading and error UI blocks here) ...

  return (
    <div className="space-y-8">
      {/* ... (Keep your Header and TabsList here) ... */}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {sessions.length === 0 ? (
            <Card className="border-2">
              <CardContent className="p-12 text-center text-gray-500">
                No sessions found
              </CardContent>
            </Card>
          ) : (
            sessions.map((session) => (
              <Card key={session.id} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    {/* Student Info Section */}
                    <div className="flex items-start gap-4 flex-1 min-w-[300px]">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                        {session.student?.name?.charAt(0) || "S"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold">
                            {session.student?.name}
                          </h3>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-gray-500 mb-3">
                          {session.student?.email}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(session.startTime).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {new Date(session.startTime).toLocaleTimeString(
                              [],
                              { hour: "2-digit", minute: "2-digit" },
                            )}{" "}
                            -
                            {new Date(session.endTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons Section */}
                    <div className="flex items-center gap-2">
                      {/* PENDING ACTIONS */}
                      {session.status === "PENDING" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() =>
                              handleStatusUpdate(session.id, "accept")
                            }
                            disabled={actionLoadingId === session.id}
                          >
                            <Check className="w-4 h-4 mr-1" /> Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() =>
                              handleStatusUpdate(session.id, "cancel")
                            }
                            disabled={actionLoadingId === session.id}
                          >
                            <XCircle className="w-4 h-4 mr-1" /> Decline
                          </Button>
                        </>
                      )}

                      {/* CONFIRMED ACTIONS */}
                      {session.status === "CONFIRMED" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(session.id, "complete")
                            }
                            disabled={actionLoadingId === session.id}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" /> Mark
                            Complete
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() =>
                              handleStatusUpdate(session.id, "cancel")
                            }
                            disabled={actionLoadingId === session.id}
                          >
                            Cancel
                          </Button>
                        </>
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
