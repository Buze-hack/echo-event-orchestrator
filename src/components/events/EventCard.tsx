
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  status: "pending" | "approved" | "rejected";
  rating?: number;
  attendees?: number;
}

export function EventCard({
  id,
  title,
  date,
  time,
  location,
  category,
  image,
  status,
  rating = 0,
  attendees = 0,
}: EventCardProps) {
  return (
    <Card className="event-card overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover"
        />
        {status === "pending" && (
          <Badge variant="secondary" className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending Approval
          </Badge>
        )}
        {status === "rejected" && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Rejected
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="font-semibold text-xl mt-2 line-clamp-1">{title}</h3>
      </CardHeader>
      
      <CardContent className="pb-2 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{location}</span>
        </div>
        {attendees > 0 && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{attendees} attendees</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button asChild className="w-full">
          <Link to={`/events/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
