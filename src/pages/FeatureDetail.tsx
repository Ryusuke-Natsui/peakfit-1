import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SectionCard } from '../components/layout/SectionCard';
import { useBookmarks } from '../hooks/useBookmarks';
import { useNotes } from '../hooks/useNotes';
import { getFeatures } from '../lib/content';
import type { Feature } from '../types/content';

export function FeatureDetailPage() {
  const { id = '' } = useParams();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [noteText, setNoteText] = useState('');
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { getNoteFor, upsertNote } = useNotes();

  useEffect(() => {
    getFeatures().then(setFeatures);
  }, []);

  const feature = useMemo(() => features.find((item) => item.id === id), [features, id]);

  useEffect(() => {
    const existingNote = getNoteFor(id);
    setNoteText(existingNote?.text ?? '');
  }, [getNoteFor, id]);

  if (!feature) {
    return (
      <section className="section-card">
        <h2>機能が見つかりません</h2>
        <p className="muted">ID: {id}</p>
      </section>
    );
  }

  return (
    <div className="page-stack">
      <SectionCard
        title={feature.title}
        description={feature.category}
        action={
          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              toggleBookmark({
                targetId: feature.id,
                targetType: 'feature',
                title: feature.title
              })
            }
          >
            {isBookmarked(feature.id) ? '保存解除' : '保存'}
          </button>
        }
      >
        <p>{feature.summary}</p>
      </SectionCard>

      <SectionCard title="いつ使うか">
        <p>{feature.whenToUse}</p>
      </SectionCard>

      <SectionCard title="注意点">
        <ul className="plain-list">
          {feature.pitfalls.map((pitfall) => (
            <li key={pitfall}>{pitfall}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="関連機能">
        <div className="tag-list">
          {feature.relatedFeatures.map((related) => (
            <Link key={related} className="tag-link" to={`/feature/${related}`}>
              {related}
            </Link>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="マニュアル参照">
        <ul className="plain-list">
          {feature.manualRefs.map((ref) => (
            <li key={ref}>{ref}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="個人メモ" description="ローカルに保存されます">
        <textarea
          className="note-textarea"
          value={noteText}
          onChange={(event) => setNoteText(event.target.value)}
          placeholder="自分向けメモを残す"
          rows={6}
        />
        <div className="inline-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() =>
              upsertNote({
                targetId: feature.id,
                targetType: 'feature',
                title: feature.title,
                text: noteText
              })
            }
          >
            メモを保存
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
