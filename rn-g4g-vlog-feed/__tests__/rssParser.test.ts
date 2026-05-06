import { parseRssToArticles } from '../src/services/rssParser';

const SAMPLE_FEED = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Sample</title>
    <item>
      <title><![CDATA[How to debug React Native apps]]></title>
      <link>https://example.com/article-1</link>
      <guid isPermaLink="true">https://example.com/article-1</guid>
      <pubDate>Mon, 20 Jan 2026 09:00:00 +0000</pubDate>
      <category><![CDATA[React Native]]></category>
      <category>Mobile</category>
      <dc:creator><![CDATA[Jane Doe]]></dc:creator>
      <description><![CDATA[<p>Some intro text. ${'word '.repeat(199)}</p>]]></description>
    </item>
    <item>
      <title>Plain article</title>
      <link>https://example.com/article-2</link>
      <pubDate>Tue, 21 Jan 2026 09:00:00 +0000</pubDate>
      <description>Short post.</description>
    </item>
  </channel>
</rss>`;

describe('parseRssToArticles', () => {
  it('extracts title, link, category, author and pubDate', () => {
    const articles = parseRssToArticles(SAMPLE_FEED);
    expect(articles).toHaveLength(2);

    const [first, second] = articles;
    expect(first.title).toBe('How to debug React Native apps');
    expect(first.link).toBe('https://example.com/article-1');
    expect(first.category).toBe('React Native');
    expect(first.author).toBe('Jane Doe');
    expect(new Date(first.pubDate).toISOString()).toBe(
      '2026-01-20T09:00:00.000Z',
    );
    expect(second.category).toBe('General');
    expect(second.author).toBeUndefined();
  });

  it('estimates read time from the description and floors at 1 minute', () => {
    const articles = parseRssToArticles(SAMPLE_FEED);
    expect(articles[0].readTimeMinutes).toBeGreaterThanOrEqual(1);
    expect(articles[1].readTimeMinutes).toBe(1);
  });

  it('returns an empty array for malformed input rather than throwing', () => {
    expect(parseRssToArticles('not xml at all')).toEqual([]);
    expect(parseRssToArticles('')).toEqual([]);
  });

  it('parses Next.js HTML responses by lifting homePageArticles cards', () => {
    const payload = {
      props: {
        pageProps: {
          homePageArticles: [
            {
              type: 1,
              name: 'Explore',
              section_details: {
                cards: [
                  {
                    text: 'Data Structure and Algorithms',
                    link: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/',
                    desc: '',
                  },
                  {
                    text: 'Python',
                    link: 'https://www.geeksforgeeks.org/python-programming-language/',
                    desc: '',
                  },
                ],
              },
            },
            {
              type: 2,
              name: 'Must Explore',
              section_details: {
                cards: [
                  {
                    text: 'Trending Now',
                    link: 'https://www.geeksforgeeks.org/trending/',
                  },
                ],
              },
            },
          ],
        },
      },
    };
    const html =
      `<!DOCTYPE html><html><body><script id="__NEXT_DATA__" type="application/json">${JSON.stringify(payload)}</script></body></html>`;

    const articles = parseRssToArticles(html);
    expect(articles).toHaveLength(3);
    expect(articles[0]).toMatchObject({
      title: 'Data Structure and Algorithms',
      link: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/',
      category: 'Explore',
    });
    expect(articles[2].category).toBe('Must Explore');
    expect(Number.isNaN(Date.parse(articles[0].pubDate))).toBe(false);
  });

  it('falls back to the RTK Query slice when homePageArticles is missing', () => {
    const payload = {
      props: {
        pageProps: {
          initialState: {
            homePageApi: {
              queries: {
                'getHomePageArticles({"countryCode":"TR"})': {
                  data: [
                    {
                      name: 'Explore',
                      section_details: {
                        cards: [
                          {
                            text: 'Java',
                            link: 'https://www.geeksforgeeks.org/java/java/',
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    };
    const html = `<html><script id="__NEXT_DATA__" type="application/json">${JSON.stringify(payload)}</script></html>`;
    const articles = parseRssToArticles(html);
    expect(articles).toHaveLength(1);
    expect(articles[0].title).toBe('Java');
  });

  it('returns [] for HTML without __NEXT_DATA__', () => {
    expect(parseRssToArticles('<!DOCTYPE html><html><body>nope</body></html>')).toEqual([]);
  });
});
