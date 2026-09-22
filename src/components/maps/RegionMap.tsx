import React from 'react';
import type { Country } from '../../types';
import { cn } from '../../utils/cn';

function flagFor(code: string) {
  const common = { className: 'h-6 w-9 overflow-hidden rounded-[2px] border border-black/10 shadow-sm', viewBox: '0 0 3 2', role: 'img' as const };

  switch (code.toUpperCase()) {
    case 'AF':
      return <svg {...common} aria-label="Afghanistan flag"><rect width="1" height="2" fill="#111" /><rect x="1" width="1" height="2" fill="#c8102e" /><rect x="2" width="1" height="2" fill="#078930" /><circle cx="1.5" cy="1" r="0.23" fill="#f6d04d" /></svg>;
    case 'PK':
      return <svg {...common} aria-label="Pakistan flag"><rect width="3" height="2" fill="#115740" /><rect width="0.55" height="2" fill="#f7f7f2" /><circle cx="1.85" cy="0.95" r="0.42" fill="#f7f7f2" /><circle cx="2" cy="0.82" r="0.36" fill="#115740" /><path d="M2.45.42l.08.2.22.01-.17.13.06.21-.19-.12-.19.12.06-.21-.17-.13.22-.01z" fill="#f7f7f2" /></svg>;
    case 'NP':
      return <svg {...common} className={`${common.className} rounded-none`} viewBox="0 0 2 3" aria-label="Nepal flag"><path d="M.1.1h1.25L.1 1.35h1.25L.1 2.9z" fill="#dc143c" stroke="#003893" strokeWidth=".15" /><circle cx=".55" cy=".8" r=".13" fill="#f7f7f2" /><circle cx=".56" cy="1.85" r=".17" fill="#f7f7f2" /></svg>;
    case 'BT':
      return <img src="/flags/bhutan.svg" alt="Bhutan flag" className={common.className} />;
    case 'IN':
      return <svg {...common} aria-label="India flag"><rect width="3" height=".67" fill="#ff9933" /><rect y=".67" width="3" height=".66" fill="#f7f7f2" /><rect y="1.33" width="3" height=".67" fill="#138808" /><circle cx="1.5" cy="1" r=".2" fill="none" stroke="#000080" strokeWidth=".05" /></svg>;
    case 'BD':
      return <svg {...common} aria-label="Bangladesh flag"><rect width="3" height="2" fill="#006a4e" /><circle cx="1.35" cy="1" r=".58" fill="#f42a41" /></svg>;
    case 'LK':
      return <img src="/flags/sri-lanka.svg" alt="Sri Lanka flag" className="h-6 w-12 overflow-hidden rounded-[2px] border border-black/10 shadow-sm" />;
    case 'MV':
      return <svg {...common} aria-label="Maldives flag"><rect width="3" height="2" fill="#d21034" /><rect x=".65" y=".4" width="1.7" height="1.2" fill="#007e3a" /><path d="M1.35.67a.38.38 0 1 0 0 .66.3.3 0 1 1 0-.66z" fill="#f7f7f2" /></svg>;
    case 'MM':
      return <svg {...common} aria-label="Myanmar flag"><rect width="3" height=".67" fill="#ffd500" /><rect y=".67" width="3" height=".66" fill="#34b233" /><rect y="1.33" width="3" height=".67" fill="#ea2839" /><path d="M1.5.45l.16.4.43.02-.34.25.12.4-.37-.24-.37.24.12-.4-.34-.25.43-.02z" fill="#f7f7f2" /></svg>;
    case 'LA':
      return <svg {...common} aria-label="Laos flag"><rect width="3" height="2" fill="#ce1126" /><rect y=".5" width="3" height="1" fill="#002868" /><circle cx="1.5" cy="1" r=".38" fill="#f7f7f2" /></svg>;
    case 'VN':
      return <svg {...common} aria-label="Viet Nam flag"><rect width="3" height="2" fill="#da251d" /><path d="M1.5.45l.16.4.43.02-.34.25.12.4-.37-.24-.37.24.12-.4-.34-.25.43-.02z" fill="#ffdf00" /></svg>;
    case 'TH':
      return <svg {...common} aria-label="Thailand flag"><rect width="3" height="2" fill="#a51931" /><rect y=".27" width="3" height="1.46" fill="#f4f5f8" /><rect y=".63" width="3" height=".74" fill="#2d2a4a" /></svg>;
    case 'KH':
      return <svg {...common} aria-label="Cambodia flag"><rect width="3" height="2" fill="#032ea1" /><rect y=".5" width="3" height="1" fill="#e00025" /><path d="M1.05 1.4h.9V.9l.28.28.18-.18-.91-.7-.91.7.18.18.28-.28z" fill="#f7f7f2" /></svg>;
    case 'PH':
      return <svg {...common} aria-label="Philippines flag"><path d="M0 0h3v2H0z" fill="#0038a8" /><path d="M0 1h3v1H0z" fill="#ce1126" /><path d="M0 0l1.45 1L0 2z" fill="#f7f7f2" /><circle cx=".38" cy="1" r=".15" fill="#fcd116" /></svg>;
    case 'MY':
      return <svg {...common} aria-label="Malaysia flag"><path d="M0 0h3v2H0z" fill="#cc0001" />{[0.25, 0.75, 1.25, 1.75].map((y) => <rect key={y} y={y} width="3" height=".25" fill="#f7f7f2" />)}<rect width="1.45" height="1.05" fill="#010066" /><circle cx=".52" cy=".52" r=".25" fill="#ffcc00" /><circle cx=".6" cy=".45" r=".21" fill="#010066" /></svg>;
    case 'BN':
      return <svg {...common} aria-label="Brunei flag"><rect width="3" height="2" fill="#f7df00" /><path d="M-.2 1.9L3.2.1" stroke="#f7f7f2" strokeWidth=".35" /><path d="M-.2 1.9L3.2.1" stroke="#cf1126" strokeWidth=".16" /></svg>;
    case 'SG':
      return <svg {...common} aria-label="Singapore flag"><rect width="3" height="1" fill="#ed2939" /><rect y="1" width="3" height="1" fill="#f7f7f2" /><path d="M.58.3a.35.35 0 1 0 0 .4.28.28 0 1 1 0-.4z" fill="#f7f7f2" /><path d="M1 .18l.05.13.14.01-.11.08.04.13-.12-.08-.12.08.04-.13-.11-.08.14-.01z" fill="#f7f7f2" /></svg>;
    case 'ID':
      return <svg {...common} aria-label="Indonesia flag"><rect width="3" height="1" fill="#ce1126" /><rect y="1" width="3" height="1" fill="#f7f7f2" /></svg>;
    case 'TL':
      return <svg {...common} aria-label="Timor-Leste flag"><rect width="3" height="2" fill="#d32011" /><path d="M0 0l1.5 1L0 2z" fill="#ffcc29" /><path d="M0 0l.9 1L0 2z" fill="#000" /><path d="M.2.82l.14.36.38.03-.29.22.1.36-.33-.2-.33.2.1-.36-.29-.22.38-.03z" fill="#f7f7f2" /></svg>;
    default:
      return <svg {...common} aria-label="Country flag"><rect width="3" height="2" fill="#d9e2e5" /></svg>;
  }
}

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
              aria-label={`${country.name}: ${value}${unit ? ` ${unit}` : ''}`}
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
              
              <span aria-hidden="true" className="leading-none">
                {flagFor(country.code)}
              </span>
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
              <span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 max-w-[calc(100vw-2rem)] -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
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
