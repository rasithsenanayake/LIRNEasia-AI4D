'use client';

import React, { useMemo, useState } from 'react';
import { Link } from '../components/ui/Link';
import { ArrowRightIcon, SearchIcon } from 'lucide-react';
import { Breadcrumbs, Container, DemoDataNote, EmptyState } from '../components/ui/Primitives';
import { RegionMap } from '../components/maps/RegionMap';
import { LinkButton } from '../components/ui/Button';
import { countries } from '../data/countries';
import type { Country } from '../types';

function total(c: Country): number {
  const m = c.metrics;
  return m.useCases + m.publications + m.organizations + m.experts + m.datasets;
}

const MAX = Math.max(...countries.map(total));

export function CountryExplorer() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Country | null>(null);

  const filtered = useMemo(
    () => countries.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  );

  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="py-10 lg:py-12">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Countries' }]} />
          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_minmax(0,540px)] lg:items-center lg:gap-16">
            <div>
              <h1 className="font-serif text-[2rem] leading-tight text-ink sm:text-[2.5rem]">Explore by Country</h1>
              <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
                Nineteen country hubs bring together the research, initiatives, organisations, experts and datasets
                the Observatory holds for each country. Select a tile on the map or search the list below.
              </p>
              {selected &&
              <div aria-live="polite" className="mt-6 rounded-lg border border-line bg-canvas p-5">
                  <p className="text-meta font-semibold uppercase tracking-[0.08em] text-accent">
                    {selected.subregion}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl text-ink">{selected.name}</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{selected.overview}</p>
                  <LinkButton to={`/countries/${selected.slug}`} className="mt-4">
                    Explore {selected.name}
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </LinkButton>
                </div>
              }
            </div>
            <div>
              <RegionMap
                countries={countries}
                valueFor={total}
                maxValue={MAX}
                selectedCode={selected?.code ?? null}
                onSelect={setSelected}
                legendLabel="Total linked records"
                unit="linked records" />
              
              <DemoDataNote className="mt-4" />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-2xl text-ink">All countries</h2>
          <div className="relative w-full sm:w-80">
            <label htmlFor="country-search" className="sr-only">
              Search countries
            </label>
            <SearchIcon
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
              aria-hidden="true" />
            
            <input
              id="country-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries"
              className="min-h-[48px] w-full rounded-md border border-line-strong bg-surface pl-10 pr-3 text-[0.9375rem] text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30" />
            
          </div>
        </div>

        {filtered.length === 0 ?
        <div className="mt-6">
            <EmptyState
            title="No countries match that search."
            description="Check the spelling, or clear the search to see all nineteen countries in the Observatory."
            actions={
            <button
              type="button"
              onClick={() => setQuery('')}
              className="inline-flex min-h-[44px] items-center rounded-md bg-accent px-4 text-[0.9375rem] font-medium text-white hover:bg-accent-dark">
              
                  Clear search
                </button>
            } />
          
          </div> :

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) =>
          <li key={c.code}>
                <article className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:shadow-lift">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-xl leading-snug text-ink">
                      <Link to={`/countries/${c.slug}`} className="rounded group-hover:text-accent">
                        {c.name}
                      </Link>
                    </h3>
                    <span className="text-meta text-ink-muted">{c.subregion}</span>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-meta">
                    {[
                ['Use cases', c.metrics.useCases],
                ['Research', c.metrics.publications],
                ['Organizations', c.metrics.organizations],
                ['People', c.metrics.experts]].
                map(([label, value]) =>
                <div key={String(label)} className="flex items-baseline justify-between gap-2">
                        <dt className="text-ink-muted">{label}</dt>
                        <dd className="font-serif text-base tabular-nums text-ink">{value}</dd>
                      </div>
                )}
                  </dl>
                  <Link
                to={`/countries/${c.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-5 text-meta font-semibold text-accent underline-offset-4 hover:underline">
                
                    Explore country
                    <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </article>
              </li>
          )}
          </ul>
        }
        <DemoDataNote className="mt-8" />
      </Container>
    </>);

}
