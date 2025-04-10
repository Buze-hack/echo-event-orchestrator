
export const STRIPE_CONFIG = {
  secretKey: import.meta.env.STRIPE_SECRET_KEY,
};

export const MPESA_CONFIG = {
  shortCode: import.meta.env.MPESA_SHORT_CODE || '',
  consumerSecret: import.meta.env.MPESA_CONSUMER_SECRET,
  consumerKey: import.meta.env.MPESA_CONSUMER_KEY,
  passKey: import.meta.env.MPESA_PASS_KEY || '',
  callbackUrl: import.meta.env.MPESA_CALLBACK_URL || '',
};
