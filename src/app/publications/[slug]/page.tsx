import { PublicationDetail } from '../../../views/PublicationDetail';

export default async function PublicationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PublicationDetail slug={slug} />;
}
