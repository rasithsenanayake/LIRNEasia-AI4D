import type { Country, Indicator } from '../types';

const ILLUSTRATIVE = 'Illustrative demo value — awaiting verified data from LIRNEasia.';

function ind(
id: string,
label: string,
unit: string,
value: number,
max: number,
source: string)
: Indicator {
  return { id, label, unit, value, max, year: 2025, source, note: ILLUSTRATIVE };
}

function standardIndicators(seed: number[]): Indicator[] {
  return [
  ind('policy', 'National AI policy maturity', 'index (0–100)', seed[0], 100, 'Observatory policy tracker (demo)'),
  ind('capacity', 'Research & training capacity', 'index (0–100)', seed[1], 100, 'Observatory capacity survey (demo)'),
  ind('connectivity', 'Meaningful connectivity', '% of population', seed[2], 100, 'Placeholder indicator set (demo)'),
  ind('publicsector', 'Public-sector AI deployments', 'documented initiatives', seed[3], 60, 'Observatory use-case register (demo)')];

}

export const countries: Country[] = [
{
  code: 'AF',
  name: 'Afghanistan',
  slug: 'afghanistan',
  subregion: 'South Asia',
  grid: { col: 0, row: 0 },
  overview:
  'Placeholder country overview. Coverage in the Observatory is currently limited and contributions from researchers working on the country are welcome.',
  metrics: { useCases: 2, publications: 3, organizations: 2, experts: 1, datasets: 1 },
  indicators: standardIndicators([18, 22, 24, 3])
},
{
  code: 'PK',
  name: 'Pakistan',
  slug: 'pakistan',
  subregion: 'South Asia',
  grid: { col: 0, row: 1 },
  overview:
  'Placeholder country overview describing the national AI strategy landscape, the main research institutions and the sectors where responsible AI work is concentrated.',
  metrics: { useCases: 14, publications: 19, organizations: 12, experts: 9, datasets: 6 },
  indicators: standardIndicators([52, 48, 41, 17])
},
{
  code: 'NP',
  name: 'Nepal',
  slug: 'nepal',
  subregion: 'South Asia',
  grid: { col: 2, row: 0 },
  overview:
  'Placeholder country overview covering emerging AI policy discussions, civil-society engagement and applications in agriculture and disaster response.',
  metrics: { useCases: 9, publications: 11, organizations: 8, experts: 6, datasets: 4 },
  indicators: standardIndicators([38, 35, 39, 9])
},
{
  code: 'BT',
  name: 'Bhutan',
  slug: 'bhutan',
  subregion: 'South Asia',
  grid: { col: 3, row: 0 },
  overview:
  'Placeholder country overview noting a small but coordinated digital government programme and early-stage AI readiness work.',
  metrics: { useCases: 4, publications: 5, organizations: 3, experts: 2, datasets: 2 },
  indicators: standardIndicators([34, 28, 52, 5])
},
{
  code: 'IN',
  name: 'India',
  slug: 'india',
  subregion: 'South Asia',
  grid: { col: 1, row: 1 },
  overview:
  'Placeholder country overview covering a large research ecosystem, sector-specific AI deployments and an active policy debate on data governance and algorithmic accountability.',
  metrics: { useCases: 38, publications: 52, organizations: 31, experts: 27, datasets: 18 },
  indicators: standardIndicators([74, 81, 58, 46])
},
{
  code: 'BD',
  name: 'Bangladesh',
  slug: 'bangladesh',
  subregion: 'South Asia',
  grid: { col: 3, row: 1 },
  overview:
  'Placeholder country overview covering digital public infrastructure, garment-sector automation debates and AI applications in climate resilience.',
  metrics: { useCases: 16, publications: 21, organizations: 13, experts: 11, datasets: 7 },
  indicators: standardIndicators([49, 44, 45, 19])
},
{
  code: 'LK',
  name: 'Sri Lanka',
  slug: 'sri-lanka',
  subregion: 'South Asia',
  grid: { col: 1, row: 3 },
  overview:
  'Placeholder country overview. Sri Lanka has an active research community working on AI readiness, public-sector adoption and inclusive digital services, with policy discussion coordinated across several ministries and independent institutes.',
  metrics: { useCases: 21, publications: 28, organizations: 15, experts: 14, datasets: 9 },
  indicators: standardIndicators([58, 61, 49, 23])
},
{
  code: 'MV',
  name: 'Maldives',
  slug: 'maldives',
  subregion: 'South Asia',
  grid: { col: 0, row: 3 },
  overview:
  'Placeholder country overview focused on small-island digital service delivery, tourism analytics and marine data initiatives.',
  metrics: { useCases: 3, publications: 4, organizations: 3, experts: 2, datasets: 2 },
  indicators: standardIndicators([31, 26, 67, 4])
},
{
  code: 'MM',
  name: 'Myanmar',
  slug: 'myanmar',
  subregion: 'Southeast Asia',
  grid: { col: 4, row: 1 },
  overview:
  'Placeholder country overview. Documentation is partial and the Observatory flags gaps in verified information for this country.',
  metrics: { useCases: 4, publications: 6, organizations: 3, experts: 2, datasets: 1 },
  indicators: standardIndicators([21, 24, 29, 4])
},
{
  code: 'LA',
  name: 'Lao PDR',
  slug: 'lao-pdr',
  subregion: 'Southeast Asia',
  grid: { col: 5, row: 1 },
  overview:
  'Placeholder country overview covering early digital government work and regional cooperation through ASEAN frameworks.',
  metrics: { useCases: 3, publications: 5, organizations: 3, experts: 2, datasets: 2 },
  indicators: standardIndicators([27, 25, 34, 4])
},
{
  code: 'VN',
  name: 'Viet Nam',
  slug: 'viet-nam',
  subregion: 'Southeast Asia',
  grid: { col: 6, row: 1 },
  overview:
  'Placeholder country overview covering a national AI strategy, manufacturing and public-service applications, and growing academic capacity.',
  metrics: { useCases: 19, publications: 24, organizations: 16, experts: 13, datasets: 8 },
  indicators: standardIndicators([63, 59, 71, 26])
},
{
  code: 'TH',
  name: 'Thailand',
  slug: 'thailand',
  subregion: 'Southeast Asia',
  grid: { col: 4, row: 2 },
  overview:
  'Placeholder country overview covering national AI governance guidelines, health-sector deployments and an established research base.',
  metrics: { useCases: 18, publications: 23, organizations: 14, experts: 12, datasets: 8 },
  indicators: standardIndicators([66, 62, 74, 24])
},
{
  code: 'KH',
  name: 'Cambodia',
  slug: 'cambodia',
  subregion: 'Southeast Asia',
  grid: { col: 5, row: 2 },
  overview:
  'Placeholder country overview covering digital economy policy and early AI pilots in agriculture and public services.',
  metrics: { useCases: 5, publications: 7, organizations: 4, experts: 3, datasets: 2 },
  indicators: standardIndicators([33, 30, 44, 6])
},
{
  code: 'PH',
  name: 'Philippines',
  slug: 'philippines',
  subregion: 'Southeast Asia',
  grid: { col: 7, row: 2 },
  overview:
  'Placeholder country overview covering the outsourcing sector, disaster-risk applications and an active civil-society voice on automated decision-making.',
  metrics: { useCases: 17, publications: 22, organizations: 15, experts: 12, datasets: 7 },
  indicators: standardIndicators([57, 55, 53, 21])
},
{
  code: 'MY',
  name: 'Malaysia',
  slug: 'malaysia',
  subregion: 'Southeast Asia',
  grid: { col: 4, row: 3 },
  overview:
  'Placeholder country overview covering a national AI roadmap, regulatory sandboxes and industrial applications.',
  metrics: { useCases: 15, publications: 20, organizations: 13, experts: 11, datasets: 7 },
  indicators: standardIndicators([69, 64, 82, 22])
},
{
  code: 'BN',
  name: 'Brunei Darussalam',
  slug: 'brunei-darussalam',
  subregion: 'Southeast Asia',
  grid: { col: 6, row: 3 },
  overview: 'Placeholder country overview covering digital government modernisation and small-state capacity building.',
  metrics: { useCases: 2, publications: 3, organizations: 2, experts: 1, datasets: 1 },
  indicators: standardIndicators([42, 33, 88, 3])
},
{
  code: 'SG',
  name: 'Singapore',
  slug: 'singapore',
  subregion: 'Southeast Asia',
  grid: { col: 4, row: 4 },
  overview:
  'Placeholder country overview covering governance frameworks, assurance tooling and a dense institutional research ecosystem.',
  metrics: { useCases: 24, publications: 33, organizations: 21, experts: 18, datasets: 12 },
  indicators: standardIndicators([88, 86, 94, 34])
},
{
  code: 'ID',
  name: 'Indonesia',
  slug: 'indonesia',
  subregion: 'Southeast Asia',
  grid: { col: 5, row: 4 },
  overview:
  'Placeholder country overview covering a national AI strategy, archipelagic service-delivery challenges and a fast-growing innovation sector.',
  metrics: { useCases: 22, publications: 27, organizations: 18, experts: 15, datasets: 10 },
  indicators: standardIndicators([61, 57, 62, 28])
},
{
  code: 'TL',
  name: 'Timor-Leste',
  slug: 'timor-leste',
  subregion: 'Southeast Asia',
  grid: { col: 7, row: 4 },
  overview: 'Placeholder country overview. Coverage is limited and contributions are welcome.',
  metrics: { useCases: 1, publications: 2, organizations: 1, experts: 1, datasets: 1 },
  indicators: standardIndicators([16, 19, 27, 2])
}];


export const countryBySlug = (slug: string): Country | undefined =>
countries.find((c) => c.slug === slug);

export const countryByName = (name: string): Country | undefined =>
countries.find((c) => c.name === name);

export const countryNames = countries.map((c) => c.name);