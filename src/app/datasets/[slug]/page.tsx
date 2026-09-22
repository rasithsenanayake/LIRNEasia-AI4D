import type { Metadata } from 'next';
import { DatasetDetail } from '../../../views/DatasetDetail';
import { datasetBySlug, datasets } from '../../../data/datasets';

export function generateStaticParams() { return datasets.map((dataset) => ({ slug: dataset.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dataset = datasetBySlug(slug);
  return dataset ? { title: dataset.title, description: dataset.description } : { title: 'Dataset' };
}

export default async function DatasetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <DatasetDetail slug={(await params).slug} />;
}
