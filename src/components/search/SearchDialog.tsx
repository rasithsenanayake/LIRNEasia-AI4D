'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react';
import { groupQuickResults } from '../../utils/searchIndex';
import { TypeLabel } from '../ui/Tag';
import { Skeleton } from '../ui/Primitives';
import { Link } from '../ui/Link';
import { AccessibleDialog } from '../ui/AccessibleDialog';

const SUGGESTIONS = ['AI Governance', 'Healthcare', 'Inclusive AI', 'Sri Lanka', 'Public Sector'];

export function SearchDialog({
  open,
  onClose,
  returnFocusRef
}: {open: boolean;onClose: () => void;returnFocusRef?: React.RefObject<HTMLElement>;}) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 220);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => { if (open) setQuery(''); }, [open]);

  const groups = useMemo(() => groupQuickResults(query), [query]);
  const total = groups.reduce((n, g) => n + g.records.length, 0);

  if (!open) return null;

  function submit(value: string) {
    onClose();
    router.push(`/explore?q=${encodeURIComponent(value)}`);
  }

  return (
    <AccessibleDialog open={open} onClose={onClose} returnFocusRef={returnFocusRef} initialFocusRef={inputRef} ariaLabel="Search the Observatory" className="relative mx-auto mt-[8vh] max-h-[84vh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) submit(query);
          }}
          className="flex items-center gap-3 border-b border-line px-4">
          
          <SearchIcon className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true" />
          <label htmlFor="global-search" className="sr-only">
            Search research, projects, people, organizations and datasets
          </label>
          <input
            id="global-search"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            autoComplete="off"
            placeholder="Search research, projects, people, organizations, datasets…"
            className="min-h-[56px] w-full border-0 bg-transparent text-[1rem] text-ink placeholder:text-ink-muted focus:outline-none" />
          
          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 text-ink-muted transition-colors duration-150 ease-out hover:bg-raised hover:text-ink"
            aria-label="Close search">
            
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          <p className="sr-only" role="status" aria-live="polite">
            {loading ? 'Searching.' : query ? `${total} ${total === 1 ? 'result' : 'results'} found.` : ''}
          </p>
          {!query &&
          <div>
              <p className="text-meta font-semibold uppercase tracking-[0.08em] text-ink-muted">Suggested searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) =>
              <button
                key={s}
                type="button"
                onClick={() => submit(s)}
                className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-raised px-3 text-meta text-ink-soft transition-colors duration-150 ease-out hover:border-accent-soft hover:bg-accent-wash hover:text-accent-dark">
                
                    {s}
                  </button>
              )}
              </div>
            </div>
          }

          {query && loading &&
          <div className="space-y-3" aria-live="polite">
              <span className="sr-only">Searching</span>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-5/6" />
            </div>
          }

          {query && !loading && total === 0 &&
          <div>
              <p className="font-serif text-lg text-ink">No exact matches were found.</p>
              <ul className="mt-3 space-y-2 text-[0.9375rem] text-ink-soft">
                <li>· Try a related topic, such as AI Governance or Inclusion</li>
                <li>· Search by country name</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                to="/explore"
                onClick={onClose}
                className="rounded-md border border-line-strong px-3 py-2 text-meta font-medium text-ink hover:bg-raised">
                
                  Browse all resources
                </Link>
                <Link
                to="/countries"
                onClick={onClose}
                className="rounded-md border border-line-strong px-3 py-2 text-meta font-medium text-ink hover:bg-raised">
                
                  Explore countries
                </Link>
              </div>
            </div>
          }

          {query && !loading && total > 0 &&
          <div className="space-y-5">
              {groups.map((group) =>
            <section key={group.label}>
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-meta font-semibold uppercase tracking-[0.08em] text-ink-muted">
                      {group.label}
                    </h2>
                    <span className="text-meta text-ink-muted">{group.records.length} results</span>
                  </div>
                  <ul className="mt-2 divide-y divide-line">
                    {group.records.map((r) =>
                <li key={r.id}>
                        <Link
                    to={r.href}
                    onClick={onClose}
                    className="block rounded px-2 py-2.5 transition-colors duration-150 ease-out hover:bg-accent-wash">
                    
                          <TypeLabel type={r.type} />
                          <p className="mt-0.5 text-[0.9375rem] font-medium leading-snug text-ink">{r.title}</p>
                          <p className="mt-0.5 line-clamp-1 text-meta text-ink-muted">{r.description}</p>
                          {r.matchedInDocument && <p className="mt-1 text-meta font-medium text-accent">PDF text match · illustrative example</p>}
                          {r.matchSnippet && <p className="mt-1 line-clamp-2 text-meta text-ink-soft">{r.matchSnippet}</p>}
                        </Link>
                      </li>
                )}
                  </ul>
                </section>
            )}
              <button
              type="button"
              onClick={() => submit(query)}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-accent px-4 text-[0.9375rem] font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-dark">
              
                View all results for “{query}”
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          }
        </div>
    </AccessibleDialog>);

}
