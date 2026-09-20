import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, SearchIcon, XIcon } from 'lucide-react';
import { navGroups } from '../../data/navigation';
import { cn } from '../../utils/cn';

export function MobileNav({
  open,
  onClose,
  onOpenSearch




}: {open: boolean;onClose: () => void;onOpenSearch: () => void;}) {
  const [expanded, setExpanded] = useState<string | null>('Explore');

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-50 flex flex-col bg-surface lg:hidden">
      
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
        <span className="font-serif text-[1.0625rem] font-semibold text-ink">Menu</span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-ink hover:bg-raised">
          
          <XIcon className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex min-h-[52px] w-full items-center gap-3 rounded-md border border-line bg-raised px-4 text-left text-[0.9375rem] text-ink-muted">
          
          <SearchIcon className="h-5 w-5" aria-hidden="true" />
          Search the Observatory
        </button>

        <nav aria-label="Mobile" className="mt-5">
          <ul className="divide-y divide-line border-y border-line">
            {navGroups.map((group) => {
              const isOpen = expanded === group.label;
              return (
                <li key={group.label}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : group.label)}
                    className="flex min-h-[56px] w-full items-center justify-between gap-3 py-3 text-left text-[1rem] font-semibold text-ink">
                    
                    {group.label}
                    <ChevronDownIcon
                      className={cn('h-5 w-5 text-ink-muted transition-transform duration-150 ease-out', isOpen && 'rotate-180')}
                      aria-hidden="true" />
                    
                  </button>
                  {isOpen &&
                  <ul className="pb-3">
                      {group.columns.flatMap((c) => c.links).map((link) =>
                    <li key={link.label}>
                          <Link
                        to={link.to}
                        onClick={onClose}
                        className="block min-h-[48px] rounded px-3 py-3 text-[0.9375rem] text-ink-soft hover:bg-accent-wash hover:text-accent-dark">
                        
                            {link.label}
                          </Link>
                        </li>
                    )}
                    </ul>
                  }
                </li>);

            })}
          </ul>
        </nav>
      </div>

      <div className="shrink-0 border-t border-line p-5">
        <Link
          to="/newsletter"
          onClick={onClose}
          className="flex min-h-[52px] w-full items-center justify-center rounded-md bg-accent px-4 text-[1rem] font-medium text-white">
          
          Subscribe to the newsletter
        </Link>
      </div>
    </div>);

}