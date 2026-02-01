


export interface Review {
  id: string;
  tutorId: string;
  reviewerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}


export interface LeaveReviewPayload {
  bookingId : string; 
  rating : string;
  review : string;
}