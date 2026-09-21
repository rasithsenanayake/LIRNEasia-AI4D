import React from 'react';
import Image from 'next/image';
import { Link } from '../ui/Link';
import { footerColumns } from '../../data/navigation';
import { partners } from '../../data/network';
import { Container } from '../ui/Primitives';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Image src="/imagers/fav%20icon.png" alt="Asia AI4D Observatory" width={36} height={36} className="h-9 w-9 rounded object-cover" />
              {/*
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M3.5 12h17M12 3.5c2.4 2.6 2.4 14.4 0 17M12 3.5c-2.4 2.6-2.4 14.4 0 17" />
                </svg>
              </span> */}
              <span className="leading-tight">
                <span className="block font-serif text-[1.0625rem] font-semibold text-ink">Asia AI4D</span>
                <span className="block text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">Observatory</span>
              </span>
            </div>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
              A policy and innovation network on responsible artificial intelligence, connecting research, people and
              evidence across South and Southeast Asia.
            </p>
            <p className="mt-4 text-meta text-ink-muted">Hosted by LIRNEasia.</p>
          </div>

          {footerColumns.map((col) =>
          <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-meta font-semibold uppercase tracking-[0.08em] text-ink">{col.heading}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) =>
              <li key={link.label}>
                    <Link
                  to={link.to}
                  className="text-[0.9375rem] text-ink-soft underline-offset-4 transition-colors duration-150 ease-out hover:text-accent hover:underline">
                  
                      {link.label}
                    </Link>
                  </li>
              )}
              </ul>
            </nav>
          )}
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <h2 className="text-meta font-semibold uppercase tracking-[0.08em] text-ink-muted">
            Partners and funders
          </h2>
          <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
            {partners.map((p) =>
            <li key={p.id} className="text-[0.9375rem] font-medium text-ink-soft">
                {p.name}
              </li>
            )}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-meta text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LIRNEasia · Asia AI4D Observatory</p>
          <p className="max-w-xl">
            Prototype for proposal review. Content, statistics and profiles shown are illustrative placeholders and do
            not represent verified research findings.
          </p>
        </div>
      </Container>
    </footer>);

}
