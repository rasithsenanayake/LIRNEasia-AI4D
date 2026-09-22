import type { Metadata } from 'next';
import { UseCaseDetail } from '../../../views/UseCaseDetail';
import { useCaseBySlug as getUseCaseBySlug, useCases } from '../../../data/useCases';

export function generateStaticParams() {
  return useCases.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);
  return useCase ? { title: useCase.title, description: useCase.summary } : { title: 'Responsible AI use case' };
}

export default async function UseCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <UseCaseDetail slug={slug} />;
}
