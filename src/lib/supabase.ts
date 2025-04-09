
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { MpesaPaymentRequest, MpesaPaymentResponse } from '@/types';

// Replace with your Supabase project URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// Auth helpers
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return { user: null, error };
  }
  
  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();
  
  return { 
    user: { 
      ...data.user,
      profile
    }, 
    error: null 
  };
}

// Helper functions for events
export async function fetchEvents(status = 'approved') {
  const { data, error } = await supabase
    .from('events')
    .select('*, profiles(name, avatar_url)')
    .eq('status', status)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  
  return data || [];
}

export async function fetchEventById(id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*, profiles(name, avatar_url)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }
  
  return data;
}

export async function createEvent(eventData: any) {
  const { data, error } = await supabase
    .from('events')
    .insert([eventData])
    .select();
  
  if (error) {
    console.error('Error creating event:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function updateEvent(id: string, updates: any) {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating event:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function fetchUserEvents(userId: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching user events:', error);
    return [];
  }
  
  return data || [];
}

// Admin functions
export async function fetchPendingEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*, profiles(name, avatar_url)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching pending events:', error);
    return [];
  }
  
  return data || [];
}

export async function approveEvent(id: string) {
  return updateEvent(id, { status: 'approved' });
}

export async function rejectEvent(id: string) {
  return updateEvent(id, { status: 'rejected' });
}

export async function fetchAllUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  
  return data || [];
}

// Event ratings and comments
export async function addEventRating(eventId: string, userId: string, value: number) {
  const { data, error } = await supabase
    .from('ratings')
    .insert([
      { event_id: eventId, user_id: userId, value }
    ])
    .select();
  
  if (error) {
    console.error('Error adding rating:', error);
    throw error;
  }
  
  // Update the average rating on the event
  await updateEventRating(eventId);
  
  return data?.[0];
}

export async function updateEventRating(eventId: string) {
  // Get all ratings for this event
  const { data, error } = await supabase
    .from('ratings')
    .select('value')
    .eq('event_id', eventId);
  
  if (error || !data) {
    console.error('Error fetching ratings:', error);
    return;
  }
  
  // Calculate average
  const sum = data.reduce((acc, curr) => acc + curr.value, 0);
  const average = data.length > 0 ? sum / data.length : 0;
  
  // Update event with new rating
  await supabase
    .from('events')
    .update({ rating: average })
    .eq('id', eventId);
}

export async function addEventComment(eventId: string, userId: string, content: string) {
  const { data, error } = await supabase
    .from('comments')
    .insert([
      { event_id: eventId, user_id: userId, content }
    ])
    .select();
  
  if (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function fetchEventComments(eventId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('*, profiles(name, avatar_url)')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  
  return data || [];
}

// Payment related functions
export async function createPaymentIntent(eventId: string, amount: number) {
  const { data, error } = await supabase.functions.invoke('create-payment-intent', {
    body: { eventId, amount },
  });
  
  if (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
  
  return data;
}

export async function initiateMpesaPayment(paymentRequest: MpesaPaymentRequest): Promise<MpesaPaymentResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('mpesa-payment', {
      body: paymentRequest,
    });
    
    if (error) {
      console.error('Error initiating M-Pesa payment:', error);
      throw error;
    }
    
    return data as MpesaPaymentResponse;
  } catch (error) {
    console.error('Error processing M-Pesa payment:', error);
    return {
      success: false,
      message: 'Failed to process M-Pesa payment. Please try again.'
    };
  }
}

export async function registerEventAttendee(eventId: string, userId: string, paymentId?: string, paymentStatus?: string) {
  const { data, error } = await supabase
    .from('event_attendees')
    .insert([
      { 
        event_id: eventId, 
        user_id: userId,
        payment_id: paymentId,
        payment_status: paymentStatus || 'completed'
      }
    ])
    .select();
  
  if (error) {
    console.error('Error registering attendee:', error);
    throw error;
  }
  
  // Increment attendee count
  const event = await fetchEventById(eventId);
  if (event) {
    await updateEvent(eventId, { 
      attendees: (event.attendees || 0) + 1 
    });
  }
  
  return data?.[0];
}
