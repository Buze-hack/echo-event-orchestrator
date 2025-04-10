export type EventStatus = "pending" | "approved" | "rejected";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  status: EventStatus;
  rating?: number;
  attendees?: number;
  price?: number;
  isPaid?: boolean;
  organizer: {
    name: string;
    image?: string;
  };
  paymentMethods?: PaymentMethod[];
}

export type PaymentMethod = "stripe" | "mpesa";

export interface UserProfile {
  id: string;
  name: string;
  avatar_url?: string;
  role: "user" | "admin";
  created_at?: string;
  email?: string;
}

export interface User {
  id: string;
  email: string;
  profile?: UserProfile;
}

export interface EventComment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  event_id: string;
  profiles?: {
    name: string;
    avatar_url?: string;
  };
}

export interface EventRating {
  id: string;
  value: number;
  created_at: string;
  user_id: string;
  event_id: string;
}

export interface MpesaPaymentRequest {
  phoneNumber: string;
  amount: number;
  eventId: string;
  userId: string;
}

export interface MpesaPaymentResponse {
  success: boolean;
  transactionId?: string;
  message: string;
}
