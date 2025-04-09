
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface EventRatingProps {
  initialRating?: number;
  eventId: string;
  readonly?: boolean;
  showAverage?: boolean;
  averageRating?: number;
  totalRatings?: number;
}

export function EventRating({
  initialRating = 0,
  eventId,
  readonly = false,
  showAverage = false,
  averageRating = 0,
  totalRatings = 0,
}: EventRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();
  
  const handleRatingChange = (value: number) => {
    if (readonly) return;
    
    setRating(value);
    
    // Here you would send this rating to your backend API
    console.log(`Rated event ${eventId} with ${value} stars`);
    
    toast({
      title: "Rating Submitted",
      description: `You rated this event ${value} out of 5 stars.`,
    });
  };
  
  return (
    <div className="flex flex-col items-center gap-1">
      {showAverage && (
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground text-sm">({totalRatings} ratings)</span>
        </div>
      )}
      
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(star)}
            onMouseEnter={() => !readonly && setHoveredRating(star)}
            onMouseLeave={() => !readonly && setHoveredRating(0)}
            disabled={readonly}
            className={cn(
              "p-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm transition-transform",
              !readonly && "hover:scale-110"
            )}
          >
            <Star
              className={cn(
                "h-6 w-6",
                (hoveredRating ? star <= hoveredRating : star <= rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted stroke-muted-foreground",
                !readonly && "cursor-pointer"
              )}
            />
          </button>
        ))}
      </div>
      
      {!readonly && !showAverage && (
        <p className="text-sm text-muted-foreground mt-1">
          {rating > 0 ? "Thanks for rating!" : "Rate this event"}
        </p>
      )}
    </div>
  );
}
