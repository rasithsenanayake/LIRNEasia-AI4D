import React from 'react';
import { Hero } from '../components/home/Hero';
import { UniversalSearch } from '../components/home/UniversalSearch';
import { ExploreRegion } from '../components/home/ExploreRegion';
import { TopicsGrid } from '../components/home/TopicsGrid';
import { DataSpotlight } from '../components/home/DataSpotlight';
import { NewsletterSignup } from '../components/content/NewsletterSignup';
import { Container, SectionHeading } from '../components/ui/Primitives';
import { PublicationCard } from '../components/cards/PublicationCard';
import { DatasetCard } from '../components/cards/DatasetCard';
import { publications } from '../data/publications';
import { datasets } from '../data/datasets';

export function Home() {
  return (
    <>
      <Hero />
      <UniversalSearch />
      <ExploreRegion />

      <section aria-labelledby="featured-heading" className="bg-canvas">
        <Container className="py-16 lg:py-20">
          <SectionHeading
            id="featured-heading"
            eyebrow="Featured knowledge"
            title="Start with evidence you can follow"
            description="Read a featured publication, inspect the underlying dataset, then follow the connections into countries and practice."
          />

          <PublicationCard publication={publications[0]} featured />
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            <li>
              <PublicationCard publication={publications[1]} />
            </li>
            <li>
              <DatasetCard dataset={datasets[0]} />
            </li>
          </ul>
        </Container>
      </section>

      <TopicsGrid />
      <DataSpotlight />
      <NewsletterSignup />
    </>
  );
}
