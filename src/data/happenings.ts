import type { LearningResource, ObservatoryEvent, Opportunity } from '../types';

/** Illustrative events, opportunities and learning resources for prototype evaluation. */
export const events: ObservatoryEvent[] = [
{
  id: 'ev-1',
  slug: 'regional-policy-roundtable-2026',
  title: 'Regional roundtable: oversight of algorithmic systems in public services',
  date: '2026-10-14',
  location: 'Colombo, Sri Lanka',
  format: 'Hybrid',
  type: 'Roundtable',
  topics: ['AI Governance', 'Inclusion'],
  country: 'Sri Lanka',
  status: 'upcoming',
  registration: 'Open',
  description:
  'Placeholder event description. A closed-door roundtable convening regulators and researchers to discuss oversight arrangements for automated decision-making.'
},
{
  id: 'ev-2',
  slug: 'community-data-governance-workshop',
  title: 'Workshop: community data governance for language technology',
  date: '2026-11-05',
  location: 'Online',
  format: 'Online',
  type: 'Workshop',
  topics: ['Data Governance', 'Inclusion'],
  country: 'Bangladesh',
  status: 'upcoming',
  registration: 'Open',
  description: 'Placeholder event description for a practitioner workshop on consent-based data collection.'
},
{
  id: 'ev-3',
  slug: 'ai-readiness-country-briefing',
  title: 'Country briefing: AI readiness findings for Nepal',
  date: '2026-12-02',
  location: 'Kathmandu, Nepal',
  format: 'In-person',
  type: 'Briefing',
  topics: ['AI Readiness'],
  country: 'Nepal',
  status: 'upcoming',
  registration: 'Invitation only',
  description: 'Placeholder event description for a national findings briefing.'
},
{
  id: 'ev-4',
  slug: 'annual-observatory-symposium-2026',
  title: 'Asia AI4D Observatory annual symposium',
  date: '2026-05-21',
  location: 'Jakarta, Indonesia',
  format: 'Hybrid',
  type: 'Symposium',
  topics: ['AI Governance', 'AI Ecosystem', 'Inclusion'],
  country: 'Indonesia',
  status: 'past',
  registration: 'Closed',
  description: 'Placeholder archive entry. Recording, slides and the event report are available on the event page.'
}];


export const eventById = (id: string): ObservatoryEvent | undefined => events.find((e) => e.id === id);

export const opportunities: Opportunity[] = [
{
  id: 'op-1',
  title: 'Responsible AI research fellowship — South and Southeast Asia',
  organization: 'AI4D Programme',
  type: 'Fellowship',
  deadline: '2026-10-31',
  description:
  'Placeholder description of a twelve-month fellowship supporting early-career researchers working on responsible AI in the region.',
  region: 'Regional'
},
{
  id: 'op-2',
  title: 'Small grants: community data stewardship pilots',
  organization: 'Open Data Foundation',
  type: 'Grant',
  deadline: '2026-11-20',
  description: 'Placeholder description of a small-grants window for community-governed data initiatives.',
  region: 'Regional'
},
{
  id: 'op-3',
  title: 'Call for papers: AI governance in low-resource settings',
  organization: 'Regional Research Consortium',
  type: 'Call for Papers',
  deadline: '2026-12-15',
  description: 'Placeholder description of a call for papers for a special issue.',
  region: 'Regional'
},
{
  id: 'op-4',
  title: 'Policy secondment programme for government analysts',
  organization: 'Asia Policy Exchange',
  type: 'Programme',
  deadline: '2026-06-30',
  description: 'Placeholder description of a closed secondment programme.',
  region: 'Regional',
  expired: true
}];


export const learningResources: LearningResource[] = [
{
  id: 'lr-1',
  title: 'Introduction to responsible AI for public officials',
  description: 'Placeholder description of a short self-paced course for government staff with no technical background.',
  format: 'Course',
  provider: 'Asia Policy Exchange',
  topics: ['AI Governance', 'AI Readiness'],
  country: 'Regional'
},
{
  id: 'lr-2',
  title: 'Algorithmic impact assessment toolkit',
  description: 'Placeholder description of a practical toolkit with templates for assessing system impact before deployment.',
  format: 'Toolkit',
  provider: 'Colombo Institute for Digital Policy',
  topics: ['AI Governance', 'Responsible Innovation'],
  country: 'Sri Lanka'
},
{
  id: 'lr-3',
  title: 'Community data governance guide',
  description: 'Placeholder description of a guide for organisations collecting data with and for communities.',
  format: 'Guide',
  provider: 'Dhaka Centre for Technology and Society',
  topics: ['Data Governance', 'Inclusion'],
  country: 'Bangladesh'
}];


export const news = [
{
  id: 'nw-1',
  category: 'Announcement',
  title: 'Observatory opens call for country research contributions',
  date: '2026-09-08',
  description: 'Placeholder news description for prototype evaluation.'
},
{
  id: 'nw-2',
  category: 'Project Update',
  title: 'Use-case repository passes 100 documented initiatives',
  date: '2026-08-19',
  description: 'Placeholder news description for prototype evaluation.'
}];