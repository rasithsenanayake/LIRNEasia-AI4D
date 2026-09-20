import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import { UniversalSearch } from '../components/home/UniversalSearch';
import { ExploreRegion } from '../components/home/ExploreRegion';
import { TopicsGrid } from '../components/home/TopicsGrid';
import { DataSpotlight } from '../components/home/DataSpotlight';
import { NewsletterSignup } from '../components/content/NewsletterSignup';
import { Container, SectionHeading } from '../components/ui/Primitives';
import { LinkButton } from '../components/ui/Button';
import { PublicationCard } from '../components/cards/PublicationCard';
import { DatasetCard } from '../components/cards/DatasetCard';
import { UseCaseCard } from '../components/cards/UseCaseCard';
import { PersonCard } from '../components/cards/PersonCard';
import { OrganizationCard } from '../components/cards/OrganizationCard';
import { EventCard } from '../components/cards/EventCard';
import { OpportunityCard } from '../components/cards/OpportunityCard';
import { ResourceCard } from '../components/cards/ResourceCard';
import { publications } from '../data/publications';
import { datasets } from '../data/datasets';
import { useCases } from '../data/useCases';
import { organizations, partners, people } from '../data/network';
import { events, opportunities } from '../data/happenings';
import { searchIndex } from '../utils/searchIndex';

export function Home() {
  const featured = publications[0];
  const latest = searchIndex.
  filter((r) => ['Report', 'Policy Brief', 'Research Brief', 'Innovation Brief', 'Mapping Study'].includes(r.type)).
  sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '')).
  slice(0, 5);
  const upcoming = events.filter((e) => e.status === 'upcoming').slice(0, 3);
  const openOpportunities = opportunities.filter((o) => !o.expired).slice(0, 3);

  return (
    <>
      <Hero />
      <UniversalSearch />
      <ExploreRegion />

      {/* Featured knowledge */}
      <section aria-labelledby="featured-heading" className="bg-canvas">
        <Container className="py-16 lg:py-20">
          <SectionHeading
            id="featured-heading"
            eyebrow="Featured knowledge"
            title="Selected by the editorial team"
            description="A mix of long-form research, policy-facing briefs, open data and documented practice." />
          
          <PublicationCard publication={featured} featured />
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            <li>
              <PublicationCard publication={publications[1]} />
            </li>
            <li>
              <DatasetCard dataset={datasets[0]} />
            </li>
            <li>
              <PublicationCard publication={publications[2]} />
            </li>
          </ul>
        </Container>
      </section>

      {/* Responsible AI in practice */}
      <section aria-labelledby="practice-heading" className="border-y border-line bg-surface">
        <Container className="py-16 lg:py-20">
          <SectionHeading
            id="practice-heading"
            eyebrow="Responsible AI in practice"
            title="Documented initiatives, not press releases"
            description="Each use case records what the system does, what safeguards were adopted and what independent reviewers found."
            action={
            <LinkButton to="/explore?type=Use%20Case" variant="secondary">
                Explore all use cases
              </LinkButton>
            } />
          
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {useCases.slice(0, 3).map((u) =>
            <li key={u.id}>
                <UseCaseCard useCase={u} />
              </li>
            )}
          </ul>
        </Container>
      </section>

      <TopicsGrid />

      {/* Latest research */}
      <section aria-labelledby="latest-heading" className="border-y border-line bg-surface">
        <Container className="py-16 lg:py-20">
          <SectionHeading
            id="latest-heading"
            eyebrow="Latest research"
            title="Recently published"
            action={
            <LinkButton to="/explore?type=Report" variant="secondary">
                View all research
              </LinkButton>
            } />
          
          <div className="rounded-lg border border-line bg-canvas px-5 py-1 sm:px-6">
            {latest.map((r) =>
            <ResourceCard key={r.id} record={r} view="list" />
            )}
          </div>
        </Container>
      </section>

      <DataSpotlight />

      {/* Network */}
      <section aria-labelledby="network-heading" className="bg-canvas">
        <Container className="py-16 lg:py-20">
          <SectionHeading
            id="network-heading"
            eyebrow="The network"
            title="The people and institutions behind the evidence"
            description="Profiles are illustrative placeholders in this prototype. In production, every profile links to that person's publications, projects and events."
            action={
            <LinkButton to="/people" variant="secondary">
                Explore the network
              </LinkButton>
            } />
          
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-meta font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Researchers and experts
              </h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {people.slice(0, 4).map((p) =>
                <li key={p.id}>
                    <PersonCard person={p} />
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-meta font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Organizations
              </h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {organizations.slice(0, 4).map((o) =>
                <li key={o.id}>
                    <OrganizationCard organization={o} />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Events & opportunities */}
      <section aria-labelledby="events-heading" className="border-y border-line bg-surface">
        <Container className="py-16 lg:py-20">
          <h2 id="events-heading" className="sr-only">
            Events and opportunities
          </h2>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-5 flex items-end justify-between gap-4">
                <h3 className="font-serif text-2xl leading-tight text-ink">Upcoming events</h3>
                <LinkButton to="/events" variant="ghost" size="sm">
                  All events
                  <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </LinkButton>
              </div>
              <ul className="space-y-3">
                {upcoming.map((e) =>
                <li key={e.id}>
                    <EventCard event={e} />
                  </li>
                )}
              </ul>
            </div>
            <div>
              <div className="mb-5 flex items-end justify-between gap-4">
                <h3 className="font-serif text-2xl leading-tight text-ink">Opportunities</h3>
                <LinkButton to="/opportunities" variant="ghost" size="sm">
                  All opportunities
                  <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </LinkButton>
              </div>
              <ul className="space-y-3">
                {openOpportunities.map((o) =>
                <li key={o.id}>
                    <OpportunityCard opportunity={o} />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <NewsletterSignup />

      {/* Partners */}
      <section aria-labelledby="partners-heading" className="bg-canvas">
        <Container className="py-16">
          <h2 id="partners-heading" className="font-serif text-2xl leading-tight text-ink">
            Partners and funders
          </h2>
          <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p) =>
            <li key={p.id} className="border-t border-line pt-4">
                <p className="text-[1.0625rem] font-semibold text-ink">{p.name}</p>
                <p className="mt-0.5 text-meta font-medium text-accent">{p.role}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{p.description}</p>
              </li>
            )}
          </ul>
          <p className="mt-8">
            <LinkButton to="/partners" variant="secondary">
              About our partners
            </LinkButton>
          </p>
        </Container>
      </section>
    </>);

}