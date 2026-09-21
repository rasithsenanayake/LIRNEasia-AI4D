import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from '../ui/Link';
import { topics } from '../../data/taxonomy';
import { topicColorMap } from '../../types';
import { Container, SectionHeading } from '../ui/Primitives';
import { LinkButton } from '../ui/Button';
import { topicResourceCount } from '../../utils/repositoryStats';

export function TopicsGrid() {
  return (
    <section aria-labelledby="topics-heading" className="bg-canvas">
      <Container className="py-16 lg:py-20">
        <SectionHeading
          id="topics-heading"
          eyebrow="Explore topics"
          title="Seven lines of enquiry across the region"
          description="Browse the questions shaping responsible AI across the region."
          action={
          <LinkButton to="/topics" variant="secondary">
              View all topics
            </LinkButton>
          } />
        

        <ul className="divide-y divide-line border-y border-line">
          {topics.map((topic) =>
          <li key={topic.id}>
              <Link
              to={`/explore?topic=${encodeURIComponent(topic.name)}`}
              className="group flex flex-col gap-3 py-5 transition-colors duration-150 ease-out hover:bg-surface sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              
                <span className="flex items-center gap-2.5">
                  <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${topicColorMap[topic.colorKey]}`} />
                
                  <span className="text-[1.0625rem] font-semibold text-ink group-hover:text-accent">
                    {topic.name}
                  </span>
                </span>
                <span className="flex items-center justify-between gap-6 sm:min-w-[24rem]">
                  <span className="text-[0.9375rem] leading-relaxed text-ink-soft">{topic.description}</span>
                  <span className="flex shrink-0 items-center gap-2 text-meta text-ink-muted">
                    {topicResourceCount(topic.name)}
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          )}
        </ul>
      </Container>
    </section>);

}
