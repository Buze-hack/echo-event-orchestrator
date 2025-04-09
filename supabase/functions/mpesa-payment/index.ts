
// This is a sample implementation of the M-Pesa payment edge function.
// You would need to deploy this to your Supabase project.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define important types
interface MpesaConfig {
  consumerKey: string;
  consumerSecret: string;
  shortCode: string;
  passKey: string;
  callbackUrl: string;
}

interface MpesaAuthResponse {
  access_token: string;
  expires_in: string;
}

interface MpesaSTKPushRequest {
  BusinessShortCode: string;
  Password: string;
  Timestamp: string;
  TransactionType: string;
  Amount: number;
  PartyA: string;
  PartyB: string;
  PhoneNumber: string;
  CallBackURL: string;
  AccountReference: string;
  TransactionDesc: string;
}

interface MpesaSTKPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

// Function to generate the Authorization token
const generateAuthToken = async (consumerKey: string, consumerSecret: string): Promise<string> => {
  const auth = btoa(`${consumerKey}:${consumerSecret}`);
  
  try {
    const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
    
    const data = await response.json() as MpesaAuthResponse;
    return data.access_token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    throw new Error("Failed to get M-Pesa auth token");
  }
};

// Function to generate the password for STK push
const generatePassword = (shortCode: string, passKey: string, timestamp: string): string => {
  const password = `${shortCode}${passKey}${timestamp}`;
  return btoa(password);
};

// Function to generate timestamp
const generateTimestamp = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

// CORS headers for cross-domain requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Get the client's API key from the request header
  const authHeader = req.headers.get("Authorization")!;
  
  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: { headers: { Authorization: authHeader } },
        auth: { persistSession: false }
      }
    );
    
    // Get the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      throw new Error("Unauthorized");
    }
    
    // Parse request body
    const { phoneNumber, amount, eventId, userId } = await req.json();
    
    if (!phoneNumber || !amount || !eventId || !userId) {
      throw new Error("Missing required parameters");
    }
    
    // M-Pesa Configuration
    const mpesaConfig: MpesaConfig = {
      consumerKey: Deno.env.get("MPESA_CONSUMER_KEY") || "",
      consumerSecret: Deno.env.get("MPESA_CONSUMER_SECRET") || "",
      shortCode: Deno.env.get("MPESA_SHORT_CODE") || "",
      passKey: Deno.env.get("MPESA_PASS_KEY") || "",
      callbackUrl: Deno.env.get("MPESA_CALLBACK_URL") || "",
    };
    
    // Get the access token
    const accessToken = await generateAuthToken(mpesaConfig.consumerKey, mpesaConfig.consumerSecret);
    
    // Generate timestamp and password
    const timestamp = generateTimestamp();
    const password = generatePassword(mpesaConfig.shortCode, mpesaConfig.passKey, timestamp);
    
    // Format phone number - ensure it has the correct country code format
    const formattedPhoneNumber = phoneNumber.replace(/^(254|\+254|0)/, '254');
    
    // Create the STK Push request
    const stkPushRequest: MpesaSTKPushRequest = {
      BusinessShortCode: mpesaConfig.shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount / 100), // Convert from cents to whole amount
      PartyA: formattedPhoneNumber,
      PartyB: mpesaConfig.shortCode,
      PhoneNumber: formattedPhoneNumber,
      CallBackURL: mpesaConfig.callbackUrl,
      AccountReference: `Event-${eventId}`,
      TransactionDesc: `Payment for Event ${eventId}`
    };
    
    // Make the STK Push request to M-Pesa
    const mpesaResponse = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stkPushRequest)
    });
    
    const stkResponse: MpesaSTKPushResponse = await mpesaResponse.json();
    
    // Record the transaction in the database
    const { data: transactionData, error: transactionError } = await supabaseClient
      .from('mpesa_transactions')
      .insert([
        {
          phone_number: formattedPhoneNumber,
          amount: Math.round(amount / 100),
          transaction_id: stkResponse.CheckoutRequestID,
          status: "pending",
          event_id: eventId,
          user_id: userId
        }
      ])
      .select();
    
    if (transactionError) {
      throw transactionError;
    }
    
    // Return a success response
    return new Response(
      JSON.stringify({
        success: true,
        transactionId: stkResponse.CheckoutRequestID,
        message: "Payment initiated successfully. Please check your phone to complete the transaction."
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  
  } catch (error) {
    // Return an error response
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "An error occurred while processing the payment."
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
