import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

const base =
'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors duration-150 ease-out disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  secondary: 'bg-surface text-ink border border-line-strong hover:bg-raised',
  ghost: 'text-accent hover:bg-accent-wash',
  inverse: 'bg-white text-accent-dark hover:bg-accent-soft'
};

const sizes: Record<Size, string> = {
  sm: 'text-meta px-3 py-1.5 min-h-[36px]',
  md: 'text-[0.9375rem] px-4 py-2.5 min-h-[44px]',
  lg: 'text-base px-6 py-3 min-h-[52px]'
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>);

}

export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & {to: string;} & Omit<React.ComponentProps<typeof Link>, 'to' | 'className' | 'children'>) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>);

}

export function ExternalButton({
  href,
  variant = 'secondary',
  size = 'md',
  className,
  children
}: CommonProps & {href: string;}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, variants[variant], sizes[size], className)}>
      
      {children}
    </a>);

}