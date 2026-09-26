'use client';

import React, { useState } from 'react';
import { LinkIcon, ShareIcon } from 'lucide-react';
import { Breadcrumbs, Container } from '../components/ui/Primitives';
import { Tag, TypeLabel } from '../components/ui/Tag';
import { LinkButton, Button } from '../components/ui/Button';
import { ConnectedContent, type ConnectedGroup } from '../components/content/ConnectedContent';
import { NotFound } from './NotFound';
import { useCaseBySlug, useCases } from '../data/useCases';
import { publicationById } from '../data/publications';
import { datasetById } from '../data/datasets';
import { organizations, people } from '../data/network';
import { eventById } from '../data/happenings';
import { countryByName } from '../data/countries';
import { formatDate, formatShortDate } from '../utils/format';
import { Link } from '../components/ui/Link';
import { copyToClipboard } from '../utils/browser';

export function UseCaseDetail({ slug }: { slug: string }) {
  const useCase = useCaseBySlug(slug);
  const [status, setStatus] = useState<'idle' | 'copied' | 'shared' | 'unavailable'>('idle');
  if (!useCase) return <NotFound />;

  async function copyLink() {
    setStatus(await copyToClipboard(window.location.href) ? 'copied' : 'unavailable');
    window.setTimeout(() => setStatus('idle'), 2000);
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: useCase?.title ?? 'Asia AI4D Observatory', url: window.location.href });
        setStatus('shared');
        window.setTimeout(() => setStatus('idle'), 2000);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    await copyLink();
  }

  const country = countryByName(useCase.country);

  const groups: ConnectedGroup[] = [
  {
    heading: 'Related research',
    items: useCase.relatedPublications.
    map(publicationById).
    filter(Boolean).
    map((p) => ({ id: p!.id, label: p!.title, meta: `${p!.type} · ${formatShortDate(p!.date)}`, to: `/publications/${p!.slug}` }))
  },
  {
    heading: 'Related datasets',
    items: useCase.relatedDatasets.
    map(datasetById).
    filter(Boolean).
    map((d) => ({ id: d!.id, label: d!.title, meta: `${d!.format} · ${d!.access}`, to: `/datasets/${d!.slug}` }))
  },
  {
    heading: 'Related people',
    items: useCase.relatedPeople.
    map((id) => people.find((p) => p.id === id)).
    filter(Boolean).
    map((p) => ({ id: p!.id, label: p!.name, meta: `${p!.role}, ${p!.organization}`, to: `/people/${p!.slug}` }))
  },
  {
    heading: 'Related organizations',
    items: useCase.relatedOrganizations.
    map((id) => organizations.find((o) => o.id === id)).
    filter(Boolean).
    map((o) => ({ id: o!.id, label: o!.name, meta: `${o!.type} · ${o!.country}`, to: `/organizations/${o!.slug}` }))
  },
  {
    heading: 'Related events',
    items: useCase.relatedEvents.
    map(eventById).
    filter(Boolean).
    map((e) => ({ id: e!.id, label: e!.title, meta: `${formatShortDate(e!.date)} · ${e!.location}`, to: `/events/${e!.slug}` }))
  },
  {
    heading: 'Similar initiatives',
    items: useCases.
    filter((u) => u.id !== useCase.id && (u.sector === useCase.sector || u.topics.some((t) => useCase.topics.includes(t)))).
    slice(0, 3).
    map((u) => ({ id: u.id, label: u.title, meta: `${u.country} · ${u.sector}`, to: `/use-cases/${u.slug}` }))
  }];


  const metadata: {label: string;value: React.ReactNode;}[] = [
  {
    label: 'Country',
    value: country ?
    <Link to={`/countries/${country.slug}`} className="text-accent underline-offset-4 hover:underline">
          {country.name}
        </Link> :

    useCase.country

  },
  ...(useCase.broadCategory ? [{ label: 'Broad category', value: useCase.broadCategory }] : []),
  { label: 'Sector', value: useCase.sector },
  { label: 'Organisation', value: useCase.organization },
  { label: 'Organization type', value: useCase.organizationType },
  { label: 'Responsible AI dimensions', value: useCase.dimensions.join(', ') },
  { label: 'Ecosystem category', value: useCase.ecosystemCategory },
  ...(useCase.team?.length ? [{ label: 'Team / individuals', value: useCase.team.join(', ') }] : []),
  { label: 'Project status', value: useCase.status },
  { label: 'Source', value: useCase.source },
  { label: 'Last updated', value: formatDate(useCase.lastUpdated) }];


  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="py-10 lg:py-12">
          <Breadcrumbs
            items={[
            { label: 'Home', to: '/' },
            { label: 'Explore', to: '/explore' },
            { label: useCase.country, to: country ? `/countries/${country.slug}` : '/countries' },
            { label: 'Responsible AI Use Cases', to: '/explore?type=Use%20Case' },
            { label: useCase.title }]
            } />
          

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
            <div>
              <TypeLabel type="Responsible AI Use Case" />
              <h1 className="mt-3 max-w-3xl font-serif font-semibold text-[2rem] leading-[1.15] text-ink sm:text-[2.5rem]">
                {useCase.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[1.125rem] leading-relaxed text-ink-soft">{useCase.summary}</p>

            <div className="mt-6 flex flex-wrap gap-1.5">
                <Tag kind="country">{useCase.country}</Tag>
                <Tag kind="sector">{useCase.sector}</Tag>
                <Tag kind="orgType">{useCase.organizationType}</Tag>
                {useCase.dimensions.map((d) =>
                <Tag key={d} kind="dimension">
                    {d}
                  </Tag>
                )}
              </div>
              <p className="mt-3 text-meta text-ink-muted">Illustrative prototype profile; it does not represent a verified deployment.</p>

              <div className="mt-7 flex flex-wrap gap-3">
                {useCase.projectUrl && <a href={useCase.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center rounded-md border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-raised">Visit project ↗ <span className="sr-only">(opens in a new tab)</span></a>}
                {useCase.organizationUrl && <a href={useCase.organizationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center rounded-md border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-raised">Organisation website ↗ <span className="sr-only">(opens in a new tab)</span></a>}
                <LinkButton to="#connected-heading" variant="secondary">
                  View related research
                </LinkButton>
                <Button variant="ghost" type="button" onClick={share}>
                  <ShareIcon className="h-4 w-4" aria-hidden="true" />
                  {status === 'shared' ? 'Shared' : 'Share'}
                </Button>
                <Button variant="ghost" type="button" onClick={copyLink}>
                  <LinkIcon className="h-4 w-4" aria-hidden="true" />
                  {status === 'copied' ? 'Link copied' : status === 'unavailable' ? 'Copy unavailable' : 'Copy link'}
                </Button>
              </div>
              <p role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-meta text-ink-muted">
                {status === 'copied' ? 'Link copied.' : status === 'shared' ? 'Share sheet opened.' : status === 'unavailable' ? 'Copying is unavailable in this browser.' : ''}
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <article className="max-w-reading">
            {useCase.sections.map((section) =>
            <section key={section.heading} className="mb-10 last:mb-0">
                <h2 className="font-serif text-2xl leading-tight text-ink">{section.heading}</h2>
                {section.body.map((p, i) =>
              <p key={i} className="mt-3 text-[1.0625rem] leading-[1.75] text-ink-soft">
                    {p}
                  </p>
              )}
              </section>
            )}

            <aside className="mt-12 rounded-lg border border-accent-soft bg-accent-wash p-6">
              <h2 className="text-meta font-semibold uppercase tracking-[0.09em] text-accent-dark">At a glance</h2>
              <ul className="mt-3 space-y-2 text-[1.0625rem] leading-relaxed text-ink">
                <li>· A {useCase.sector.toLowerCase()} initiative in {useCase.country}, currently at {useCase.status.toLowerCase()} stage.</li>
                <li>· Led by {useCase.organization}, a {useCase.organizationType.toLowerCase()} body.</li>
                <li>· Documented against {useCase.dimensions.length} responsible AI dimensions.</li>
              </ul>
            </aside>
          </article>

          <aside aria-labelledby="metadata-heading" className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-line bg-surface p-5">
              <h2 id="metadata-heading" className="text-meta font-semibold uppercase tracking-[0.09em] text-ink-muted">
                Record details
              </h2>
              <dl className="mt-4 divide-y divide-line">
                {metadata.map((m) =>
                <div key={m.label} className="py-2.5 first:pt-0">
                    <dt className="text-meta text-ink-muted">{m.label}</dt>
                    <dd className="mt-0.5 break-words text-[0.9375rem] leading-snug text-ink">{m.value}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-4 border-t border-line pt-4 text-meta leading-relaxed text-ink-muted">
                Record compiled by the Observatory editorial team. Content shown is an illustrative placeholder for
                prototype review.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-16">
          <ConnectedContent groups={groups} />
        </div>
      </Container>
    </>);

}
