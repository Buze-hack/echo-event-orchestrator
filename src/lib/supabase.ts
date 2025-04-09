
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get these from your Supabase project
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// Helper functions for events
export async function fetchEvents(status = 'approved') {
  const { data, error } = await supabase
    .from('events')
    .select('*')
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
