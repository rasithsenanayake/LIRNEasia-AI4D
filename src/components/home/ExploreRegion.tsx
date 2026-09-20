'use client';

import React, { useState } from 'react';
import { Link } from '../ui/Link';
import { ArrowRightIcon } from 'lucide-react';
import { countries } from '../../data/countries';
import type { Country } from '../../types';
import { RegionMap } from '../maps/RegionMap';
import { Container, DemoDataNote, SectionHeading } from '../ui/Primitives';
import { LinkButton } from '../ui/Button';

function total(c: Country): number {
  const m = c.metrics;
  return m.useCases + m.publications + m.organizations + m.experts + m.datasets;
}

const MAX = Math.max(...countries.map(total));

export function ExploreRegion() {
  const [selected, setSelected] = useState<Country>(
    countries.find((c) => c.slug === 'sri-lanka') ?? countries[0]
  );

  const rows: {label: string;value: number;}[] = [
  { label: 'Responsible AI use cases', value: selected.metrics.useCases },
  { label: 'Research publications', value: selected.metrics.publications },
  { label: 'Organizations', value: selected.metrics.organizations },
  { label: 'Experts', value: selected.metrics.experts },
  { label: 'Datasets', value: selected.metrics.datasets }];


  return (
    <section aria-labelledby="region-heading" className="border-y border-line bg-surface">
      <Container className="py-16 lg:py-20">
        <SectionHeading
          id="region-heading"
          eyebrow="Explore the region"
          title="Nineteen countries, one connected evidence base"
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
              legendLabel="Total linked records"
              unit="linked records" />
            
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
