import type { Metadata } from 'next';
import { CountryProfile } from '../../../views/CountryProfile';
import { countries, countryBySlug } from '../../../data/countries';

export function generateStaticParams() {
  return countries.map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = countryBySlug(slug);
  return country ? { title: `${country.name} country profile`, description: country.overview } : { title: 'Country profile' };
}

export default async function CountryProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CountryProfile slug={slug} />;
}
