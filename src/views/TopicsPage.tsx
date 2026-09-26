import { ArrowRight } from 'lucide-react';
import { topics } from '../data/taxonomy';
import { topicColorMap } from '../types';
import { topicResourceCount } from '../utils/repositoryStats';
import { Link } from '../components/ui/Link';
import { Breadcrumbs, Container, SectionHeading } from '../components/ui/Primitives';

export function TopicsPage() {
  return <Container className="py-12"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Topics' }]} /><div className="mt-6"><SectionHeading eyebrow="Topics" title="Explore responsible AI research" description="Browse the Observatory’s thematic areas and open matching repository records." /><ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{topics.map((topic) => { const count = topicResourceCount(topic.name); return <li key={topic.id}><article className="flex h-full flex-col rounded-lg border border-line bg-surface p-5"><span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${topicColorMap[topic.colorKey]}`} /><h2 className="mt-4 font-serif text-xl text-ink">{topic.name}</h2><p className="mt-2 text-sm leading-relaxed text-ink-soft">{topic.description}</p><p className="mt-4 text-meta text-ink-muted">{count} matching prototype {count === 1 ? 'record' : 'records'}</p><Link to={`/explore?topic=${encodeURIComponent(topic.name)}`} className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-4 text-sm font-semibold text-accent hover:underline">Explore this topic <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article></li>; })}</ul></div></Container>;
}
