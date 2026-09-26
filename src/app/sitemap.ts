import type { MetadataRoute } from 'next';
import { countries } from '../data/countries';
import { datasets } from '../data/datasets';
import { publications } from '../data/publications';
import { useCases } from '../data/useCases';
import { events } from '../data/happenings';
import { organizations, people } from '../data/network';

const paths = ['/', '/about', '/explore', '/research', '/use-cases', '/countries', '/data-maps', '/datasets', '/people', '/organizations', '/events', '/news', '/opportunities', '/learning-resources', '/newsletter', '/partners', '/contact', '/accessibility', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');
  if (!siteUrl) return [];

  const dynamicPaths = [
    ...countries.map((country) => `/countries/${country.slug}`),
    ...datasets.map((dataset) => `/datasets/${dataset.slug}`),
    ...publications.map((publication) => `/publications/${publication.slug}`),
    ...useCases.map((useCase) => `/use-cases/${useCase.slug}`),
    ...events.map((event) => `/events/${event.slug}`),
    ...people.map((person) => `/people/${person.slug}`),
    ...organizations.map((organization) => `/organizations/${organization.slug}`)
  ];

  return [...paths, ...dynamicPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date()
  }));
}
