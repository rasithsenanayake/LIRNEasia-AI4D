import React from 'react';
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
        

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) =>
          <li key={topic.id}>
              <Link
              to={`/explore?topic=${encodeURIComponent(topic.name)}`}
              className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:shadow-lift">
              
                <span className="flex items-center gap-2.5">
                  <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${topicColorMap[topic.colorKey]}`} />
                
                  <span className="text-[1.0625rem] font-semibold text-ink group-hover:text-accent">
                    {topic.name}
                  </span>
                </span>
                <span className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{topic.description}</span>
                <span className="mt-auto pt-4 text-meta text-ink-muted">{topicResourceCount(topic.name)} resources</span>
              </Link>
            </li>
          )}
        </ul>
      </Container>
    </section>);

}
