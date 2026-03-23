import { BookmarkCard } from '../components/cards/BookmarkCard';
import { SectionCard } from '../components/layout/SectionCard';
import { useBookmarks } from '../hooks/useBookmarks';
import { useNotes } from '../hooks/useNotes';
import { formatDateTime } from '../lib/utils';

export function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  const { notes } = useNotes();

  return (
    <div className="page-stack">
      <SectionCard title="保存した項目" description="IndexedDB にローカル保存されます">
        <div className="list-stack">
          {bookmarks.map((item) => (
            <BookmarkCard key={item.id} item={item} />
          ))}
          {!bookmarks.length ? <p className="empty-state">まだ保存した項目はありません。</p> : null}
        </div>
      </SectionCard>

      <SectionCard title="最近のメモ" description="ローカルノートの一覧">
        <div className="list-stack">
          {notes.map((note) => (
            <article key={note.id} className="item-card compact">
              <div className="item-card-meta">
                <span className="pill">{note.targetType}</span>
              </div>
              <h3>{note.title}</h3>
              <p className="pre-wrap">{note.text}</p>
              <p className="muted">更新: {formatDateTime(note.updatedAt)}</p>
            </article>
          ))}
          {!notes.length ? <p className="empty-state">まだメモはありません。</p> : null}
        </div>
      </SectionCard>
    </div>
  );
}
