

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Category, Subject } from "@/types";
import { toast } from "sonner";
import { createCategoryAction, createSubjectAction, deleteCategoryAction, deleteSubjectAction, updateCategoryAction, updateSubjectAction } from "@/actions/admin.action";


export default function ManageCategories({data}: {data : Category[]}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [catModalOpen, setCatModalOpen] = useState(false);
  const [catEditId, setCatEditId] = useState<string | null>(null);

  const [catName, setCatName] = useState("");
  const [catDescription, setCatDescription] = useState("");

  const [subModalOpen, setSubModalOpen] = useState(false);
  const [subEditId, setSubEditId] = useState<string | null>(null);

  const [subName, setSubName] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");


  useEffect(() => {
    setCategories(data);
    const allSubjects = data.flatMap((cat: Category) => cat.subjects);
    setSubjects(allSubjects);
  }, []);



  // For Category
  function openCategoryCreate() {
    setCatEditId(null);
    setCatName("");
    setCatDescription("");
    setCatModalOpen(true);
  }

  function openCategoryEdit(cat: Category) {
    setCatEditId(cat.id);
    setCatName(cat.name);
    setCatDescription(cat.description || "");
    setCatModalOpen(true);
  }

  async function handleCategorySubmit() {
    if (catEditId) {
      // UPDATE
      const payload = { name: catName, description: catDescription };
     const toastId = toast.loading("Updating category...");

      try {
        const res = await updateCategoryAction(payload, catEditId);

        if (res?.error) {
            toast.error(res.error, { id: toastId });
            return;
        }

        toast.success(res.data.message || "Category updated", {
            id: toastId,
        });
        } catch (err) {
            console.log(err);
            toast.error("Failed to update categroy", { id: toastId });
        }
    } else {
      // CREATE
      const payload = { name: catName, description: catDescription };
      const toastId = toast.loading("Creating category...");

      try {
        const res = await createCategoryAction(payload);

        if (res?.error) {
            toast.error(res.error, { id: toastId });
            return;
        }

        toast.success(res.data.message || "Category created", {
            id: toastId,
        });
        } catch (err) {
            console.log(err);
            toast.error("Failed to create category", { id: toastId });
        }
    }
    setCatModalOpen(false);
  }

  async function handleCategoryDelete(id: string) {
   const toastId = toast.loading("Deleting category...");

      try {
        const res = await deleteCategoryAction(id);

        if (res?.error) {
            toast.error(res.error, { id: toastId });
            return;
        }

        toast.success(res.data.message || "Category deleted", {
            id: toastId,
        });
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete category", { id: toastId });
        }
    
  }

// For Subject

  function openSubjectCreate() {
    setSubEditId(null);
    setSubName("");
    setSubCategoryId("");
    setSubModalOpen(true);
  }

  function openSubjectEdit(sub: Subject) {
    setSubEditId(sub.id);
    setSubName(sub.name);
    setSubCategoryId(sub.categoryId);
    setSubModalOpen(true);
  }

  async function handleSubjectSubmit() {
    if (subEditId) {
      // UPDATE
      const payload = { name: subName, categoryId: subCategoryId };
      const toastId = toast.loading("Updating subject...");

      try {
        const res = await updateSubjectAction(payload, subEditId);

        if (res?.error) {
            toast.error(res.error, { id: toastId });
            return;
        }

        toast.success(res.data.message || "Subject updated", {
            id: toastId,
        });
        } catch (err) {
            console.log(err);
            toast.error("Failed to update subject", { id: toastId });
        } 

    } else {
      // CREATE
      const payload = { name: subName, categoryId: subCategoryId };
      const toastId = toast.loading("Adding subject...");

      try {
        const res = await createSubjectAction(payload);

        if (res?.error) {
            toast.error(res.error, { id: toastId });
            return;
        }

        toast.success(res.data.message || "Subject added", {
            id: toastId,
        });
        } catch (err) {
            console.log(err);
            toast.error("Failed to create subject", { id: toastId });
        }
    }
    setSubModalOpen(false);
  }

  async function handleSubjectDelete(id: string) {
    const toastId = toast.loading("Deleting subject...");

      try {
        const res = await deleteSubjectAction(id);

        if (res?.error) {
            toast.error(res.error, { id: toastId });
            return;
        }

        toast.success(res.data.message || "Subject deleted", {
            id: toastId,
        });
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete subject", { id: toastId });
        }
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div>
      <Tabs defaultValue="categories" className="mt-6">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="flex justify-end mb-4">
            <Button onClick={openCategoryCreate}>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.description || "—"}
                  </TableCell>
                  <TableCell>{category.subjects.length}</TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openCategoryEdit(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleCategoryDelete(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="subjects">
          <div className="flex justify-end mb-4">
            <Button onClick={openSubjectCreate}>
              <Plus className="mr-2 h-4 w-4" /> Add Subject
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {categories.find((c) => c.id === sub.categoryId)?.name || "—"}
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openSubjectEdit(sub)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleSubjectDelete(sub.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      <Dialog open={catModalOpen} onOpenChange={setCatModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {catEditId ? "Edit Category" : "Create Category"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="cat-name">Name</Label>
              <Input
                id="cat-name"
                placeholder="e.g. Humanities"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cat-desc">Description</Label>
              <Textarea
                id="cat-desc"
                placeholder="Optional description"
                value={catDescription}
                onChange={(e) => setCatDescription(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCatModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCategorySubmit}>
              {catEditId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={subModalOpen} onOpenChange={setSubModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {subEditId ? "Edit Subject" : "Create Subject"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="sub-name">Name</Label>
              <Input
                id="sub-name"
                placeholder="e.g. Higher Math"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="sub-cat">Category</Label>
              <Select value={subCategoryId} onValueChange={setSubCategoryId}>
                <SelectTrigger id="sub-cat">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSubModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubjectSubmit}>
              {subEditId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}