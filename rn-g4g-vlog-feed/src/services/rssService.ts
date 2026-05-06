import { Article } from '../types/article';
import { parseRssToArticles } from './rssParser';

export const GFG_FEED_URL = 'https://www.geeksforgeeks.org/feed/';

export interface FetchFeedOptions {
  page?: number;
  signal?: AbortSignal;
}

export async function fetchArticles(
  opts: FetchFeedOptions = {},
): Promise<Article[]> {
  const url =
    opts.page && opts.page > 1
      ? `${GFG_FEED_URL}?paged=${opts.page}`
      : GFG_FEED_URL;

  const res = await fetch(url, {
    headers: { Accept: 'application/rss+xml, application/xml, text/xml' },
    signal: opts.signal,
  });

  if (!res.ok) {
    throw new Error(`Feed request failed: ${res.status} ${res.statusText}`);
  }

  const xml = await res.text();

  return parseRssToArticles(xml);
}
