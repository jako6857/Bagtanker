import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import {
  getCategoryList,
  getCategoryDetail,
  type CategoryListItem,
} from "../categories";
import { getProductList, type ProductListItem } from "../products";
import { getAssetUrl } from "../apiClient";

interface DisplayProduct {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  price?: number;
}

type SortOption = "default" | "price-asc" | "price-desc" | "title";

const PLACEHOLDER_DESCRIPTION =
  "Når vi en sjælden gang køber morgenbrød hos bageren, så skal jeg altid have en håndværker, fordi jeg elsker det tykke lag med blå birkes ovenpå.";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const activeSlug = searchParams.get("category");

  const [categories, setCategories] = useState<CategoryListItem[]>([]);
  const [allProducts, setAllProducts] = useState<ProductListItem[]>([]);
  const [displayProducts, setDisplayProducts] = useState<DisplayProduct[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    getCategoryList()
      .then(setCategories)
      .catch((err) => console.error("Failed to load categories:", err));

    getProductList()
      .then(setAllProducts)
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  useEffect(() => {
    if (!activeSlug) {
      setDisplayProducts(allProducts);
      return;
    }

    const priceById = new Map(allProducts.map((p) => [p.id, p.price]));

    getCategoryDetail(activeSlug)
      .then((category) => {
        const products = category.categoryProducts.map(({ products: p }) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          imageUrl: p.imageUrl,
          price: priceById.get(p.id),
        }));
        setDisplayProducts(products);
      })
      .catch((err) => console.error("Failed to load category products:", err));
  }, [activeSlug, allProducts]);

  const activeCategory = categories.find((c) => c.slug === activeSlug);
  const pageTitle = activeCategory ? activeCategory.title : "Alle produkter";

  const sortedProducts = [...displayProducts].sort((a, b) => {
    if (sortBy === "price-asc") return (a.price ?? 0) - (b.price ?? 0);
    if (sortBy === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
    if (sortBy === "title") return a.title.localeCompare(b.title, "da");
    return 0;
  });

  return (
    <div>
      <PageHero backgroundImage="/bread-slidebg-02.jpg" minHeight="h-56">
        <div />
      </PageHero>

      <div className="px-10 py-3 text-sm text-neutral-500">
        Du er her:{" "}
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        / Produkter
      </div>

      <div className="px-10 flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{pageTitle}</h1>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="border border-neutral-300 rounded px-3 py-2 text-sm"
        >
          <option value="default">Sorter</option>
          <option value="price-asc">Pris: Lav til høj</option>
          <option value="price-desc">Pris: Høj til lav</option>
          <option value="title">Navn A-Å</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 px-10 pb-16">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="flex gap-4 bg-neutral-100 rounded-lg overflow-hidden p-3"
          >
            <img
              src={getAssetUrl(product.imageUrl)}
              alt={product.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = getAssetUrl(
                  "/images/slides/bread-slidebg-01.jpg",
                );
              }}
              className="w-32 h-32 object-cover rounded shrink-0"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{product.title}</h3>
                <p className="text-neutral-600 text-sm mt-1">
                  {PLACEHOLDER_DESCRIPTION}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Link
                  to={`/products/${product.id}`}
                  className="inline-block bg-amber-400 hover:bg-amber-500 text-neutral-900 font-semibold text-sm px-4 py-2 rounded w-fit transition-colors"
                >
                  Læs mere
                </Link>
                <span className="flex items-center gap-1 text-neutral-500 text-sm">
                  324
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
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
