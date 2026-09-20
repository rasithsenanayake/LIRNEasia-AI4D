import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, MonitorIcon, UsersIcon } from 'lucide-react';
import type { ObservatoryEvent } from '../../types';
import { dateParts } from '../../utils/format';

export function EventCard({ event }: {event: ObservatoryEvent;}) {
  const { day, month, year } = dateParts(event.date);
  const FormatIcon = event.format === 'Online' ? MonitorIcon : event.format === 'Hybrid' ? UsersIcon : MapPinIcon;

  return (
    <article className="group flex gap-4 rounded-lg border border-line bg-surface p-4 shadow-card transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:shadow-lift">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded border border-accent-soft bg-accent-wash text-accent-dark">
        <span className="font-serif text-2xl leading-none">{day}</span>
        <span className="mt-0.5 text-[0.625rem] font-semibold tracking-[0.08em]">{month}</span>
        <span className="text-[0.625rem] text-accent">{year}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[0.9375rem] font-semibold leading-snug text-ink">
          <Link
            to={`/events/${event.slug}`}
            className="rounded transition-colors duration-150 ease-out group-hover:text-accent">
            
            {event.title}
          </Link>
        </h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-ink-muted">
          <span className="inline-flex items-center gap-1">
            <FormatIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {event.location}
          </span>
          <span>{event.type}</span>
        </p>
        <p className="mt-2 text-meta">
          <span className="text-ink-muted">Registration: </span>
          <span className="font-medium text-ink-soft">{event.registration}</span>
        </p>
      </div>
    </article>);

}