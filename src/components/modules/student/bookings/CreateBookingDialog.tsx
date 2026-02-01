"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TutorProfile } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


export default function CreateBookingDialog({tutor} : {tutor : TutorProfile}) {
const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get('book') === 'true';

  const handleClose = () => {
    router.replace(pathname, { scroll: false });
  };

  console.log(tutor)
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Session</DialogTitle>
          <DialogDescription>
            This is dialog description
          </DialogDescription>
        </DialogHeader>
        {/* Your content here */}
        <p>Booking for Tutor ID: {tutor.id}</p>
      </DialogContent>
    </Dialog>
    )
}
