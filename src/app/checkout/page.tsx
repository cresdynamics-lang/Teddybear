import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout | BearHug KE",
  description: "Complete your teddy bear order with M-Pesa or card payment.",
};

export default function CheckoutPage() {
  return (
    <div className="container-main py-8 md:py-12">
      <h1 className="font-display text-3xl font-medium mb-8">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
