import React from 'react';
import { Link } from '../ui/Link';
import { MapPinIcon } from 'lucide-react';
import type { Organization } from '../../types';

export function OrganizationCard({ organization }: {organization: Organization;}) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:shadow-lift">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-line bg-raised text-[0.6875rem] font-bold tracking-wide text-ink-soft">
          
          {organization.abbr}
        </span>
        <div className="min-w-0">
          <h3 className="text-[1rem] font-semibold leading-snug text-ink">
            <Link
              to={`/organizations/${organization.slug}`}
              className="rounded transition-colors duration-150 ease-out group-hover:text-accent">
              
              {organization.name}
            </Link>
          </h3>
          <p className="mt-1 text-meta text-ink-muted">{organization.type}</p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-soft">{organization.description}</p>
      <p className="mt-auto inline-flex items-center gap-1 pt-4 text-meta text-ink-muted">
        <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {organization.country}
      </p>
    </article>);

}
