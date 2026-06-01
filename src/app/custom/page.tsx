import CustomBearWizard from "@/components/CustomBearWizard";

export const metadata = {
  title: "Build a Custom Bear | BearHug KE",
  description: "Design your perfect personalised teddy bear with embroidery and accessories.",
};

export default function CustomPage() {
  return (
    <div className="container-main py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-medium text-ink">
          Build a Custom Bear
        </h1>
        <p className="text-ink-muted mt-2">
          Create a one-of-a-kind companion with personalised embroidery and accessories.
        </p>
      </div>
      <CustomBearWizard />
    </div>
  );
}
