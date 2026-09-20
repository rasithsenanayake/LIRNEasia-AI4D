import React from 'react';
import { XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

type TagKind = 'topic' | 'country' | 'sector' | 'type' | 'orgType' | 'dimension';

const kindStyles: Record<TagKind, string> = {
  topic: 'bg-accent-wash text-accent-dark border-accent-soft',
  country: 'bg-raised text-ink-soft border-line',
  sector: 'bg-raised text-ink-soft border-line',
  type: 'bg-ink text-ink-inverse border-ink',
  orgType: 'bg-raised text-ink-soft border-line',
  dimension: 'bg-white text-ink-soft border-line-strong'
};

export function Tag({
  children,
  kind = 'topic',
  className




}: {children: React.ReactNode;kind?: TagKind;className?: string;}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-meta leading-snug',
        kindStyles[kind],
        className
      )}>
      
      {children}
    </span>);

}

/** Content-type label used consistently across every card and detail header. */
export function TypeLabel({ type, className }: {type: string;className?: string;}) {
  return (
    <span
      className={cn(
        'inline-block text-[0.6875rem] font-semibold uppercase tracking-[0.09em] text-accent-dark',
        className
      )}>
      
      {type}
    </span>);

}

export function FilterChip({ label, group, onRemove }: {label: string;group: string;onRemove: () => void;}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-accent-soft bg-accent-wash py-1 pl-2.5 pr-1 text-meta text-accent-dark">
      <span className="sr-only">{group}: </span>
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${group}: ${label}`}
        className="rounded p-0.5 text-accent-dark/70 transition-colors duration-150 ease-out hover:bg-accent-soft hover:text-accent-dark">
        
        <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </span>);

}