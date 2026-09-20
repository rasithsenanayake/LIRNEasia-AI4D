import { DatasetDetail } from '../../../views/DatasetDetail';
import { datasets } from '../../../data/datasets';

export function generateStaticParams() { return datasets.map((dataset) => ({ slug: dataset.slug })); }

export default async function DatasetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <DatasetDetail slug={(await params).slug} />;
}
