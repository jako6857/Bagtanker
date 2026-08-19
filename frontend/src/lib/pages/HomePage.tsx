import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import { getNewsList, type NewsListItem } from "../news";
import { getAssetUrl } from "../apiClient";

const ITEMS_PER_PAGE = 3;

function HomePage() {
  const [news, setNews] = useState<NewsListItem[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getNewsList()
      .then(setNews)
      .catch((err) => console.error("Failed to load news:", err));
  }, []);

  const pageCount = Math.ceil(news.length / ITEMS_PER_PAGE) || 1;
  const visibleNews = news.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  return (
    <PageHero backgroundImage="/assets/hero-bg.jpg">
      <div className="flex items-center min-h-screen px-8">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-amber-400 mb-4">Nyheder</h1>

          <div className="bg-neutral-900/70 rounded-lg p-4">
            <ul className="flex flex-col divide-y divide-white/10">
              {visibleNews.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <img
                    src={getAssetUrl(item.imageUrl)}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getAssetUrl(
                        "/images/slides/bread-slidebg-01.jpg",
                      );
                    }}
                    className="w-24 h-20 object-cover rounded shrink-0"
                  />
                  <div>
                    <h3 className="text-white font-bold text-sm">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1">{item.teaser}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {pageCount > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === page ? "bg-amber-400" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageHero>
  );
}

export default HomePage;
