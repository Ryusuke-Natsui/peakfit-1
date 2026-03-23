import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SectionCard } from '../components/layout/SectionCard';
import { useBookmarks } from '../hooks/useBookmarks';
import { useNotes } from '../hooks/useNotes';
import { getWorkflows } from '../lib/content';
import type { Workflow } from '../types/content';

export function WorkflowDetailPage() {
  const { id = '' } = useParams();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [noteText, setNoteText] = useState('');
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { getNoteFor, upsertNote } = useNotes();

  useEffect(() => {
    getWorkflows().then(setWorkflows);
  }, []);

  const workflow = useMemo(() => workflows.find((item) => item.id === id), [workflows, id]);

  useEffect(() => {
    const existingNote = getNoteFor(id);
    setNoteText(existingNote?.text ?? '');
  }, [getNoteFor, id]);

  if (!workflow) {
    return (
      <section className="section-card">
        <h2>ワークフローが見つかりません</h2>
        <p className="muted">ID: {id}</p>
      </section>
    );
  }

  return (
    <div className="page-stack">
      <SectionCard
        title={workflow.title}
        description={workflow.targetDomain}
        action={
          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              toggleBookmark({
                targetId: workflow.id,
                targetType: 'workflow',
                title: workflow.title
              })
            }
          >
            {isBookmarked(workflow.id) ? '保存解除' : '保存'}
          </button>
        }
      >
        <p>{workflow.summary}</p>
      </SectionCard>

      <SectionCard title="手順">
        <ol className="number-list">
          {workflow.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="判断ポイント">
        <ul className="plain-list">
          {workflow.decisionPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="関連機能">
        <div className="tag-list">
          {workflow.relatedFeatures.map((related) => (
            <Link key={related} className="tag-link" to={`/feature/${related}`}>
              {related}
            </Link>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="個人メモ" description="ローカルに保存されます">
        <textarea
          className="note-textarea"
          value={noteText}
          onChange={(event) => setNoteText(event.target.value)}
          placeholder="実務上の注意点や観察結果をメモする"
          rows={6}
        />
        <div className="inline-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() =>
              upsertNote({
                targetId: workflow.id,
                targetType: 'workflow',
                title: workflow.title,
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
