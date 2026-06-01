# Teddy Bear Kenya (BearHug KE)

Premium teddy bear e-commerce site for Kenya — built with Next.js 14 and Supabase.

## Features

- **Storefront** – Home, shop, product detail, cart, checkout, wishlist, order tracking
- **Auth** – Customer sign up / sign in via Supabase Auth
- **Orders** – Real orders stored in Supabase (guest or logged-in checkout)
- **Admin panel** – Products, orders, customers, testimonials, settings (`/admin`)
- **Kenya-ready** – KSh pricing, M-Pesa UI, county delivery, WhatsApp FAB

Cart stays in the browser (Zustand). Catalog, orders, auth, and wishlist sync with **Supabase**.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18 + TypeScript + Tailwind CSS
- [Supabase](https://supabase.com/) (Postgres, Auth, RLS)
- Zustand, React Hook Form, Zod, Framer Motion

## Client handoff

See **[HANDOFF.md](./HANDOFF.md)** for full setup, admin guide, go-live checklist, and troubleshooting.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. In the **SQL Editor**, run the migrations in order:
   ```
   supabase/migrations/001_initial_schema.sql
   supabase/migrations/002_product_images_storage.sql
   ```
3. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (Settings → API → service_role — server only, never expose to client)
   - `NEXT_PUBLIC_SITE_URL` (e.g. `http://localhost:3000`)

### 3. Create an admin user

1. In Supabase **Authentication → Users**, create a user (e.g. `admin@bearhugke.co.ke`)
2. In **SQL Editor**, promote them to admin:
   ```sql
   update public.profiles
   set role = 'admin'
   where id = 'YOUR-USER-UUID';
   ```
   (The profile row is created automatically on sign-up via the `handle_new_user` trigger.)

### 4. Seed the catalog

1. Start the dev server and sign in at `/admin/login` with your admin account
2. Go to **Admin → Settings** and click **Seed Catalog to Supabase**
   - Imports default products, testimonials, and site settings

### 5. Product image uploads (admin)

- In **Admin → Products**, image fields now support both:
  - direct URL paste
  - file upload to Supabase Storage (`product-images` bucket)
- Uploaded files are publicly accessible and optimized for storefront use.

Without Supabase env vars, the site falls back to built-in seed data in `src/lib/products.ts` (read-only demo mode).

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import on [Vercel](https://vercel.com)
3. Add all env vars from `.env.example`
4. Deploy

## Project structure

| Path | Purpose |
|------|---------|
| `src/app/` | Pages (storefront + admin) |
| `src/lib/actions/` | Server actions (catalog, orders, auth, admin) |
| `src/lib/supabase/` | Supabase clients and mappers |
| `src/providers/` | Catalog + auth hydration on load |
| `supabase/migrations/` | Database schema and RLS |

## Customize

- **Default seed data**: `src/lib/products.ts`
- **Static site copy**: `src/lib/site.ts`
- **Branding**: `tailwind.config.ts`

## M-Pesa live payments

Checkout currently shows M-Pesa till UI. For live STK push, integrate [Safaricom Daraja API](https://developer.safaricom.co.ke/) in checkout.
