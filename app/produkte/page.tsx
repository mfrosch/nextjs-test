import Link from "next/link";
import DebugBox from "@/components/DebugBox";
import products from "@/data/products.json";

export const revalidate = 60;

export default function ProduktePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Produkte</h1>
      <DebugBox type="ISR" revalidate={60} />

      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/produkte/${product.slug}`}
            className="block rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <span className="font-bold text-blue-600">
                {product.price.toFixed(2)} €
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
