import { Link } from 'react-router-dom';
import type { Workflow } from '../../types/content';

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <article className="item-card">
      <div className="item-card-meta">
        <span className="pill">{workflow.targetDomain}</span>
      </div>
      <h3>
        <Link to={`/workflow/${workflow.id}`}>{workflow.title}</Link>
      </h3>
      <p>{workflow.summary}</p>
    </article>
  );
}
