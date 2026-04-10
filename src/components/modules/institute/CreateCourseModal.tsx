"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Category, Mentor } from "@/types";
import { createCourseAction } from "@/actions/course.action";

interface CreateCourseModalProps {
  mentors?: Mentor[];
  categories?: Category[];
}

const EMPTY_FORM = {
  title: "",
  description: "",
  price: "",
  status: "DRAFT" as "DRAFT" | "PUBLISHED",
  level: "BEGINNER" as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
  duration: "",
  thumbnailUrl: "",
  categoryId: "",
  mentorIds: [] as string[],
};

export default function CreateCourseModal({
  mentors = [],
  categories = [],
}: CreateCourseModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

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
    const toastId = toast.loading("Creating course...");

    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: priceNum,
        status: form.status,
        level: form.level,
        mentorIds: form.mentorIds,
        // Only include optional fields if they have values (avoid empty-string UUID/URL validation failures)
        ...(form.duration.trim() && { duration: form.duration.trim() }),
        ...(form.thumbnailUrl.trim() && { thumbnailUrl: form.thumbnailUrl.trim() }),
        ...(form.categoryId && { categoryId: form.categoryId }),
      };

      const res = await createCourseAction(payload);

      if (!res?.data?.success) {
        toast.error(
          res?.data?.message || res?.error?.message || "Failed to create course.",
          { id: toastId }
        );
        return;
      }

      toast.success("Course created successfully!", { id: toastId });
      setForm(EMPTY_FORM);
      setOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new course for your institute.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="create-title">Course Title *</Label>
            <Input
              id="create-title"
              placeholder="e.g. Introduction to Web Development"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="create-description">Description *</Label>
            <textarea
              id="create-description"
              placeholder="Describe what students will learn in this course (min 10 characters)..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full min-h-[90px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            />
          </div>

          {/* Price + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="create-price">Price (USD) *</Label>
              <Input
                id="create-price"
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
              <Label htmlFor="create-status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(val: "DRAFT" | "PUBLISHED") =>
                  setForm((f) => ({ ...f, status: val }))
                }
              >
                <SelectTrigger id="create-status">
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
              <Label htmlFor="create-level">Level *</Label>
              <Select
                value={form.level}
                onValueChange={(val: "BEGINNER" | "INTERMEDIATE" | "ADVANCED") =>
                  setForm((f) => ({ ...f, level: val }))
                }
              >
                <SelectTrigger id="create-level">
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
              <Label htmlFor="create-category">Category</Label>
              <Select
                value={form.categoryId || "none"}
                onValueChange={(val) =>
                  setForm((f) => ({ ...f, categoryId: val === "none" ? "" : val }))
                }
              >
                <SelectTrigger id="create-category">
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
              <Label htmlFor="create-duration">Duration</Label>
              <Input
                id="create-duration"
                placeholder="e.g. 4 Weeks"
                value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-thumbnail">Thumbnail URL</Label>
              <Input
                id="create-thumbnail"
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
                      id={`create-mentor-${mentor.id}`}
                      checked={form.mentorIds.includes(mentor.id)}
                      onCheckedChange={() => handleMentorToggle(mentor.id)}
                    />
                    <label
                      htmlFor={`create-mentor-${mentor.id}`}
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
              onClick={() => { setOpen(false); setForm(EMPTY_FORM); }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
