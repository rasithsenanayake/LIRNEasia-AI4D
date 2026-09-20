import { UseCaseDetail } from '../../../views/UseCaseDetail';

export default async function UseCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <UseCaseDetail slug={slug} />;
}
