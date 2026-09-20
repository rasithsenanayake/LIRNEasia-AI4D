import React from 'react';
import { Container } from '../components/ui/Primitives';
import { LinkButton } from '../components/ui/Button';

export function NotFound() {
  return (
    <Container className="py-24">
      <div className="max-w-xl">
        <p className="text-meta font-semibold uppercase tracking-[0.09em] text-accent">Error 404</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink">We couldn’t find that page.</h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
          The page may have moved, or the link may be out of date. You can search the repository, browse by country,
          or start again from the homepage.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton to="/explore">Explore the repository</LinkButton>
          <LinkButton to="/explore?type=Report" variant="secondary">
            Browse research
          </LinkButton>
          <LinkButton to="/countries" variant="secondary">
            Explore countries
          </LinkButton>
          <LinkButton to="/" variant="ghost">
            Return home
          </LinkButton>
        </div>
      </div>
    </Container>);

}