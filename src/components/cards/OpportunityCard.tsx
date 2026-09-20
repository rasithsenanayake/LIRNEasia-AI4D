import React from 'react';
import { CalendarClockIcon, ExternalLinkIcon } from 'lucide-react';
import type { Opportunity } from '../../types';
import { formatDate, daysUntil } from '../../utils/format';

export function OpportunityCard({ opportunity }: {opportunity: Opportunity;}) {
  const days = daysUntil(opportunity.deadline);
  const closingSoon = !opportunity.expired && days <= 45;

  return (
    <article className="flex flex-col rounded-lg border border-line bg-surface p-4 shadow-card transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:shadow-lift">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded border border-line bg-raised px-2 py-0.5 text-meta text-ink-soft">
          {opportunity.type}
        </span>
        {opportunity.expired ?
        <span className="rounded border border-line-strong bg-white px-2 py-0.5 text-meta font-medium text-ink-muted">
            Closed · archived
          </span> :

        closingSoon &&
        <span className="rounded border border-cat-readiness/30 bg-cat-readiness/10 px-2 py-0.5 text-meta font-medium text-cat-readiness">
              Closing soon
            </span>

        }
      </div>

      <h3 className="mt-3 text-[0.9375rem] font-semibold leading-snug text-ink">{opportunity.title}</h3>
      <p className="mt-1 text-meta text-ink-muted">{opportunity.organization}</p>
      <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-soft">{opportunity.description}</p>

      <p className="mt-auto flex items-center gap-1.5 pt-4 text-meta font-medium text-ink">
        <CalendarClockIcon className="h-4 w-4 text-ink-muted" aria-hidden="true" />
        Deadline: {formatDate(opportunity.deadline)}
      </p>
      <a
        href="https://example.org/opportunity"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1.5 text-meta font-semibold text-accent underline-offset-4 hover:underline">
        
        Apply on organiser site
        <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </article>);

}