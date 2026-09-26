'use client';

import React, { useState } from 'react';
import { Link } from '../components/ui/Link';
import { DownloadIcon, FileTextIcon, LinkIcon } from 'lucide-react';
import { Breadcrumbs, Container, DemoDataNote } from '../components/ui/Primitives';
import { RegionMap } from '../components/maps/RegionMap';
import { ChartFigure } from '../components/charts/ChartFigure';
import { Button, LinkButton } from '../components/ui/Button';
import { countries } from '../data/countries';
import { publications } from '../data/publications';
import { useCases } from '../data/useCases';
import { organizations, people } from '../data/network';
import type { Country, Organization, Person, Publication, UseCase } from '../types';
import { copyToClipboard } from '../utils/browser';

const INDICATORS = [
{ id: 'policy', label: 'National AI policy maturity' },
{ id: 'capacity', label: 'Research & training capacity' },
{ id: 'connectivity', label: 'Meaningful connectivity' },
{ id: 'publicsector', label: 'Public-sector AI deployments' }];
const REFERENCE_YEAR = '2025';
const EXPERIENCES = ['Research & Knowledge', 'AI Indices', 'Innovations', 'Policy Mapping', 'Experts & Organisations'] as const;
type Experience = typeof EXPERIENCES[number];
type MapRecord = Publication | UseCase | Organization | Person;


export function DataMaps() {
  const [indicatorId, setIndicatorId] = useState('policy');
  const [selected, setSelected] = useState<Country>(countries.find((c) => c.slug === 'sri-lanka') ?? countries[0]);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'unavailable'>('idle');
  const [experience, setExperience] = useState<Experience>('AI Indices');

  const experienceRecords: MapRecord[] = experience === 'Research & Knowledge' ? publications.filter((item) => item.countries.includes(selected.name)) :
    experience === 'Innovations' ? useCases.filter((item) => item.country === selected.name) :
    experience === 'Experts & Organisations' ? [...organizations.filter((item) => item.country === selected.name), ...people.filter((item) => item.country === selected.name)] : [];
  const experienceCount = experience === 'Research & Knowledge' ? publications.filter((item) => item.countries.includes(selected.name)).length :
    experience === 'Innovations' ? useCases.filter((item) => item.country === selected.name).length :
    experience === 'Experts & Organisations' ? organizations.filter((item) => item.country === selected.name).length + people.filter((item) => item.country === selected.name).length : 1;
  const experienceLabel = experience === 'Research & Knowledge' ? 'Research outputs' : experience === 'Innovations' ? 'Responsible AI use cases' : experience === 'Policy Mapping' ? 'Illustrative policy record' : 'Organisations and experts';
  const experienceValueFor = (country: Country) => experience === 'Research & Knowledge' ? publications.filter((item) => item.countries.includes(country.name)).length :
    experience === 'Innovations' ? useCases.filter((item) => item.country === country.name).length :
    experience === 'Experts & Organisations' ? organizations.filter((item) => item.country === country.name).length + people.filter((item) => item.country === country.name).length : 1;

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
    setCopyStatus(await copyToClipboard(window.location.href) ? 'copied' : 'unavailable');
    window.setTimeout(() => setCopyStatus('idle'), 2000);
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
        <nav aria-label="Data experiences" className="mb-8 flex gap-2 overflow-x-auto border-b border-line pb-2">
          {EXPERIENCES.map((item) => <button key={item} type="button" aria-pressed={experience === item} onClick={() => setExperience(item)} className={`min-h-[44px] shrink-0 rounded-t px-3 text-sm font-medium ${experience === item ? 'border-b-2 border-accent text-accent' : 'text-ink-soft hover:bg-raised'}`}>{item}</button>)}
        </nav>
        {experience !== 'AI Indices' ? <>
          <form aria-label={`${experience} filters`} className="grid gap-4 rounded-lg border border-line bg-surface p-5 sm:grid-cols-2">
            <label className="block text-meta font-semibold text-ink" htmlFor="experience-country">Country<select id="experience-country" value={selected.slug} onChange={(event) => setSelected(countries.find((country) => country.slug === event.target.value) ?? selected)} className="mt-1.5 min-h-[44px] w-full rounded-md border border-line-strong bg-canvas px-3 text-[0.9375rem] font-normal">{countries.map((country) => <option key={country.slug} value={country.slug}>{country.name}</option>)}</select></label>
            <div className="self-end text-sm text-ink-soft">{experience === 'Research & Knowledge' ? 'Browse by country and follow links to full research records.' : experience === 'Innovations' ? 'Use cases are illustrative and can be explored by country.' : experience === 'Policy Mapping' ? 'Policy record structure preview; no country policy claims are represented.' : 'Explore illustrative directory records by country.'}</div>
          </form>
          <p className="mt-4 font-serif text-xl text-ink">{selected.name}: {experienceCount} {experienceLabel.toLowerCase()}</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_minmax(0,360px)]">
            <section aria-label={`${experience} country map`} className="rounded-lg border border-line bg-surface p-5"><h2 className="font-serif text-xl text-ink">{experience}</h2><p className="mt-1 text-meta text-ink-muted">Country tiles show record counts. Select a tile to inspect records.</p><div className="mt-5"><RegionMap countries={countries} valueFor={experienceValueFor} maxValue={Math.max(1, ...countries.map(experienceValueFor))} selectedCode={selected.code} onSelect={setSelected} legendLabel={experienceLabel} unit="records" /></div></section>
            <section className="rounded-lg border border-line bg-surface p-5"><h2 className="font-serif text-xl text-ink">{selected.name}</h2>{experience === 'Policy Mapping' ? <p className="mt-3 text-sm leading-relaxed text-ink-soft">Illustrative policy record preview. Status, category, update date and connected publications will be maintained as structured records. No factual policy assessment is made here.</p> : <ul className="mt-4 divide-y divide-line">{experienceRecords.length ? experienceRecords.slice(0, 8).map((record) => { const title = 'name' in record ? record.name : record.title; const meta = 'authors' in record ? `${record.type} · ${record.date}` : 'status' in record ? `${record.sector} · ${record.status}` : 'role' in record ? `${record.role} · ${record.organization}` : `${record.type} · ${record.country}`; const href = 'authors' in record ? `/publications/${record.slug}` : 'status' in record ? `/use-cases/${record.slug}` : 'role' in record ? `/people/${record.slug}` : `/organizations/${record.slug}`; return <li key={record.id} className="py-3"><p className="font-medium text-ink">{title}</p><p className="mt-1 text-meta text-ink-muted">{meta}</p><Link to={href} className="mt-1 inline-block text-meta font-medium text-accent hover:underline">View record</Link></li>; }) : <li className="py-3 text-sm text-ink-muted">No records in this illustrative sample.</li>}</ul>}
              {experience === 'Innovations' && <p className="mt-3 text-meta text-ink-muted">Records include organisation, sector, project status, responsible AI dimensions and related content.</p>}
              {experience === 'Experts & Organisations' && <p className="mt-3 text-meta text-ink-muted">Directory totals: {organizations.filter((item) => item.country === selected.name).length} organisations · {people.filter((item) => item.country === selected.name).length} experts.</p>}
            </section>
          </div>
          <section className="mt-8 overflow-x-auto rounded-lg border border-line bg-surface p-5"><h2 className="font-serif text-xl text-ink">Accessible data table</h2><p className="mt-1 text-meta text-ink-muted">Low-bandwidth alternative to the country map. All displayed values are illustrative prototype records.</p><table className="mt-4 w-full min-w-[480px] text-left text-sm"><thead><tr className="border-b border-line text-ink-muted"><th className="py-2 pr-4">Country</th><th className="py-2 pr-4">Subregion</th><th className="py-2">{experienceLabel}</th></tr></thead><tbody className="divide-y divide-line">{countries.map((country) => <tr key={country.code}><th scope="row" className="py-2 pr-4 font-medium text-ink">{country.name}</th><td className="py-2 pr-4 text-ink-soft">{country.subregion}</td><td className="py-2 text-ink-soft">{experienceValueFor(country)}</td></tr>)}</tbody></table><p className="mt-4 text-meta text-ink-muted">Source: Observatory prototype dataset · Updated: 26 September 2026 · Methodology: count of prototype records by country.</p></section>
          <DemoDataNote className="mt-6">All non-index records shown here are illustrative prototype data. Policy mapping is a schema demonstration only.</DemoDataNote>
        </> : <>
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
              <div className="flex min-w-0 gap-2">
                <dt className="font-medium text-ink-soft">Source</dt>
                <dd className="min-w-0 break-words">{selectedIndicator.source}</dd>
              </div>
              <div className="flex min-w-0 gap-2">
                <dt className="font-medium text-ink-soft">Last updated</dt>
                <dd className="min-w-0 break-words">30 August 2026</dd>
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
            <span role="status" aria-live="polite" className="inline-flex min-h-[1.15rem] max-w-full items-center self-center text-meta text-ink-muted">
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
        </>}
      </Container>
    </>);

}
