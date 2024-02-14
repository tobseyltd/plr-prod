create table public.billing_customers(
    id text primary key,
    user_id uuid unique references auth.users(id) not null,
    email text not null,
    metadata jsonb
);

alter table public.billing_customers enable row level security;

create policy "Users can view own customer data" on billing_customers
    for select to authenticated
        using (auth.uid() = user_id);

create table public.billing_products(
    id text primary key,
    name text not null,
    description text not null,
    active boolean not null,
    metadata jsonb
);

alter table public.billing_products enable row level security;

create policy "Public read access to products" on billing_products
    for select
        using (true);

create type subscription_status as enum(
    'trialing',
    'active',
    'canceled',
    'incomplete',
    'incomplete_expired',
    'past_due',
    'unpaid',
    'paused'
);

create table public.billing_subscriptions(
    id text primary key,
    customer_id text references billing_customers(id) not null,
    status subscription_status not null,
    product_id text references billing_products(id) not null,
    user_id uuid references auth.users(id) not null,
    cancel_at_period_end boolean,
    created timestamp with time zone not null,
    current_period_start timestamp with time zone not null,
    current_period_end timestamp with time zone not null,
    trial_start timestamp with time zone,
    trial_end timestamp with time zone,
    metadata jsonb
);

alter table billing_subscriptions enable row level security;

create policy "Can read own subscription data" on billing_subscriptions
    for select to authenticated
        using (auth.uid() = user_id);

create type payment_status as enum(
    'paid',
    'unpaid'
);

create type checkout_status as enum(
    'complete',
    'open',
    'no_payment_required'
);

create type payment_mode as enum(
    'payment',
    'setup',
    'subscription'
);

create table public.billing_onetime(
    id text primary key,
    customer_id text references billing_customers(id) not null,
    payment_intent text,
    payment_status payment_status not null,
    /* product_id text references billing_products(id) not null, */
    user_id uuid references auth.users(id) not null,
    created timestamp with time zone not null,
    mode payment_mode not null,
    status checkout_status not null,
    metadata jsonb
);

alter table billing_onetime enable row level security;

create policy "Can read own subscription data" on billing_onetime
    for select to authenticated
        using (auth.uid() = user_id);

