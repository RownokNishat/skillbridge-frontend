"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            SkillBridge
                        </h3>
                        <p className="text-sm text-gray-400">
                            Connect with expert tutors and unlock your learning potential.
                            Quality education made accessible for everyone.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/tutors"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Find Tutors
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#how-it-works"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Become a Tutor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Students */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">For Students</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    My Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/bookings"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    My Bookings
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/profile"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/help"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <a
                                    href="mailto:support@skillbridge.com"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    support@skillbridge.com
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Contact Form
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © 2026 SkillBridge. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link
                                href="/privacy"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/cookies"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
