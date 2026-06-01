import { Suspense } from "react";
import TrackOrderClient from "@/components/TrackOrderClient";
import PageLoader from "@/components/PageLoader";

export const metadata = {
  title: "Track Order | BearHug KE",
  description: "Track your teddy bear delivery across Kenya.",
};

export default function TrackPage() {
  return (
    <Suspense fallback={<PageLoader label="Loading track order…" compact />}>
      <TrackOrderClient />
    </Suspense>
  );
}
