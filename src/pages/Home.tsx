import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FeatureCard } from '../components/cards/FeatureCard';
import { WorkflowCard } from '../components/cards/WorkflowCard';
import { SectionCard } from '../components/layout/SectionCard';
import { getFeatures, getMetadata, getWorkflows } from '../lib/content';
import type { Feature, Metadata, Workflow } from '../types/content';

export function HomePage() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    getMetadata().then(setMetadata);
    getFeatures().then((items) => setFeatures(items.slice(0, 4)));
    getWorkflows().then(setWorkflows);
  }, []);

  return (
    <div className="page-stack">
      <section className="hero">
        <p className="eyebrow">PeakFit companion</p>
        <h2>機能・用語・手順を整理して持ち歩ける PWA 雛形</h2>
        <p>
          PeakFit マニュアル由来の知識を、検索しやすい機能カタログとワークフローへ整理するためのスターターです。
        </p>
        <div className="hero-actions">
          <Link to="/search" className="primary-button">
            検索を始める
          </Link>
          <Link to="/about" className="secondary-button">
            プロジェクト方針を見る
          </Link>
        </div>
      </section>

      <SectionCard
        title="スターター状態"
        description="最初に編集するデータファイルと、今の収録状況"
      >
        <ul className="plain-list">
          <li>version: {metadata?.appVersion ?? '-'}</li>
          <li>content status: {metadata?.contentStatus ?? '-'}</li>
          <li>features: {features.length > 0 ? 'starter data loaded' : 'loading...'}</li>
        </ul>
      </SectionCard>

      <SectionCard
        title="主要機能"
        description="v1 で先に押さえると良いカテゴリ"
        action={
          <Link className="text-link" to="/search">
            すべて見る
          </Link>
        }
      >
        <div className="grid">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="用途別ワークフロー" description="対象分野別の導線">
        <div className="grid">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
