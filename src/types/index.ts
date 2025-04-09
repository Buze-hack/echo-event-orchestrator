
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
}
