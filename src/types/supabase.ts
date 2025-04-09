
export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          date: string;
          time: string;
          location: string;
          category: string;
          image: string;
          status: "pending" | "approved" | "rejected";
          user_id: string;
          isPaid: boolean;
          price: number;
          rating: number;
          attendees: number;
          payment_methods?: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description: string;
          date: string;
          time: string;
          location: string;
          category: string;
          image?: string;
          status?: "pending" | "approved" | "rejected";
          user_id: string;
          isPaid?: boolean;
          price?: number;
          rating?: number;
          attendees?: number;
          payment_methods?: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string;
          date?: string;
          time?: string;
          location?: string;
          category?: string;
          image?: string;
          status?: "pending" | "approved" | "rejected";
          user_id?: string;
          isPaid?: boolean;
          price?: number;
          rating?: number;
          attendees?: number;
          payment_methods?: string[];
        };
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          avatar_url: string;
          role: "user" | "admin";
        };
        Insert: {
          id: string;
          created_at?: string;
          name: string;
          avatar_url?: string;
          role?: "user" | "admin";
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          avatar_url?: string;
          role?: "user" | "admin";
        };
      };
      event_attendees: {
        Row: {
          id: string;
          created_at: string;
          event_id: string;
          user_id: string;
          payment_status?: "completed" | "pending" | "failed";
          payment_id?: string;
          payment_method?: "stripe" | "mpesa";
        };
        Insert: {
          id?: string;
          created_at?: string;
          event_id: string;
          user_id: string;
          payment_status?: "completed" | "pending" | "failed";
          payment_id?: string;
          payment_method?: "stripe" | "mpesa";
        };
        Update: {
          id?: string;
          created_at?: string;
          event_id?: string;
          user_id?: string;
          payment_status?: "completed" | "pending" | "failed";
          payment_id?: string;
          payment_method?: "stripe" | "mpesa";
        };
      };
      comments: {
        Row: {
          id: string;
          created_at: string;
          content: string;
          event_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          content: string;
          event_id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          content?: string;
          event_id?: string;
          user_id?: string;
        };
      };
      ratings: {
        Row: {
          id: string;
          created_at: string;
          value: number;
          event_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          value: number;
          event_id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          value?: number;
          event_id?: string;
          user_id?: string;
        };
      };
      mpesa_transactions: {
        Row: {
          id: string;
          created_at: string;
          phone_number: string;
          amount: number;
          transaction_id: string;
          status: "pending" | "completed" | "failed";
          event_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          phone_number: string;
          amount: number;
          transaction_id?: string;
          status?: "pending" | "completed" | "failed";
          event_id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          phone_number?: string;
          amount?: number;
          transaction_id?: string;
          status?: "pending" | "completed" | "failed";
          event_id?: string;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
