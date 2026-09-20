import React from 'react';
import { FilterGroup, type FilterGroupDef } from './FilterGroup';

interface Props {
  groups: FilterGroupDef[];
  selected: Record<string, string[]>;
  onToggle: (key: string, value: string) => void;
  onClear: () => void;
  activeCount: number;
}

export function FilterPanel({ groups, selected, onToggle, onClear, activeCount }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 border-b border-line-strong pb-3">
        <h2 className="text-[1rem] font-semibold text-ink">Filters</h2>
        {activeCount > 0 &&
        <button
          type="button"
          onClick={onClear}
          className="rounded text-meta font-medium text-accent underline-offset-4 hover:underline">
          
            Clear all ({activeCount})
          </button>
        }
      </div>
      {groups.map((group, i) =>
      <FilterGroup
        key={group.key}
        group={group}
        selected={selected[group.key] ?? []}
        onToggle={onToggle}
        defaultOpen={i < 3 || (selected[group.key] ?? []).length > 0} />

      )}
    </div>);

}