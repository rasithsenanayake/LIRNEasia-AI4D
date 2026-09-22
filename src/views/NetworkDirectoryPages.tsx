import { Building2, Globe2, MapPin, UserRound } from 'lucide-react';
import { Breadcrumbs, Container, DemoDataNote, SectionHeading } from '../components/ui/Primitives';
import { ExternalButton, LinkButton } from '../components/ui/Button';
import { OrganizationCard } from '../components/cards/OrganizationCard';
import { PersonCard } from '../components/cards/PersonCard';
import { Tag } from '../components/ui/Tag';
import { organizations, people } from '../data/network';
import type { Organization, Person } from '../types';

export function PeoplePage() {
  return <Container className="py-12">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'People & experts' }]} />
    <div className="mt-6">
      <SectionHeading eyebrow="Network" title="People and experts" description="Find researchers, practitioners and policy advisers contributing evidence across the region." />
      <DemoDataNote className="-mt-2 mb-8">The profiles below are fictional placeholders for prototype evaluation.</DemoDataNote>
      <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted"><UserRound className="h-4 w-4 text-accent" aria-hidden="true" />{people.length} profiles in the preview directory</div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{people.map((person) => <PersonCard key={person.id} person={person} />)}</div>
    </div>
  </Container>;
}

export function OrganizationsPage() {
  return <Container className="py-12">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Organizations' }]} />
    <div className="mt-6">
      <SectionHeading eyebrow="Network" title="Organizations" description="Browse the institutions, public bodies and networks represented in the observatory’s evidence base." />
      <DemoDataNote className="-mt-2 mb-8">The organizations below are illustrative composites for prototype evaluation.</DemoDataNote>
      <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted"><Building2 className="h-4 w-4 text-accent" aria-hidden="true" />{organizations.length} organizations in the preview directory</div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{organizations.map((organization) => <OrganizationCard key={organization.id} organization={organization} />)}</div>
    </div>
  </Container>;
}

export function PersonDetailPage({ person }: { person: Person }) {
  return <Container className="py-12">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'People & experts', to: '/people' }, { label: person.name }]} />
    <article className="mt-8 max-w-3xl">
      <div className="flex items-start gap-4">
        <span aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent-wash font-serif text-xl font-semibold text-accent-dark">{person.initials}</span>
        <div><p className="text-meta font-semibold uppercase tracking-[0.09em] text-accent">Expert profile</p><h1 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">{person.name}</h1><p className="mt-2 text-base text-ink-soft">{person.role} · {person.organization}</p></div>
      </div>
      <div className="mt-8 flex items-center gap-2 text-sm text-ink-muted"><MapPin className="h-4 w-4 text-accent" aria-hidden="true" />{person.country}</div>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">{person.bio}</p>
      <section aria-labelledby="expertise-heading" className="mt-8 border-t border-line pt-6"><h2 id="expertise-heading" className="text-base font-semibold text-ink">Areas of expertise</h2><div className="mt-3 flex flex-wrap gap-2">{person.expertise.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div></section>
      <DemoDataNote className="mt-8">Publications, projects and event relationships are not connected in this preview.</DemoDataNote>
      <div className="mt-6"><LinkButton to="/people" variant="secondary">Back to people</LinkButton></div>
    </article>
  </Container>;
}

export function OrganizationDetailPage({ organization }: { organization: Organization }) {
  return <Container className="py-12">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Organizations', to: '/organizations' }, { label: organization.name }]} />
    <article className="mt-8 max-w-3xl">
      <div className="flex items-start gap-4"><span aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded border border-line bg-raised text-sm font-bold tracking-wide text-ink-soft">{organization.abbr}</span><div><p className="text-meta font-semibold uppercase tracking-[0.09em] text-accent">Organization profile</p><h1 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">{organization.name}</h1><p className="mt-2 text-base text-ink-soft">{organization.type}</p></div></div>
      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted"><span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" aria-hidden="true" />{organization.country}</span>{organization.website && <span className="inline-flex items-center gap-2"><Globe2 className="h-4 w-4 text-accent" aria-hidden="true" />Website available</span>}</div>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">{organization.description}</p>
      <section aria-labelledby="organization-topics-heading" className="mt-8 border-t border-line pt-6"><h2 id="organization-topics-heading" className="text-base font-semibold text-ink">Areas represented</h2><div className="mt-3 flex flex-wrap gap-2">{organization.topics.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div></section>
      <DemoDataNote className="mt-8">People, initiatives, publications and events are not linked to this preview profile yet.</DemoDataNote>
      <div className="mt-6 flex flex-wrap gap-3"><LinkButton to="/organizations" variant="secondary">Back to organizations</LinkButton>{organization.website && <ExternalButton href={organization.website}>Visit website</ExternalButton>}</div>
    </article>
  </Container>;
}
