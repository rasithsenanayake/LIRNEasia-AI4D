import { notFound } from 'next/navigation';
import { SectionPlaceholder } from '../../views/SectionPlaceholder';
import { ResearchLanding } from '../../views/ResearchLanding';
import { AboutPage } from '../../views/AboutPage';
import { NewsPage } from '../../views/NewsPage';
import { EventsPage } from '../../views/EventsPage';
import { EventDetailPage } from '../../views/EventDetailPage';
import { OrganizationDetailPage, OrganizationsPage, PeoplePage, PersonDetailPage } from '../../views/NetworkDirectoryPages';
import { LearningResourcesPage, OpportunitiesPage } from '../../views/ResourcePages';
import { ContactPage, NewsletterPage, PartnersPage } from '../../views/PublicInfoPages';
import { events } from '../../data/happenings';
import { organizations, people } from '../../data/network';

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
  , 'news'
]);

const DETAIL_SECTIONS = new Set(['topics', 'datasets', 'people', 'organizations', 'events']);

function isPlaceholderRoute(slug: string[] | undefined) {
  if (!slug || slug.length === 0 || slug.length > 2 || !ROOT_SECTIONS.has(slug[0])) return false;
  return slug.length === 1 || DETAIL_SECTIONS.has(slug[0]);
}

export default async function PlaceholderRoute({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  if (!isPlaceholderRoute(slug)) notFound();
  if (slug?.length === 1 && slug[0] === 'research') return <ResearchLanding />;
  if (slug?.length === 1 && slug[0] === 'about') return <AboutPage />;
  if (slug?.length === 1 && slug[0] === 'news') return <NewsPage />;
  if (slug?.length === 1 && slug[0] === 'events') return <EventsPage />;
  if (slug?.length === 1 && slug[0] === 'people') return <PeoplePage />;
  if (slug?.length === 1 && slug[0] === 'organizations') return <OrganizationsPage />;
  if (slug?.length === 1 && slug[0] === 'opportunities') return <OpportunitiesPage />;
  if (slug?.length === 1 && slug[0] === 'learning-resources') return <LearningResourcesPage />;
  if (slug?.length === 1 && slug[0] === 'partners') return <PartnersPage />;
  if (slug?.length === 1 && slug[0] === 'newsletter') return <NewsletterPage />;
  if (slug?.length === 1 && slug[0] === 'contact') return <ContactPage />;
  if (slug?.length === 2 && slug[0] === 'events') {
    const event = events.find((item) => item.slug === slug[1]);
    if (!event) notFound();
    return <EventDetailPage event={event} />;
  }
  if (slug?.length === 2 && slug[0] === 'people') {
    const person = people.find((item) => item.slug === slug[1]);
    if (!person) notFound();
    return <PersonDetailPage person={person} />;
  }
  if (slug?.length === 2 && slug[0] === 'organizations') {
    const organization = organizations.find((item) => item.slug === slug[1]);
    if (!organization) notFound();
    return <OrganizationDetailPage organization={organization} />;
  }
  return <SectionPlaceholder />;
}
