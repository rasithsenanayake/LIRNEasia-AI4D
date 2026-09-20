'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface FilterGroupDef {
  key: string;
  label: string;
  options: string[];
}

interface Props {
  group: FilterGroupDef;
  selected: string[];
  onToggle: (key: string, value: string) => void;
  counts?: Record<string, number>;
  defaultOpen?: boolean;
}

export function FilterGroup({ group, selected, onToggle, counts, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? group.options : group.options.slice(0, 7);

  return (
    <div className="border-b border-line py-3 last:border-b-0">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex min-h-[40px] w-full items-center justify-between gap-2 text-left text-[0.9375rem] font-semibold text-ink">
          
          <span>
            {group.label}
            {selected.length > 0 &&
            <span className="ml-2 rounded bg-accent-wash px-1.5 py-0.5 text-meta font-medium text-accent-dark">
                {selected.length}
              </span>
            }
          </span>
          <ChevronDownIcon
            className={cn('h-4 w-4 shrink-0 text-ink-muted transition-transform duration-150 ease-out', open && 'rotate-180')}
            aria-hidden="true" />
          
        </button>
      </h3>

      {open &&
      <div className="mt-1.5">
          <ul className="space-y-0.5">
            {visible.map((option) => {
            const id = `${group.key}-${option}`.replace(/\s+/g, '-').toLowerCase();
            const isChecked = selected.includes(option);
            const count = counts?.[option];
            return (
              <li key={option}>
                  <label
                  htmlFor={id}
                  className="flex min-h-[36px] cursor-pointer items-center gap-2.5 rounded px-1 py-1 text-[0.9375rem] text-ink-soft transition-colors duration-150 ease-out hover:bg-raised">
                  
                    <input
                    id={id}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggle(group.key, option)}
                    className="h-4 w-4 shrink-0 accent-accent" />
                  
                    <span className="flex-1">{option}</span>
                    {typeof count === 'number' &&
                  <span className="text-meta tabular-nums text-ink-muted">{count}</span>
                  }
                  </label>
                </li>);

          })}
          </ul>
          {group.options.length > 7 &&
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-1.5 rounded px-1 py-1 text-meta font-medium text-accent underline-offset-4 hover:underline">
          
              {showAll ? 'Show fewer' : `Show all ${group.options.length}`}
            </button>
        }
        </div>
      }
    </div>);

}
