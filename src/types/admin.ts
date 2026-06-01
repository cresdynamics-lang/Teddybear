export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  quote: string;
  occasion: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsapp: string;
  mpesaTill: string;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  giftWrapFee: number;
  hours: string;
}
