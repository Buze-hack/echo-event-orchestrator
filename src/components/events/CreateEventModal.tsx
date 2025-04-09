
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";

interface FormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  isPaid: boolean;
  price: string;
}

export function CreateEventModal() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    isPaid: false,
    price: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPaid: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this data to your backend API
    console.log("Event data submitted:", {
      ...formData,
      price: formData.isPaid ? parseInt(formData.price) * 100 : 0 // Convert to cents for Stripe
    });
    
    toast({
      title: "Event Created",
      description: "Your event has been submitted for approval.",
    });
    
    setOpen(false);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      isPaid: false,
      price: "0",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new event. All events require admin approval.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Summer Music Festival"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                type="date"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                type="time"
                required
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="123 Main St, City, Country"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) => handleSelectChange("category", value)}
              value={formData.category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="art">Art & Culture</SelectItem>
                <SelectItem value="food">Food & Drink</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Paid Event</FormLabel>
              <FormDescription>
                Toggle this if you want to charge for your event.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={formData.isPaid}
                onCheckedChange={handleSwitchChange}
              />
            </FormControl>
          </FormItem>
          
          {formData.isPaid && (
            <div className="grid gap-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                min="0"
                step="0.01"
                placeholder="29.99"
                required={formData.isPaid}
              />
            </div>
          )}
          
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-muted-foreground">
              Enter a URL for your event image or leave as is for a default image.
            </p>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="submit">Submit for Approval</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
