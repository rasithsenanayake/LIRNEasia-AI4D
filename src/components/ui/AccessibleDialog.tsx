'use client';

import { useEffect, useRef, type ReactNode, type RefObject } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel: string;
  labelledBy?: string;
  describedBy?: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  className?: string;
}

export function AccessibleDialog({ open, onClose, children, ariaLabel, labelledBy, describedBy, returnFocusRef, initialFocusRef, className }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const returnTarget = returnFocusRef?.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (initialFocusRef?.current ?? dialogRef.current?.querySelector<HTMLElement>('input:not([disabled]), button:not([disabled]), a[href]'))?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute('hidden'));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) { event.preventDefault(); dialogRef.current.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      const target = returnTarget ?? previousFocus;
      if (target?.isConnected) target.focus();
    };
  }, [open, initialFocusRef, returnFocusRef]);

  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) closeRef.current(); }}><div ref={dialogRef} role="dialog" aria-modal="true" aria-label={labelledBy ? undefined : ariaLabel} aria-labelledby={labelledBy} aria-describedby={describedBy} tabIndex={-1} className={className}>{children}</div></div>;
}
