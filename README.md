
# EventHub - Event Management Platform

A comprehensive event management platform built with React, Vite, Supabase, and integrated payment solutions including Stripe and M-Pesa.

## Features

- User authentication with email/password and Google login
- Event creation and management
- Admin approval workflow for events
- Paid and free events
- Multiple payment gateways (Stripe and M-Pesa)
- Event comments and ratings
- Responsive design

## Tech Stack

- **Frontend**: React + TypeScript with Vite
- **UI**: Tailwind CSS with shadcn/ui components
- **Database & Backend**: Supabase
- **Authentication**: Supabase Auth
- **Payments**: Stripe and M-Pesa
- **State Management**: React Context + TanStack Query

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Supabase Account
- Stripe Account
- M-Pesa Developer Account (for M-Pesa integration)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Set up Supabase Edge Functions for payment processing with the following secrets:
   ```bash
   supabase secrets set STRIPE_SECRET_KEY=your_stripe_secret_key
   supabase secrets set MPESA_CONSUMER_KEY=your_mpesa_consumer_key
   supabase secrets set MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
   supabase secrets set MPESA_SHORT_CODE=your_mpesa_shortcode
   supabase secrets set MPESA_PASS_KEY=your_mpesa_passkey
   supabase secrets set MPESA_CALLBACK_URL=your_mpesa_callback_url
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Supabase Setup

1. Create a new Supabase project
2. Set up the following tables:
   - events
   - profiles
   - event_attendees
   - comments
   - ratings
   - mpesa_transactions

3. Enable Google Authentication:
   - Go to Authentication > Providers > Google
   - Enable Google provider
   - Add your Google client ID and secret

4. Deploy the following Edge Functions:
   - `create-payment-intent` - For Stripe integration
   - `mpesa-payment` - For M-Pesa integration

### Stripe Setup

1. Create a Stripe account
2. Get your API keys from the Stripe Dashboard
3. Add the Stripe secret key to your Supabase edge function secrets

### M-Pesa Setup

1. Create an account on the Safaricom Developer Portal
2. Create a new app and get your credentials
3. Add the M-Pesa credentials to your Supabase edge function secrets

## Development

### Folder Structure

- `/src` - Source code
  - `/components` - React components
  - `/pages` - Page components
  - `/lib` - Utility functions and API calls
  - `/hooks` - Custom React hooks
  - `/types` - TypeScript type definitions

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to your preferred hosting service (Vercel, Netlify, etc.)

## Notes for Vite Projects

- Vite is a build tool that works with React, Vue, or any other JavaScript framework
- The Supabase client setup is the same for Vite as it is for Next.js or Create React App
- Environment variables in Vite must be prefixed with `VITE_`

## Getting Credentials

### Supabase

1. Go to your Supabase project dashboard
2. Navigate to Project Settings > API
3. Copy the URL and anon key

### Stripe

1. Go to the Stripe Dashboard
2. Navigate to Developers > API keys
3. Use the publishable key in the frontend and the secret key in edge functions

### M-Pesa

1. Go to the Safaricom Developer Portal
2. Navigate to My Apps > Your App
3. Copy the Consumer Key and Secret
4. For production, apply for Go-Live and get production credentials

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.
