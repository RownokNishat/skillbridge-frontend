"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="section-wrap py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              SkillBridge
            </h3>
            <p className="text-sm text-muted-foreground">
              Connect with expert tutors and unlock your learning potential.
              Quality education made accessible for everyone.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border hover:bg-accent rounded-lg transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border hover:bg-accent rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border hover:bg-accent rounded-lg transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border hover:bg-accent rounded-lg transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
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
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-semibold mb-4">For Learners</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/student" className="hover:text-primary transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/student/bookings" className="hover:text-primary transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/student/profile" className="hover:text-primary transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
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
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Page
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 SkillBridge. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="/help" className="hover:text-primary transition-colors">Help</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
