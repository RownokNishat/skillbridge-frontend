"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminService } from "@/services/admin.service";
import { Search, Ban, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // Debounced search
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setFilteredUsers(users);
    } else {
      const query = debouncedSearch.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query),
        ),
      );
    }
  }, [debouncedSearch, users]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await adminService.getAllUsers({
      cache: "no-store",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setUsers(data.data || []);
    setFilteredUsers(data.data || []);
    setLoading(false);
  };

  const handleUpdateStatus = async (userId: string, currentStatus: string) => {
    // 1. Determine new status
    // If undefined or 'active', we want to 'banned'. If 'banned', we want 'active'.
    const newStatus = currentStatus === "banned" ? "active" : "banned";

    setUpdatingUserId(userId);

    // 2. Call the service
    const { error } = await adminService.updateUserStatus(userId, newStatus);

    if (error) {
      toast.error(error.message);
      setUpdatingUserId(null);
      return;
    }

    toast.success(
      `User ${newStatus === "banned" ? "banned" : "activated"} successfully`,
    );

    // 3. Update local state immediately so UI reflects change
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );

    // Also update filtered list if it exists
    setFilteredUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );

    setUpdatingUserId(null);
  };

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            User{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Manage all platform users
          </p>
        </div>
        <Card className="border-2">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              Loading users...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            User{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Manage all platform users
          </p>
        </div>
        <Card className="border-2 border-red-200 dark:border-red-800">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <p className="text-base sm:text-lg font-semibold">Error loading users</p>
              <p className="text-xs sm:text-sm">{error}</p>
            </div>
            <Button
              onClick={fetchUsers}
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
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          User{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Management
          </span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Manage all platform users
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <Input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 sm:pl-12 h-10 sm:h-12 border-2"
          />
        </div>
        <Button 
          onClick={fetchUsers} 
          variant="outline" 
          className="border-2 h-10 sm:h-12 w-full sm:w-auto"
        >
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
              Total Users
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {users.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
              Students
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {users?.filter((u) => u.role === "STUDENT").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
              Tutors
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {users?.filter((u) => u.role === "TUTOR").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              No users found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-2 rounded-lg"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        className={
                          user.role === "tutor"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                            : user.role === "admin"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        }
                      >
                        {user.role}
                      </Badge>
                      {user.status && (
                        <Badge
                          className={
                            user.status === "active" || user.status === "ACTIVE"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          }
                        >
                          {user.status.toUpperCase()}
                        </Badge>
                      )}
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {user.role !== "admin" && (
                      <Button
                        size="sm"
                        variant={
                          user.status === "banned" ? "default" : "destructive"
                        }
                        onClick={() =>
                          handleUpdateStatus(user.id, user.status || "active")
                        }
                        disabled={updatingUserId === user.id}
                        className="min-w-[90px] sm:min-w-24 w-full sm:w-auto"
                      >
                        {updatingUserId === user.id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : user.status === "banned" ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Activate
                          </>
                        ) : (
                          <>
                            <Ban className="w-4 h-4 mr-1" />
                            Ban
                          </>
                        )}
                      </Button>
                    )}
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
