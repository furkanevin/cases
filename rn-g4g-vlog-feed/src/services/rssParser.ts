import { Article } from '../types/article';
import { estimateReadMinutes, stripHtml } from '../utils/readTime';

// GeeksForGeeks /feed/ used to serve RSS XML and now serves the Next.js
// homepage HTML. Handle both, return [] on anything else.

const ITEM_RE = /<item[\s>][\s\S]*?<\/item>/gi;
const NEXT_DATA_RE =
  /<script id="__NEXT_DATA__" type="application\/json"[^>]*>([\s\S]*?)<\/script>/i;

function decodeCdata(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return match ? match[1] : trimmed;
}

function pickTag(item: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = item.match(re);
  return m ? decodeCdata(m[1]) : undefined;
}

function pickAllTags(item: string, tag: string): string[] {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(item)) !== null) {
    out.push(decodeCdata(m[1]));
  }
  return out;
}

function parseRssXml(xml: string): Article[] {
  const items = xml.match(ITEM_RE) ?? [];
  const articles: Article[] = [];

  for (const item of items) {
    const link = pickTag(item, 'link')?.trim();
    const guid = pickTag(item, 'guid')?.trim();
    const id = guid || link;
    if (!id) continue;

    const title = pickTag(item, 'title')?.trim() ?? 'Untitled';
    const pubDateRaw = pickTag(item, 'pubDate')?.trim();
    const pubDate = pubDateRaw
      ? new Date(pubDateRaw).toISOString()
      : new Date(0).toISOString();

    const categories = pickAllTags(item, 'category').map(c => c.trim()).filter(Boolean);
    const category = categories[0] ?? 'General';

    const author =
      pickTag(item, 'dc:creator')?.trim() ?? pickTag(item, 'author')?.trim();

    const descriptionRaw =
      pickTag(item, 'content:encoded') ?? pickTag(item, 'description') ?? '';
    const description = stripHtml(descriptionRaw);

    articles.push({
      id,
      title: stripHtml(title),
      link: link ?? id,
      pubDate,
      category,
      author,
      description,
      readTimeMinutes: estimateReadMinutes(descriptionRaw),
    });
  }

  return articles;
}

interface NextDataCard {
  text?: string;
  link?: string;
  desc?: string;
}

interface NextDataSection {
  name?: string;
  section_details?: { cards?: NextDataCard[] };
}

interface NextDataRoot {
  props?: {
    pageProps?: {
      homePageArticles?: NextDataSection[];
      initialState?: {
        homePageApi?: {
          queries?: Record<string, { data?: NextDataSection[] } | undefined>;
        };
      };
    };
  };
}

function findArticleSections(data: NextDataRoot): NextDataSection[] {
  const direct = data?.props?.pageProps?.homePageArticles;
  if (Array.isArray(direct)) return direct;

  const queries = data?.props?.pageProps?.initialState?.homePageApi?.queries;
  if (queries) {
    for (const key of Object.keys(queries)) {
      if (key.startsWith('getHomePageArticles')) {
        const d = queries[key]?.data;
        if (Array.isArray(d)) return d;
      }
    }
  }
  return [];
}

function parseNextDataHtml(html: string): Article[] {
  const m = html.match(NEXT_DATA_RE);
  if (!m) return [];

  let data: NextDataRoot;
  try {
    data = JSON.parse(m[1]) as NextDataRoot;
  } catch {
    return [];
  }

  const sections = findArticleSections(data);
  const fetchedAt = new Date().toISOString();
  const articles: Article[] = [];
  const seen = new Set<string>();

  for (const section of sections) {
    const category = section?.name?.trim() || 'General';
    const cards = section?.section_details?.cards ?? [];
    for (const card of cards) {
      const link = card.link?.trim();
      const title = card.text?.trim();
      if (!link || !title || seen.has(link)) continue;
      seen.add(link);

      const description = stripHtml(card.desc ?? '');
      articles.push({
        id: link,
        title: stripHtml(title),
        link,
        pubDate: fetchedAt,
        category,
        description,
        readTimeMinutes: estimateReadMinutes(description),
      });
    }
  }

  return articles;
}

export function parseRssToArticles(input: string): Article[] {
  if (!input) return [];

  const head = input.slice(0, 500);
  if (/<\?xml|<rss\b|<feed\b/i.test(head)) {
    return parseRssXml(input);
  }
  if (/<!doctype html|<html\b|__NEXT_DATA__/i.test(head) || input.includes('__NEXT_DATA__')) {
    return parseNextDataHtml(input);
  }

  return parseRssXml(input);
}
