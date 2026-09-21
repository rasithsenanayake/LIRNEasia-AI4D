'use client';

import React, { useState } from 'react';
import { Link } from '../components/ui/Link';
import { DownloadIcon, FileTextIcon, LinkIcon } from 'lucide-react';
import { Breadcrumbs, Container, DemoDataNote } from '../components/ui/Primitives';
import { RegionMap } from '../components/maps/RegionMap';
import { ChartFigure } from '../components/charts/ChartFigure';
import { Button, LinkButton } from '../components/ui/Button';
import { countries } from '../data/countries';
import type { Country } from '../types';

const INDICATORS = [
{ id: 'policy', label: 'National AI policy maturity' },
{ id: 'capacity', label: 'Research & training capacity' },
{ id: 'connectivity', label: 'Meaningful connectivity' },
{ id: 'publicsector', label: 'Public-sector AI deployments' }];
const REFERENCE_YEAR = '2025';


export function DataMaps() {
  const [indicatorId, setIndicatorId] = useState('policy');
  const [selected, setSelected] = useState<Country>(countries.find((c) => c.slug === 'sri-lanka') ?? countries[0]);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'unavailable'>('idle');

  const valueFor = (c: Country) => c.indicators.find((i) => i.id === indicatorId)?.value ?? 0;
  const max = Math.max(...countries.map(valueFor));
  const indicatorLabel = INDICATORS.find((i) => i.id === indicatorId)?.label ?? INDICATORS[0].label;
  const selectedIndicator = selected.indicators.find((i) => i.id === indicatorId) ?? selected.indicators[0];

  const tableData = countries.
  map((c) => ({ label: c.name, value: valueFor(c), note: 'Illustrative demo value' })).
  sort((a, b) => b.value - a.value).
  slice(0, 10);

  function downloadData() {
    const rows = [
      ['Country', indicatorLabel, 'Unit', 'Year'],
      ...countries.map((country) => [
        country.name,
        String(valueFor(country)),
        selectedIndicator.unit,
        REFERENCE_YEAR
      ])
    ];
    const csv = rows.map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `asia-ai4d-${indicatorId}-${REFERENCE_YEAR}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function copyLink() {
    if (!navigator.clipboard) {
      setCopyStatus('unavailable');
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      setCopyStatus('unavailable');
    }
  }

  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="py-10 lg:py-12">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Data & Maps' }]} />
          <h1 className="mt-5 font-serif text-[2rem] leading-tight text-ink sm:text-[2.5rem]">Data &amp; Maps</h1>
          <p className="mt-3 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-soft">
            Explore regional AI ecosystem information by indicator and country. Every visualisation on this page can be
            read as a table, cited with its source, and downloaded in full.
          </p>
        </Container>
      </div>

      <Container className="py-10">
        {/* Controls */}
        <form
          aria-label="Data controls"
          className="grid gap-4 rounded-lg border border-line bg-surface p-5 sm:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}>
          
          <div>
            <label htmlFor="indicator" className="block text-meta font-semibold text-ink">
              Indicator
            </label>
            <select
              id="indicator"
              value={indicatorId}
              onChange={(e) => setIndicatorId(e.target.value)}
              className="mt-1.5 min-h-[44px] w-full rounded-md border border-line-strong bg-canvas px-3 text-[0.9375rem] text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30">
              
              {INDICATORS.map((i) =>
              <option key={i.id} value={i.id}>
                  {i.label}
                </option>
              )}
            </select>
          </div>
          <div>
            <label htmlFor="country-jump" className="block text-meta font-semibold text-ink">
              Country
            </label>
            <select
              id="country-jump"
              value={selected.slug}
              onChange={(e) => setSelected(countries.find((c) => c.slug === e.target.value) ?? selected)}
              className="mt-1.5 min-h-[44px] w-full rounded-md border border-line-strong bg-canvas px-3 text-[0.9375rem] text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30">
              
              {countries.map((c) =>
              <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              )}
            </select>
          </div>
        </form>

        {/* Map + panel */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(0,360px)] lg:gap-12">
          <section aria-labelledby="map-heading" className="rounded-lg border border-line bg-surface p-5 sm:p-6">
            <h2 id="map-heading" className="font-serif text-xl text-ink">
              {indicatorLabel}, {REFERENCE_YEAR}
            </h2>
            <p className="mt-1.5 max-w-2xl text-meta leading-relaxed text-ink-soft">
              Tile cartogram of South and Southeast Asia. Each tile is a focusable control and prints its own value, so
              the map does not rely on colour alone.
            </p>
            <div className="mt-6">
              <RegionMap
                countries={countries}
                valueFor={valueFor}
                maxValue={max}
                selectedCode={selected.code}
                onSelect={setSelected}
                legendLabel={indicatorLabel}
                unit={selectedIndicator.unit} />
              
            </div>
          </section>

          <aside className="rounded-lg border border-line bg-surface p-5 sm:p-6">
            <p className="text-meta font-semibold uppercase tracking-[0.08em] text-accent">{selected.subregion}</p>
            <h2 aria-live="polite" aria-atomic="true" className="mt-1 font-serif text-2xl text-ink">{selected.name}</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{selected.overview}</p>

            <dl className="mt-6 divide-y divide-line border-y border-line">
              {selected.indicators.map((i) =>
              <div key={i.id} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-[0.9375rem] text-ink-soft">
                    {i.label}
                    <span className="block text-meta text-ink-muted">{i.unit}</span>
                  </dt>
                  <dd className="font-serif text-xl tabular-nums text-ink">{i.value}</dd>
                </div>
              )}
            </dl>

            <dl className="mt-4 space-y-1 text-meta text-ink-muted">
              <div className="flex gap-2">
                <dt className="font-medium text-ink-soft">Source</dt>
                <dd>{selectedIndicator.source}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-ink-soft">Last updated</dt>
                <dd>30 August 2026</dd>
              </div>
            </dl>

            <LinkButton to={`/countries/${selected.slug}`} className="mt-5 w-full">
              Explore {selected.name}
            </LinkButton>
          </aside>
        </div>

        <DemoDataNote className="mt-6" />

        {/* Ranked chart with table alternative */}
        <div className="mt-10">
          <ChartFigure
              title={`${indicatorLabel} — ten highest values`}
            description="The same indicator shown as a ranked comparison. Switch to the table view for the full values and notes."
            data={tableData}
            unit={selectedIndicator.unit}
            max={selectedIndicator.unit.includes('0–100') ? 100 : undefined}
            source={selectedIndicator.source}
            updated="30 August 2026"
            methodologyHref="#methodology" />
          
        </div>

        {/* Actions */}
        <section
          id="downloads"
          aria-labelledby="actions-heading"
          className="mt-10 rounded-lg border border-line bg-surface p-6">
          
          <h2 id="actions-heading" className="font-serif text-xl text-ink">
            Use this data
          </h2>
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
            Download the current indicator data as CSV for further analysis.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="button" onClick={downloadData}>
              <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              Download data · CSV
            </Button>
            <LinkButton to="#methodology" variant="secondary">
              <FileTextIcon className="h-4 w-4" aria-hidden="true" />
              View methodology
            </LinkButton>
            <Button variant="ghost" type="button" onClick={copyLink}>
              <LinkIcon className="h-4 w-4" aria-hidden="true" />
              {copyStatus === 'copied' ? 'Link copied' : 'Copy link'}
            </Button>
            <span role="status" aria-live="polite" className="inline-flex min-h-[1.15rem] min-w-[14rem] items-center self-center text-meta text-ink-muted">
              {copyStatus === 'copied' ? 'Link copied.' : copyStatus === 'unavailable' ? 'Copying is unavailable in this browser.' : ''}
            </span>
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology" aria-labelledby="methodology-heading" className="mt-10 max-w-reading">
          <h2 id="methodology-heading" className="font-serif text-2xl text-ink">
            Planned methodology and data trust
          </h2>
          <p className="mt-3 text-[1.0625rem] leading-[1.75] text-ink-soft">
            The production version will document how each indicator is constructed, which sources feed it, how missing
            values are handled, and when the series was last refreshed. Every chart and map carries its source, update
            date and a link back to this section.
          </p>
          <p className="mt-3 text-[1.0625rem] leading-[1.75] text-ink-soft">
            Indicator values in this prototype are illustrative and must not be cited. Verified data will replace them
            before launch.
          </p>
          <p className="mt-5">
            <Link to="/explore?type=Dataset" className="font-medium text-accent underline-offset-4 hover:underline">
              Browse the underlying datasets →
            </Link>
          </p>
        </section>
      </Container>
    </>);

}
