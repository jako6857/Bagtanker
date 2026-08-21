import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { getCategoryList, type CategoryListItem } from "../categories";

function CategoryNav() {
  const [categories, setCategories] = useState<CategoryListItem[]>([]);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getCategoryList()
      .then(setCategories)
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  const onProducts = location.pathname === "/products";
  const activeSlug = onProducts ? searchParams.get("category") : null;

  return (
    <nav className="bg-neutral-800 flex flex-wrap justify-center gap-8 py-4">
      <Link
        to="/products"
        className={`text-sm font-semibold uppercase pb-1 border-b-2 transition-colors ${
          onProducts && !activeSlug
            ? "text-amber-400 border-amber-400"
            : "text-white border-transparent hover:text-amber-300"
        }`}
      >
        Alle
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          to={`/products?category=${cat.slug}`}
          className={`text-sm font-semibold uppercase pb-1 border-b-2 transition-colors ${
            activeSlug === cat.slug
              ? "text-amber-400 border-amber-400"
              : "text-white border-transparent hover:text-amber-300"
          }`}
        >
          {cat.title}
        </Link>
      ))}
    </nav>
  );
}

export default CategoryNav;
