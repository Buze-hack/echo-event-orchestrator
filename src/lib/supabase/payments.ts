
import { supabase } from './client';
import { MpesaPaymentRequest, MpesaPaymentResponse } from '@/types';
import { fetchEventById, updateEvent } from './events';

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
