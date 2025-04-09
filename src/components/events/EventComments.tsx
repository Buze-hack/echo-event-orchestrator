
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
}

interface EventCommentsProps {
  eventId: string;
  comments: Comment[];
}

export function EventComments({ eventId, comments: initialComments }: EventCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    // In a real app, this would be sent to the backend
    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "Current User",
        avatar: undefined,
      },
      content: newComment,
      createdAt: new Date(),
    };
    
    setComments((prev) => [comment, ...prev]);
    setNewComment("");
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted.",
    });
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <Textarea
          placeholder="Share your thoughts about this event..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={!newComment.trim()}>
          Post Comment
        </Button>
      </form>
      
      <div className="space-y-6 mt-8">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">
            Be the first to comment on this event!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>
                  {comment.user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{comment.user.name}</h4>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
