import NextLink from 'next/link';
import type { ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  to: string;
};

export function Link({ to, children, ...props }: Props) {
  return <NextLink href={to} {...props}>{children}</NextLink>;
}
