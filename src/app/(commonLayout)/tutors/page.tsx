import { tutorService } from "@/services/tutor.service"

export default async function TutorsPage() {

  const {data} = await tutorService.getAllTutors();

  return (
    <div>tutors page</div>
  )
}
