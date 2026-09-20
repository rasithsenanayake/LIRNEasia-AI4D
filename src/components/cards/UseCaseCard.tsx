import React from 'react';
import { Link } from '../ui/Link';
import { ArrowRightIcon, Building2Icon, MapPinIcon } from 'lucide-react';
import type { UseCase } from '../../types';
import { Tag, TypeLabel } from '../ui/Tag';

export function UseCaseCard({ useCase }: {useCase: UseCase;}) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:shadow-lift">
      <div className="flex items-center justify-between gap-3">
        <TypeLabel type="Responsible AI Use Case" />
        <span className="rounded border border-line bg-raised px-2 py-0.5 text-meta text-ink-soft">
          {useCase.status}
        </span>
      </div>

      <h3 className="mt-3 text-[1.0625rem] font-semibold leading-snug text-ink">
        <Link
          to={`/use-cases/${useCase.slug}`}
          className="rounded transition-colors duration-150 ease-out group-hover:text-accent">
          
          {useCase.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-soft">{useCase.summary}</p>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-meta">
        <div>
          <dt className="text-ink-muted">Country</dt>
          <dd className="mt-0.5 inline-flex items-center gap-1 font-medium text-ink-soft">
            <MapPinIcon className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
            {useCase.country}
          </dd>
        </div>
        <div>
          <dt className="text-ink-muted">Sector</dt>
          <dd className="mt-0.5 font-medium text-ink-soft">{useCase.sector}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-ink-muted">Organization</dt>
          <dd className="mt-0.5 inline-flex items-center gap-1 font-medium text-ink-soft">
            <Building2Icon className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
            {useCase.organization}
          </dd>
        </div>
      </dl>

      <div className="mt-auto pt-4">
        <div className="flex flex-wrap gap-1.5">
          {useCase.dimensions.map((d) =>
          <Tag key={d} kind="dimension">
              {d}
            </Tag>
          )}
        </div>
        <Link
          to={`/use-cases/${useCase.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-meta font-semibold text-accent underline-offset-4 hover:underline">
          
          View use case
          <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>);

}
