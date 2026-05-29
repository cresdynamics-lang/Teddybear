import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileNavBar from "@/components/MobileNavBar";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Teddy Bear Kenya | Giant Teddy Bears & Plush Bears in Nairobi",
  description:
    "Kenya's teddy bear specialists — mini plush to 140cm life-size giants. Name embroidery, same-day Nairobi delivery, M-Pesa accepted.",
  keywords: "teddy bear Kenya, giant teddy bear Nairobi, big teddy bear, plush teddy bear Kenya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans min-h-screen flex flex-col pb-16 md:pb-0">
        <StoreProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] bg-plum text-white px-4 py-2 rounded-lg"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <WhatsAppFloat />
          <MobileNavBar />
        </StoreProvider>
      </body>
    </html>
  );
}
