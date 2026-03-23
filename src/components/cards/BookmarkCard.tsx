import { Link } from 'react-router-dom';
import type { BookmarkItem } from '../../types/content';
import { formatDateTime } from '../../lib/utils';

function hrefFor(item: BookmarkItem): string {
  if (item.targetType === 'feature') return `/feature/${item.targetId}`;
  if (item.targetType === 'workflow') return `/workflow/${item.targetId}`;
  return '/glossary';
}

export function BookmarkCard({ item }: { item: BookmarkItem }) {
  return (
    <article className="item-card">
      <div className="item-card-meta">
        <span className="pill">{item.targetType}</span>
      </div>
      <h3>
        <Link to={hrefFor(item)}>{item.title}</Link>
      </h3>
      <p className="muted">保存日時: {formatDateTime(item.createdAt)}</p>
    </article>
  );
}
