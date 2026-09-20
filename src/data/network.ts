import type { Organization, Partner, Person } from '../types';

/**
 * All people below are fictional placeholder profiles created for prototype
 * evaluation only. No real individuals are represented.
 */
export const people: Person[] = [
{
  id: 'p-1',
  slug: 'a-perera',
  name: 'A. Perera',
  role: 'Senior Research Fellow',
  organization: 'Colombo Institute for Digital Policy',
  country: 'Sri Lanka',
  expertise: ['AI Governance', 'Data Governance', 'Public Sector'],
  bio: 'Placeholder biography for prototype review. Research focuses on how public agencies procure and oversee algorithmic systems.',
  initials: 'AP'
},
{
  id: 'p-2',
  slug: 'n-rahman',
  name: 'N. Rahman',
  role: 'Director, Inclusive Technology Programme',
  organization: 'Dhaka Centre for Technology and Society',
  country: 'Bangladesh',
  expertise: ['Inclusion', 'Labour & Employment', 'Responsible Innovation'],
  bio: 'Placeholder biography for prototype review. Works on gendered impacts of automation in export-oriented industries.',
  initials: 'NR'
},
{
  id: 'p-3',
  slug: 'l-tanaka-sari',
  name: 'L. Sari',
  role: 'Lead Data Scientist',
  organization: 'Nusantara Public Data Lab',
  country: 'Indonesia',
  expertise: ['AI Readiness', 'Data Governance', 'Climate & Environment'],
  bio: 'Placeholder biography for prototype review. Builds open data pipelines for archipelagic service delivery.',
  initials: 'LS'
},
{
  id: 'p-4',
  slug: 'm-de-silva',
  name: 'M. de Silva',
  role: 'Policy Adviser',
  organization: 'National Digital Policy Secretariat',
  country: 'Sri Lanka',
  expertise: ['AI Governance', 'AI Readiness'],
  bio: 'Placeholder biography for prototype review. Advises on national AI readiness assessment and institutional coordination.',
  initials: 'MD'
},
{
  id: 'p-5',
  slug: 'r-nguyen',
  name: 'R. Nguyen',
  role: 'Associate Professor',
  organization: 'Mekong University Research Centre',
  country: 'Viet Nam',
  expertise: ['Responsible Innovation', 'Health', 'Safety & Robustness'],
  bio: 'Placeholder biography for prototype review. Evaluates clinical decision-support deployments in district hospitals.',
  initials: 'RN'
},
{
  id: 'p-6',
  slug: 's-kaur',
  name: 'S. Kaur',
  role: 'Research Lead, AI Ecosystems',
  organization: 'South Asia Technology Observatory',
  country: 'India',
  expertise: ['AI Ecosystem', 'Funding & Investment', 'AI Governance'],
  bio: 'Placeholder biography for prototype review. Maps funding and talent flows across regional AI ecosystems.',
  initials: 'SK'
}];


export const personBySlug = (slug: string): Person | undefined => people.find((p) => p.slug === slug);
export const personByName = (name: string): Person | undefined => people.find((p) => p.name === name);

/** Organizations are illustrative composites created for prototype evaluation. */
export const organizations: Organization[] = [
{
  id: 'o-1',
  slug: 'colombo-institute-digital-policy',
  name: 'Colombo Institute for Digital Policy',
  abbr: 'CIDP',
  type: 'University / Research Institution',
  country: 'Sri Lanka',
  description:
  'Placeholder description of an independent research institute working on digital and AI policy for South Asia.',
  topics: ['AI Governance', 'Data Governance']
},
{
  id: 'o-2',
  slug: 'national-digital-policy-secretariat',
  name: 'National Digital Policy Secretariat',
  abbr: 'NDPS',
  type: 'Government',
  country: 'Sri Lanka',
  description: 'Placeholder description of a government body coordinating national digital and AI strategy.',
  topics: ['AI Governance', 'AI Readiness']
},
{
  id: 'o-3',
  slug: 'dhaka-centre-technology-society',
  name: 'Dhaka Centre for Technology and Society',
  abbr: 'DCTS',
  type: 'Civil Society / NGO',
  country: 'Bangladesh',
  description: 'Placeholder description of a civil-society organisation researching technology and labour.',
  topics: ['Inclusion', 'Responsible Innovation']
},
{
  id: 'o-4',
  slug: 'nusantara-public-data-lab',
  name: 'Nusantara Public Data Lab',
  abbr: 'NPDL',
  type: 'Civil Society / NGO',
  country: 'Indonesia',
  description: 'Placeholder description of an open-data laboratory supporting public-sector data stewardship.',
  topics: ['Data Governance', 'AI Readiness']
},
{
  id: 'o-5',
  slug: 'mekong-university-research-centre',
  name: 'Mekong University Research Centre',
  abbr: 'MURC',
  type: 'University / Research Institution',
  country: 'Viet Nam',
  description: 'Placeholder description of a university centre evaluating AI in health and public services.',
  topics: ['Responsible Innovation', 'AI Readiness']
},
{
  id: 'o-6',
  slug: 'asean-digital-cooperation-forum',
  name: 'ASEAN Digital Cooperation Forum',
  abbr: 'ADCF',
  type: 'Regional Organization',
  country: 'Singapore',
  description: 'Placeholder description of a regional coordination body for digital and AI governance.',
  topics: ['AI Governance', 'AI Ecosystem']
},
{
  id: 'o-7',
  slug: 'south-asia-technology-observatory',
  name: 'South Asia Technology Observatory',
  abbr: 'SATO',
  type: 'University / Research Institution',
  country: 'India',
  description: 'Placeholder description of a research observatory mapping regional technology ecosystems.',
  topics: ['AI Ecosystem', 'AI Governance']
},
{
  id: 'o-8',
  slug: 'agritech-cooperative-network',
  name: 'AgriTech Cooperative Network',
  abbr: 'ACN',
  type: 'Private Sector',
  country: 'Nepal',
  description: 'Placeholder description of a cooperative network deploying advisory tools for smallholder farmers.',
  topics: ['Sustainability', 'Inclusion']
}];


export const organizationBySlug = (slug: string): Organization | undefined =>
organizations.find((o) => o.slug === slug);
export const organizationByName = (name: string): Organization | undefined =>
organizations.find((o) => o.name === name);

export const partners: Partner[] = [
{
  id: 'pt-1',
  name: 'LIRNEasia',
  abbr: 'LIRNEasia',
  role: 'Host institution and research lead',
  description:
  'Regional digital policy think tank hosting the Observatory and leading its research and convening programme.',
  website: 'https://lirneasia.net'
},
{
  id: 'pt-2',
  name: 'AI4D Programme',
  abbr: 'AI4D',
  role: 'Programme partner',
  description: 'Placeholder description of the programme partnership supporting artificial intelligence for development.',
},
{
  id: 'pt-3',
  name: 'Regional Research Consortium',
  abbr: 'RRC',
  role: 'Research network partner',
  description: 'Placeholder partner description — contributing country research teams across South and Southeast Asia.',
},
{
  id: 'pt-4',
  name: 'Asia Policy Exchange',
  abbr: 'APEX',
  role: 'Policy engagement partner',
  description: 'Placeholder partner description — convening policymaker roundtables and translating evidence for government.',
},
{
  id: 'pt-5',
  name: 'Open Data Foundation',
  abbr: 'ODF',
  role: 'Data infrastructure partner',
  description: 'Placeholder partner description — supporting dataset curation, licensing and long-term access.',
}];
