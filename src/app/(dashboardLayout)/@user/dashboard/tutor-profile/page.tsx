"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Star, Plus, X } from "lucide-react";

export default function TutorProfilePage() {
    const [expertise, setExpertise] = useState(["Calculus", "Algebra", "Geometry"]);
    const [newSkill, setNewSkill] = useState("");

    const addSkill = () => {
        if (newSkill.trim() && !expertise.includes(newSkill.trim())) {
            setExpertise([...expertise, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (skill: string) => {
        setExpertise(expertise.filter((s) => s !== skill));
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-4xl font-bold mb-2">
                    Tutor{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Profile
                    </span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your tutor profile and settings
                </p>
            </div>

            {/* Profile Stats */}
            <Card className="border-2">
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                4.9
                            </div>
                            <div className="flex items-center justify-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Average Rating
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                127
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Reviews
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                450
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Sessions Completed
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="border-2">
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="Dr. Sarah Johnson" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="sarah@example.com" disabled />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="education">Education</Label>
                        <Input id="education" defaultValue="PhD in Mathematics, MIT" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                            id="bio"
                            className="w-full min-h-32 px-3 py-2 border-2 rounded-md bg-background"
                            defaultValue="Experienced mathematics tutor with 10+ years of teaching experience. I specialize in helping students understand complex mathematical concepts through practical examples and patient guidance."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                            <Input id="hourlyRate" type="number" defaultValue="45" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Input id="experience" type="number" defaultValue="10" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Expertise */}
            <Card className="border-2">
                <CardHeader>
                    <CardTitle>Expertise & Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {expertise.map((skill) => (
                            <Badge
                                key={skill}
                                className="px-3 py-2 text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                            >
                                {skill}
                                <button
                                    onClick={() => removeSkill(skill)}
                                    className="ml-2 hover:text-red-200"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                        <Input
                            placeholder="Add a skill..."
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addSkill()}
                        />
                        <Button onClick={addSkill} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
                <Button variant="outline" size="lg">
                    Cancel
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
