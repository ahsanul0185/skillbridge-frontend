export const dynamic = "force-dynamic";

import DashPageHeader from '@/components/layout/DashPageHeader'
import { userService } from '@/services/user.service'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, CheckCircle, DollarSign, Star, Calendar, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default async function StudentDashboard() {
  const [userRes, statsRes] = await Promise.all([
    await userService.getSession(),
    await userService.getStudentStats()
  ])

  const user = userRes.data.user;
  const stats = statsRes.data.data;

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: BookOpen,
      description: 'All time sessions'
    },
    {
      title: 'Completed Sessions',
      value: stats.completedBookings,
      icon: CheckCircle,
      description: 'Finished sessions'
    },
    {
      title: 'Total Spent',
      value: `$${stats.totalSpent}`,
      icon: DollarSign,
      description: 'Overall investment'
    },
    {
      title: 'Reviews Given',
      value: stats.totalReviews,
      icon: Star,
      description: 'Tutor feedback'
    }
  ]

  return (
    <div className="space-y-6">
      <DashPageHeader 
        title={`Welcome back, ${user.name.split(' ')[0]}!`} 
        description='Here&apos;s an overview of your learning journey'
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>
            Your scheduled tutoring sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.upcomingBookings.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No upcoming sessions scheduled
            </p>
          ) : (
            <div className="space-y-4">
              {stats.upcomingBookings.map((booking : any) => (
                <Link
                  href={`/dashboard/bookings/${booking.id}`} 
                  key={booking.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={booking.tutor.user.image || undefined} />
                    <AvatarFallback>
                      {booking.tutor.user.name.split(' ')[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-sm">
                          {booking.subject.name} with {booking.tutor.user.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {booking.tutor.avgRating}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {booking.tutor.totalReviews} reviews
                          </span>
                        </div>
                      </div>
                      <Badge>{booking.status}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {booking.availability.day}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {booking.availability.startTime} - {booking.availability.endTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        ${booking.price}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}