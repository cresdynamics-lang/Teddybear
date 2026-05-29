# Teddy Bear Kenya

A complete teddy bear e-commerce website for Kenya — giant plush bears, classic sizes, mini teddies, and name embroidery.

## Features

- **Home** – Hero, shop by size, featured teddy bears
- **Shop** – 12 teddy bear products with search, filters, price range, sorting, pagination
- **Product pages** – Variants, customization, wishlist, add to cart
- **Cart drawer** – Slide-out cart with quantity controls
- **Checkout** – Delivery form, M-Pesa / card / cash on delivery
- **Wishlist** – Save favourites (persisted in browser)
- **Account** – Register / login, order history
- **Contact** – Location, WhatsApp, contact form

All prices in **Kenyan Shillings (KSh)**. Data persists in `localStorage` (no backend required for demo).

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

## Upload product images

Add your photos to **`public/images/`** using these names:

| File | Product |
|------|---------|
| `image1.jpg` … `image12.jpg` | Teddy bear products 1–12 (see `public/images/README.md`) |
| `hero.jpg` | Homepage hero |

Any image size or aspect ratio works (`.jpg`, `.png`, `.webp` also supported). Refresh the browser after uploading.

## Customize

- **Products**: Edit `src/data/products.ts`
- **Categories**: Edit `src/data/categories.ts`
- **Contact info**: Update `src/components/Footer.tsx` and `src/app/contact/page.tsx`
- **Branding**: Adjust colors in `tailwind.config.ts`

## Deploy

Deploy to [Vercel](https://vercel.com), Netlify, or any Node.js host. For real payments, integrate [M-Pesa Daraja API](https://developer.safaricom.co.ke/) at checkout.
