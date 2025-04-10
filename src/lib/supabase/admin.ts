
import { supabase } from './client';
import { updateEvent } from './events';

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
