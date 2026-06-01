-- BearHug KE — Supabase schema
-- Run in Supabase SQL Editor or via supabase db push

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text not null default '',
  description text not null default '',
  care_instructions text not null default '',
  delivery_info text not null default '',
  price integer not null check (price >= 0),
  size text not null check (size in ('S', 'M', 'L', 'Giant')),
  color text not null,
  occasions text[] not null default '{}',
  image text not null,
  images text[] not null default '{}',
  badge text check (badge is null or badge in ('Best Seller', 'New Arrival')),
  featured boolean not null default false,
  created_at date not null default current_date
);

create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_featured_idx on public.products (featured);

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  rating integer not null check (rating between 1 and 5),
  quote text not null,
  occasion text not null,
  created_at timestamptz not null default now()
);

-- Site settings (single row)
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  name text not null,
  tagline text not null default '',
  phone text not null default '',
  phone_display text not null default '',
  email text not null default '',
  whatsapp text not null default '',
  mpesa_till text not null default '',
  free_delivery_threshold integer not null default 3000,
  standard_delivery_fee integer not null default 300,
  gift_wrap_fee integer not null default 150,
  hours text not null default ''
);

-- Orders
create table if not exists public.orders (
  id text primary key,
  user_id uuid references public.profiles (id) on delete set null,
  phone text not null,
  status text not null default 'received'
    check (status in ('received', 'packed', 'out_for_delivery', 'delivered')),
  subtotal integer not null,
  delivery_fee integer not null,
  gift_wrap boolean not null default false,
  total integer not null,
  payment_method text not null check (payment_method in ('mpesa', 'card')),
  shipping jsonb not null,
  items jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_phone_idx on public.orders (phone);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- Wishlist
create table if not exists public.wishlist_items (
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Admin helper
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_settings enable row level security;
alter table public.orders enable row level security;
alter table public.wishlist_items enable row level security;

-- Profiles policies
create policy "Public profiles readable by admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Products policies
create policy "Products are publicly readable"
  on public.products for select using (true);

create policy "Admins manage products"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

-- Testimonials policies
create policy "Testimonials are publicly readable"
  on public.testimonials for select using (true);

create policy "Admins manage testimonials"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- Site settings policies
create policy "Site settings publicly readable"
  on public.site_settings for select using (true);

create policy "Admins update site settings"
  on public.site_settings for update
  using (public.is_admin());

create policy "Admins insert site settings"
  on public.site_settings for insert
  with check (public.is_admin());

-- Orders policies
create policy "Anyone can create orders"
  on public.orders for insert
  with check (true);

create policy "Users read own orders"
  on public.orders for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Admins update orders"
  on public.orders for update
  using (public.is_admin());

create policy "Admins delete orders"
  on public.orders for delete
  using (public.is_admin());

-- Wishlist policies
create policy "Users manage own wishlist"
  on public.wishlist_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Default site settings row
insert into public.site_settings (
  id, name, tagline, phone, phone_display, email, whatsapp, mpesa_till,
  free_delivery_threshold, standard_delivery_fee, gift_wrap_fee, hours
) values (
  1,
  'BearHug KE',
  'Every bear tells a story.',
  '0712667782',
  '+254 712 667 782',
  'hello@bearhugke.co.ke',
  '254712667782',
  '9466773',
  3000,
  300,
  150,
  'Mon–Sat: 9am – 6pm'
) on conflict (id) do nothing;
