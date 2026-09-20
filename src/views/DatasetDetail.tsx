'use client';

import { useState } from 'react';
import { CheckIcon, LinkIcon } from 'lucide-react';
import { Breadcrumbs, Container, DemoDataNote } from '../components/ui/Primitives';
import { Button } from '../components/ui/Button';
import { NotFound } from './NotFound';
import { datasetBySlug } from '../data/datasets';

export function DatasetDetail({ slug }: { slug: string }) {
  const dataset = datasetBySlug(slug);
  const [copied, setCopied] = useState(false);
  if (!dataset) return <NotFound />;

  function copyLink() {
    void navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  const fields = [
    ['Source', dataset.source], ['Maintainer', dataset.maintainer], ['Coverage', dataset.coverage],
    ['Topics', dataset.topics.join(', ')], ['Time period', String(dataset.year)], ['Format', dataset.format],
    ['Licence', dataset.licence], ['Access', dataset.access], ['Last updated', dataset.updated]
  ];

  return <>
    <Container className="py-10 lg:py-12">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Explore', to: '/explore' }, { label: 'Dataset', to: `/explore?type=Dataset` }, { label: dataset.title }]} />
      <div className="mt-8 max-w-3xl">
        <p className="text-meta font-semibold uppercase tracking-[0.08em] text-accent">Dataset</p>
        <h1 className="mt-3 font-serif text-[2rem] leading-tight text-ink sm:text-[2.75rem]">{dataset.title}</h1>
        <p className="mt-4 text-[1.125rem] leading-relaxed text-ink-soft">{dataset.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" disabled title="No verified access URL is available in the prototype">Access dataset</Button>
          <Button type="button" variant="secondary" onClick={copyLink}>{copied ? <CheckIcon className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}{copied ? 'Link copied' : 'Copy link'}</Button>
        </div>
        <DemoDataNote className="mt-5">This record is illustrative. No download is shown because no verified file is attached.</DemoDataNote>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section aria-labelledby="notes-heading" className="max-w-reading">
          <h2 id="notes-heading" className="font-serif text-2xl text-ink">Method and source notes</h2>
          <p className="mt-3 text-[1.0625rem] leading-[1.75] text-ink-soft">Method and source notes will be supplied and approved by the Client before production publication.</p>
          <h2 className="mt-10 font-serif text-2xl text-ink">Usage notes</h2>
          <p className="mt-3 text-[1.0625rem] leading-[1.75] text-ink-soft">Access conditions, citation guidance and download instructions will appear here when a verified dataset file is available.</p>
        </section>
        <dl className="divide-y divide-line rounded-lg border border-line bg-surface p-5">
          {fields.map(([label, value]) => <div key={label} className="py-2.5 first:pt-0"><dt className="text-meta text-ink-muted">{label}</dt><dd className="mt-0.5 text-[0.9375rem] text-ink">{value}</dd></div>)}
        </dl>
      </div>
    </Container>
  </>;
}
