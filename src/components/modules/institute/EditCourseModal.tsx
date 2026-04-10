"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Course, Category, Mentor } from "@/types";
import { updateCourseAction } from "@/actions/course.action";

interface EditCourseModalProps {
  course: Course;
  mentors: Mentor[];
  categories: Category[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const buildFormFromCourse = (course: Course) => ({
  title: course.title,
  description: course.description,
  price: course.price.toString(),
  status: (course.status ?? "DRAFT") as "DRAFT" | "PUBLISHED",
  level: (course.level ?? "BEGINNER") as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
  duration: course.duration ?? "",
  thumbnailUrl: course.thumbnailUrl ?? "",
  categoryId: course.categoryId ?? "",
  mentorIds: course.mentors?.map((m) => m.id) ?? [],
});

export default function EditCourseModal({
  course,
  mentors = [],
  categories = [],
  open,
  onOpenChange,
}: EditCourseModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(() => buildFormFromCourse(course));

  // Re-sync when the selected course or open state changes
  useEffect(() => {
    if (open && course) {
      setForm(buildFormFromCourse(course));
    }
  }, [course, open]);

  const handleMentorToggle = (id: string) => {
    setForm((prev) => ({
      ...prev,
      mentorIds: prev.mentorIds.includes(id)
        ? prev.mentorIds.filter((x) => x !== id)
        : [...prev.mentorIds, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.price) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum < 0) {
      toast.error("Price must be a valid non-negative number.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating course...");

    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: priceNum,
        status: form.status,
        level: form.level,
        mentorIds: form.mentorIds,
        // Omit optional fields when blank to avoid backend UUID/URL validation errors
        ...(form.duration.trim() && { duration: form.duration.trim() }),
        ...(form.thumbnailUrl.trim() && { thumbnailUrl: form.thumbnailUrl.trim() }),
        ...(form.categoryId && { categoryId: form.categoryId }),
      };

      const res = await updateCourseAction(course.id, payload);

      if (!res?.data?.success) {
        toast.error(
          res?.data?.message || res?.error?.message || "Failed to update course.",
          { id: toastId }
        );
        return;
      }

      toast.success("Course updated successfully!", { id: toastId });
      onOpenChange(false);
    } catch {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Update the details for <strong>{course.title}</strong> below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="edit-title">Course Title *</Label>
            <Input
              id="edit-title"
              placeholder="e.g. Introduction to Web Development"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description *</Label>
            <textarea
              id="edit-description"
              placeholder="Describe what students will learn (min 10 characters)..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full min-h-[90px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            />
          </div>

          {/* Price + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price (USD) *</Label>
              <Input
                id="edit-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 49.99"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(val: "DRAFT" | "PUBLISHED") =>
                  setForm((f) => ({ ...f, status: val }))
                }
              >
                <SelectTrigger id="edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Level + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-level">Level *</Label>
              <Select
                value={form.level}
                onValueChange={(val: "BEGINNER" | "INTERMEDIATE" | "ADVANCED") =>
                  setForm((f) => ({ ...f, level: val }))
                }
              >
                <SelectTrigger id="edit-level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BEGINNER">Beginner</SelectItem>
                  <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                  <SelectItem value="ADVANCED">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={form.categoryId || "none"}
                onValueChange={(val) =>
                  setForm((f) => ({ ...f, categoryId: val === "none" ? "" : val }))
                }
              >
                <SelectTrigger id="edit-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration + Thumbnail */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-duration">Duration</Label>
              <Input
                id="edit-duration"
                placeholder="e.g. 4 Weeks"
                value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-thumbnail">Thumbnail URL</Label>
              <Input
                id="edit-thumbnail"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.thumbnailUrl}
                onChange={(e) => setForm((f) => ({ ...f, thumbnailUrl: e.target.value }))}
              />
            </div>
          </div>

          {/* Mentors */}
          {mentors.length > 0 && (
            <div className="space-y-2">
              <Label>Assign Mentors</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-mentor-${mentor.id}`}
                      checked={form.mentorIds.includes(mentor.id)}
                      onCheckedChange={() => handleMentorToggle(mentor.id)}
                    />
                    <label
                      htmlFor={`edit-mentor-${mentor.id}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {mentor.user.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
