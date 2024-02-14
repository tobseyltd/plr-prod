create extension if not exists "uuid-ossp";

create table public.lessons(
    id uuid unique default uuid_generate_v4(),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    ep text,
    title text,
    description text,
    files jsonb[],
    likes bigint default 0,
    topic text,
    img text,
    skill text,
    video1 text,
    video2 text,
    video3 text,
    comments jsonb[],
    primary key (id)
);

alter table public.lessons enable row level security;

create policy "Enable read access for all users" on lessons
    for select
        using (true);

