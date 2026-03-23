import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchInput } from '../components/search/SearchInput';
import { getAllSearchableItems } from '../lib/content';
import { searchItems } from '../lib/search';
import type { SearchableItem } from '../types/content';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<SearchableItem[]>([]);

  useEffect(() => {
    getAllSearchableItems().then(setItems);
  }, []);

  const results = useMemo(() => searchItems(items, query), [items, query]);

  return (
    <div className="page-stack">
      <section className="section-card">
        <h2>検索</h2>
        <p className="muted">機能、ワークフロー、用語をまとめて検索できます。</p>
        <SearchInput value={query} onChange={setQuery} />
      </section>

      <section className="section-card">
        <div className="section-card-header">
          <h2>結果</h2>
          <p className="muted">{results.length} 件</p>
        </div>

        <div className="list-stack">
          {results.map((item) => (
            <article key={`${item.type}-${item.id}`} className="item-card compact">
              <div className="item-card-meta">
                <span className="pill">{item.type}</span>
              </div>
              <h3>
                <Link to={item.href}>{item.title}</Link>
              </h3>
              <p>{item.excerpt}</p>
              <div className="tag-list">
                {item.tags.map((tag) => (
                  <span key={`${item.id}-${tag}`} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}

          {!results.length ? <p className="empty-state">一致する項目がありません。</p> : null}
        </div>
      </section>
    </div>
  );
}
