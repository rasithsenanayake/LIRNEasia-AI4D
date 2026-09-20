'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs, Container } from '../components/ui/Primitives';
import { LinkButton } from '../components/ui/Button';

const SECTION_TITLES: Record<string, {title: string;description: string;}> = {
  topics: {
    title: 'Explore by Topic',
    description:
    'Topic explorer and topic hub pages are specified in the information architecture. They are not part of this first prototype build.'
  },
  research: {
    title: 'Research & Insights',
    description:
    'The research landing page — featured publication, latest research and type-specific listings — is specified and will reuse the repository components shown in Explore.'
  },
  datasets: {
    title: 'Dataset detail',
    description: 'Dataset detail pages are specified with overview, coverage, files, usage notes and a metadata panel.'
  },
  people: {
    title: 'People & Experts',
    description:
    'The people directory and person profiles are specified, including publications, projects, events and related organizations.'
  },
  organizations: {
    title: 'Organizations',
    description:
    'The organization directory and organization profiles are specified, including people, initiatives, publications and events.'
  },
  events: {
    title: 'Events',
    description: 'Event listing, event detail and the post-event archive layout are specified.'
  },
  opportunities: {
    title: 'Opportunities',
    description: 'Fellowships, grants, calls and programmes with deadline-first cards and an automatic archive.'
  },
  'learning-resources': {
    title: 'Learning Resources',
    description: 'Courses, videos, toolkits, guides and frameworks, filterable by topic, format and provider.'
  },
  newsletter: {
    title: 'Newsletter',
    description: 'Subscription form plus a browsable archive of past issues.'
  },
  partners: {
    title: 'Partners',
    description: 'Each partner presented with role, description and link — not a logo wall.'
  },
  about: {
    title: 'About the Observatory',
    description:
    'Mission, objectives, geographic scope, responsible AI principles, programme approach and the Research → Connect → Translate → Inform → Scale process.'
  },
  contact: {
    title: 'Contact',
    description: 'Contact details plus a typed inquiry form (general, research, media, partnership, events).'
  },
  accessibility: {
    title: 'Accessibility',
    description: 'Accessibility commitment, target standard, known limitations and how to report a problem.'
  },
  privacy: {
    title: 'Privacy',
    description: 'What is collected, why, retention, and how newsletter, registration and download data are handled.'
  }
};

export function SectionPlaceholder() {
  const pathname = usePathname();
  const key = pathname.split('/').filter(Boolean)[0] ?? '';
  const section = SECTION_TITLES[key] ?? {
    title: 'Section in specification',
    description: 'This section is part of the information architecture but is not built in the first prototype.'
  };

  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: section.title }]} />
      <div className="mt-6 max-w-2xl">
        <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">{section.title}</h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">{section.description}</p>
        <div className="mt-8 rounded-lg border border-line bg-surface p-6">
          <h2 className="text-meta font-semibold uppercase tracking-[0.08em] text-ink-muted">
            Prototype scope
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            This prototype builds the six priority screens end to end so the connected-knowledge model can be evaluated:
            home, the knowledge repository, a responsible AI use case, data &amp; maps, a country profile and a
            publication. Every other section is specified in the information architecture and reuses the same card,
            filter, tag and metadata components.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton to="/explore">Explore the repository</LinkButton>
            <LinkButton to="/countries" variant="secondary">
              Explore countries
            </LinkButton>
            <LinkButton to="/data-maps" variant="secondary">
              Data &amp; maps
            </LinkButton>
          </div>
        </div>
      </div>
    </Container>);

}
