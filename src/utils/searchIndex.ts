import { countries } from '../data/countries';
import { datasets } from '../data/datasets';
import { events, learningResources, news, opportunities } from '../data/happenings';
import { organizations, people } from '../data/network';
import { publications } from '../data/publications';
import { useCases } from '../data/useCases';
import type { SearchRecord } from '../types';

function year(iso: string): number {
  return Number(iso.slice(0, 4));
}

const publicationRecords: SearchRecord[] = publications.map((p) => ({
  id: p.id,
  type: p.type,
  title: p.title,
  description: p.summary,
  href: `/publications/${p.slug}`,
  countries: p.countries,
  country: p.countries[0],
  topics: p.topics,
  organization: p.organization,
  year: year(p.date),
  date: p.date,
  matchedInDocument: p.id === 'pub-1',
  documentName: p.id === 'pub-1' ? 'ai-governance-and-accountability-south-asia.pdf' : undefined,
  matchSnippet: p.id === 'pub-1' ? 'Illustrative PDF text match: institutional accountability mechanisms for responsible artificial intelligence.' : undefined,
  keywords: [p.title, p.summary, p.authors.join(' '), p.organization, p.topics.join(' '), p.countries.join(' '), ...(p.id === 'pub-1' ? ['institutional accountability mechanisms responsible artificial intelligence'] : [])].
  join(' ').
  toLowerCase()
}));

const useCaseRecords: SearchRecord[] = useCases.map((u) => ({
  id: u.id,
  type: 'Use Case',
  title: u.title,
  description: u.summary,
  href: `/use-cases/${u.slug}`,
  country: u.country,
  countries: [u.country],
  topics: u.topics,
  sector: u.sector,
  organization: u.organization,
  organizationType: u.organizationType,
  dimensions: u.dimensions,
  ecosystemCategory: u.ecosystemCategory,
  year: year(u.lastUpdated),
  date: u.lastUpdated,
  keywords: [u.title, u.summary, u.country, u.sector, u.organization, u.dimensions.join(' '), u.topics.join(' ')].
  join(' ').
  toLowerCase()
}));

const datasetRecords: SearchRecord[] = datasets.map((d) => ({
  id: d.id,
  type: 'Dataset',
  title: d.title,
  description: d.description,
  href: `/datasets/${d.slug}`,
  countries: d.countries,
  country: d.countries[0],
  topics: d.topics,
  organization: d.maintainer,
  year: d.year,
  date: d.updated,
  keywords: [d.title, d.description, d.source, d.maintainer, d.topics.join(' '), d.countries.join(' ')].
  join(' ').
  toLowerCase()
}));

const personRecords: SearchRecord[] = people.map((p) => ({
  id: p.id,
  type: 'Person',
  title: p.name,
  description: `${p.role} · ${p.organization}`,
  href: `/people/${p.slug}`,
  country: p.country,
  countries: [p.country],
  topics: p.expertise.filter((e) => e.length > 0),
  organization: p.organization,
  year: 2026,
  keywords: [p.name, p.role, p.organization, p.country, p.expertise.join(' ')].join(' ').toLowerCase()
}));

const organizationRecords: SearchRecord[] = organizations.map((o) => ({
  id: o.id,
  type: 'Organization',
  title: o.name,
  description: o.description,
  href: `/organizations/${o.slug}`,
  country: o.country,
  countries: [o.country],
  topics: o.topics,
  organizationType: o.type,
  year: 2026,
  keywords: [o.name, o.abbr, o.description, o.type, o.country, o.topics.join(' ')].join(' ').toLowerCase()
}));

const eventRecords: SearchRecord[] = events.map((e) => ({
  id: e.id,
  type: 'Event',
  title: e.title,
  description: e.description,
  href: `/events/${e.slug}`,
  country: e.country,
  countries: [e.country],
  topics: e.topics,
  year: year(e.date),
  date: e.date,
  keywords: [e.title, e.description, e.location, e.type, e.topics.join(' '), e.country].join(' ').toLowerCase()
}));

const learningRecords: SearchRecord[] = learningResources.map((l) => ({
  id: l.id,
  type: 'Learning Resource',
  title: l.title,
  description: l.description,
  href: '/learning-resources',
  country: l.country,
  countries: [l.country],
  topics: l.topics,
  organization: l.provider,
  year: 2026,
  keywords: [l.title, l.description, l.provider, l.format, l.topics.join(' ')].join(' ').toLowerCase()
}));

const opportunityRecords: SearchRecord[] = opportunities.map((o) => ({
  id: o.id,
  type: 'Opportunity',
  title: o.title,
  description: o.description,
  href: `/opportunities#${o.id}`,
  topics: [],
  organization: o.organization,
  year: year(o.deadline),
  date: o.deadline,
  keywords: [o.title, o.description, o.organization, o.type, o.region].join(' ').toLowerCase()
}));

const newsRecords: SearchRecord[] = news.map((item) => ({
  id: item.id,
  type: 'News',
  title: item.title,
  description: item.description,
  href: `/news#${item.id}`,
  topics: [],
  year: year(item.date),
  date: item.date,
  keywords: [item.title, item.description, item.category].join(' ').toLowerCase()
}));

export const searchIndex: SearchRecord[] = [
...publicationRecords,
...useCaseRecords,
...datasetRecords,
...personRecords,
...organizationRecords,
...eventRecords,
...learningRecords,
...opportunityRecords,
...newsRecords];


export interface RepositoryFilters {
  query: string;
  countries: string[];
  contentTypes: string[];
  topics: string[];
  sectors: string[];
  dimensions: string[];
  ecosystem: string[];
  orgTypes: string[];
  years: string[];
}

export const emptyFilters: RepositoryFilters = {
  query: '',
  countries: [],
  contentTypes: [],
  topics: [],
  sectors: [],
  dimensions: [],
  ecosystem: [],
  orgTypes: [],
  years: []
};

function matchesList(values: string[] | undefined, selected: string[]): boolean {
  if (selected.length === 0) return true;
  if (!values || values.length === 0) return false;
  return selected.some((s) => values.includes(s));
}

export function filterRecords(filters: RepositoryFilters): SearchRecord[] {
  const q = filters.query.trim().toLowerCase();
  return searchIndex.filter((r) => {
    if (q && !r.keywords.includes(q)) return false;
    if (!matchesList(r.countries, filters.countries)) return false;
    if (!matchesList([r.type], filters.contentTypes)) return false;
    if (!matchesList(r.topics, filters.topics)) return false;
    if (!matchesList(r.sector ? [r.sector] : undefined, filters.sectors)) return false;
    if (!matchesList(r.dimensions, filters.dimensions)) return false;
    if (!matchesList(r.ecosystemCategory ? [r.ecosystemCategory] : undefined, filters.ecosystem)) return false;
    if (!matchesList(r.organizationType ? [r.organizationType] : undefined, filters.orgTypes)) return false;
    if (!matchesList([String(r.year)], filters.years)) return false;
    return true;
  });
}

export type SortKey = 'relevance' | 'newest' | 'oldest';

export function sortRecords(records: SearchRecord[], sort: SortKey): SearchRecord[] {
  const copy = [...records];
  if (sort === 'newest') return copy.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  if (sort === 'oldest') return copy.sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
  if (sort === 'relevance') return copy.sort((a, b) => b.year - a.year || (b.date ?? '').localeCompare(a.date ?? ''));
  return copy;
}

/** Groups quick search results by content family for the global search dropdown. */
export function groupQuickResults(query: string): {label: string;records: SearchRecord[];}[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits = searchIndex.filter((r) => r.keywords.includes(q));
  const groups: {label: string;match: (r: SearchRecord) => boolean;}[] = [
  { label: 'Publications', match: (r) => ['Report', 'Policy Brief', 'Research Brief', 'Innovation Brief', 'Mapping Study', 'Commentary'].includes(r.type) },
  { label: 'Use Cases', match: (r) => r.type === 'Use Case' },
  { label: 'Datasets', match: (r) => r.type === 'Dataset' },
  { label: 'People', match: (r) => r.type === 'Person' },
  { label: 'Organizations', match: (r) => r.type === 'Organization' },
  { label: 'Events', match: (r) => r.type === 'Event' },
  { label: 'Opportunities', match: (r) => r.type === 'Opportunity' },
  { label: 'News', match: (r) => r.type === 'News' }];

  return groups.
  map((g) => ({ label: g.label, records: hits.filter(g.match).slice(0, 3) })).
  filter((g) => g.records.length > 0);
}

export function countryMatchCount(countryName: string): number {
  return searchIndex.filter((r) => r.countries?.includes(countryName)).length;
}

export const allCountryNames = countries.map((c) => c.name);
