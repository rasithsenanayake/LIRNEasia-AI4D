import React from 'react';
import { Link } from 'react-router-dom';
import type { Person } from '../../types';
import { Tag } from '../ui/Tag';

export function PersonCard({ person }: {person: Person;}) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:shadow-lift">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-wash font-serif text-base font-semibold text-accent-dark">
          
          {person.initials}
        </span>
        <div className="min-w-0">
          <h3 className="text-[1rem] font-semibold leading-snug text-ink">
            <Link
              to={`/people/${person.slug}`}
              className="rounded transition-colors duration-150 ease-out group-hover:text-accent">
              
              {person.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-meta text-ink-soft">{person.role}</p>
          <p className="text-meta text-ink-muted">{person.organization}</p>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {person.expertise.slice(0, 3).map((e) =>
        <Tag key={e}>{e}</Tag>
        )}
      </div>
    </article>);

}