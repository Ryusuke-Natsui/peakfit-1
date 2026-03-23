export type FeatureCategory =
  | 'Peak Finding'
  | 'Baseline'
  | 'Preprocessing'
  | 'Modeling'
  | 'Fitting'
  | 'Validation'
  | 'Reporting';

export interface Feature {
  id: string;
  title: string;
  category: FeatureCategory | string;
  summary: string;
  whenToUse: string;
  pitfalls: string[];
  relatedFeatures: string[];
  manualRefs: string[];
  tags: string[];
}

export interface Workflow {
  id: string;
  title: string;
  targetDomain: 'spectroscopy' | 'chromatography' | 'electrophoresis' | string;
  summary: string;
  steps: string[];
  decisionPoints: string[];
  relatedFeatures: string[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  relatedTerms: string[];
  manualRefs: string[];
}

export interface Metadata {
  appTitle: string;
  appVersion: string;
  contentStatus: string;
  lastUpdated: string;
  notes: string[];
}

export interface SearchableItem {
  id: string;
  type: 'feature' | 'workflow' | 'glossary';
  title: string;
  excerpt: string;
  tags: string[];
  href: string;
}

export interface BookmarkItem {
  id: string;
  targetId: string;
  targetType: 'feature' | 'workflow' | 'glossary';
  title: string;
  createdAt: string;
}

export interface NoteItem {
  id: string;
  targetId: string;
  targetType: 'feature' | 'workflow' | 'glossary';
  title: string;
  text: string;
  updatedAt: string;
}
