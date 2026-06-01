import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Sign In | BearHug KE",
  description: "Sign in or create your BearHug KE account to track orders and save favourites.",
};

export default function LoginPage() {
  return <AuthForm />;
}
