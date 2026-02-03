"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminService } from "@/services/admin.service";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  // Form state
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await adminService.getAllCategories({ cache: "no-store" });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setCategories(data || []);
    setLoading(false);
  };

  const handleAddCategory = async () => {
    if (!newName.trim() || !newDescription.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSavingId("new");

    const { error } = await adminService.createCategory(newName, newDescription);

    if (error) {
      toast.error(error.message);
      setSavingId(null);
      return;
    }

    toast.success("Category created successfully");
    setNewName("");
    setNewDescription("");
    setShowAddForm(false);
    setSavingId(null);
    fetchCategories();
  };

  const handleEditCategory = async (categoryId: string) => {
    if (!editName.trim() || !editDescription.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSavingId(categoryId);

    const { error } = await adminService.updateCategory(
      categoryId,
      editName,
      editDescription
    );

    if (error) {
      toast.error(error.message);
      setSavingId(null);
      return;
    }

    toast.success("Category updated successfully");
    setEditingId(null);
    setSavingId(null);
    fetchCategories();
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }

    setDeletingId(categoryId);

    const { error } = await adminService.deleteCategory(categoryId);

    if (error) {
      toast.error(error.message);
      setDeletingId(null);
      return;
    }

    toast.success("Category deleted successfully");
    setDeletingId(null);
    fetchCategories();
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditDescription(category.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Category{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage platform categories
          </p>
        </div>
        <Card className="border-2">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              Loading categories...
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
            Category{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage platform categories
          </p>
        </div>
        <Card className="border-2 border-red-200 dark:border-red-800">
          <CardContent className="p-12 text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <p className="text-lg font-semibold">Error loading categories</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button
              onClick={fetchCategories}
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Category{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage platform categories
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="newName">Category Name</Label>
              <Input
                id="newName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Mathematics, Programming"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="newDescription">Description</Label>
              <textarea
                id="newDescription"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Brief description of the category"
                className="w-full min-h-24 px-3 py-2 border-2 rounded-md bg-background mt-2"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAddCategory}
                disabled={savingId === "new"}
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                {savingId === "new" ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Category
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Stats */}
      <Card className="border-2">
        <CardContent className="p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Categories
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {categories.length}
          </p>
        </CardContent>
      </Card>

      {/* Categories List */}
      <div className="grid md:grid-cols-2 gap-6">
        {categories.length === 0 ? (
          <Card className="border-2 col-span-2">
            <CardContent className="p-12 text-center text-gray-600 dark:text-gray-400">
              No categories found. Add your first category to get started.
            </CardContent>
          </Card>
        ) : (
          categories.map((category) => (
            <Card key={category.id} className="border-2">
              <CardContent className="p-6">
                {editingId === category.id ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`edit-name-${category.id}`}>
                        Category Name
                      </Label>
                      <Input
                        id={`edit-name-${category.id}`}
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`edit-desc-${category.id}`}>
                        Description
                      </Label>
                      <textarea
                        id={`edit-desc-${category.id}`}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full min-h-20 px-3 py-2 border-2 rounded-md bg-background mt-2"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEditCategory(category.id)}
                        disabled={savingId === category.id}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600"
                      >
                        {savingId === category.id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Save className="w-3 h-3 mr-1" />
                            Save
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.description}
                      </p>
                      {category.createdAt && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          Created: {new Date(category.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(category)}
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={deletingId === category.id}
                        className="flex-1"
                      >
                        {deletingId === category.id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
