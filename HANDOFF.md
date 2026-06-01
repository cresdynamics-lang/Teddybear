# BearHug KE — Client Handoff Guide

Premium teddy bear e-commerce for Kenya. This document covers setup, daily operations, and go-live.

---

## 1. What you received

| Area | Details |
|------|---------|
| **Storefront** | Home, shop, product pages, cart, checkout, wishlist, order tracking, account |
| **Payments** | M-Pesa till UI at checkout (manual till payment; live STK push can be added later) |
| **Backend** | Supabase (database, auth, storage, row-level security) |
| **Admin** | `/admin` — products, orders, customers, testimonials, settings |
| **Images** | Admin can paste URLs or upload files to Supabase Storage |

---

## 2. Environment variables

Copy `.env.example` to `.env.local` (local) and add the same keys in **Vercel → Project → Settings → Environment Variables** for production.

| Variable | Where to find it |
|----------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → API → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → API → `service_role` (secret — server only) |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.co.ke` or `http://localhost:3000` |

Never commit `.env.local` or expose the service role key in the browser.

---

## 3. One-time Supabase setup

### Step A — Run migrations (in order)

In **Supabase → SQL Editor**, run:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_product_images_storage.sql`

### Step B — Create admin user

1. **Authentication → Users → Add user** (email + password).
2. Copy the user UUID.
3. Run in SQL Editor:

```sql
update public.profiles
set role = 'admin'
where id = 'PASTE-USER-UUID-HERE';
```

### Step C — Seed the catalog

1. Start the site: `npm run dev`
2. Open `/admin/login` and sign in with the admin account.
3. Go to **Admin → Settings → Seed Catalog to Supabase**.

This imports default products, testimonials, and store settings.

### Step D — Verify storage uploads

1. **Admin → Products → Add Product**
2. Upload an image file (max 5MB, JPG/PNG/WebP/GIF).
3. Save the product and confirm it appears on `/shop`.

---

## 4. Daily admin workflows

### Products

- **Add:** Admin → Products → Add Product  
- **Images:** Primary URL and/or file upload; optional gallery URLs (one per line)  
- **Edit / delete:** Products list → pencil / trash icons  

### Orders

- **List:** Admin → Orders — filter by status  
- **Update status:** Received → Packed → Out for delivery → Delivered  
- Customers track at `/track` with order ID + phone  

### Store settings

- **Admin → Settings** — phone, WhatsApp, M-Pesa till, delivery fees, free delivery threshold  
- Changes apply site-wide after save  

### Testimonials

- **Admin → Testimonials** — add/edit/delete customer quotes shown on the homepage carousel  

---

## 5. Customer journey (test before go-live)

1. Browse `/shop` and open a product  
2. Add to cart → `/cart` → `/checkout`  
3. Place order (guest or signed-in)  
4. Note the order ID (e.g. `BH-12345`)  
5. Track at `/track` with order ID + phone  
6. Sign up at `/login` → view orders under `/orders`  

---

## 6. Deploy to Vercel

1. Push the repository to GitHub.  
2. Import project on [vercel.com](https://vercel.com).  
3. Add all environment variables from section 2.  
4. Deploy — build command: `npm run build`, output: Next.js default.  
5. In Supabase **Authentication → URL configuration**, add:
   - Site URL: your production domain  
   - Redirect URLs: `https://yourdomain.co.ke/**`  

---

## 7. Customization (non-developer safe)

| What | File / place |
|------|----------------|
| Static business copy (fallback) | `src/lib/site.ts` |
| Default product seed data | `src/lib/products.ts` (used only before/for seeding) |
| Brand colors | `tailwind.config.ts` |
| Product photos (bulk) | Admin uploads or `/public/images/` |

Live catalog data is stored in **Supabase**, not in code, after seeding.

---

## 8. Troubleshooting

| Issue | Fix |
|-------|-----|
| Admin login fails | Confirm `profiles.role = 'admin'` for that user UUID |
| Image upload fails | Run migration `002_product_images_storage.sql` |
| Products don’t appear | Seed catalog or add products in admin; check Supabase `products` table |
| Orders not saving | Check Supabase env vars; inspect `orders` table and RLS |
| “Demo” / old products only | Clear browser cache; confirm catalog loaded from Supabase (not empty DB) |

---

## 9. Optional next steps (not included)

- **M-Pesa STK Push** — Safaricom Daraja API integration at checkout  
- **Email notifications** — order confirmations via Resend / SendGrid  
- **Newsletter** — connect form to Mailchimp or similar  
- **Analytics** — Google Analytics / Plausible  

---

## 10. Support contacts

Update these for your client:

- **Store:** BearHug KE  
- **WhatsApp / phone:** see Admin → Settings or `src/lib/site.ts`  
- **Technical host:** Vercel + Supabase dashboards  

---

*Last updated: handoff package for BearHug KE Next.js + Supabase stack.*
