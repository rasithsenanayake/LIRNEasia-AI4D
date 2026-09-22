import { CalendarDays, MapPin, Monitor, Users } from 'lucide-react';
import { Breadcrumbs, Container, DemoDataNote } from '../components/ui/Primitives';
import { LinkButton } from '../components/ui/Button';
import { type ObservatoryEvent } from '../types';
import { formatDate } from '../utils/format';

export function EventDetailPage({ event }: { event: ObservatoryEvent }) {
  const FormatIcon = event.format === 'Online' ? Monitor : event.format === 'Hybrid' ? Users : MapPin;

  return <Container className="py-12">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: event.title }]} />
    <article className="mt-8 max-w-3xl">
      <p className="text-meta font-semibold uppercase tracking-[0.09em] text-accent">{event.type}</p>
      <h1 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">{event.title}</h1>
      <div className="mt-6 grid gap-3 border-y border-line py-5 text-sm text-ink-soft sm:grid-cols-2">
        <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />{formatDate(event.date)}{event.endDate ? ` – ${formatDate(event.endDate)}` : ''}</p>
        <p className="flex items-center gap-2"><FormatIcon className="h-4 w-4 text-accent" aria-hidden="true" />{event.location} · {event.format}</p>
        <p><span className="font-medium text-ink">Country:</span> {event.country}</p>
        <p><span className="font-medium text-ink">Registration:</span> {event.registration}</p>
      </div>
      <p className="mt-8 text-lg leading-relaxed text-ink-soft">{event.description}</p>
      <div className="mt-8 rounded-lg border border-line bg-surface p-5">
        <h2 className="text-base font-semibold text-ink">Topics</h2>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">{event.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
      </div>
      <DemoDataNote className="mt-6">Registration links, recordings and event materials are not connected in this preview.</DemoDataNote>
      <div className="mt-6"><LinkButton to="/events" variant="secondary">Back to all events</LinkButton></div>
    </article>
  </Container>;
}
