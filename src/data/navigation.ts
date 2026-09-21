export interface NavLink {
  label: string;
  to: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  to: string;
  columns: {heading: string;links: NavLink[];}[];
  highlight: {label: string;title: string;description: string;to: string;};
}

export const navGroups: NavGroup[] = [
{
  label: 'Explore',
  to: '/explore',
  columns: [
  {
    heading: 'Browse the repository',
    links: [
    { label: 'Responsible AI Use Cases', to: '/use-cases', description: 'Documented initiatives across the region' },
    { label: 'Countries', to: '/countries', description: 'Country knowledge hubs' },
    { label: 'Topics', to: '/topics', description: 'Governance, inclusion, data and more' }]

  },
  {
    heading: 'Directories',
    links: [
    { label: 'Organizations', to: '/organizations' },
    { label: 'People', to: '/people' },
    { label: 'Learning Resources', to: '/learning-resources' }]

  }],

  highlight: {
    label: 'Start here',
    title: 'Explore the Knowledge Repository',
    description: 'Search and filter every resource in the Observatory in one place.',
    to: '/explore'
  }
},
{
  label: 'Research & Data',
  to: '/research',
  columns: [
  {
    heading: 'Publications',
    links: [
    { label: 'Reports', to: '/explore?type=Report' },
    { label: 'Mapping Studies', to: '/explore?type=Mapping%20Study' },
    { label: 'Research Briefs', to: '/explore?type=Research%20Brief' },
    { label: 'Policy Briefs', to: '/explore?type=Policy%20Brief' },
    { label: 'Innovation Briefs', to: '/explore?type=Innovation%20Brief' }]

  },
  {
    heading: 'Data & commentary',
    links: [
    { label: 'Datasets', to: '/explore?type=Dataset' },
    { label: 'Blogs & Commentary', to: '/explore?type=Commentary' },
    { label: 'Data & Maps', to: '/data-maps' }]

  }],

  highlight: {
    label: 'Featured',
    title: 'Mapping AI readiness across South Asia',
    description: 'Regional mapping study covering institutions, data and capacity.',
    to: '/publications/ai-readiness-south-asia-mapping-study'
  }
},
{
  label: 'Community',
  to: '/people',
  columns: [
  {
    heading: 'Network',
    links: [
    { label: 'People', to: '/people' },
    { label: 'Organizations', to: '/organizations' },
    { label: 'Experts', to: '/people' }]

  },
  {
    heading: 'Partnership',
    links: [
    { label: 'Partners', to: '/partners' },
    { label: 'Contribute a use case', to: '/contact' }]

  }],

  highlight: {
    label: 'Connected knowledge',
    title: 'Follow a thread across the region',
    description: 'People link to publications, publications to datasets, datasets back to countries.',
    to: '/people'
  }
},
{
  label: 'Events & Opportunities',
  to: '/events',
  columns: [
  {
    heading: 'Events',
    links: [
    { label: 'Upcoming Events', to: '/events' },
    { label: 'Past Events', to: '/events?tab=past' }]

  },
  {
    heading: 'Opportunities',
    links: [
    { label: 'Opportunities', to: '/opportunities' },
    { label: 'Newsletter preview', to: '/newsletter' }]

  }],

  highlight: {
    label: 'Regional engagement',
    title: 'Events and regional engagement',
    description: 'Discover upcoming roundtables, workshops and Observatory activities.',
    to: '/events'
  }
},
{
  label: 'About',
  to: '/about',
  columns: [
  {
    heading: 'The Observatory',
    links: [
    { label: 'About the Observatory', to: '/about' },
    { label: 'Mission', to: '/about#mission' },
    { label: 'Approach', to: '/about#approach' }]

  },
  {
    heading: 'Get in touch',
    links: [
    { label: 'Partners', to: '/partners' },
    { label: 'Contact', to: '/contact' }]

  }],

  highlight: {
    label: 'Our approach',
    title: 'Research · Connect · Translate · Inform · Scale',
    description: 'How the Observatory turns regional research into usable policy knowledge.',
    to: '/about'
  }
}];


export const footerColumns = [
{
  heading: 'Explore',
  links: [
  { label: 'Knowledge Repository', to: '/explore' },
  { label: 'Responsible AI Use Cases', to: '/use-cases' },
  { label: 'Countries', to: '/countries' },
  { label: 'Topics', to: '/topics' }]

},
{
  heading: 'Research & Data',
  links: [
  { label: 'Research & Insights', to: '/research' },
  { label: 'Publications', to: '/research' },
  { label: 'Datasets', to: '/explore?type=Dataset' },
  { label: 'Data & Maps', to: '/data-maps' }]

},
{
  heading: 'Community',
  links: [
  { label: 'People & Experts', to: '/people' },
  { label: 'Organizations', to: '/organizations' },
  { label: 'Partners', to: '/partners' },
  { label: 'Events', to: '/events' }]

},
{
  heading: 'About',
  links: [
  { label: 'About the Observatory', to: '/about' },
  { label: 'Newsletter preview', to: '/newsletter' },
  { label: 'Contact', to: '/contact' },
  { label: 'Accessibility', to: '/accessibility' },
  { label: 'Privacy', to: '/privacy' }]

}];
