import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Logo from "./Logo";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types";
import Link from "next/link";

export default async function Footer() {
  const { data: categoryData } = await categoryService.getAllCategories();
  const popularCategories = categoryData?.data.slice(0, 4) ?? [];

  return (
    <footer className="bg-white border-t text-foreground">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Branding and Links */}
          <div>
            <Logo />
            <br />

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {popularCategories.map((category: Category) => (
                <Link
                  href={`/tutors?categoryId=${category.id}`}
                  key={category.id}
                  className="block hover:underline hover:text-primary"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right Column - Newsletter Signup */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
               Get SkillBridge updates
            </h3>

            <div className="flex gap-2 mb-4">
              <Input type="email" placeholder="Your email here" />
              <Button variant="secondary" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Links */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#" className="hover:underline">
              Website Terms
            </a>
            <span className="text-primary-foreground/40">|</span>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>

          <div className="text-sm font-light">
            &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
