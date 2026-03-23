import { useCallback, useEffect, useMemo, useState } from 'react';
import { dbApi } from '../lib/db';
import type { BookmarkItem } from '../types/content';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbApi
      .getBookmarks()
      .then((items) => setBookmarks(items))
      .finally(() => setLoading(false));
  }, []);

  const refresh = useCallback(async () => {
    const items = await dbApi.getBookmarks();
    setBookmarks(items);
  }, []);

  const isBookmarked = useCallback(
    (targetId: string) => bookmarks.some((bookmark) => bookmark.targetId === targetId),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    async (item: Omit<BookmarkItem, 'id' | 'createdAt'>) => {
      const existing = bookmarks.find((bookmark) => bookmark.targetId === item.targetId);

      if (existing) {
        await dbApi.deleteBookmark(existing.id);
      } else {
        await dbApi.saveBookmark({
          ...item,
          id: `${item.targetType}:${item.targetId}`,
          createdAt: new Date().toISOString()
        });
      }

      await refresh();
    },
    [bookmarks, refresh]
  );

  const sortedBookmarks = useMemo(
    () =>
      [...bookmarks].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [bookmarks]
  );

  return {
    bookmarks: sortedBookmarks,
    loading,
    isBookmarked,
    toggleBookmark,
    refresh
  };
}
