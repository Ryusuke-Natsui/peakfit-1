import { useEffect, useState } from 'react';
import { SectionCard } from '../components/layout/SectionCard';
import { getGlossary } from '../lib/content';
import type { GlossaryTerm } from '../types/content';

export function GlossaryPage() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);

  useEffect(() => {
    getGlossary().then((items) =>
      setTerms([...items].sort((a, b) => a.term.localeCompare(b.term, 'en')))
    );
  }, []);

  return (
    <div className="page-stack">
      <SectionCard title="用語集" description="PeakFit 周辺の基本用語のスターター">
        <div className="list-stack">
          {terms.map((term) => (
            <article key={term.term} className="item-card compact">
              <h3>{term.term}</h3>
              <p>{term.definition}</p>
              <div className="tag-list">
                {term.relatedTerms.map((item) => (
                  <span className="tag" key={`${term.term}-${item}`}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
