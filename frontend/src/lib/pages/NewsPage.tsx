import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import {
  getNewsList,
  getNewsBySlug,
  type NewsListItem,
  type NewsDetail,
} from "../news";
import { getAssetUrl } from "../apiClient";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function NewsPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [newsList, setNewsList] = useState<NewsListItem[]>([]);
  const [article, setArticle] = useState<NewsDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNewsList()
      .then(setNewsList)
      .catch((err) => console.error("Failed to load news list:", err));
  }, []);

  useEffect(() => {
    const targetSlug = slug ?? newsList[0]?.slug;
    if (!targetSlug) return;

    getNewsBySlug(targetSlug)
      .then(setArticle)
      .catch((err) => {
        console.error("Failed to load article:", err);
        setError("Kunne ikke indlæse nyheden.");
      });
  }, [slug, newsList]);

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!article) {
    return <div className="p-8">Indlæser...</div>;
  }

  return (
    <div>
      <PageHero backgroundImage="/bread-slidebg-04.jpg" minHeight="h-56">
        <div />
      </PageHero>

      <div className="px-8 py-3 text-sm text-neutral-500">
        Du er her:{" "}
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/news" className="hover:underline">
          Nyheder
        </Link>
      </div>

      <div className="px-8 pb-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-sm text-neutral-500 mb-2">
            {formatDate(article.createdAt)}:
          </p>
          <p className="text-neutral-700 mb-6">{article.teaser}</p>

          <img
            src={getAssetUrl(article.imageUrl)}
            alt={article.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getAssetUrl(
                "/images/slides/bread-slidebg-01.jpg",
              );
            }}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />

          <div className="text-neutral-700 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>

        <div className="bg-neutral-100 rounded-lg overflow-hidden h-fit">
          <div className="bg-neutral-700 text-white font-bold px-4 py-3">
            Se også...
          </div>

          <div className="divide-y divide-neutral-200">
            {newsList.map((item) => {
              const isActive = item.slug === article.slug;
              return (
                <Link
                  key={item.id}
                  to={`/news/${item.slug}`}
                  className={`block px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-amber-200"
                      : "bg-neutral-50 hover:bg-neutral-200"
                  }`}
                >
                  <p className="text-xs text-neutral-500">
                    {isActive ? formatDate(article.createdAt) : ""}
                  </p>
                  <p className="text-sm font-semibold text-neutral-800">
                    {item.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
