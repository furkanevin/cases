export interface Article {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  category: string;
  author?: string;
  description: string;
  readTimeMinutes: number;
}
