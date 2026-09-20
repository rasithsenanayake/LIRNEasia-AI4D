import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';

export interface ConnectedGroup {
  heading: string;
  items: {id: string;label: string;meta: string;to: string;}[];
}

/**
 * "Everything is connected" — the shared related-content block used on every
 * detail page so a reader always has a logical next place to go.
 */
export function ConnectedContent({ groups }: {groups: ConnectedGroup[];}) {
  const populated = groups.filter((g) => g.items.length > 0);
  if (populated.length === 0) return null;

  return (
    <section aria-labelledby="connected-heading" className="border-t border-line pt-10">
      <h2 id="connected-heading" className="font-serif text-2xl leading-tight text-ink">
        Connected content
      </h2>
      <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
        Records in the Observatory are linked, not duplicated. These connections are generated from the underlying
        relationships rather than entered by hand.
      </p>

      <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {populated.map((group) =>
        <div key={group.heading}>
            <h3 className="border-b border-line pb-2 text-meta font-semibold uppercase tracking-[0.08em] text-ink-muted">
              {group.heading}
            </h3>
            <ul className="mt-3 space-y-3">
              {group.items.map((item) =>
            <li key={item.id}>
                  <Link
                to={item.to}
                className="group flex items-start gap-2 rounded text-[0.9375rem] leading-snug text-ink transition-colors duration-150 ease-out hover:text-accent">
                
                    <span>
                      {item.label}
                      <span className="mt-0.5 block text-meta text-ink-muted">{item.meta}</span>
                    </span>
                    <ArrowUpRightIcon
                  className="mt-0.5 h-4 w-4 shrink-0 text-line-strong transition-colors duration-150 ease-out group-hover:text-accent"
                  aria-hidden="true" />
                
                  </Link>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
    </section>);

}