'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlobeIcon, LayersIcon, SearchIcon, TagIcon } from 'lucide-react';
import { Container } from '../ui/Primitives';
import { Link } from '../ui/Link';

const CHIPS = ['AI Governance', 'Healthcare', 'Inclusive AI', 'Sri Lanka', 'Public Sector'];

const BROWSE = [
{ label: 'Explore by Country', to: '/countries', icon: GlobeIcon, hint: '19 country hubs' },
{ label: 'Explore by Topic', to: '/topics', icon: TagIcon, hint: '7 research topics' },
{ label: 'Explore by Content Type', to: '/explore', icon: LayersIcon, hint: 'Research, data, people' }];


export function UniversalSearch() {
  const [value, setValue] = useState('');
  const router = useRouter();

  return (
    <section aria-labelledby="universal-search-heading" className="bg-canvas">
      <Container className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="universal-search-heading" className="font-serif text-[1.75rem] leading-tight text-ink sm:text-[2rem]">
            What are you looking for?
          </h2>
          <p className="mt-2 text-[1.0625rem] text-ink-soft">
            One search across research, use cases, datasets, people, organizations and events.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/explore?q=${encodeURIComponent(value.trim())}`);
            }}
            role="search"
            className="mt-6 flex flex-col gap-3 sm:flex-row">
            
            <label htmlFor="home-search" className="sr-only">
              Search research, projects, people, organizations and datasets
            </label>
            <div className="relative flex-1">
              <SearchIcon
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted"
                aria-hidden="true" />
              
              <input
                id="home-search"
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search research, projects, people, organizations, datasets…"
                className="min-h-[60px] w-full rounded-lg border border-line-strong bg-surface pl-12 pr-4 text-[1rem] text-ink shadow-card placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30" />
              
            </div>
            <button
              type="submit"
              className="inline-flex min-h-[60px] items-center justify-center rounded-lg bg-accent px-7 text-[1rem] font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-dark">
              
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-meta text-ink-muted">Try:</span>
            {CHIPS.map((chip) =>
            <Link
              key={chip}
              to={`/explore?q=${encodeURIComponent(chip)}`}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-meta text-ink-soft transition-colors duration-150 ease-out hover:border-accent-soft hover:bg-accent-wash hover:text-accent-dark">
              
                {chip}
              </Link>
            )}
          </div>
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
          {BROWSE.map((b) =>
          <li key={b.label}>
              <Link
              to={b.to}
              className="group flex h-full items-center gap-3 rounded-lg border border-line bg-surface p-4 transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:shadow-lift">
              
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-accent-wash text-accent">
                  <b.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[0.9375rem] font-semibold text-ink group-hover:text-accent">
                    {b.label}
                  </span>
                  <span className="block text-meta text-ink-muted">{b.hint}</span>
                </span>
              </Link>
            </li>
          )}
        </ul>
      </Container>
    </section>);

}
