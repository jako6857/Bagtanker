import { apiFetch } from "./apiClient";

export interface NewsListItem {
  id: number;
  title: string;
  slug: string;
  teaser: string;
  imageUrl: string;
}

export interface NewsDetail {
  id: number;
  title: string;
  slug: string;
  teaser: string;
  content: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getNewsList(): Promise<NewsListItem[]> {
  return apiFetch<NewsListItem[]>("/news");
}

export async function getNewsBySlug(slug: string): Promise<NewsDetail> {
  return apiFetch<NewsDetail>(`/news/${slug}`);
}
