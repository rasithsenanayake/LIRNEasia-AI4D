'use client';

import React, { useState } from 'react';
import { TableIcon, BarChart3Icon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ChartDatum {
  label: string;
  value: number;
  note?: string;
}

interface Props {
  title: string;
  description: string;
  data: ChartDatum[];
  unit: string;
  max?: number;
  source: string;
  updated: string;
  methodologyHref?: string;
}

/**
 * Horizontal bar chart with a built-in accessible table alternative.
 * Rendered as plain DOM so it stays light on low-bandwidth connections.
 */
export function ChartFigure({ title, description, data, unit, max, source, updated, methodologyHref }: Props) {
  const [view, setView] = useState<'chart' | 'table'>('chart');
  const ceiling = max ?? Math.max(...data.map((d) => d.value));

  return (
    <figure className="rounded-lg border border-line bg-surface p-5 sm:p-6">
      <figcaption className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <h3 className="font-serif text-lg leading-snug text-ink">{title}</h3>
          <p className="mt-1.5 text-meta leading-relaxed text-ink-soft">{description}</p>
        </div>
        <div className="inline-flex shrink-0 rounded-md border border-line p-0.5" role="group" aria-label="Chart view">
          {(['chart', 'table'] as const).map((v) =>
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            aria-pressed={view === v}
            className={cn(
              'inline-flex min-h-[36px] items-center gap-1.5 rounded px-3 text-meta font-medium transition-colors duration-150 ease-out',
              view === v ? 'bg-ink text-ink-inverse' : 'text-ink-soft hover:bg-raised'
            )}>
            
              {v === 'chart' ?
            <BarChart3Icon className="h-4 w-4" aria-hidden="true" /> :

            <TableIcon className="h-4 w-4" aria-hidden="true" />
            }
              {v === 'chart' ? 'Chart' : 'View as table'}
            </button>
          )}
        </div>
      </figcaption>

      {view === 'chart' ?
      <ul className="space-y-3">
          {data.map((d) =>
        <li key={d.label} className="grid grid-cols-[minmax(96px,150px)_1fr_auto] items-center gap-3">
              <span className="truncate text-meta font-medium text-ink-soft">{d.label}</span>
              <span className="h-3 w-full overflow-hidden rounded-sm bg-raised" aria-hidden="true">
                <span
              className="block h-full rounded-sm bg-accent"
              style={{ width: `${ceiling > 0 ? d.value / ceiling * 100 : 0}%` }} />
            
              </span>
              <span className="w-16 text-right font-serif text-base tabular-nums text-ink">{d.value}</span>
            </li>
        )}
        </ul> :

      <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] border-collapse text-left text-[0.9375rem]">
            <caption className="sr-only">{title} — data table</caption>
            <thead>
              <tr className="border-b border-line-strong">
                <th scope="col" className="py-2 pr-4 text-meta font-semibold uppercase tracking-wide text-ink-muted">
                  Country
                </th>
                <th scope="col" className="py-2 pr-4 text-meta font-semibold uppercase tracking-wide text-ink-muted">
                  {unit}
                </th>
                <th scope="col" className="py-2 text-meta font-semibold uppercase tracking-wide text-ink-muted">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) =>
            <tr key={d.label} className="border-b border-line last:border-b-0">
                  <th scope="row" className="py-2.5 pr-4 font-medium text-ink">
                    {d.label}
                  </th>
                  <td className="py-2.5 pr-4 tabular-nums text-ink-soft">{d.value}</td>
                  <td className="py-2.5 text-meta text-ink-muted">{d.note ?? 'Illustrative demo value'}</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      }

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-line pt-4 text-meta text-ink-muted">
        <span>
          <span className="font-medium text-ink-soft">Source:</span> {source}
        </span>
        <span>
          <span className="font-medium text-ink-soft">Last updated:</span> {updated}
        </span>
        {methodologyHref &&
        <a href={methodologyHref} className="font-medium text-accent underline-offset-4 hover:underline">
            View methodology
          </a>
        }
      </div>
    </figure>);

}
