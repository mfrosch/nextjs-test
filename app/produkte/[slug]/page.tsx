import { notFound } from "next/navigation";
import Link from "next/link";
import DebugBox from "@/components/DebugBox";
import products from "@/data/products.json";

export const revalidate = 120;

const PRE_RENDERED_SLUGS = products.slice(0, 5).map((p) => p.slug);

export function generateStaticParams() {
  return PRE_RENDERED_SLUGS.map((slug) => ({ slug }));
}

export default async function ProduktDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const isPreRendered = PRE_RENDERED_SLUGS.includes(slug);

  return (
    <div className="space-y-6">
      <Link
        href="/produkte"
        className="text-sm text-blue-600 hover:underline"
      >
        ← Zurück zur Übersicht
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.category}</p>
        </div>
        <span className="text-2xl font-bold text-blue-600">
          {product.price.toFixed(2)} €
        </span>
      </div>

      <p className="text-gray-700">{product.description}</p>

      <div
        className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
          isPreRendered
            ? "bg-green-100 text-green-800"
            : "bg-orange-100 text-orange-800"
        }`}
      >
        {isPreRendered ? "Pre-rendered (Build-Zeit)" : "On-demand (Runtime)"}
      </div>

      <DebugBox
        type="ISR"
        revalidate={120}
        extra={{ "Pre-rendered": isPreRendered ? "Ja" : "Nein" }}
      />
    </div>
  );
}
