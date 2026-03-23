import { Link } from 'react-router-dom';
import type { Feature } from '../../types/content';

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="item-card">
      <div className="item-card-meta">
        <span className="pill">{feature.category}</span>
      </div>
      <h3>
        <Link to={`/feature/${feature.id}`}>{feature.title}</Link>
      </h3>
      <p>{feature.summary}</p>
      <div className="tag-list">
        {feature.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
