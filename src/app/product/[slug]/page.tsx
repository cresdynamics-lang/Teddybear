import { redirect } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default function LegacyProductRedirect({ params }: Props) {
  redirect(`/shop/${params.slug}`);
}
