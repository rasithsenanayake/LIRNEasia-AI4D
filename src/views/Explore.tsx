'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BookOpenIcon,
  Building2Icon,
  CalendarIcon,
  CheckIcon,
  DatabaseIcon,
  GraduationCapIcon,
  LayoutGridIcon,
  LightbulbIcon,
  LinkIcon,
  ListIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  UsersIcon,
  XIcon } from
'lucide-react';
import { Breadcrumbs, CardSkeleton, Container, EmptyState } from '../components/ui/Primitives';
import { FilterPanel } from '../components/filters/FilterPanel';
import type { FilterGroupDef } from '../components/filters/FilterGroup';
import { FilterChip } from '../components/ui/Tag';
import { ResourceCard } from '../components/cards/ResourceCard';
import { LinkButton } from '../components/ui/Button';
import { countryNames } from '../data/countries';
import {
  ecosystemCategories,
  organizationTypes,
  responsibleAiDimensions,
  sectors,
  topicNames,
  years } from
'../data/taxonomy';
import { emptyFilters, filterRecords, sortRecords, type SortKey } from '../utils/searchIndex';
import { cn } from '../utils/cn';
import { Link } from '../components/ui/Link';
import { copyToClipboard } from '../utils/browser';

const CONTENT_TYPES = [
'Use Case',
'Report',
'Policy Brief',
'Research Brief',
'Innovation Brief',
'Mapping Study',
'Commentary',
'Dataset',
'Person',
'Organization',
'Event',
'Learning Resource'];


const FILTER_GROUPS: FilterGroupDef[] = [
{ key: 'country', label: 'Country', options: countryNames },
{ key: 'type', label: 'Content Type', options: CONTENT_TYPES },
{ key: 'topic', label: 'Topic', options: topicNames },
{ key: 'sector', label: 'Sector', options: sectors },
{ key: 'dimension', label: 'Responsible AI Dimension', options: responsibleAiDimensions },
{ key: 'ecosystem', label: 'AI Ecosystem Category', options: ecosystemCategories },
{ key: 'orgType', label: 'Organization Type', options: organizationTypes },
{ key: 'year', label: 'Year', options: years.map(String) }];


const QUICK_BROWSE = [
{ label: 'Use Cases', type: 'Use Case', icon: LightbulbIcon },
{ label: 'Publications', type: 'Report', icon: BookOpenIcon },
{ label: 'Datasets', type: 'Dataset', icon: DatabaseIcon },
{ label: 'People', type: 'Person', icon: UsersIcon },
{ label: 'Organizations', type: 'Organization', icon: Building2Icon },
{ label: 'Learning Resources', type: 'Learning Resource', icon: GraduationCapIcon },
{ label: 'Events', type: 'Event', icon: CalendarIcon }];


export function Explore() {
  const params = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState<'card' | 'list'>('card');
  const [sort, setSort] = useState<SortKey>('relevance');
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'unavailable'>('idle');
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const query = params.get('q') ?? '';
  const [inputValue, setInputValue] = useState(query);
  useEffect(() => setInputValue(query), [query]);

  const selected = useMemo(() => {
    const map: Record<string, string[]> = {};
    FILTER_GROUPS.forEach((g) => {
      map[g.key] = params.getAll(g.key);
    });
    return map;
  }, [params]);

  const activeChips = FILTER_GROUPS.flatMap((g) =>
  (selected[g.key] ?? []).map((value) => ({ key: g.key, group: g.label, value }))
  );

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 220);
    return () => window.clearTimeout(t);
  }, [params]);

  const results = useMemo(() => {
    const filters = {
      ...emptyFilters,
      query,
      countries: selected.country ?? [],
      contentTypes: selected.type ?? [],
      topics: selected.topic ?? [],
      sectors: selected.sector ?? [],
      dimensions: selected.dimension ?? [],
      ecosystem: selected.ecosystem ?? [],
      orgTypes: selected.orgType ?? [],
      years: selected.year ?? []
    };
    return sortRecords(filterRecords(filters), sort);
  }, [query, selected, sort]);

  function updateParams(mutate: (p: URLSearchParams) => void) {
    const next = new URLSearchParams(params);
    mutate(next);
    const queryString = next.toString();
    router.push(queryString ? `/explore?${queryString}` : '/explore');
  }

  function toggle(key: string, value: string) {
    updateParams((p) => {
      const current = p.getAll(key);
      p.delete(key);
      const nextValues = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      nextValues.forEach((v) => p.append(key, v));
    });
  }

  function removeChip(key: string, value: string) {
    toggle(key, value);
  }

  function clearAll() {
    updateParams((p) => {
      FILTER_GROUPS.forEach((g) => p.delete(g.key));
    });
  }

  async function copyLink() {
    setCopyStatus(await copyToClipboard(window.location.href) ? 'copied' : 'unavailable');
    window.setTimeout(() => setCopyStatus('idle'), 2000);
  }

  useEffect(() => {
    if (!sheetOpen) return;
    const previousOverflow = document.body.style.overflow;
    const filterButton = filterButtonRef.current;
    document.body.style.overflow = 'hidden';
    const focusables = () => Array.from(sheetRef.current?.querySelectorAll<HTMLElement>('button, input, select, [href]') ?? []);
    focusables()[0]?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSheetOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      filterButton?.focus();
    };
  }, [sheetOpen]);

  const filterPanel =
  <FilterPanel
    groups={FILTER_GROUPS}
    selected={selected}
    onToggle={toggle}
    onClear={clearAll}
    activeCount={activeChips.length} />;



  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="py-10 lg:py-12">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Explore' }]} />
          <h1 className="mt-5 font-serif text-[2rem] leading-tight text-ink sm:text-[2.5rem]">
            Explore the Knowledge Repository
          </h1>
          <p className="mt-3 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-soft">
            Search research, responsible AI use cases, datasets, people, organizations, events and learning resources
            from across South and Southeast Asia.
          </p>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              updateParams((p) => {
                if (inputValue.trim()) p.set('q', inputValue.trim());else
                p.delete('q');
              });
            }}
            className="mt-7 flex flex-col gap-3 sm:flex-row">
            
            <label htmlFor="repo-search" className="sr-only">
              Search the repository
            </label>
            <div className="relative flex-1">
              <SearchIcon
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted"
                aria-hidden="true" />
              
              <input
                id="repo-search"
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search research, projects, people, organizations, datasets…"
                className="min-h-[56px] w-full rounded-lg border border-line-strong bg-canvas pl-12 pr-4 text-[1rem] text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30" />
              
            </div>
            <button
              type="submit"
              className="inline-flex min-h-[56px] items-center justify-center rounded-lg bg-accent px-7 text-[1rem] font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-dark">
              
              Search
            </button>
          </form>

          <nav aria-label="Quick browse" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {QUICK_BROWSE.map((q) => {
                const isActive = (selected.type ?? []).includes(q.type);
                return (
                  <li key={q.label}>
                    <button
                      type="button"
                      onClick={() => toggle('type', q.type)}
                      aria-pressed={isActive}
                      className={cn(
                        'inline-flex min-h-[40px] items-center gap-2 rounded-md border px-3 text-meta font-medium transition-colors duration-150 ease-out',
                        isActive ?
                        'border-accent bg-accent text-white' :
                        'border-line bg-canvas text-ink-soft hover:border-accent-soft hover:bg-accent-wash hover:text-accent-dark'
                      )}>
                      
                      <q.icon className="h-4 w-4" aria-hidden="true" />
                      {q.label}
                    </button>
                  </li>);

              })}
            </ul>
          </nav>
        </Container>
      </div>

      <Container className="py-8 lg:py-10">
        <div className="lg:grid lg:grid-cols-[264px_1fr] lg:gap-10">
          <aside aria-label="Filters" className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">{filterPanel}</div>
          </aside>

          <div className="min-w-0">
            {activeChips.length > 0 &&
            <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="text-meta font-semibold uppercase tracking-[0.08em] text-ink-muted">
                  Active filters
                </span>
                {activeChips.map((chip) =>
              <FilterChip
                key={`${chip.key}-${chip.value}`}
                label={chip.value}
                group={chip.group}
                onRemove={() => removeChip(chip.key, chip.value)} />

              )}
                <button
                type="button"
                onClick={clearAll}
                className="rounded px-1 text-meta font-medium text-accent underline-offset-4 hover:underline">
                
                  Clear all
                </button>
              </div>
            }

            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
              <p aria-live="polite" className="text-[1.0625rem] font-medium text-ink">
                {loading ? 'Searching…' : `${results.length} ${results.length === 1 ? 'resource' : 'resources'}`}
                {query && !loading && <span className="font-normal text-ink-soft"> for “{query}”</span>}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-line px-3 text-meta font-medium text-ink-soft transition-colors duration-150 ease-out hover:bg-raised">
                  
                  {copyStatus === 'copied' ?
                  <CheckIcon className="h-4 w-4 text-accent" aria-hidden="true" /> :

                  <LinkIcon className="h-4 w-4" aria-hidden="true" />
                  }
                  {copyStatus === 'copied' ? 'Link copied' : 'Copy search link'}
                </button>
                <span role="status" aria-live="polite" className="sr-only">
                  {copyStatus === 'copied' ? 'Search link copied.' : copyStatus === 'unavailable' ? 'Copying is unavailable in this browser.' : ''}
                </span>

                <div>
                  <label htmlFor="sort" className="sr-only">
                    Sort results
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="min-h-[40px] rounded-md border border-line bg-surface px-3 text-meta text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30">
                    
                    <option value="relevance">Most relevant</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </div>

                <div className="inline-flex rounded-md border border-line p-0.5" role="group" aria-label="Result view">
                  {(['card', 'list'] as const).map((v) =>
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    aria-pressed={view === v}
                    className={cn(
                      'inline-flex min-h-[36px] items-center gap-1.5 rounded px-2.5 text-meta font-medium transition-colors duration-150 ease-out',
                      view === v ? 'bg-ink text-ink-inverse' : 'text-ink-soft hover:bg-raised'
                    )}>
                    
                      {v === 'card' ?
                    <LayoutGridIcon className="h-4 w-4" aria-hidden="true" /> :

                    <ListIcon className="h-4 w-4" aria-hidden="true" />
                    }
                      {v === 'card' ? 'Cards' : 'Compact'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {loading ?
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) =>
              <li key={i}>
                    <CardSkeleton />
                  </li>
              )}
              </ul> :
            results.length === 0 ?
            <EmptyState
              title="No exact matches were found."
              description="Try removing one filter, searching a related topic, or browsing the repository from the top."
              actions={
              <>
                    {activeChips.length > 0 &&
                <button
                  type="button"
                  onClick={() => removeChip(activeChips[0].key, activeChips[0].value)}
                  className="inline-flex min-h-[44px] items-center rounded-md bg-accent px-4 text-[0.9375rem] font-medium text-white hover:bg-accent-dark">
                  
                        Remove “{activeChips[0].value}”
                      </button>
                }
                    <LinkButton to="/explore" variant="secondary">
                      Browse all resources
                    </LinkButton>
                    <LinkButton to="/countries" variant="secondary">
                      Explore countries
                    </LinkButton>
                  </>
              } /> :

            view === 'card' ?
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((r) =>
              <li key={r.id}>
                    <ResourceCard record={r} />
                  </li>
              )}
              </ul> :

            <div className="rounded-lg border border-line bg-surface px-5">
                {results.map((r) =>
              <ResourceCard key={r.id} record={r} view="list" />
              )}
              </div>
            }

            {!loading && results.length > 0 &&
            <p className="mt-8 text-center text-meta text-ink-muted">
                Showing all {results.length} matching records in this prototype dataset. Production listings paginate
                at 24 per page.{' '}
                <Link to="/explore" className="font-medium text-accent underline-offset-4 hover:underline">
                  Reset search
                </Link>
              </p>
            }
          </div>
        </div>
      </Container>

      {/* Mobile filter trigger + bottom sheet */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-surface/95 p-3 backdrop-blur lg:hidden">
        <button
          ref={filterButtonRef}
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-controls="mobile-filters"
          aria-expanded={sheetOpen}
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-md bg-ink px-4 text-[1rem] font-medium text-ink-inverse">
          
          <SlidersHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          Filters
          {activeChips.length > 0 &&
          <span className="rounded bg-white/20 px-2 py-0.5 text-meta">{activeChips.length}</span>
          }
        </button>
      </div>

      {sheetOpen &&
      <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setSheetOpen(false)} aria-hidden="true" />
          <div
          ref={sheetRef}
          id="mobile-filters"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filters-heading"
          className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-xl border-t border-line bg-surface motion-safe:animate-[sheetIn_220ms_cubic-bezier(0.23,1,0.32,1)]">
          
            <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-3">
              <h2 id="mobile-filters-heading" className="text-[1.0625rem] font-semibold text-ink">Filters</h2>
              <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-ink hover:bg-raised">
              
                <XIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Close filters</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-2">{filterPanel}</div>
            <div className="shrink-0 border-t border-line p-4">
              <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-md bg-accent px-4 text-[1rem] font-medium text-white">
              
                Show {results.length} {results.length === 1 ? 'result' : 'results'}
              </button>
            </div>
          </div>
        </div>
      }
    </>);

}
