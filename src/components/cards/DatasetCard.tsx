import React from 'react';
import { Link } from '../ui/Link';
import { DatabaseIcon, RefreshCwIcon } from 'lucide-react';
import type { Dataset } from '../../types';
import { Tag, TypeLabel } from '../ui/Tag';
import { formatShortDate } from '../../utils/format';

export function DatasetCard({ dataset }: {dataset: Dataset;}) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:shadow-lift">
      <div className="flex items-center justify-between gap-3">
        <TypeLabel type="Dataset" />
        <span className="rounded border border-line bg-raised px-2 py-0.5 text-meta text-ink-soft">
          {dataset.access}
        </span>
      </div>
      <h3 className="mt-3 text-[1.0625rem] font-semibold leading-snug text-ink">
        <Link
          to={`/datasets/${dataset.slug}`}
          className="rounded transition-colors duration-150 ease-out group-hover:text-accent">
          
          {dataset.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-soft">{dataset.description}</p>
      <dl className="mt-4 space-y-1 text-meta">
        <div className="flex gap-2">
          <dt className="text-ink-muted">Format</dt>
          <dd className="font-medium text-ink-soft">{dataset.format}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-muted">Coverage</dt>
          <dd className="font-medium text-ink-soft">{dataset.coverage}</dd>
        </div>
      </dl>
      <div className="mt-auto pt-4">
        <div className="flex flex-wrap gap-1.5">
          {dataset.topics.map((t) =>
          <Tag key={t}>{t}</Tag>
          )}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-meta text-ink-muted">
          <RefreshCwIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Updated {formatShortDate(dataset.updated)}
          <DatabaseIcon className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
          {dataset.source}
        </p>
      </div>
    </article>);

}
