import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Container } from '../ui/Primitives';
import { LinkButton } from '../ui/Button';
import { KnowledgeNetworkGraphic } from './KnowledgeNetworkGraphic';

export function Hero() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="grid gap-12 py-14 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-20">
        <div className="lg:col-span-7">
          <p className="text-meta font-semibold uppercase tracking-[0.1em] text-accent">
            A policy and innovation network on responsible AI
          </p>
          <h1 className="mt-4 font-serif text-[2.25rem] leading-[1.12] text-ink sm:text-[2.875rem] lg:text-[3.25rem]">
            Evidence, innovation and policy for responsible AI across Asia
          </h1>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]">
            The Asia AI4D Observatory connects research, responsible AI initiatives, data, people and policy knowledge
            from across South and Southeast Asia — so that evidence produced in one country is usable in the next.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton to="/explore" size="lg">
              Explore the Observatory
            </LinkButton>
            <LinkButton to="/explore?type=Report" size="lg" variant="secondary">
              Search research
            </LinkButton>
            <LinkButton to="/about" size="lg" variant="ghost">
              About the Observatory
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-xl border border-line bg-canvas p-6 sm:p-8">
            <KnowledgeNetworkGraphic />
            <p className="mt-4 border-t border-line pt-4 text-meta leading-relaxed text-ink-muted">
              Every record in the Observatory is linked. Research connects to countries, countries to initiatives,
              initiatives to the organisations and people behind them.
            </p>
          </div>
        </div>
      </Container>
    </section>);

}