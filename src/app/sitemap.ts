import type { MetadataRoute } from 'next';
import { countries } from '../data/countries';
import { datasets } from '../data/datasets';
import { publications } from '../data/publications';
import { useCases } from '../data/useCases';

const paths = ['/', '/explore', '/research', '/use-cases', '/countries', '/data-maps'];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');
  if (!siteUrl) return [];

  const dynamicPaths = [
    ...countries.map((country) => `/countries/${country.slug}`),
    ...datasets.map((dataset) => `/datasets/${dataset.slug}`),
    ...publications.map((publication) => `/publications/${publication.slug}`),
    ...useCases.map((useCase) => `/use-cases/${useCase.slug}`)
  ];

  return [...paths, ...dynamicPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date()
  }));
}
