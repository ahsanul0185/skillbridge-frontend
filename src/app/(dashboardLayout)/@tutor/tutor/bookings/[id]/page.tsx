import BookingDetails from '@/components/modules/tutor/bookings/BookingDetails';
import { bookingService } from '@/services/booking.service';
import React from 'react'

export default async function BookingDetailsPage({params} : {params : Promise<{id : string}>}) {

  const {id} = await params;
  const {data} = await bookingService.getBookingById(id);

  console.log(data)

  return (
    <div>
      <BookingDetails booking={data.data}/>
    </div>
  )
}
