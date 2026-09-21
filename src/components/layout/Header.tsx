'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { navGroups } from '../../data/navigation';
import { SearchDialog } from '../search/SearchDialog';
import { MobileNav } from './MobileNav';
import { cn } from '../../utils/cn';
import { Link } from '../ui/Link';

function matchesPath(pathname: string, to: string) {
  const path = to.split('?')[0];
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenMenu(null);
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    function onPointer(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, []);

  return (
    <>
      <header
        onMouseLeave={() => setOpenMenu(null)}
        className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
        <div className="mx-auto flex h-16 max-w-[96rem] items-center gap-4 px-5 sm:px-8 lg:h-[72px] lg:gap-8 lg:px-12">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 rounded" aria-label="Asia AI4D Observatory — home">
            <Image src="/imagers/fav%20icon.png" alt="" width={36} height={36} priority className="h-9 w-9 rounded object-cover" />
            {/* <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded bg-accent">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="1.6">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M3.5 12h17M12 3.5c2.4 2.6 2.4 14.4 0 17M12 3.5c-2.4 2.6-2.4 14.4 0 17" />
              </svg>
            </span> */}
            <span className="leading-tight">
              <span className="block font-serif text-[1.0625rem] font-semibold text-ink">Asia AI4D</span>
              <span className="block text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">Observatory</span>
            </span>
          </Link>

          <div ref={navRef} className="hidden flex-1 lg:block">
            <nav aria-label="Main">
              <ul className="flex items-center gap-1 whitespace-nowrap">
                {navGroups.map((group) => {
                  const isOpen = openMenu === group.label;
                  const isActive = matchesPath(pathname, group.to) || group.columns.some((column) =>
                    column.links.some((link) => link.to.split('?')[0] !== '/explore' && matchesPath(pathname, link.to))
                  );
                  return (
                    <li key={group.label} onMouseEnter={() => setOpenMenu(group.label)}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        aria-current={isActive ? 'page' : undefined}
                        onFocus={() => setOpenMenu(group.label)}
                        onClick={() => setOpenMenu(isOpen ? null : group.label)}
                        className={cn(
                          'inline-flex items-center gap-1 whitespace-nowrap rounded px-2.5 py-2 text-[0.9375rem] font-medium transition-colors duration-150 ease-out',
                          isOpen || isActive ? 'font-semibold text-accent-dark' : 'text-ink-soft hover:font-semibold hover:text-accent'
                        )}>
                        
                        {group.label}
                        <ChevronDownIcon
                          className={cn('h-4 w-4 transition-transform duration-150 ease-out', isOpen && 'rotate-180')}
                          aria-hidden="true" />
                        
                      </button>
                    </li>);

                })}
              </ul>
            </nav>

            {navGroups.map((group) =>
            openMenu === group.label ?
            <div
              key={group.label}
              onMouseLeave={() => setOpenMenu(null)}
              className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-panel motion-safe:animate-[megaIn_180ms_cubic-bezier(0.23,1,0.32,1)]">
              
                  <div className="mx-auto grid max-w-content grid-cols-[1fr_1fr_minmax(0,320px)] gap-10 px-12 py-8">
                    {group.columns.map((col) =>
                <div key={col.heading}>
                        <h2 className="text-meta font-semibold uppercase tracking-[0.08em] text-ink-muted">
                          {col.heading}
                        </h2>
                        <ul className="mt-3 space-y-1">
                          {col.links.map((link) =>
                    <li key={link.label}>
                              <Link
                        to={link.to}
                        className="block rounded px-2 py-1.5 text-[0.9375rem] font-medium text-ink transition-colors duration-150 ease-out hover:bg-accent-wash hover:text-accent-dark">
                        
                                {link.label}
                                {link.description &&
                        <span className="mt-0.5 block text-meta font-normal text-ink-muted">
                                    {link.description}
                                  </span>
                        }
                              </Link>
                            </li>
                    )}
                        </ul>
                      </div>
                )}
                    <Link
                  to={group.highlight.to}
                  className="rounded-lg border border-line bg-raised p-5 transition-colors duration-150 ease-out hover:border-accent-soft hover:bg-accent-wash">
                  
                      <span className="text-meta font-semibold uppercase tracking-[0.08em] text-accent">
                        {group.highlight.label}
                      </span>
                      <span className="mt-2 block font-serif text-lg leading-snug text-ink">
                        {group.highlight.title}
                      </span>
                      <span className="mt-2 block text-meta leading-relaxed text-ink-soft">
                        {group.highlight.description}
                      </span>
                    </Link>
                  </div>
                </div> :
            null
            )}
          </div>

          <div className="ml-auto flex items-center gap-1.5 lg:gap-3">
            <button
              ref={searchButtonRef}
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-2.5 text-ink-soft transition-colors duration-150 ease-out hover:bg-raised hover:text-ink sm:border sm:border-line sm:bg-raised/60 sm:pr-3">
              
              <SearchIcon className="h-5 w-5" aria-hidden="true" />
              <span className="hidden text-meta sm:inline">Search</span>
              <kbd className="hidden rounded border border-line-strong bg-surface px-1.5 py-0.5 text-[0.6875rem] text-ink-muted lg:inline">
                ⌘K
              </kbd>
              <span className="sr-only">Search the Observatory</span>
            </button>

            <span
              aria-hidden="true"
              title="Language selection — planned"
              className="hidden min-h-[44px] items-center rounded-md px-2 text-meta text-ink-muted xl:inline-flex">
              
              EN
            </span>

            <Link
              to="/newsletter"
              className="hidden min-h-[44px] items-center rounded-md bg-accent px-4 text-[0.9375rem] font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-dark sm:inline-flex">
              
              Newsletter preview
            </Link>

            <button
              ref={mobileButtonRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-raised lg:hidden">
              
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </header>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        returnFocusRef={searchButtonRef}
      />
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        returnFocusRef={mobileButtonRef}
        onOpenSearch={() => {
          setMobileOpen(false);
          setSearchOpen(true);
        }} />
      
    </>);

}
