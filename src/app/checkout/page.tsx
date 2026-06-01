import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout | BearHug KE",
  description: "Complete your teddy bear order with M-Pesa or card payment.",
};

export default function CheckoutPage() {
  return (
    <div className="container-main py-8 md:py-12">
      <h1 className="font-display text-3xl font-medium mb-2">Checkout</h1>
      <p className="text-ink-muted text-sm mb-8">
        Secure checkout · M-Pesa · Delivery across Kenya
      </p>
      <CheckoutForm />
    </div>
  );
}
