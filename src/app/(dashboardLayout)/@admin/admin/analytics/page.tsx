import { userService } from '@/services/user.service'
import React from 'react'

export default async function AdminAnalytics() {

  const {data} = await userService.getAdminAnalytics();

  console.log(data)

  return (
    <div>AdminAnalytics</div>
  )
}
