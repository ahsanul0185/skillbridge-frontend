// import DashPageHeader from '@/components/layout/DashPageHeader';
// import { userService } from '@/services/user.service'
// import React from 'react'

// export default async function AdminAnalytics() {

//   const {data} = await userService.getAdminAnalytics();

//   console.log(data)

//   return (
//     <div>
//       <DashPageHeader title='' description=''/>
//     </div>
//   )
// }


import DashPageHeader from '@/components/layout/DashPageHeader';
import { userService } from '@/services/user.service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, UserCheck, BookOpen, CheckCircle, DollarSign, Star, MessageSquare } from 'lucide-react'

export default async function AdminAnalytics() {
  const {data : resData} = await userService.getAdminAnalytics();
  const data = resData.data;

  console.log(data)

  const statCards = [
    {
      title: 'Total Users',
      value: data.totalUsers,
      icon: Users,
      description: 'Registered users',
      color: 'text-blue-600'
    },
    {
      title: 'Students',
      value: data.totalStudents,
      icon: GraduationCap,
      description: 'Active students',
      color: 'text-green-600'
    },
    {
      title: 'Tutors',
      value: data.totalTutors,
      icon: UserCheck,
      description: 'Available tutors',
      color: 'text-purple-600'
    },
    {
      title: 'Total Bookings',
      value: data.totalBookings,
      icon: BookOpen,
      description: 'All sessions',
      color: 'text-orange-600'
    },
    {
      title: 'Completed Sessions',
      value: data.completedBookings,
      icon: CheckCircle,
      description: 'Finished sessions',
      color: 'text-emerald-600'
    },
    {
      title: 'Total Revenue',
      value: `$${data.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: 'Platform earnings',
      color: 'text-yellow-600'
    },
    {
      title: 'Total Reviews',
      value: data.totalReviews,
      icon: MessageSquare,
      description: 'User feedback',
      color: 'text-pink-600'
    },
    {
      title: 'Average Rating',
      value: data.averageRating,
      icon: Star,
      description: 'Platform rating',
      color: 'text-amber-600'
    }
  ]

  return (
    <div className="space-y-6">
      <DashPageHeader 
        title='Analytics Overview' 
        description='Platform performance and statistics at a glance'
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 text-muted-foreground`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">User Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Students</span>
              <span className="font-semibold">{data.totalStudents}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tutors</span>
              <span className="font-semibold">{data.totalTutors}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm font-medium">Total</span>
              <span className="font-bold">{data.totalUsers}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Session Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Sessions</span>
              <span className="font-semibold">{data.totalBookings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Completed</span>
              <span className="font-semibold">{data.completedBookings}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="font-bold">
                {data.totalBookings > 0 
                  ? `${((data.completedBookings / data.totalBookings) * 100).toFixed(1)}%`
                  : '0%'
                }
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Platform Quality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Reviews</span>
              <span className="font-semibold">{data.totalReviews}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Average Rating</span>
              <span className="font-semibold flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {data.averageRating}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm font-medium">Revenue</span>
              <span className="font-bold">${data.totalRevenue.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}