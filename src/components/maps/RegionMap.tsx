import React from 'react';
import type { Country } from '../../types';
import { cn } from '../../utils/cn';

interface Props {
  countries: Country[];
  valueFor: (country: Country) => number;
  maxValue: number;
  selectedCode: string | null;
  onSelect: (country: Country) => void;
  legendLabel: string;
  unit?: string;
}

/**
 * Tile cartogram of South and Southeast Asia. Each country occupies one tile in
 * roughly geographic position. A cartogram is used deliberately: it keeps small
 * states legible, renders instantly on low-bandwidth connections, and every tile
 * is a real keyboard-focusable control rather than an SVG path.
 */
export function RegionMap({
  countries,
  valueFor,
  maxValue,
  selectedCode,
  onSelect,
  legendLabel,
  unit
}: Props) {
  const cols = 8;
  const rows = 5;

  return (
    <div>
      <div
        role="group"
        aria-label="Regional tile map of South and Southeast Asia"
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        }}>
        
        {countries.map((country) => {
          const value = valueFor(country);
          const intensity = maxValue > 0 ? Math.min(1, value / maxValue) : 0;
          const selected = selectedCode === country.code;
          const dark = intensity > 0.55;
          return (
            <button
              key={country.code}
              type="button"
              onClick={() => onSelect(country)}
              aria-pressed={selected}
              title={`${country.name} — ${value}${unit ? ` ${unit}` : ''}`}
              className={cn(
                'group relative flex aspect-square flex-col items-center justify-center rounded border text-center transition-[transform,border-color] duration-150 ease-out',
                selected ?
                'border-ink ring-2 ring-ink ring-offset-1' :
                'border-line-strong hover:-translate-y-0.5 hover:border-accent'
              )}
              style={{
                gridColumn: country.grid.col + 1,
                gridRow: country.grid.row + 1,
                backgroundColor: `rgba(14, 82, 101, ${0.08 + intensity * 0.82})`
              }}>
              
              <img
                src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                alt=""
                aria-hidden="true"
                className="h-auto w-8 rounded-[2px] shadow-sm sm:w-9" />
              <span
                className={cn(
                  'font-serif text-sm leading-none sm:text-base',
                  dark ? 'text-white' : 'text-ink'
                )}>
                
                {value}
              </span>
              <span className="sr-only">
                {country.name}, {value} {unit ?? ''}
              </span>
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {country.name}
              </span>
            </button>);

        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-meta text-ink-muted">
        <span className="font-medium text-ink-soft">{legendLabel}</span>
        <span className="flex items-center gap-1.5">
          <span>Low</span>
          {[0.12, 0.3, 0.5, 0.7, 0.9].map((a) =>
          <span
            key={a}
            aria-hidden="true"
            className="h-3.5 w-6 rounded-sm border border-line"
            style={{ backgroundColor: `rgba(14, 82, 101, ${a})` }} />

          )}
          <span>High</span>
        </span>
        <span>Values are also printed on each tile.</span>
      </div>
    </div>);

}
