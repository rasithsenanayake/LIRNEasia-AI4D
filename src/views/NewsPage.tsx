import { Container, DemoDataNote, SectionHeading } from '../components/ui/Primitives';
import { news } from '../data/happenings';
import { formatDate } from '../utils/format';

export function NewsPage() {
  return <Container className="py-12"><SectionHeading eyebrow="News" title="News and Observatory updates" description="Updates will appear here when provided by the Client." /><DemoDataNote className="mt-6">The entries below are illustrative placeholders.</DemoDataNote><ul className="mt-10 grid gap-4 md:grid-cols-2">{news.map((item) => <li id={item.id} key={item.id} className="rounded-lg border border-line bg-surface p-5"><p className="text-meta font-semibold uppercase tracking-[0.08em] text-accent">{item.category} · {formatDate(item.date)}</p><h2 className="mt-2 font-serif text-xl text-ink">{item.title}</h2><p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{item.description}</p></li>)}</ul></Container>;
}
