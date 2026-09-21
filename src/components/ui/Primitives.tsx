import React from 'react';
import { Link } from './Link';
import { ChevronRightIcon, InfoIcon, SearchXIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Container({ children, className }: {children: React.ReactNode;className?: string;}) {
  return <div className={cn('mx-auto w-full max-w-content px-4 sm:px-8 lg:px-12', className)}>{children}</div>;
}

export function Breadcrumbs({ items }: {items: {label: string;to?: string;}[];}) {
  return (
    <nav aria-label="Breadcrumb" className="text-meta">
      <ol className="flex min-w-0 flex-wrap items-center gap-1 text-ink-muted">
        {items.map((item, i) =>
        <li key={`${item.label}-${i}`} className="flex min-w-0 items-center gap-1">
            {item.to ?
          <Link to={item.to} className="min-w-0 break-words rounded underline-offset-2 hover:text-accent hover:underline">
                {item.label}
              </Link> :

          <span aria-current="page" className="min-w-0 break-words text-ink-soft">
                {item.label}
              </span>
          }
            {i < items.length - 1 && <ChevronRightIcon className="h-3.5 w-3.5 text-line-strong" aria-hidden="true" />}
          </li>
        )}
      </ol>
    </nav>);

}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  id






}: {eyebrow?: string;title: string;description?: string;action?: React.ReactNode;id?: string;}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow &&
        <p className="mb-2 text-meta font-semibold uppercase tracking-[0.09em] text-accent">{eyebrow}</p>
        }
        <h2 id={id} className="font-serif text-[1.75rem] leading-tight text-ink sm:text-[2rem]">
          {title}
        </h2>
        {description && <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{description}</p>}
      </div>
      {action && <div className="w-full shrink-0 md:w-auto [&>*]:w-full md:[&>*]:w-auto">{action}</div>}
    </div>);

}

export function MetricCard({ label, value, hint }: {label: string;value: number | string;hint?: string;}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <p className="font-serif text-3xl leading-none text-ink">{value}</p>
      <p className="mt-2 text-meta font-medium text-ink-soft">{label}</p>
      {hint && <p className="mt-1 text-[0.75rem] text-ink-muted">{hint}</p>}
    </div>);

}

export function DemoDataNote({ className, children }: {className?: string;children?: React.ReactNode;}) {
  return (
    <p className={cn('flex items-start gap-2 text-meta text-ink-muted', className)}>
      <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
      <span>{children ?? 'Preview data: figures are illustrative until launch.'}</span>
    </p>);

}

export function EmptyState({
  title,
  description,
  actions




}: {title: string;description: string;actions?: React.ReactNode;}) {
  return (
    <div className="rounded-lg border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
      <SearchXIcon className="mx-auto h-8 w-8 text-ink-muted" aria-hidden="true" />
      <h3 className="mt-4 font-serif text-xl text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">{description}</p>
      {actions && <div className="mt-6 flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>);

}

export function Skeleton({ className }: {className?: string;}) {
  return <div className={cn('animate-pulse rounded bg-raised', className)} aria-hidden="true" />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-3 h-5 w-full" />
      <Skeleton className="mt-2 h-5 w-3/4" />
      <Skeleton className="mt-4 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-5/6" />
      <div className="mt-5 flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>);

}

export function Divider({ className }: {className?: string;}) {
  return <hr className={cn('border-0 border-t border-line', className)} />;
}
