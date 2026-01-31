import { TutorProfileForm } from '@/components/modules/tutor/profile/TutorProfileForm';
import { UserProfileForm } from '@/components/modules/user/profile/UserProfileForm';
import { categoryService } from '@/services/category.service';
import { userService } from '@/services/user.service'
import { User } from '@/types';
import React from 'react'

export default async function TutorProfile() {

  const {data} = await userService.getProfile();
  const user = data.data as Partial<User>;
  const {data : categoriesData} = await categoryService.getAllCategories();

  return (
    <div>
      <div className='mb-8'>
        <h1 className="text-3xl font-bold tracking-tight mb-2 ">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account and profile preferences.</p>
      </div>

      <div className="flex flex-col gap-10">
        {/* User Base Data Form */}
        <UserProfileForm user={user} />
        <TutorProfileForm tutor={data.data.tutorProfile} categories={categoriesData.data}/>
        
        {/* You can drop your TutorProfile component here later */}
        {/* <TutorProfileData tutorData={data.tutorProfile} /> */}
      </div>
    </div>
  )
}
