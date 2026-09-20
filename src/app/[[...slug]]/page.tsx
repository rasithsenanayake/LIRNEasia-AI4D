import { notFound } from 'next/navigation';
import { SectionPlaceholder } from '../../views/SectionPlaceholder';

const ROOT_SECTIONS = new Set([
  'topics',
  'research',
  'datasets',
  'people',
  'organizations',
  'events',
  'opportunities',
  'learning-resources',
  'newsletter',
  'partners',
  'about',
  'contact',
  'accessibility',
  'privacy'
]);

const DETAIL_SECTIONS = new Set(['topics', 'datasets', 'people', 'organizations', 'events']);

function isPlaceholderRoute(slug: string[] | undefined) {
  if (!slug || slug.length === 0 || slug.length > 2 || !ROOT_SECTIONS.has(slug[0])) return false;
  return slug.length === 1 || DETAIL_SECTIONS.has(slug[0]);
}

export default async function PlaceholderRoute({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  if (!isPlaceholderRoute(slug)) notFound();
  return <SectionPlaceholder />;
}
