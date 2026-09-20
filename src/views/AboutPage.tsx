import { Container, SectionHeading, DemoDataNote } from '../components/ui/Primitives';

const sections = [
  ['Why the Observatory exists', 'Strengthen Asia’s capacity to design, govern and scale safe, rights-based, sustainable, inclusive and context-appropriate AI.'],
  ['What the Observatory does', 'Bring together regional learning, evidence generation, knowledge synthesis and mapping, knowledge translation, policy engagement and capacity building.'],
  ['Who the platform serves', 'Researchers, policymakers, practitioners, civil-society organisations, funders and communities working on responsible AI across South and Southeast Asia.'],
  ['Responsible AI principles', 'The proposed platform foregrounds safety, rights, inclusion, accountability, transparency, sustainability and context-appropriate innovation.']
];

export function AboutPage() {
  return <Container className="py-12"><SectionHeading eyebrow="About the Observatory" title="About the Asia AI4D Observatory" description="A proposed knowledge platform for responsible AI across South and Southeast Asia." /><DemoDataNote className="mt-6">This page uses project-brief language only. Final substantive content will be supplied and approved by the Client.</DemoDataNote><div className="mt-12 grid gap-8 md:grid-cols-2">{sections.map(([title, body]) => <section key={title} className="border-t border-line pt-5"><h2 className="font-serif text-2xl text-ink">{title}</h2><p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{body}</p></section>)}</div></Container>;
}
