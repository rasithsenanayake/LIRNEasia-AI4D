import type { Publication } from '../types';

export const PUBLICATION_TYPES = ['Report', 'Policy Brief', 'Research Brief', 'Innovation Brief', 'Mapping Study', 'Commentary', 'Blog', 'Op-ed / External Publication'] as const;

/** Illustrative publication records for prototype evaluation. No real findings are represented. */
export const publications: Publication[] = [
{
  id: 'pub-1',
  slug: 'ai-readiness-south-asia-mapping-study',
  type: 'Mapping Study',
  title: 'Mapping AI readiness across South Asia: institutions, data and capacity',
  summary:
  'A regional mapping study examining how national institutions, data infrastructure and skills pipelines shape the capacity of South Asian governments to adopt artificial intelligence responsibly.',
  authors: ['A. Perera', 'S. Kaur', 'M. de Silva'],
  organization: 'Colombo Institute for Digital Policy',
  date: '2026-04-18',
  countries: ['Sri Lanka', 'India', 'Bangladesh', 'Nepal', 'Pakistan'],
  topics: ['AI Readiness', 'AI Governance', 'Data Governance'],
  language: 'English',
  fileType: 'PDF',
  fileSize: '4.8 MB',
  keyTakeaways: [
  'Placeholder takeaway describing where institutional mandates for AI oversight currently sit across the five countries studied.',
  'Placeholder takeaway on the gap between published strategy documents and operational capacity inside implementing agencies.',
  'Placeholder takeaway on the availability and quality of the public datasets that AI systems in the region depend on.',
  'Placeholder takeaway on skills pipelines and the concentration of applied AI expertise in a small number of institutions.'],

  executiveSummary: [
  'This is placeholder executive-summary content used to evaluate the reading experience at realistic length. The study reviews national policy documents, conducts key-informant interviews and assembles a comparable indicator set across five South Asian countries.',
  'The summary would normally describe the analytical framework, the three dimensions of readiness assessed, and the way the research team handled gaps in official data. Final text will be supplied by LIRNEasia.'],

  keyFindings: [
  'Placeholder finding one — presented here to show how structured findings are rendered in the publication layout.',
  'Placeholder finding two — illustrating a finding of moderate length with a supporting clause.',
  'Placeholder finding three — illustrating how the component handles a longer, more qualified statement that runs across two lines on desktop.'],

  methodology:
  'Placeholder methodology note. Mixed-methods design combining document review, key-informant interviews and secondary indicator analysis. Full methodology and instruments will be published alongside the final report.',
  relatedDatasets: ['ds-1', 'ds-3'],
  relatedUseCases: ['uc-1', 'uc-4'],
  relatedPeople: ['p-1', 'p-6', 'p-4'],
  languageVariants: [
    { language: 'English', label: 'Current version', isCurrent: true },
    { language: 'සිංහල', label: 'Planned language version · content not supplied' },
    { language: 'தமிழ்', label: 'Planned language version · content not supplied' }
  ]
},
{
  id: 'pub-2',
  slug: 'algorithmic-accountability-public-services-policy-brief',
  type: 'Policy Brief',
  title: 'Algorithmic accountability in public service delivery: a policy brief for Sri Lanka',
  summary:
  'Practical guidance for public agencies procuring or deploying automated decision-support systems, covering disclosure, appeal routes and human oversight.',
  authors: ['M. de Silva', 'A. Perera'],
  organization: 'National Digital Policy Secretariat',
  date: '2026-02-09',
  countries: ['Sri Lanka'],
  topics: ['AI Governance', 'Inclusion'],
  language: 'English',
  fileType: 'PDF',
  fileSize: '1.2 MB',
  keyTakeaways: [
  'Placeholder takeaway on where disclosure obligations should attach in the procurement cycle.',
  'Placeholder takeaway on minimum appeal and redress routes for affected citizens.',
  'Placeholder takeaway on the role of human oversight where decisions affect entitlements.'],

  executiveSummary: [
  'Placeholder summary text for a short, policy-facing brief. Briefs in the Observatory are deliberately concise and lead with takeaways so that policymakers can act on them quickly.'],

  keyFindings: [],
  methodology: 'Placeholder note — brief draws on the regional mapping study and two government consultations.',
  relatedDatasets: ['ds-1'],
  relatedUseCases: ['uc-1'],
  relatedPeople: ['p-4', 'p-1'],
  gatedDownload: true
},
{
  id: 'pub-3',
  slug: 'inclusive-ai-language-access-research-brief',
  type: 'Research Brief',
  title: 'Inclusive AI and language access: who is served by regional language models?',
  summary:
  'A research brief examining coverage of South and Southeast Asian languages in widely used models, and the implications for access to public information.',
  authors: ['N. Rahman', 'L. Sari'],
  organization: 'Dhaka Centre for Technology and Society',
  date: '2025-11-27',
  countries: ['Bangladesh', 'Indonesia', 'Nepal'],
  topics: ['Inclusion', 'Responsible Innovation'],
  language: 'English',
  fileType: 'PDF',
  fileSize: '2.1 MB',
  keyTakeaways: [
  'Placeholder takeaway on uneven language coverage and its effect on service access.',
  'Placeholder takeaway on community-led data collection as a partial response.',
  'Placeholder takeaway on procurement criteria that reward language coverage.'],

  executiveSummary: [
  'Placeholder summary describing scope, method and the evaluation set used. Final content pending client approval.'],

  keyFindings: [
  'Placeholder finding on benchmark coverage.',
  'Placeholder finding on user-facing service impact.'],

  methodology: 'Placeholder note — comparative evaluation across a fixed prompt set in six languages.',
  relatedDatasets: ['ds-2'],
  relatedUseCases: ['uc-2', 'uc-3'],
  relatedPeople: ['p-2', 'p-3']
},
{
  id: 'pub-4',
  slug: 'regional-ai-ecosystem-report-2026',
  type: 'Report',
  title: 'The Asian AI ecosystem: actors, funding and capacity, 2026',
  summary:
  'A full-length regional report mapping the organisations, funding flows and capacity-building initiatives that make up AI ecosystems across the region.',
  authors: ['S. Kaur', 'R. Nguyen', 'A. Perera'],
  organization: 'South Asia Technology Observatory',
  date: '2026-06-30',
  countries: ['India', 'Viet Nam', 'Singapore', 'Indonesia', 'Philippines', 'Thailand'],
  topics: ['AI Ecosystem', 'AI Readiness', 'AI Governance'],
  language: 'English',
  fileType: 'PDF',
  fileSize: '9.4 MB',
  keyTakeaways: [
  'Placeholder takeaway on ecosystem concentration.',
  'Placeholder takeaway on public versus private funding balance.',
  'Placeholder takeaway on regional cooperation mechanisms.'],

  executiveSummary: [
  'Placeholder executive summary for a long-form regional report. This text exists to test reading comfort, line length and the behaviour of the metadata panel alongside substantial body content.',
  'A second paragraph of placeholder content, describing how the ecosystem map was assembled and how readers should interpret the accompanying dataset.'],

  keyFindings: [
  'Placeholder finding one.',
  'Placeholder finding two.',
  'Placeholder finding three.',
  'Placeholder finding four.'],

  methodology: 'Placeholder note — organisational census plus funding-flow analysis, with annual refresh planned.',
  relatedDatasets: ['ds-3', 'ds-4'],
  relatedUseCases: ['uc-4', 'uc-5'],
  relatedPeople: ['p-6', 'p-5']
},
{
  id: 'pub-5',
  slug: 'clinical-decision-support-innovation-brief',
  type: 'Innovation Brief',
  title: 'Clinical decision support in district hospitals: an innovation brief',
  summary:
  'How a district-level clinical decision-support deployment was designed, evaluated and adjusted in response to clinician feedback.',
  authors: ['R. Nguyen'],
  organization: 'Mekong University Research Centre',
  date: '2025-09-15',
  countries: ['Viet Nam'],
  topics: ['Responsible Innovation', 'AI Readiness'],
  language: 'English',
  fileType: 'PDF',
  fileSize: '1.8 MB',
  keyTakeaways: [
  'Placeholder takeaway on clinician trust and override behaviour.',
  'Placeholder takeaway on evaluation design in low-resource settings.'],

  executiveSummary: ['Placeholder summary content for an innovation brief.'],
  keyFindings: [],
  methodology: 'Placeholder note — implementation study with pre/post comparison.',
  relatedDatasets: ['ds-4'],
  relatedUseCases: ['uc-5'],
  relatedPeople: ['p-5']
},
{
  id: 'pub-6',
  slug: 'data-protection-and-ai-commentary',
  type: 'Commentary',
  title: 'Data protection law is doing more AI governance work than we admit',
  summary:
  'A commentary arguing that existing data protection regimes already carry much of the regulatory weight for AI systems in the region.',
  authors: ['A. Perera'],
  organization: 'Colombo Institute for Digital Policy',
  date: '2026-07-22',
  countries: ['Sri Lanka', 'India'],
  topics: ['Data Governance', 'AI Governance'],
  language: 'English',
  fileType: 'Web',
  fileSize: '—',
  keyTakeaways: [],
  executiveSummary: ['Placeholder commentary introduction.'],
  keyFindings: [],
  methodology: '',
  relatedDatasets: [],
  relatedUseCases: ['uc-1'],
  relatedPeople: ['p-1']
}];


export const publicationBySlug = (slug: string): Publication | undefined =>
publications.find((p) => p.slug === slug);
export const publicationById = (id: string): Publication | undefined =>
publications.find((p) => p.id === id);
