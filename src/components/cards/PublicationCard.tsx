import React from 'react';
import { Link } from '../ui/Link';
import { FileTextIcon } from 'lucide-react';
import type { Publication } from '../../types';
import { Tag, TypeLabel } from '../ui/Tag';
import { formatDate } from '../../utils/format';

export function PublicationCard({
  publication,
  featured = false



}: {publication: Publication;featured?: boolean;}) {
  if (featured) {
    return (
      <article className="grid gap-6 rounded-lg border border-line bg-surface p-6 shadow-card md:grid-cols-[220px_1fr] md:p-8">
        <div
          aria-hidden="true"
          className="hidden aspect-[3/4] w-full flex-col justify-between rounded border border-line bg-accent-dark p-5 text-ink-inverse md:flex">
          
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-accent-soft">
            {publication.type}
          </span>
          <span className="font-serif text-lg leading-snug">{publication.title.slice(0, 64)}</span>
          <span className="text-[0.6875rem] text-accent-soft">Asia AI4D Observatory</span>
        </div>
        <div className="flex flex-col">
          <TypeLabel type={`Featured ${publication.type}`} />
          <h3 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-[1.75rem]">
            <Link to={`/publications/${publication.slug}`} className="rounded hover:text-accent">
              {publication.title}
            </Link>
          </h3>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{publication.summary}</p>
          <p className="mt-4 text-meta text-ink-muted">
            {publication.authors.join(', ')} · {publication.organization} · {formatDate(publication.date)}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {publication.topics.map((t) =>
            <Tag key={t}>{t}</Tag>
            )}
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
            <Link
              to={`/publications/${publication.slug}`}
              className="inline-flex min-h-[44px] items-center rounded-md bg-accent px-4 text-[0.9375rem] font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-dark">
              
              View publication
            </Link>
            <span className="inline-flex items-center gap-1.5 text-meta text-ink-muted">
              <FileTextIcon className="h-4 w-4" aria-hidden="true" />
              {publication.fileType} · {publication.fileSize}
            </span>
          </div>
        </div>
      </article>);

  }

  return (
    <article className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:shadow-lift">
      <div className="flex items-center justify-between gap-3">
        <TypeLabel type={publication.type} />
        <span className="text-meta text-ink-muted">{formatDate(publication.date)}</span>
      </div>
      <h3 className="mt-3 text-[1.0625rem] font-semibold leading-snug text-ink">
        <Link
          to={`/publications/${publication.slug}`}
          className="rounded transition-colors duration-150 ease-out group-hover:text-accent">
          
          {publication.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-soft">{publication.summary}</p>
      <p className="mt-3 text-meta text-ink-muted">
        {publication.authors.join(', ')} · {publication.countries.slice(0, 2).join(', ')}
        {publication.countries.length > 2 ? ` +${publication.countries.length - 2}` : ''}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {publication.topics.slice(0, 3).map((t) =>
        <Tag key={t}>{t}</Tag>
        )}
      </div>
    </article>);

}
