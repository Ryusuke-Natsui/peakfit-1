# PeakFit Companion

PeakFit の機能・用語・ワークフローを整理して参照できる、GitHub Pages 向けの PWA 雛形です。

## このプロジェクトの位置づけ

このアプリは **PeakFit 本体の再実装** ではなく、PeakFit の使い方や機能理解を補助する **companion PWA** です。

- 機能カタログ
- ワークフロー案内
- 用語集
- 検索
- ブックマーク
- メモ
- オフライン参照

## 著作権とコンテンツ方針

このリポジトリには **PeakFit マニュアル本文そのもの** を含めない想定です。  
公開リポジトリに載せるのは次のようなものに限定してください。

- 自作の要約
- 自作の UI / コード
- ページ番号や節番号などの参照情報
- 最低限の引用ルールに収まる短い説明

実際の PeakFit マニュアル PDF を扱うときは、権利条件を確認した上で、必要なら非公開リポジトリまたはローカル運用に寄せてください。

## セットアップ

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
npm run preview
```

## GitHub Pages への公開

このプロジェクトには `.github/workflows/deploy.yml` が含まれています。  
GitHub に push して Pages を有効化すると、自動で build と deploy を行います。

### リポジトリ名配下で公開する場合

GitHub Actions 側で `VITE_BASE_PATH` を自動設定しています。  
通常は追加設定なしで `https://<user>.github.io/<repo>/` に対応できます。

## 最初に編集する場所

- `public/data/features.json`
- `public/data/workflows.json`
- `public/data/glossary.json`
- `public/data/metadata.json`

ここに PeakFit マニュアルをもとにした自作要約を足していくと、アプリの中身が増えていきます。

## ディレクトリ構成

```text
peakfit-companion/
├─ .github/workflows/deploy.yml
├─ public/
│  ├─ data/
│  ├─ icons/
│  ├─ 404.html
│  ├─ manifest.webmanifest
│  └─ sw.js
├─ src/
│  ├─ app/
│  ├─ components/
│  ├─ hooks/
│  ├─ lib/
│  ├─ pages/
│  ├─ styles/
│  ├─ types/
│  ├─ main.tsx
│  └─ sw.ts
├─ index.html
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## 次の実装候補

- マニュアル PDF のページ番号マッピング強化
- カテゴリ別のおすすめ手順
- ローカル全文検索の強化
- PDF 参照リンク統合
- UI 多言語化
