'use client';

import React, { useState } from 'react';
import { Link } from '../ui/Link';
import { ArrowRightIcon } from 'lucide-react';
import { countries } from '../../data/countries';
import { useCases } from '../../data/useCases';
import { publications } from '../../data/publications';
import { datasets } from '../../data/datasets';
import { organizations, people } from '../../data/network';
import { events } from '../../data/happenings';
import type { Country } from '../../types';
import { RegionMap } from '../maps/RegionMap';
import { Container, DemoDataNote, SectionHeading } from '../ui/Primitives';
import { LinkButton } from '../ui/Button';

function total(c: Country): number {
  return countryRecords(c).reduce((sum, value) => sum + value, 0);
}

function countryRecords(c: Country): number[] {
  return [useCases.filter((u) => u.country === c.name).length, publications.filter((p) => p.countries.includes(c.name)).length, organizations.filter((o) => o.country === c.name).length, people.filter((p) => p.country === c.name).length, datasets.filter((d) => d.countries.includes(c.name)).length, events.filter((e) => e.country === c.name).length];
}

const MAX = Math.max(...countries.map(total));

export function ExploreRegion() {
  const [selected, setSelected] = useState<Country>(
    countries.find((c) => c.slug === 'sri-lanka') ?? countries[0]
  );

  const [useCaseCount, publicationCount, organizationCount, peopleCount, datasetCount] = countryRecords(selected);
  const rows: {label: string;value: number;}[] = [
  { label: 'Responsible AI use cases', value: useCaseCount },
  { label: 'Research publications', value: publicationCount },
  { label: 'Organizations', value: organizationCount },
  { label: 'Experts', value: peopleCount },
  { label: 'Datasets', value: datasetCount }];


  return (
    <section aria-labelledby="region-heading" className="border-y border-line bg-surface">
      <Container className="py-16 lg:py-20">
        <SectionHeading
          id="region-heading"
          eyebrow="Explore the region"
          title="Explore responsible AI knowledge across South and Southeast Asia"
          description="Select a country to see what the Observatory holds for it. Each tile is a keyboard-accessible control, and the same information is available as a list below."
          action={
          <LinkButton to="/countries" variant="secondary">
              Browse all countries
            </LinkButton>
          } />
        

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-12">
          <div>
            <RegionMap
              countries={countries}
              valueFor={total}
              maxValue={MAX}
              selectedCode={selected.code}
              onSelect={setSelected}
              legendLabel="Illustrative linked records"
              unit="illustrative linked records" />
            
            <DemoDataNote className="mt-4" />
          </div>

          <aside
            aria-live="polite"
            className="flex flex-col rounded-lg border border-line bg-canvas p-6">
            
            <p className="text-meta font-semibold uppercase tracking-[0.08em] text-accent">
              {selected.subregion}
            </p>
            <h3 className="mt-1 font-serif text-2xl leading-tight text-ink">{selected.name}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{selected.overview}</p>

            <dl className="mt-6 divide-y divide-line border-y border-line">
              {rows.map((r) =>
              <div key={r.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-[0.9375rem] text-ink-soft">{r.label}</dt>
                  <dd className="font-serif text-xl tabular-nums text-ink">{r.value}</dd>
                </div>
              )}
            </dl>

            <div className="mt-auto pt-6">
              <LinkButton to={`/countries/${selected.slug}`} className="w-full">
                Explore {selected.name}
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
            </div>
          </aside>
        </div>

        <details className="mt-8 rounded-lg border border-line bg-canvas p-4">
          <summary className="cursor-pointer text-[0.9375rem] font-medium text-ink">
            View regional coverage as a list
          </summary>
          <ul className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((c) =>
            <li key={c.code} className="flex items-baseline justify-between gap-3 border-b border-line py-1.5">
                <Link to={`/countries/${c.slug}`} className="text-[0.9375rem] text-ink hover:text-accent">
                  {c.name}
                </Link>
                <span className="text-meta tabular-nums text-ink-muted">{total(c)} records</span>
              </li>
            )}
          </ul>
        </details>
      </Container>
    </section>);

}
