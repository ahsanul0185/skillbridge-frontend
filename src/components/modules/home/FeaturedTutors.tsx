import { tutorService } from "@/services/tutor.service"


export default async function FeaturedTutors() {

    const {data} = await tutorService.getAllTutors({isFeatured : true, limit : "3"});

    console.log(data)

  return (
    <div>FeaturedTutors</div>
  )
}
