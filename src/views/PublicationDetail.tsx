'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckIcon, DownloadIcon, LinkIcon, QuoteIcon, ShareIcon } from 'lucide-react';
import { Breadcrumbs, Container } from '../components/ui/Primitives';
import { Tag, TypeLabel } from '../components/ui/Tag';
import { Button } from '../components/ui/Button';
import { ConnectedContent, type ConnectedGroup } from '../components/content/ConnectedContent';
import { NotFound } from './NotFound';
import { publicationBySlug, publications } from '../data/publications';
import { datasetById } from '../data/datasets';
import { useCaseById } from '../data/useCases';
import { people } from '../data/network';
import { countryByName } from '../data/countries';
import { formatDate, formatShortDate } from '../utils/format';
import { Link } from '../components/ui/Link';
import { copyToClipboard } from '../utils/browser';

export function PublicationDetail({ slug }: { slug: string }) {
  const publication = publicationBySlug(slug);
  const [copied, setCopied] = useState<'citation' | 'link' | 'citation2' | 'shared' | 'unavailable' | null>(null);
  const [metaOpen, setMetaOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadReady, setDownloadReady] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState('');
  const downloadTrigger = useRef<HTMLButtonElement | null>(null);
  const downloadInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!downloadOpen) return;
    downloadInput.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setDownloadOpen(false); downloadTrigger.current?.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [downloadOpen]);

  if (!publication) return <NotFound />;
  const files = publication.files ?? [];
  const citation = `${publication.authors.join(', ')} (${publication.date.slice(0, 4)}). ${publication.title}. ${publication.organization}, Asia AI4D Observatory.${publication.doi ? ` https://doi.org/${publication.doi}` : ''}`;

  function completePrototypeDownload() {
    const url = URL.createObjectURL(new Blob(['Asia AI4D Observatory prototype download receipt. The publication file is illustrative and is not connected.'], { type: 'text/plain' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'observatory-prototype-download-receipt.txt';
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloadNotice('Prototype receipt downloaded. No email or download record was stored.');
    setDownloadReady(false);
    setDownloadOpen(false);
  }

  async function copy(kind: 'citation' | 'link' | 'citation2', value: string) {
    setCopied(await copyToClipboard(value) ? kind : 'unavailable');
    window.setTimeout(() => setCopied(null), 2000);
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: publication?.title ?? 'Asia AI4D Observatory', url: window.location.href });
        setCopied('shared');
        window.setTimeout(() => setCopied(null), 2000);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    await copy('link', window.location.href);
  }

  const groups: ConnectedGroup[] = [
  {
    heading: 'Related datasets',
    items: publication.relatedDatasets.
    map(datasetById).
    filter(Boolean).
    map((d) => ({ id: d!.id, label: d!.title, meta: `${d!.format} · ${d!.access}`, to: `/datasets/${d!.slug}` }))
  },
  {
    heading: 'Related countries',
    items: publication.countries.
    map(countryByName).
    filter(Boolean).
    map((c) => ({
      id: c!.code,
      label: c!.name,
      meta: `${c!.metrics.publications} publications · ${c!.metrics.useCases} use cases`,
      to: `/countries/${c!.slug}`
    }))
  },
  {
    heading: 'Related use cases',
    items: publication.relatedUseCases.
    map(useCaseById).
    filter(Boolean).
    map((u) => ({ id: u!.id, label: u!.title, meta: `${u!.country} · ${u!.sector}`, to: `/use-cases/${u!.slug}` }))
  },
  {
    heading: 'Authors',
    items: publication.relatedPeople.
    map((id) => people.find((p) => p.id === id)).
    filter(Boolean).
    map((p) => ({ id: p!.id, label: p!.name, meta: `${p!.role}, ${p!.organization}`, to: `/people/${p!.slug}` }))
  },
  {
    heading: 'Related research',
    items: publications.
    filter((p) => p.id !== publication.id && p.topics.some((t) => publication.topics.includes(t))).
    slice(0, 3).
    map((p) => ({ id: p.id, label: p.title, meta: `${p.type} · ${formatShortDate(p.date)}`, to: `/publications/${p.slug}` }))
  }];


  const metadata: {label: string;value: string;}[] = [
  { label: 'Publication date', value: formatDate(publication.date) },
  { label: 'Authors', value: publication.authors.join(', ') },
  { label: 'Geography', value: publication.countries.join(', ') },
  { label: 'Topics', value: publication.topics.join(', ') },
  { label: 'Document type', value: publication.type },
  { label: 'Language', value: publication.language },
  ...(files.length > 0 ? [{ label: 'File type', value: publication.fileType }, { label: 'File size', value: publication.fileSize }] : []),
  ...(publication.doi ? [{ label: 'DOI', value: publication.doi }] : [])];


  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="py-10 lg:py-12">
          <Breadcrumbs
            items={[
            { label: 'Home', to: '/' },
            { label: 'Research & Insights', to: '/research' },
            { label: publication.type, to: `/explore?type=${encodeURIComponent(publication.type)}` },
            { label: publication.title }]
            } />
          
          <div className="mt-6 max-w-3xl">
            <TypeLabel type={publication.type} />
            <h1 className="mt-3 font-serif font-semibold text-[2rem] leading-[1.15] text-ink sm:text-[2.5rem]">
              {publication.title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-relaxed text-ink-soft">{publication.summary}</p>
            <p className="mt-5 text-[0.9375rem] text-ink-soft">
              {publication.authors.join(', ')} · {publication.organization}
            </p>
            <p className="mt-1 text-meta text-ink-muted">Published {formatDate(publication.date)}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {publication.countries.map((c) =>
              <Tag key={c} kind="country">
                  {c}
                </Tag>
              )}
              {publication.topics.map((t) =>
              <Tag key={t}>{t}</Tag>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button type="button" onClick={(event) => { downloadTrigger.current = event.currentTarget; setDownloadReady(false); if (publication.gatedDownload) setDownloadOpen(true); else completePrototypeDownload(); }}><DownloadIcon className="h-4 w-4" aria-hidden="true" />{publication.gatedDownload ? 'Request access to PDF' : 'Download prototype copy'}</Button>
              {files.map((file) => <Button key={file.url} type="button" disabled={!file.url}>
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                Download {file.type} · {file.size}
              </Button>)}
              <Button variant="secondary" type="button" onClick={() => copy('citation', citation)}>
                {copied === 'citation' ?
                <CheckIcon className="h-4 w-4 text-accent" aria-hidden="true" /> :

                <QuoteIcon className="h-4 w-4" aria-hidden="true" />
                }
                {copied === 'citation' ? 'Citation copied' : copied === 'unavailable' ? 'Copy unavailable' : 'Copy citation'}
              </Button>
              <Button variant="ghost" type="button" onClick={share}>
                <ShareIcon className="h-4 w-4" aria-hidden="true" />
                {copied === 'shared' ? 'Shared' : 'Share'}
              </Button>
              <Button variant="ghost" type="button" onClick={() => copy('link', window.location.href)}>
                {copied === 'link' ?
                <CheckIcon className="h-4 w-4" aria-hidden="true" /> :

                <LinkIcon className="h-4 w-4" aria-hidden="true" />
                }
                {copied === 'link' ? 'Link copied' : copied === 'unavailable' ? 'Copy unavailable' : 'Copy link'}
              </Button>
            </div>
            <p role="status" aria-live="polite" className="mt-2 text-meta text-ink-muted">{downloadNotice}</p>
            <p role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-meta text-ink-muted">
              {copied === 'citation' ? 'Citation copied.' : copied === 'link' ? 'Link copied.' : copied === 'shared' ? 'Share sheet opened.' : copied === 'unavailable' ? 'Copying is unavailable in this browser.' : ''}
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <article className="max-w-reading">
            {publication.keyTakeaways.length > 0 &&
            <aside className="rounded-lg border border-accent-soft bg-accent-wash p-6">
                <h2 className="text-meta font-semibold uppercase tracking-[0.09em] text-accent-dark">
                  Key takeaways
                </h2>
                <ul className="mt-4 space-y-3">
                  {publication.keyTakeaways.map((t, i) =>
                <li key={i} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {t}
                    </li>
                )}
                </ul>
              </aside>
            }

            <section className="mt-10">
              <h2 className="font-serif text-2xl leading-tight text-ink">Executive summary</h2>
              {publication.executiveSummary.map((p, i) =>
              <p key={i} className="mt-3 text-[1.0625rem] leading-[1.75] text-ink-soft">
                  {p}
                </p>
              )}
            </section>

            {files.length > 0 && <section className="mt-10">
              <h2 className="font-serif text-2xl leading-tight text-ink">About this publication</h2>
              <p className="mt-3 text-[1.0625rem] leading-[1.75] text-ink-soft">
                This section will explain the publication’s purpose, intended audience and place within the Observatory’s
                wider programme of regional research. Final editorial copy will be supplied by LIRNEasia.
              </p>
            </section>}

            {publication.keyFindings.length > 0 &&
            <section className="mt-10">
                <h2 className="font-serif text-2xl leading-tight text-ink">Key findings</h2>
                <ol className="mt-4 space-y-4">
                  {publication.keyFindings.map((f, i) =>
                <li key={i} className="flex gap-4">
                      <span className="font-serif text-2xl leading-none text-line-strong">{i + 1}</span>
                      <span className="text-[1.0625rem] leading-relaxed text-ink-soft">{f}</span>
                    </li>
                )}
                </ol>
              </section>
            }

            {publication.methodology &&
            <section className="mt-10">
                <h2 className="font-serif text-2xl leading-tight text-ink">Methodology</h2>
                <p className="mt-3 text-[1.0625rem] leading-[1.75] text-ink-soft">{publication.methodology}</p>
              </section>
            }

            {files.length > 0 && <section className="mt-10">
              <h2 className="font-serif text-2xl leading-tight text-ink">Files</h2>
              <ul className="mt-4 space-y-3">
                {files.map((file) => <li key={file.url} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4">
                  <span><span className="block text-[0.9375rem] font-medium text-ink">{file.label}</span><span className="block text-meta text-ink-muted">{file.type} · {file.size} · English</span></span>
                  <Button type="button" size="sm" disabled={!file.url}><DownloadIcon className="h-4 w-4" aria-hidden="true" />Download</Button>
                </li>)}
              </ul>
              <p className="mt-3 text-meta text-ink-muted">
                File sizes are shown before download so readers on metered connections can choose.
              </p>
            </section>}

            <section className="mt-10">
              <h2 className="font-serif text-2xl leading-tight text-ink">Authors</h2>
              <ul className="mt-4 space-y-3">
                {publication.authors.map((a) => {
                  const person = people.find((p) => p.name === a);
                  return (
                    <li key={a} className="text-[1.0625rem] text-ink-soft">
                      {person ?
                      <Link
                        to={`/people/${person.slug}`}
                        className="font-medium text-accent underline-offset-4 hover:underline">
                        
                          {a}
                        </Link> :

                      <span className="font-medium text-ink">{a}</span>
                      }
                      {person && <span className="block text-meta text-ink-muted">{person.role}, {person.organization}</span>}
                    </li>);

                })}
              </ul>
            </section>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <details
              open={metaOpen}
              onToggle={(e) => setMetaOpen((e.currentTarget as HTMLDetailsElement).open)}
              className="rounded-lg border border-line bg-surface p-5">
              
              <summary className="cursor-pointer list-none text-meta font-semibold uppercase tracking-[0.09em] text-ink-muted lg:cursor-default">
                Research metadata
              </summary>
              <dl className="mt-4 divide-y divide-line">
                {metadata.map((m) =>
                <div key={m.label} className="py-2.5 first:pt-0">
                    <dt className="text-meta text-ink-muted">{m.label}</dt>
                    <dd className="mt-0.5 break-words text-[0.9375rem] leading-snug text-ink">{m.value}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-4 border-t border-line pt-4">
                <p className="text-meta font-semibold text-ink">Citation</p>
                <p className="mt-2 text-meta leading-relaxed text-ink-soft">{citation}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  className="mt-3 w-full"
                  onClick={() => copy('citation2', citation)}>
                  
                  {copied === 'citation2' ? 'Copied' : 'Copy citation'}
                </Button>
              </div>
            </details>
          </aside>
        </div>

        <div className="mt-16">
          <ConnectedContent groups={groups} />
        </div>
      </Container>
      {downloadOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) { setDownloadOpen(false); downloadTrigger.current?.focus(); } }}><section role="dialog" aria-modal="true" aria-labelledby="download-dialog-title" className="w-full max-w-lg rounded-lg border border-line bg-surface p-6 shadow-panel"><h2 id="download-dialog-title" className="font-serif text-2xl text-ink">Access this resource</h2><p className="mt-2 text-sm leading-relaxed text-ink-soft">Enter your email address to demonstrate the optional gated-download flow. This prototype does not transmit or store your address.</p>{downloadReady ? <><p role="status" className="mt-4 border border-[#b9d6c6] bg-[#edf5ef] p-3 text-sm text-[#28613e]">Access request accepted for this preview. Continue to download the prototype receipt.</p><div className="mt-5 flex flex-wrap gap-3"><Button type="button" onClick={completePrototypeDownload}>Download prototype receipt</Button><Button variant="secondary" type="button" onClick={() => { setDownloadOpen(false); downloadTrigger.current?.focus(); }}>Close</Button></div></> : <form className="mt-5" onSubmit={(event) => { event.preventDefault(); setDownloadReady(true); }}><label htmlFor="download-email" className="block text-sm font-medium text-ink">Email address</label><input ref={downloadInput} id="download-email" type="email" required value={downloadEmail} onChange={(event) => setDownloadEmail(event.target.value)} className="mt-2 min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink" /><p className="mt-3 text-meta leading-relaxed text-ink-muted">By continuing, you acknowledge your email would be processed for this request under the approved privacy notice. <Link to="/privacy" className="text-accent underline">Privacy notice</Link></p><div className="mt-5 flex flex-wrap gap-3"><Button type="submit">Continue to download</Button><Button variant="secondary" type="button" onClick={() => { setDownloadOpen(false); downloadTrigger.current?.focus(); }}>Cancel</Button></div></form>}</section></div>}
    </>);

}
