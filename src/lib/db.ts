import type { BookmarkItem, NoteItem } from '../types/content';

const DB_NAME = 'peakfit-companion-db';
const DB_VERSION = 1;
const BOOKMARK_STORE = 'bookmarks';
const NOTE_STORE = 'notes';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(BOOKMARK_STORE)) {
        db.createObjectStore(BOOKMARK_STORE, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(NOTE_STORE)) {
        db.createObjectStore(NOTE_STORE, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
  });
}

async function getAll<T>(storeName: string): Promise<T[]> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as T[]);
  });
}

async function put<T>(storeName: string, value: T): Promise<void> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put(value);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function remove(storeName: string, id: string): Promise<void> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).delete(id);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export const dbApi = {
  async getBookmarks(): Promise<BookmarkItem[]> {
    return getAll<BookmarkItem>(BOOKMARK_STORE);
  },
  async saveBookmark(item: BookmarkItem): Promise<void> {
    return put(BOOKMARK_STORE, item);
  },
  async deleteBookmark(id: string): Promise<void> {
    return remove(BOOKMARK_STORE, id);
  },
  async getNotes(): Promise<NoteItem[]> {
    return getAll<NoteItem>(NOTE_STORE);
  },
  async saveNote(item: NoteItem): Promise<void> {
    return put(NOTE_STORE, item);
  },
  async deleteNote(id: string): Promise<void> {
    return remove(NOTE_STORE, id);
  }
};
