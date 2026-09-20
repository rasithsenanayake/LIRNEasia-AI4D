const MONTHS = [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'];


/** Formats an ISO date (YYYY-MM-DD) as "12 March 2025". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m) return iso;
  return d ? `${d} ${MONTHS[m - 1]} ${y}` : `${MONTHS[m - 1]} ${y}`;
}

/** Short form: "12 Mar 2025". */
export function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m) return iso;
  return `${d ?? ''} ${MONTHS[m - 1].slice(0, 3)} ${y}`.trim();
}

/** Splits an ISO date into stacked day / month parts for date blocks. */
export function dateParts(iso: string): {day: string;month: string;year: string;} {
  const [y, m, d] = iso.split('-');
  return {
    day: d ?? '',
    month: MONTHS[Number(m) - 1]?.slice(0, 3).toUpperCase() ?? '',
    year: y ?? ''
  };
}

export function daysUntil(iso: string, today = new Date('2026-09-20')): number {
  const target = new Date(iso);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}