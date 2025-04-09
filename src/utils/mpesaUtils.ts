
// This is a utility file for M-Pesa integration
// In a real project, most of this logic would be in a Supabase Edge Function

export interface MpesaConfig {
  consumerKey: string;
  consumerSecret: string;
  shortCode: string;
  passKey: string;
  callbackUrl: string;
}

export interface MpesaAuthResponse {
  access_token: string;
  expires_in: string;
}

export interface MpesaSTKPushRequest {
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

export interface MpesaSTKPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

// Generate the base64 auth string
export const generateAuthToken = async (consumerKey: string, consumerSecret: string): Promise<string> => {
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

// Generate the password for the STK push
export const generatePassword = (shortCode: string, passKey: string, timestamp: string): string => {
  const password = `${shortCode}${passKey}${timestamp}`;
  return btoa(password);
};

// Generate the timestamp in the format YYYYMMDDHHmmss
export const generateTimestamp = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

// Initiate the STK push request
export const initiateSTKPush = async (
  accessToken: string,
  phoneNumber: string,
  amount: number,
  shortCode: string,
  passKey: string,
  callbackUrl: string,
  accountReference: string
): Promise<MpesaSTKPushResponse> => {
  const timestamp = generateTimestamp();
  const password = generatePassword(shortCode, passKey, timestamp);
  
  // Format the phone number to remove any country code prefix
  const formattedPhoneNumber = phoneNumber.replace(/^(254|\+254|0)/, '254');
  
  const requestBody: MpesaSTKPushRequest = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.round(amount / 100), // Convert from cents to whole amount
    PartyA: formattedPhoneNumber,
    PartyB: shortCode,
    PhoneNumber: formattedPhoneNumber,
    CallBackURL: callbackUrl,
    AccountReference: accountReference,
    TransactionDesc: `Payment for ${accountReference}`
  };
  
  try {
    const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    return await response.json() as MpesaSTKPushResponse;
  } catch (error) {
    console.error("Error initiating STK push:", error);
    throw new Error("Failed to initiate M-Pesa payment");
  }
};

// Example of an mpesa-payment edge function implementation (this would be in your Supabase Edge Function)
export const mpesaPaymentFunction = async (req: any) => {
  try {
    const { phoneNumber, amount, eventId, userId } = req.body;
    
    // Example configuration - in production, these would be environment variables
    const mpesaConfig: MpesaConfig = {
      consumerKey: process.env.MPESA_CONSUMER_KEY || "your-consumer-key",
      consumerSecret: process.env.MPESA_CONSUMER_SECRET || "your-consumer-secret",
      shortCode: process.env.MPESA_SHORT_CODE || "174379", // Example Safaricom test shortcode
      passKey: process.env.MPESA_PASS_KEY || "your-pass-key",
      callbackUrl: process.env.MPESA_CALLBACK_URL || "https://example.com/mpesa-callback",
    };
    
    const accessToken = await generateAuthToken(mpesaConfig.consumerKey, mpesaConfig.consumerSecret);
    
    const stkResponse = await initiateSTKPush(
      accessToken,
      phoneNumber,
      amount,
      mpesaConfig.shortCode,
      mpesaConfig.passKey,
      mpesaConfig.callbackUrl,
      `Event-${eventId}`
    );
    
    // Store the transaction in your database
    // This would use the supabase client to insert into mpesa_transactions table
    
    return {
      success: true,
      transactionId: stkResponse.CheckoutRequestID,
      message: "Payment initiated successfully"
    };
  } catch (error) {
    console.error("Error processing M-Pesa payment:", error);
    return {
      success: false,
      message: "Failed to initiate payment. Please try again."
    };
  }
};
