import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, MapPinIcon } from 'lucide-react';
import type { SearchRecord } from '../../types';
import { Tag, TypeLabel } from '../ui/Tag';
import { formatShortDate } from '../../utils/format';
import { cn } from '../../utils/cn';

interface Props {
  record: SearchRecord;
  view?: 'card' | 'list';
}

export function ResourceCard({ record, view = 'card' }: Props) {
  const meta = [record.country, record.organization, record.date ? formatShortDate(record.date) : String(record.year)].
  filter(Boolean).
  join(' · ');

  if (view === 'list') {
    return (
      <article className="group border-b border-line py-4 last:border-b-0">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-5">
          <TypeLabel type={record.type} className="w-36 shrink-0 sm:pt-1" />
          <div className="min-w-0 flex-1">
            <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink">
              <Link
                to={record.href}
                className="rounded transition-colors duration-150 ease-out group-hover:text-accent">
                
                {record.title}
              </Link>
            </h3>
            <p className="mt-1 text-meta text-ink-muted">{meta}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-1.5">
            {record.topics.slice(0, 2).map((t) =>
            <Tag key={t}>{t}</Tag>
            )}
          </div>
        </div>
      </article>);

  }

  return (
    <article
      className={cn(
        'group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card',
        'transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:shadow-lift'
      )}>
      
      <div className="flex items-center justify-between gap-3">
        <TypeLabel type={record.type} />
        <span className="text-meta text-ink-muted">
          {record.date ? formatShortDate(record.date) : record.year}
        </span>
      </div>

      <h3 className="mt-3 text-[1.0625rem] font-semibold leading-snug text-ink">
        <Link to={record.href} className="rounded transition-colors duration-150 ease-out group-hover:text-accent">
          {record.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-soft">{record.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-ink-muted">
        {record.country &&
        <span className="inline-flex items-center gap-1">
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {record.country}
          </span>
        }
        {record.organization && <span className="truncate">{record.organization}</span>}
      </div>

      <div className="mt-auto pt-4">
        <div className="flex flex-wrap gap-1.5">
          {record.topics.slice(0, 3).map((t) =>
          <Tag key={t}>{t}</Tag>
          )}
        </div>
        <Link
          to={record.href}
          className="mt-4 inline-flex items-center gap-1.5 text-meta font-semibold text-accent underline-offset-4 hover:underline">
          
          View {record.type.toLowerCase()}
          <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>);

}