export type Subregion = 'South Asia' | 'Southeast Asia';

export type ContentType =
'Report' |
'Policy Brief' |
'Research Brief' |
'Innovation Brief' |
'Mapping Study' |
'Commentary' |
'Dataset' |
'Use Case' |
'Event' |
'Person' |
'Organization' |
'Learning Resource' |
'Opportunity' |
'News';

export type OrganizationType =
'Government' |
'Private Sector' |
'Civil Society / NGO' |
'University / Research Institution' |
'Regional Organization' |
'International Organization';

export interface Indicator {
  id: string;
  label: string;
  unit: string;
  value: number;
  max: number;
  year: number;
  source: string;
  note: string;
}

export interface Country {
  code: string;
  name: string;
  slug: string;
  subregion: Subregion;
  grid: {col: number;row: number;};
  overview: string;
  metrics: {
    useCases: number;
    publications: number;
    organizations: number;
    experts: number;
    datasets: number;
  };
  indicators: Indicator[];
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  colorKey: keyof typeof topicColorMap;
  resourceCount: number;
}

export const topicColorMap = {
  governance: 'bg-cat-governance',
  innovation: 'bg-cat-innovation',
  inclusion: 'bg-cat-inclusion',
  data: 'bg-cat-data',
  readiness: 'bg-cat-readiness',
  sustainability: 'bg-cat-sustainability',
  ecosystem: 'bg-cat-ecosystem'
} as const;

export interface Publication {
  id: string;
  slug: string;
  type: Extract<
    ContentType,
    'Report' | 'Policy Brief' | 'Research Brief' | 'Innovation Brief' | 'Mapping Study' | 'Commentary'>;

  title: string;
  summary: string;
  authors: string[];
  organization: string;
  date: string;
  countries: string[];
  topics: string[];
  language: string;
  fileType: string;
  fileSize: string;
  doi?: string;
  files?: {label: string;url: string;type: string;size: string;}[];
  keyTakeaways: string[];
  executiveSummary: string[];
  keyFindings: string[];
  methodology: string;
  relatedDatasets: string[];
  relatedUseCases: string[];
  relatedPeople: string[];
}

export interface UseCase {
  id: string;
  slug: string;
  title: string;
  summary: string;
  country: string;
  sector: string;
  organization: string;
  organizationType: OrganizationType;
  status: 'Pilot' | 'Deployed' | 'Scaling' | 'Research';
  dimensions: string[];
  topics: string[];
  ecosystemCategory: string;
  lastUpdated: string;
  source: string;
  sections: {heading: string;body: string[];}[];
  relatedPublications: string[];
  relatedDatasets: string[];
  relatedPeople: string[];
  relatedOrganizations: string[];
  relatedEvents: string[];
}

export interface Dataset {
  id: string;
  slug: string;
  title: string;
  description: string;
  countries: string[];
  topics: string[];
  year: number;
  format: string;
  source: string;
  access: 'Open' | 'Registration required' | 'On request';
  updated: string;
  coverage: string;
  maintainer: string;
  licence: string;
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  role: string;
  organization: string;
  country: string;
  expertise: string[];
  bio: string;
  initials: string;
}

export interface Organization {
  id: string;
  slug: string;
  name: string;
  type: OrganizationType;
  country: string;
  description: string;
  website?: string;
  topics: string[];
  abbr: string;
}

export interface ObservatoryEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  format: 'Online' | 'In-person' | 'Hybrid';
  type: string;
  topics: string[];
  country: string;
  status: 'upcoming' | 'past';
  registration: 'Open' | 'Closed' | 'Invitation only';
  description: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'Fellowship' | 'Grant' | 'Call for Papers' | 'Programme' | 'Research Opportunity';
  deadline: string;
  description: string;
  region: string;
  expired?: boolean;
}

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  format: 'Course' | 'Video' | 'Toolkit' | 'Guide' | 'Framework' | 'Training';
  provider: string;
  topics: string[];
  country: string;
}

export interface Partner {
  id: string;
  name: string;
  abbr: string;
  role: string;
  description: string;
  website?: string;
}

export interface SearchRecord {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  href: string;
  country?: string;
  countries?: string[];
  topics: string[];
  sector?: string;
  organization?: string;
  organizationType?: string;
  dimensions?: string[];
  ecosystemCategory?: string;
  year: number;
  date?: string;
  keywords: string;
}
