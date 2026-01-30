import { tutorService } from '@/services/tutor.service';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star, Clock, DollarSign, BookOpen, Calendar, User, Mail, Award } from 'lucide-react';

export default async function TutorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data } = await tutorService.getTutorById(id);
  const tutor = data.data;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const formatDay = (day: string) => {
    return day.charAt(0) + day.slice(1).toLowerCase();
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  if (!tutor) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold">Tutor not found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Profile Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/10">
                  <AvatarImage src={tutor.user.image || ''} alt={tutor.user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {getInitials(tutor.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle className="text-3xl mb-2">{tutor.user.name}</CardTitle>
                      <CardDescription className="text-base flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {tutor.user.email}
                      </CardDescription>
                    </div>

                    {/* {tutor.isFeatured && (
                      <Badge variant="default" className="bg-primary">
                        <Award className="h-3 w-3 mr-1" />
                        Featured Tutor
                      </Badge>
                    )} */}
                    <Button className="bg-primary hover:bg-primary/90">Book a Session</Button>

                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tutor.isFeatured && (
                      <Badge variant="default" className="bg-primary">
                        <Award className="h-3 w-3 mr-1" />
                        Featured Tutor
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-sm">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {tutor.category.name}
                    </Badge>

                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{tutor.bio}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="text-xl font-bold">{tutor.avgRating}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reviews</p>
                      <p className="text-xl font-bold">{tutor.totalReviews}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hourly Rate</p>
                      <p className="text-xl font-bold">${tutor.hourlyRate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subjects Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Subjects
              </CardTitle>
              <CardDescription>Expertise areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tutor.subjects.map((subject: any) => (
                  <div
                    key={subject.subjectId}
                    className="p-3 bg-secondary/50 rounded-lg border border-border transition-colors"
                  >
                    <p className="font-medium">{subject.subject.name}</p>
                    <p className="text-sm text-muted-foreground">{tutor.category.name}</p>
                  </div>
                ))}
              </div>
              {/* <Separator className="my-4" /> */}
              {/* <Button className="w-full bg-primary hover:bg-primary/90">Book a Session</Button> */}
            </CardContent>
          </Card>
        </div>

        {/* Availability Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Availability
            </CardTitle>
            <CardDescription>Available time slots for booking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tutor.availability.map((slot: any) => (
                <div
                  key={slot.id}
                  className="p-4 border border-border rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{formatDay(slot.day)}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Reviews ({tutor.totalReviews})
            </CardTitle>
            <CardDescription>What students are saying</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tutor.reviews.map((review: any) => (
                <div key={review.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.student.image || ''} alt={review.student.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(review.student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{review.student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-lg">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-bold text-primary">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{review.review}</p>
                </div>
              ))}
              {tutor.reviews.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No reviews yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}