
import { supabase } from './client';

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
