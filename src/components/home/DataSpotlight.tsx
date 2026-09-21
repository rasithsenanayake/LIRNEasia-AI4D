import React from 'react';
import { FileTextIcon } from 'lucide-react';
import { countries } from '../../data/countries';
import { ChartFigure } from '../charts/ChartFigure';
import { Container, DemoDataNote } from '../ui/Primitives';
import { LinkButton } from '../ui/Button';

const FOCUS = ['Singapore', 'Malaysia', 'India', 'Viet Nam', 'Sri Lanka', 'Indonesia', 'Nepal'];

export function DataSpotlight() {
  const data = FOCUS.map((name) => {
    const country = countries.find((c) => c.name === name)!;
    return {
      label: country.name,
      value: country.indicators[0].value,
      note: 'Illustrative demo value'
    };
  });

  return (
    <section aria-labelledby="spotlight-heading" className="border-y border-line bg-surface">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
          <ChartFigure
            title="National AI policy maturity — selected countries"
            description="Composite index combining strategy status, institutional mandate and published implementation guidance."
            data={data}
            unit="Index (0–100)"
            max={100}
            source="Observatory policy tracker (demonstration data)"
            updated="30 August 2026"
            methodologyHref="/data-maps#methodology" />
          

          <div>
            <p className="text-meta font-semibold uppercase tracking-[0.1em] text-accent">Data spotlight</p>
            <h2 id="spotlight-heading" className="mt-3 font-serif text-[1.75rem] leading-tight text-ink sm:text-[2rem]">
              Policy maturity is uneven — and the gaps are where support matters
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
              The Observatory publishes the indicators behind every chart, together with their source and
              methodology, so findings can be checked, reused and challenged. Every visualisation can be read as a
              table and downloaded in full.
            </p>
            <DemoDataNote className="mt-5" />
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton to="/data-maps">Explore data</LinkButton>
              <LinkButton to="/data-maps#methodology" variant="secondary">
                <FileTextIcon className="h-4 w-4" aria-hidden="true" />
                View methodology
              </LinkButton>
              <LinkButton to="/data-maps#downloads" variant="ghost">
                Open downloads
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>);

}
