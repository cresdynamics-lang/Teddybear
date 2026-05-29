"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/254700000000?text=Hi%20Teddy%20Bear%20Kenya!%20I%27d%20like%20help%20choosing%20a%20gift.";

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 z-40 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-bold hidden sm:inline group-hover:pr-1 transition-all">
        Chat
      </span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-honey rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-honey rounded-full" />
    </a>
  );
}
