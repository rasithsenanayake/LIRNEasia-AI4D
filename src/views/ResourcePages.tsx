import { BookOpen, CalendarClock, GraduationCap } from 'lucide-react';
import { Breadcrumbs, Container, DemoDataNote, EmptyState, SectionHeading } from '../components/ui/Primitives';
import { Tag } from '../components/ui/Tag';
import { formatDate } from '../utils/format';
import { learningResources, opportunities } from '../data/happenings';

export function OpportunitiesPage() {
  const open = opportunities.filter((item) => !item.expired);
  const archived = opportunities.filter((item) => item.expired);

  return <Container className="py-12">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Opportunities' }]} />
    <div className="mt-6">
      <SectionHeading eyebrow="Opportunities" title="Calls, grants and fellowships" description="Keep track of regional opportunities connected to responsible AI, digital policy and data stewardship." />
      <DemoDataNote className="-mt-2 mb-8">The opportunities below are illustrative placeholders for prototype evaluation.</DemoDataNote>
      <section aria-labelledby="open-opportunities-heading">
        <div className="mb-4 flex items-center gap-2"><CalendarClock className="h-5 w-5 text-accent" aria-hidden="true" /><h2 id="open-opportunities-heading" className="font-serif text-2xl text-ink">Open opportunities</h2></div>
        {open.length > 0 ? <div className="grid gap-4 md:grid-cols-2">{open.map((item) => <article key={item.id} className="rounded-lg border border-line bg-surface p-5"><div className="flex flex-wrap items-center justify-between gap-2 text-meta"><span className="font-semibold text-accent">{item.type}</span><span className="text-ink-muted">Deadline: {formatDate(item.deadline)}</span></div><h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{item.title}</h3><p className="mt-2 text-sm text-ink-muted">{item.organization} · {item.region}</p><p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">{item.description}</p></article>)}</div> : <EmptyState title="No open opportunities" description="New calls and programmes will appear here when they are added." />}
      </section>
      {archived.length > 0 && <section aria-labelledby="archived-opportunities-heading" className="mt-12"><h2 id="archived-opportunities-heading" className="mb-4 font-serif text-2xl text-ink">Archived opportunities</h2><ul className="divide-y divide-line rounded-lg border border-line bg-surface">{archived.map((item) => <li key={item.id} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between"><span className="font-medium text-ink">{item.title}</span><span className="text-meta text-ink-muted">Closed {formatDate(item.deadline)}</span></li>)}</ul></section>}
    </div>
  </Container>;
}

export function LearningResourcesPage() {
  return <Container className="py-12">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Learning resources' }]} />
    <div className="mt-6">
      <SectionHeading eyebrow="Learning resources" title="Practical guides and learning materials" description="Build shared understanding with courses, toolkits and guides from across the regional network." />
      <DemoDataNote className="-mt-2 mb-8">The resources below are illustrative placeholders for prototype evaluation.</DemoDataNote>
      {learningResources.length > 0 ? <div className="grid gap-4 md:grid-cols-2">{learningResources.map((resource) => <article key={resource.id} className="rounded-lg border border-line bg-surface p-5"><div className="flex items-start justify-between gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-line bg-raised text-accent"><BookOpen className="h-5 w-5" aria-hidden="true" /></span><span className="text-meta font-semibold text-accent">{resource.format}</span></div><h2 className="mt-4 text-lg font-semibold leading-snug text-ink">{resource.title}</h2><p className="mt-2 text-sm text-ink-muted">{resource.provider} · {resource.country}</p><p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">{resource.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{resource.topics.map((topic) => <Tag key={topic}>{topic}</Tag>)}</div></article>)}</div> : <EmptyState title="No learning resources" description="Courses and guides will appear here when they are added." />}
      <section aria-labelledby="resource-note-heading" className="mt-12 border-t border-line pt-6"><div className="flex items-start gap-3"><GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" /><div><h2 id="resource-note-heading" className="text-base font-semibold text-ink">Suggest a resource</h2><p className="mt-1 text-sm leading-relaxed text-ink-soft">The submission workflow is not connected in this preview. Contact the Observatory team to suggest a course, toolkit or guide for the next catalogue update.</p></div></div></section>
    </div>
  </Container>;
}
