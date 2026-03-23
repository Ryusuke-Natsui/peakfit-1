import { useCallback, useEffect, useMemo, useState } from 'react';
import { dbApi } from '../lib/db';
import type { NoteItem } from '../types/content';

export function useNotes() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbApi
      .getNotes()
      .then((items) => setNotes(items))
      .finally(() => setLoading(false));
  }, []);

  const refresh = useCallback(async () => {
    const items = await dbApi.getNotes();
    setNotes(items);
  }, []);

  const getNoteFor = useCallback(
    (targetId: string) => notes.find((note) => note.targetId === targetId),
    [notes]
  );

  const upsertNote = useCallback(
    async (item: Omit<NoteItem, 'id' | 'updatedAt'> & { text: string }) => {
      const id = `${item.targetType}:${item.targetId}`;
      const trimmedText = item.text.trim();

      if (!trimmedText) {
        await dbApi.deleteNote(id);
      } else {
        await dbApi.saveNote({
          ...item,
          id,
          updatedAt: new Date().toISOString()
        });
      }

      await refresh();
    },
    [refresh]
  );

  const sortedNotes = useMemo(
    () =>
      [...notes].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    [notes]
  );

  return {
    notes: sortedNotes,
    loading,
    getNoteFor,
    upsertNote,
    refresh
  };
}
