export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { mentorService } from "@/services/mentor.service";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, GraduationCap, Clock } from "lucide-react";
import Link from "next/link";

export default async function MentorDashboard() {
  const [sessionRes, coursesRes] = await Promise.all([
    userService.getSession(),
    mentorService.getAssignedCourses({}),
  ]);

  const user = sessionRes.data?.user;
  // Response shape: { success, data: { data: Course[], pagination: {...} } }
  const courses = Array.isArray(coursesRes.data?.data?.data) ? coursesRes.data.data.data : [];

  return (
    <div className="space-y-6">
      <DashPageHeader
        title={`Welcome back, ${user?.name.split(" ")[0]}!`}
        description="Here are your assigned courses and student overview."
      />

      {/* Stat row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">Active programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">Awaiting grading</p>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Courses */}
      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {courses.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              You have no assigned courses yet. Contact your institute admin.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course: any) => (
                <Link
                  key={course.id}
                  href={`/mentor/rosters?courseId=${course.id}`}
                  className="flex flex-col gap-2 p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium leading-tight">{course.title}</h4>
                    <Badge variant={course.status === "PUBLISHED" ? "default" : "secondary"} className="text-xs ml-2 shrink-0">
                      {course.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-auto pt-1">
                    <Users className="h-3 w-3" />
                    <span>View Roster</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
