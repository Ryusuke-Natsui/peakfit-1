import { SectionCard } from '../components/layout/SectionCard';

export function AboutPage() {
  return (
    <div className="page-stack">
      <SectionCard title="この PWA について">
        <p>
          PeakFit Companion は、PeakFit マニュアルの内容をそのまま転載するのではなく、
          自作の要約・構造化データ・参照導線として整理するための companion PWA です。
        </p>
      </SectionCard>

      <SectionCard title="おすすめの育て方">
        <ol className="number-list">
          <li>マニュアルを章ごとに読み、機能ごとの summary / whenToUse / pitfalls を整理する</li>
          <li>manualRefs にページ番号や節番号を入れる</li>
          <li>実務でよく使う順に workflows を増やす</li>
          <li>保存したい注意点を Notes で蓄積する</li>
        </ol>
      </SectionCard>

      <SectionCard title="公開リポジトリで避けること">
        <ul className="plain-list">
          <li>マニュアル PDF 本文そのものの同梱</li>
          <li>長文転載</li>
          <li>画面スクリーンショットの大量転載</li>
        </ul>
      </SectionCard>
    </div>
  );
}
