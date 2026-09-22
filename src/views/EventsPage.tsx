import { CalendarDays, Users } from 'lucide-react';
import { Container, Breadcrumbs, DemoDataNote, EmptyState, SectionHeading } from '../components/ui/Primitives';
import { EventCard } from '../components/cards/EventCard';
import { Link } from '../components/ui/Link';
import { events } from '../data/happenings';
import { formatDate } from '../utils/format';

export function EventsPage() {
  const upcoming = events.filter((event) => event.status === 'upcoming');
  const past = events.filter((event) => event.status === 'past');

  return <Container className="py-12">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Events' }]} />
    <div className="mt-6">
      <SectionHeading eyebrow="Events" title="Conversations, workshops and briefings" description="Find upcoming opportunities to learn, share evidence and connect with the Asia AI4D Observatory network." />
      <DemoDataNote className="-mt-2 mb-8">The event records below are illustrative placeholders for prototype evaluation.</DemoDataNote>

      <section aria-labelledby="upcoming-events-heading">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-accent" aria-hidden="true" />
          <h2 id="upcoming-events-heading" className="font-serif text-2xl text-ink">Upcoming events</h2>
        </div>
        {upcoming.length > 0 ? <div className="grid gap-4 lg:grid-cols-2">{upcoming.map((event) => <EventCard key={event.id} event={event} />)}</div> : <EmptyState title="No upcoming events" description="New events will appear here when they are added to the observatory calendar." />}
      </section>

      <section aria-labelledby="past-events-heading" className="mt-12">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-ink-muted" aria-hidden="true" />
          <h2 id="past-events-heading" className="font-serif text-2xl text-ink">Past events</h2>
        </div>
        {past.length > 0 ? <ul className="divide-y divide-line rounded-lg border border-line bg-surface">{past.map((event) => <li key={event.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-meta font-medium text-ink-muted">{formatDate(event.date)} · {event.location}</p><h3 className="mt-1 text-base font-semibold text-ink"><Link to={`/events/${event.slug}`} className="rounded hover:text-accent hover:underline">{event.title}</Link></h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{event.description}</p></div><span className="shrink-0 text-meta text-ink-muted">Archive</span></li>)}</ul> : <EmptyState title="No archived events" description="Past events will appear here after the first observatory programme is completed." />}
      </section>
    </div>
  </Container>;
}
