import type { Metadata } from 'next';
import { PublicationDetail } from '../../../views/PublicationDetail';
import { publicationBySlug, publications } from '../../../data/publications';

export function generateStaticParams() {
  return publications.map((publication) => ({ slug: publication.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const publication = publicationBySlug(slug);
  return publication ? { title: publication.title, description: publication.summary } : { title: 'Publication' };
}

export default async function PublicationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PublicationDetail slug={slug} />;
}
