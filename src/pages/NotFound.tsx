import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="section-card">
      <h2>ページが見つかりません</h2>
      <p className="muted">URL を確認するか、ホームへ戻ってください。</p>
      <Link className="text-link" to="/">
        ホームへ戻る
      </Link>
    </section>
  );
}
