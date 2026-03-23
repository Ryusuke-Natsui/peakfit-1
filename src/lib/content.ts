import type { Feature, GlossaryTerm, Metadata, SearchableItem, Workflow } from '../types/content';

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path}`.replace(/\/{2,}/g, '/');

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(withBase(path));

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json() as Promise<T>;
}

export const getFeatures = (): Promise<Feature[]> => fetchJson<Feature[]>('data/features.json');
export const getWorkflows = (): Promise<Workflow[]> => fetchJson<Workflow[]>('data/workflows.json');
export const getGlossary = (): Promise<GlossaryTerm[]> => fetchJson<GlossaryTerm[]>('data/glossary.json');
export const getMetadata = (): Promise<Metadata> => fetchJson<Metadata>('data/metadata.json');

export async function getAllSearchableItems(): Promise<SearchableItem[]> {
  const [features, workflows, glossary] = await Promise.all([
    getFeatures(),
    getWorkflows(),
    getGlossary()
  ]);

  return [
    ...features.map((item) => ({
      id: item.id,
      type: 'feature' as const,
      title: item.title,
      excerpt: item.summary,
      tags: item.tags,
      href: `/feature/${item.id}`
    })),
    ...workflows.map((item) => ({
      id: item.id,
      type: 'workflow' as const,
      title: item.title,
      excerpt: item.summary,
      tags: [item.targetDomain, ...item.relatedFeatures],
      href: `/workflow/${item.id}`
    })),
    ...glossary.map((item) => ({
      id: item.term,
      type: 'glossary' as const,
      title: item.term,
      excerpt: item.definition,
      tags: item.relatedTerms,
      href: '/glossary'
    }))
  ];
}
