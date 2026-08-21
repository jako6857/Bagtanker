import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { getProductById, type ProductDetail } from "../products";
import { getAssetUrl } from "../apiClient";
import ProductComments from "../components/ProductComments";

function HeartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then(setProduct)
      .catch((err) => {
        console.error("Failed to load product:", err);
        setError("Kunne ikke indlæse produktet.");
      });
  }, [id]);

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="p-8">Indlæser...</div>;
  }

  const sortedIngredients = [...product.productIngredients].sort(
    (a, b) => a.orderNum - b.orderNum,
  );

  return (
    <div>
      <PageHero backgroundImage="/bread-slidebg-03.jpg" minHeight="h-56">
        <div />
      </PageHero>

      <div className="px-8 py-3 text-sm text-neutral-500">
        Du er her:{" "}
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/products" className="hover:underline">
          Produkter
        </Link>{" "}
        / {product.title}
      </div>

      <div className="px-8 pb-12">
        <h1 className="text-4xl font-bold mb-6">{product.title}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Image + description */}
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            <img
              src={getAssetUrl(product.imageUrl)}
              alt={product.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = getAssetUrl(
                  "/images/slides/bread-slidebg-01.jpg",
                );
              }}
              className="w-full h-72 object-cover rounded-lg"
            />

            <div className="text-sm text-neutral-700 space-y-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident.
              </p>
            </div>
          </div>

          {/* Opskrift sidebar */}
          <div className="bg-neutral-100 rounded-lg overflow-hidden h-fit">
            <div className="bg-neutral-800 text-white flex items-center justify-between px-4 py-3">
              <span className="font-bold">Opskrift</span>
              <span className="flex items-center gap-1 text-sm">
                324 <HeartIcon />
              </span>
            </div>

            <div className="bg-neutral-200 text-sm font-medium px-4 py-2">
              Varighed: {product.durationInMinutes} min
            </div>
            <div className="bg-neutral-200 text-sm font-medium px-4 py-2 border-t border-neutral-300">
              Antal: {product.amount} stk
            </div>

            <div className="divide-y divide-neutral-200">
              {sortedIngredients.map((pi) => (
                <div key={pi.id} className="px-4 py-2 text-sm">
                  {pi.amount} {pi.units.abbreviation} {pi.ingredients.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-neutral-700 leading-relaxed max-w-3xl">
          {product.procedure}
        </div>
        <ProductComments />
      </div>
    </div>
  );
}

export default ProductDetailPage;
