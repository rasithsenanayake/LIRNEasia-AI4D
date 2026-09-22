import { Container, SectionHeading, DemoDataNote } from '../components/ui/Primitives';
import { PublicationCard } from '../components/cards/PublicationCard';
import { DatasetCard } from '../components/cards/DatasetCard';
import { LinkButton } from '../components/ui/Button';
import { publications } from '../data/publications';
import { datasets } from '../data/datasets';
import { PUBLICATION_TYPES } from '../data/publications';

const publicationFilterQuery = PUBLICATION_TYPES.map((type) => `type=${encodeURIComponent(type)}`).join('&');

export function ResearchLanding() {
  return <Container className="py-12">
    <SectionHeading eyebrow="Research & insights" title="Evidence, analysis and commentary" description="Browse all publication types in the proposed research architecture." action={<LinkButton to={`/explore?${publicationFilterQuery}`} variant="secondary">Browse repository</LinkButton>} />
    <DemoDataNote className="mt-6">The records below are illustrative prototype content.</DemoDataNote>
    <section className="mt-10" aria-labelledby="featured-research"><h2 id="featured-research" className="font-serif text-2xl text-ink">Featured research</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{publications.slice(0, 3).map((p) => <PublicationCard key={p.id} publication={p} />)}</div></section>
    <section className="mt-14" aria-labelledby="research-types"><h2 id="research-types" className="font-serif text-2xl text-ink">Publication types</h2><div className="mt-4 flex flex-wrap gap-2">{PUBLICATION_TYPES.map((type) => <LinkButton key={type} to={`/explore?type=${encodeURIComponent(type)}`} variant="secondary" size="sm">{type}</LinkButton>)}</div></section>
    <section className="mt-14" aria-labelledby="datasets"><h2 id="datasets" className="font-serif text-2xl text-ink">Datasets</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{datasets.slice(0, 2).map((d) => <DatasetCard key={d.id} dataset={d} />)}</div></section>
  </Container>;
}
