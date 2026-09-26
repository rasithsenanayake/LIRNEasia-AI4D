import type { UseCase } from '../types';

/** Illustrative responsible AI use-case records for prototype evaluation. */
export const useCases: UseCase[] = [
{
  id: 'uc-1',
  slug: 'welfare-eligibility-triage-review',
  title: 'Human-in-the-loop review for welfare eligibility triage',
  summary:
  'A public agency introduced automated triage for social protection applications, paired with a mandatory caseworker review step and a published appeals route.',
  country: 'Sri Lanka',
  sector: 'Public Sector',
  organization: 'National Digital Policy Secretariat',
  broadCategory: 'Public-sector AI service',
  team: ['A. Perera', 'M. de Silva'],
  organizationType: 'Government',
  status: 'Pilot',
  dimensions: ['Human Oversight', 'Transparency', 'Accountability'],
  topics: ['AI Governance', 'Inclusion'],
  ecosystemCategory: 'Deployment & Services',
  lastUpdated: '2026-08-12',
  source: 'Observatory country research team',
  sections: [
  {
    heading: 'Overview',
    body: [
    'Placeholder overview content written at realistic length so the reading layout can be evaluated properly. The initiative applies a rules-and-model hybrid to order incoming social protection applications by likely eligibility, with every negative outcome routed to a human caseworker before any decision is communicated to an applicant.']

  },
  {
    heading: 'Problem / Context',
    body: [
    'Placeholder context describing application backlogs, uneven processing times across districts, and the equity concerns raised by civil-society organisations during consultation.',
    'A second paragraph would normally set out the legal and institutional environment, including the mandate of the implementing agency and any relevant data protection obligations.']

  },
  {
    heading: 'AI Application',
    body: [
    'Placeholder description of the technical approach: what data is used, what the model predicts, where it sits in the workflow, and what it explicitly does not decide.']

  },
  {
    heading: 'Responsible AI Considerations',
    body: [
    'Placeholder discussion of the safeguards adopted — documented model limitations, disparity monitoring across districts and household types, a published plain-language notice to applicants, and a named official accountable for the system.',
    'This section is where the Observatory records both the safeguards claimed by the implementer and the gaps identified by independent reviewers.']

  },
  {
    heading: 'Impact / Lessons',
    body: [
    'Placeholder lessons content. No impact figures are presented in this prototype; verified evaluation results will be added when supplied.']

  },
  {
    heading: 'Why This Matters',
    body: [
    'Placeholder plain-language explanation aimed at non-specialist readers, connecting this initiative to the wider regional debate on automated decision-making in entitlement systems.']

  }],

  relatedPublications: ['pub-2', 'pub-1'],
  relatedDatasets: ['ds-1'],
  relatedPeople: ['p-4', 'p-1'],
  relatedOrganizations: ['o-2', 'o-1'],
  relatedEvents: ['ev-1']
},
{
  id: 'uc-2',
  slug: 'community-speech-corpus-local-languages',
  title: 'Community-collected speech corpus for under-served languages',
  summary:
  'A civil-society consortium built a consent-based speech corpus in four under-served languages, licensed for public-interest use and governed by a community data trust.',
  country: 'Bangladesh',
  sector: 'Education',
  organization: 'Dhaka Centre for Technology and Society',
  organizationType: 'Civil Society / NGO',
  status: 'Scaling',
  dimensions: ['Participation', 'Privacy & Data Protection', 'Fairness & Non-discrimination'],
  topics: ['Inclusion', 'Data Governance'],
  ecosystemCategory: 'Research & Knowledge',
  lastUpdated: '2026-05-04',
  source: 'Partner submission, reviewed by Observatory editors',
  sections: [
  {
    heading: 'Overview',
    body: ['Placeholder overview of a participatory data collection initiative and its governance structure.']
  },
  {
    heading: 'Problem / Context',
    body: ['Placeholder context on language coverage gaps and their effect on access to digital public services.']
  },
  { heading: 'AI Application', body: ['Placeholder description of downstream speech and translation applications.'] },
  {
    heading: 'Responsible AI Considerations',
    body: ['Placeholder discussion of consent, community ownership, licensing terms and benefit sharing.']
  },
  { heading: 'Impact / Lessons', body: ['Placeholder lessons on sustaining community participation over time.'] },
  { heading: 'Why This Matters', body: ['Placeholder plain-language explanation for general readers.'] }],

  relatedPublications: ['pub-3'],
  relatedDatasets: ['ds-2'],
  relatedPeople: ['p-2'],
  relatedOrganizations: ['o-3'],
  relatedEvents: ['ev-2']
},
{
  id: 'uc-3',
  slug: 'flood-early-warning-advisory',
  title: 'Localised flood early-warning advisories for coastal districts',
  summary:
  'A forecasting service combines public hydrological data with community reporting to issue district-level advisories in local languages.',
  country: 'Indonesia',
  sector: 'Climate & Environment',
  organization: 'Nusantara Public Data Lab',
  organizationType: 'Civil Society / NGO',
  status: 'Deployed',
  dimensions: ['Safety & Robustness', 'Participation', 'Transparency'],
  topics: ['Sustainability', 'Inclusion'],
  ecosystemCategory: 'Deployment & Services',
  lastUpdated: '2026-07-01',
  source: 'Observatory country research team',
  sections: [
  { heading: 'Overview', body: ['Placeholder overview of the advisory service and its distribution channels.'] },
  { heading: 'Problem / Context', body: ['Placeholder context on warning reach in low-connectivity coastal districts.'] },
  { heading: 'AI Application', body: ['Placeholder description of the forecasting and triage models used.'] },
  {
    heading: 'Responsible AI Considerations',
    body: ['Placeholder discussion of false-alarm management, escalation protocols and accountability for missed warnings.']
  },
  { heading: 'Impact / Lessons', body: ['Placeholder lessons on trust and repeated exposure to warnings.'] },
  { heading: 'Why This Matters', body: ['Placeholder plain-language explanation for general readers.'] }],

  relatedPublications: ['pub-3'],
  relatedDatasets: ['ds-2', 'ds-4'],
  relatedPeople: ['p-3'],
  relatedOrganizations: ['o-4'],
  relatedEvents: []
},
{
  id: 'uc-4',
  slug: 'smallholder-advisory-cooperative',
  title: 'Cooperative-governed crop advisory for smallholder farmers',
  summary:
  'An agricultural cooperative deployed a vernacular advisory assistant, with the cooperative board retaining control over data use and advisory content.',
  country: 'Nepal',
  sector: 'Agriculture',
  organization: 'AgriTech Cooperative Network',
  organizationType: 'Private Sector',
  status: 'Deployed',
  dimensions: ['Participation', 'Transparency', 'Environmental Responsibility'],
  topics: ['Sustainability', 'Responsible Innovation'],
  ecosystemCategory: 'Deployment & Services',
  lastUpdated: '2026-03-19',
  source: 'Partner submission, reviewed by Observatory editors',
  sections: [
  { heading: 'Overview', body: ['Placeholder overview of the advisory service and cooperative governance model.'] },
  { heading: 'Problem / Context', body: ['Placeholder context on extension-service coverage.'] },
  { heading: 'AI Application', body: ['Placeholder description of the advisory model and language support.'] },
  { heading: 'Responsible AI Considerations', body: ['Placeholder discussion of data ownership and advice liability.'] },
  { heading: 'Impact / Lessons', body: ['Placeholder lessons on farmer trust and seasonal usage patterns.'] },
  { heading: 'Why This Matters', body: ['Placeholder plain-language explanation for general readers.'] }],

  relatedPublications: ['pub-1', 'pub-4'],
  relatedDatasets: ['ds-3'],
  relatedPeople: ['p-3'],
  relatedOrganizations: ['o-8'],
  relatedEvents: ['ev-3']
},
{
  id: 'uc-5',
  slug: 'district-hospital-triage-support',
  title: 'Decision support for triage in district hospitals',
  summary:
  'A clinical decision-support tool was introduced across district hospitals with structured clinician override logging and independent evaluation.',
  country: 'Viet Nam',
  sector: 'Health',
  organization: 'Mekong University Research Centre',
  organizationType: 'University / Research Institution',
  status: 'Research',
  dimensions: ['Human Oversight', 'Safety & Robustness', 'Accountability'],
  topics: ['Responsible Innovation', 'AI Readiness'],
  ecosystemCategory: 'Research & Knowledge',
  lastUpdated: '2026-01-28',
  source: 'Observatory country research team',
  sections: [
  { heading: 'Overview', body: ['Placeholder overview of the deployment and the evaluation design.'] },
  { heading: 'Problem / Context', body: ['Placeholder context on triage workload in district facilities.'] },
  { heading: 'AI Application', body: ['Placeholder description of the model and its integration into clinical workflow.'] },
  { heading: 'Responsible AI Considerations', body: ['Placeholder discussion of override logging and clinician accountability.'] },
  { heading: 'Impact / Lessons', body: ['Placeholder lessons on trust calibration among clinicians.'] },
  { heading: 'Why This Matters', body: ['Placeholder plain-language explanation for general readers.'] }],

  relatedPublications: ['pub-5', 'pub-4'],
  relatedDatasets: ['ds-4'],
  relatedPeople: ['p-5'],
  relatedOrganizations: ['o-5'],
  relatedEvents: ['ev-1']
},
{
  id: 'uc-6',
  slug: 'procurement-transparency-register',
  title: 'Public register of algorithmic systems in government procurement',
  summary:
  'A regional coordination body piloted a shared register recording where algorithmic systems are used in government services, and who is accountable for each.',
  country: 'Singapore',
  sector: 'Public Sector',
  organization: 'ASEAN Digital Cooperation Forum',
  organizationType: 'Regional Organization',
  status: 'Pilot',
  dimensions: ['Transparency', 'Accountability'],
  topics: ['AI Governance', 'AI Ecosystem'],
  ecosystemCategory: 'Policy & Regulation',
  lastUpdated: '2026-06-11',
  source: 'Observatory country research team',
  sections: [
  { heading: 'Overview', body: ['Placeholder overview of the register and its disclosure schema.'] },
  { heading: 'Problem / Context', body: ['Placeholder context on visibility of algorithmic systems in public services.'] },
  { heading: 'AI Application', body: ['Placeholder description of the systems catalogued by the register.'] },
  { heading: 'Responsible AI Considerations', body: ['Placeholder discussion of disclosure scope and exemptions.'] },
  { heading: 'Impact / Lessons', body: ['Placeholder lessons on agency compliance and register upkeep.'] },
  { heading: 'Why This Matters', body: ['Placeholder plain-language explanation for general readers.'] }],

  relatedPublications: ['pub-4', 'pub-2'],
  relatedDatasets: ['ds-1'],
  relatedPeople: ['p-6'],
  relatedOrganizations: ['o-6'],
  relatedEvents: ['ev-2']
}];


export const useCaseBySlug = (slug: string): UseCase | undefined => useCases.find((u) => u.slug === slug);
export const useCaseById = (id: string): UseCase | undefined => useCases.find((u) => u.id === id);
