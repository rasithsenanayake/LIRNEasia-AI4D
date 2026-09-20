import type { Dataset } from '../types';

/** Illustrative dataset records for prototype evaluation. */
export const datasets: Dataset[] = [
{
  id: 'ds-1',
  slug: 'regional-ai-policy-tracker',
  title: 'Regional AI policy tracker',
  description:
  'Structured record of national AI strategies, guidelines and draft regulation across nineteen countries in South and Southeast Asia, with status and responsible institution.',
  countries: ['Sri Lanka', 'India', 'Bangladesh', 'Indonesia', 'Viet Nam', 'Philippines'],
  topics: ['AI Governance', 'Data Governance'],
  year: 2026,
  format: 'CSV, JSON',
  source: 'Observatory policy research team',
  access: 'Open',
  updated: '2026-08-30',
  coverage: '19 countries · 2018–2026',
  maintainer: 'LIRNEasia',
  licence: 'Placeholder licence — to be confirmed (CC BY 4.0 proposed)'
},
{
  id: 'ds-2',
  slug: 'language-coverage-benchmark',
  title: 'Language coverage benchmark for regional models',
  description:
  'Evaluation results for a fixed prompt set across South and Southeast Asian languages, recording coverage and task performance by language.',
  countries: ['Bangladesh', 'Indonesia', 'Nepal', 'Sri Lanka'],
  topics: ['Inclusion', 'Responsible Innovation'],
  year: 2025,
  format: 'CSV',
  source: 'Dhaka Centre for Technology and Society',
  access: 'Open',
  updated: '2025-12-04',
  coverage: '12 languages · single evaluation round',
  maintainer: 'Dhaka Centre for Technology and Society',
  licence: 'Placeholder licence — to be confirmed'
},
{
  id: 'ds-3',
  slug: 'ai-ecosystem-organisation-register',
  title: 'AI ecosystem organisation register',
  description:
  'Register of organisations active in regional AI ecosystems, classified by type, country and ecosystem function.',
  countries: ['India', 'Singapore', 'Thailand', 'Malaysia', 'Viet Nam'],
  topics: ['AI Ecosystem', 'AI Readiness'],
  year: 2026,
  format: 'CSV, API',
  source: 'South Asia Technology Observatory',
  access: 'Registration required',
  updated: '2026-07-15',
  coverage: '19 countries · annual refresh',
  maintainer: 'South Asia Technology Observatory',
  licence: 'Placeholder licence — to be confirmed'
},
{
  id: 'ds-4',
  slug: 'public-sector-deployment-register',
  title: 'Public-sector AI deployment register',
  description:
  'Documented deployments of AI systems in public services, including sector, status, oversight arrangement and disclosure level.',
  countries: ['Viet Nam', 'Sri Lanka', 'Indonesia', 'Philippines'],
  topics: ['AI Governance', 'AI Readiness'],
  year: 2026,
  format: 'CSV, JSON',
  source: 'Observatory country research teams',
  access: 'Open',
  updated: '2026-09-02',
  coverage: '19 countries · rolling updates',
  maintainer: 'LIRNEasia',
  licence: 'Placeholder licence — to be confirmed'
}];


export const datasetBySlug = (slug: string): Dataset | undefined => datasets.find((d) => d.slug === slug);
export const datasetById = (id: string): Dataset | undefined => datasets.find((d) => d.id === id);