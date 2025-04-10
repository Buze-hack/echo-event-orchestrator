
import { supabase } from './client';
import { fetchEventById, updateEvent } from './events';

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
