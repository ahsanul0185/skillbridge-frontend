"use client";

// import { updateProfile } from "@/actions/user.action"; // Assume you'll create this
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TutorProfileDashboard, User, UserProfileFormProps } from "@/types";
import { userService } from "@/services/user.service";
import { updateProfileAction } from "@/actions/user.action";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().url().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export function UserProfileForm({user, tutor}:  {user : Partial<User>, tutor : TutorProfileDashboard}) {

    const {avgRating, isFeatured, totalReviews} = tutor;

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      image: user.image ?? "",
      phone: user.phone ?? "",
    },
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating profile...");

      try {
        const res = await updateProfileAction(value);

        console.log(res);

        if (res?.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success(res.data.message || "Profile updated successfully", { id: toastId });

      } catch (err) {
        console.log(err)
        toast.error("Failed to update profile", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full border">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Image Preview */}
        <div className="flex items-center gap-4 pb-4 border-b">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback className="text-xl">
              {user.name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-medium">{user.name}</h2>
            <p className="text-sm font-medium">{user.email}</p>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary uppercase">
              {user.role}
            </span>
          </div>
        </div>

        <form
          id="profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Name Field */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Your Name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value ?? ""}
                      type="tel"
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Your phone"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Image URL Field */}
            <form.Field
              name="image"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Profile Picture URL
                    </FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="profile-form" type="submit" className="ml-auto cursor-pointer">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
