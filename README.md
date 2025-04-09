
# EventHub - Event Management System

## Overview

EventHub is a comprehensive event management system built with modern web technologies. It allows users to create, discover, and register for events, while providing administrators with tools to manage and approve events.

## Features

- **User Authentication**
  - Email/Password authentication
  - Google OAuth login
  - User profiles and roles (admin vs regular users)

- **Event Management**
  - Event creation and submission
  - Admin approval workflow
  - Event discovery and filtering
  - Event details with ratings and comments

- **Payment Processing**
  - Support for free and paid events
  - Secure payment processing with Stripe

- **Admin Dashboard**
  - Event approval/rejection
  - User management
  - Analytics and reporting

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (Authentication, Database, Storage, Functions)
- **Payment Processing**: Stripe
- **Build Tools**: Vite

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account
- Stripe account (for payment processing)

## Setup Instructions

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Supabase Setup

1. Create a new Supabase project
2. Set up the following tables in your Supabase database:

**profiles**
```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  avatar_url text,
  role text default 'user'::text
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on profiles
  for update using (auth.uid() = id);
```

**events**
```sql
create table events (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  date text not null,
  time text not null,
  location text not null,
  category text not null,
  image text,
  status text default 'pending'::text,
  user_id uuid references auth.users not null,
  isPaid boolean default false,
  price integer default 0,
  rating numeric default 0,
  attendees integer default 0
);

-- Enable Row Level Security
alter table events enable row level security;

-- Create policies
create policy "Events are viewable by everyone." on events
  for select using (status = 'approved');

create policy "Pending events are viewable by admins." on events
  for select using (status = 'pending' and exists (
    select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin'
  ));

create policy "Users can create events." on events
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own events." on events
  for update using (auth.uid() = user_id);

create policy "Admins can update any event." on events
  for update using (exists (
    select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin'
  ));
```

**event_attendees**
```sql
create table event_attendees (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  event_id uuid references events not null,
  user_id uuid references auth.users not null,
  payment_status text default 'completed',
  payment_id text
);

-- Enable Row Level Security
alter table event_attendees enable row level security;

-- Create policies
create policy "Users can view their own attendances." on event_attendees
  for select using (auth.uid() = user_id);

create policy "Event creators can view their event attendees." on event_attendees
  for select using (exists (
    select 1 from events where events.id = event_id and events.user_id = auth.uid()
  ));

create policy "Admins can view all event attendees." on event_attendees
  for select using (exists (
    select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'admin'
  ));

create policy "Users can register for events." on event_attendees
  for insert with check (auth.uid() = user_id);
```

**comments**
```sql
create table comments (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  content text not null,
  event_id uuid references events not null,
  user_id uuid references auth.users not null
);

-- Enable Row Level Security
alter table comments enable row level security;

-- Create policies
create policy "Comments are viewable by everyone." on comments
  for select using (exists (
    select 1 from events where events.id = event_id and events.status = 'approved'
  ));

create policy "Users can create comments." on comments
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own comments." on comments
  for update using (auth.uid() = user_id);

create policy "Users can delete their own comments." on comments
  for delete using (auth.uid() = user_id);
```

**ratings**
```sql
create table ratings (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  value integer not null,
  event_id uuid references events not null,
  user_id uuid references auth.users not null,
  constraint unique_user_event_rating unique (user_id, event_id)
);

-- Enable Row Level Security
alter table ratings enable row level security;

-- Create policies
create policy "Ratings are viewable by everyone." on ratings
  for select using (exists (
    select 1 from events where events.id = event_id and events.status = 'approved'
  ));

create policy "Users can create ratings." on ratings
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own ratings." on ratings
  for update using (auth.uid() = user_id);
```

3. Set up Supabase Authentication:
   - Enable Email/Password sign-in
   - Enable Google OAuth sign-in

4. Create a Supabase Edge Function for Stripe integration:

```js
// create-payment-intent.js
import { stripe } from './stripe.js';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
);

Deno.serve(async (req) => {
  try {
    // Get request details
    const { eventId, amount } = await req.json();
    const token = req.headers.get('Authorization').split('Bearer ')[1];
    
    // Validate user
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError) throw new Error('Unauthorized');
    
    // Get event details
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();
    
    if (eventError || !event) throw new Error('Event not found');
    if (!event.isPaid) throw new Error('This is not a paid event');
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        eventId,
        userId: user.id
      }
    });
    
    return new Response(
      JSON.stringify({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
```

### Installation and Running

1. Clone the repository
```bash
git clone https://github.com/yourusername/eventhub.git
cd eventhub
```

2. Install dependencies
```bash
npm install
# or with yarn
yarn install
```

3. Start the development server
```bash
npm run dev
# or with yarn
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment

1. Build the project
```bash
npm run build
# or with yarn
yarn build
```

2. Deploy to your preferred hosting provider (Vercel, Netlify, etc.)

## License

MIT

## Contributors

- Your Name - Initial work
