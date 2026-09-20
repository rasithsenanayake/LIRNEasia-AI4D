import { CountryProfile } from '../../../views/CountryProfile';

export default async function CountryProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CountryProfile slug={slug} />;
}
