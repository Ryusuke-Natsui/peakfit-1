import type { SearchableItem } from '../types/content';

export function searchItems(items: SearchableItem[], query: string): SearchableItem[] {
  const q = query.trim().toLowerCase();

  if (!q) return items;

  return items
    .map((item) => {
      const haystack = [item.title, item.excerpt, ...item.tags].join(' ').toLowerCase();
      let score = 0;

      if (item.title.toLowerCase().includes(q)) score += 6;
      if (item.excerpt.toLowerCase().includes(q)) score += 3;
      if (item.tags.some((tag) => tag.toLowerCase().includes(q))) score += 2;
      if (haystack.includes(q)) score += 1;

      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'ja'))
    .map((entry) => entry.item);
}
