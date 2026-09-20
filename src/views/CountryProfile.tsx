import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Breadcrumbs, Container, DemoDataNote, EmptyState, MetricCard, SectionHeading } from '../components/ui/Primitives';
import { ChartFigure } from '../components/charts/ChartFigure';
import { UseCaseCard } from '../components/cards/UseCaseCard';
import { PublicationCard } from '../components/cards/PublicationCard';
import { OrganizationCard } from '../components/cards/OrganizationCard';
import { PersonCard } from '../components/cards/PersonCard';
import { DatasetCard } from '../components/cards/DatasetCard';
import { EventCard } from '../components/cards/EventCard';
import { LinkButton } from '../components/ui/Button';
import { NotFound } from './NotFound';
import { countryBySlug } from '../data/countries';
import { useCases } from '../data/useCases';
import { publications } from '../data/publications';
import { datasets } from '../data/datasets';
import { organizations, people } from '../data/network';
import { events } from '../data/happenings';
import { Link } from '../components/ui/Link';

export function CountryProfile({ slug }: { slug: string }) {
  const country = countryBySlug(slug);
  if (!country) return <NotFound />;

  const name = country.name;
  const countryUseCases = useCases.filter((u) => u.country === name);
  const countryPublications = publications.filter((p) => p.countries.includes(name));
  const countryOrganizations = organizations.filter((o) => o.country === name);
  const countryPeople = people.filter((p) => p.country === name);
  const countryDatasets = datasets.filter((d) => d.countries.includes(name));
  const countryEvents = events.filter((e) => e.country === name);

  const exploreLink = `/explore?country=${encodeURIComponent(name)}`;

  return (
    <>
      {/* Country hero */}
      <div className="border-b border-line bg-surface">
        <Container className="py-10 lg:py-12">
          <Breadcrumbs
            items={[
            { label: 'Home', to: '/' },
            { label: 'Explore', to: '/explore' },
            { label: 'Countries', to: '/countries' },
            { label: name }]
            } />
          
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="text-meta font-semibold uppercase tracking-[0.1em] text-accent">{country.subregion}</p>
              <h1 className="mt-3 font-serif text-[2rem] leading-tight text-ink sm:text-[2.75rem]">
                {name} — Responsible AI Landscape
              </h1>
              <p className="mt-4 max-w-2xl text-[1.125rem] leading-relaxed text-ink-soft">{country.overview}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <LinkButton to={exploreLink}>All {name} resources</LinkButton>
                <LinkButton to="/data-maps" variant="secondary">
                  Compare in Data &amp; Maps
                </LinkButton>
              </div>
            </div>
            <div>
              <h2 className="text-meta font-semibold uppercase tracking-[0.08em] text-ink-muted">
                What the Observatory holds
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {[
                ['Use cases', country.metrics.useCases],
                ['Publications', country.metrics.publications],
                ['Organizations', country.metrics.organizations],
                ['Experts', country.metrics.experts],
                ['Datasets', country.metrics.datasets]].
                map(([label, value]) =>
                <li key={String(label)}>
                    <MetricCard label={String(label)} value={value as number} />
                  </li>
                )}
              </ul>
              <DemoDataNote className="mt-4" />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-14">
        {/* AI landscape */}
        <section aria-labelledby="landscape-heading" className="mb-16">
          <SectionHeading
            id="landscape-heading"
            eyebrow="AI landscape"
            title={`Indicators for ${name}`}
            description="Client-supplied indicators are shown as a chart with an accessible table alternative, each carrying its own source and update date." />
          
          <ChartFigure
            title={`${name} — AI ecosystem indicators`}
            description="Composite indicators covering policy maturity, capacity, connectivity and documented public-sector deployments."
            data={country.indicators.map((i) => ({ label: i.label, value: i.value, note: i.note }))}
            unit="Indicator value"
            max={100}
            source="Observatory indicator set (demonstration data)"
            updated="30 August 2026"
            methodologyHref="/data-maps#methodology" />
          
        </section>

        {/* Use cases */}
        <section aria-labelledby="uc-heading" className="mb-16">
          <SectionHeading
            id="uc-heading"
            eyebrow="Responsible AI in practice"
            title={`Initiatives documented in ${name}`}
            action={
            <LinkButton to={`/explore?type=Use%20Case&country=${encodeURIComponent(name)}`} variant="secondary">
                All use cases
              </LinkButton>
            } />
          
          {countryUseCases.length > 0 ?
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {countryUseCases.map((u) =>
            <li key={u.id}>
                  <UseCaseCard useCase={u} />
                </li>
            )}
            </ul> :

          <EmptyState
            title={`No use cases documented for ${name} yet.`}
            description="The Observatory is actively expanding country coverage. You can submit an initiative, or browse documented work in neighbouring countries."
            actions={
            <>
                  <LinkButton to="/contact">Submit a use case</LinkButton>
                  <LinkButton to="/explore?type=Use%20Case" variant="secondary">
                    Browse all use cases
                  </LinkButton>
                </>
            } />

          }
        </section>

        {/* Research */}
        <section aria-labelledby="research-heading" className="mb-16">
          <SectionHeading
            id="research-heading"
            eyebrow="Research"
            title={`Publications covering ${name}`}
            action={
            <LinkButton to={`/explore?country=${encodeURIComponent(name)}&type=Report`} variant="secondary">
                All research
              </LinkButton>
            } />
          
          {countryPublications.length > 0 ?
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {countryPublications.map((p) =>
            <li key={p.id}>
                  <PublicationCard publication={p} />
                </li>
            )}
            </ul> :

          <EmptyState
            title={`No publications indexed for ${name} yet.`}
            description="Try the regional research covering this sub-region, or explore the wider repository."
            actions={<LinkButton to="/explore?type=Report">Browse research</LinkButton>} />

          }
        </section>

        {/* Organizations & people */}
        <div className="mb-16 grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="org-heading">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 id="org-heading" className="font-serif text-2xl text-ink">
                Organizations
              </h2>
              <Link
                to={`/explore?type=Organization&country=${encodeURIComponent(name)}`}
                className="text-meta font-semibold text-accent underline-offset-4 hover:underline">
                
                View all
              </Link>
            </div>
            {countryOrganizations.length > 0 ?
            <ul className="grid gap-4 sm:grid-cols-2">
                {countryOrganizations.map((o) =>
              <li key={o.id}>
                    <OrganizationCard organization={o} />
                  </li>
              )}
              </ul> :

            <p className="rounded-lg border border-dashed border-line-strong bg-surface p-6 text-[0.9375rem] text-ink-soft">
                No organizations recorded for {name} yet.{' '}
                <Link to="/contact" className="font-medium text-accent underline-offset-4 hover:underline">
                  Suggest one
                </Link>
                .
              </p>
            }
          </section>

          <section aria-labelledby="people-heading">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 id="people-heading" className="font-serif text-2xl text-ink">
                People and experts
              </h2>
              <Link
                to={`/explore?type=Person&country=${encodeURIComponent(name)}`}
                className="text-meta font-semibold text-accent underline-offset-4 hover:underline">
                
                View all
              </Link>
            </div>
            {countryPeople.length > 0 ?
            <ul className="grid gap-4 sm:grid-cols-2">
                {countryPeople.map((p) =>
              <li key={p.id}>
                    <PersonCard person={p} />
                  </li>
              )}
              </ul> :

            <p className="rounded-lg border border-dashed border-line-strong bg-surface p-6 text-[0.9375rem] text-ink-soft">
                No expert profiles recorded for {name} yet.
              </p>
            }
          </section>
        </div>

        {/* Datasets & events */}
        <div className="grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="ds-heading">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 id="ds-heading" className="font-serif text-2xl text-ink">
                Datasets
              </h2>
              <Link
                to={`/explore?type=Dataset&country=${encodeURIComponent(name)}`}
                className="text-meta font-semibold text-accent underline-offset-4 hover:underline">
                
                View all
              </Link>
            </div>
            {countryDatasets.length > 0 ?
            <ul className="space-y-4">
                {countryDatasets.map((d) =>
              <li key={d.id}>
                    <DatasetCard dataset={d} />
                  </li>
              )}
              </ul> :

            <p className="rounded-lg border border-dashed border-line-strong bg-surface p-6 text-[0.9375rem] text-ink-soft">
                No datasets available for {name} yet.
              </p>
            }
          </section>

          <section aria-labelledby="ev-heading">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 id="ev-heading" className="font-serif text-2xl text-ink">
                Events
              </h2>
              <Link to="/events" className="text-meta font-semibold text-accent underline-offset-4 hover:underline">
                View all
              </Link>
            </div>
            {countryEvents.length > 0 ?
            <ul className="space-y-3">
                {countryEvents.map((e) =>
              <li key={e.id}>
                    <EventCard event={e} />
                  </li>
              )}
              </ul> :

            <EmptyState
              title="No upcoming events"
              description={`Nothing is scheduled in ${name} at the moment. Subscribe to the newsletter to hear when something is announced.`}
              actions={<LinkButton to="/newsletter">Subscribe</LinkButton>} />

            }
          </section>
        </div>

        <p className="mt-14 border-t border-line pt-8">
          <Link
            to={exploreLink}
            className="inline-flex items-center gap-2 font-serif text-xl text-accent underline-offset-4 hover:underline">
            
            See everything the Observatory holds on {name}
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
        </p>
      </Container>
    </>);

}
