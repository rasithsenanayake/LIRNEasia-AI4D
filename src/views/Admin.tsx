'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Database,
  FileImage,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { datasets } from '../data/datasets';
import { events } from '../data/happenings';
import { AdminPublicationEditor } from './AdminPublicationEditor';

type AdminView = 'dashboard' | 'publications' | 'use-cases' | 'datasets' | 'events' | 'media' | 'analytics' | 'users' | 'settings';

const adminRoutes: Record<AdminView, string> = {
  dashboard: '/admin',
  publications: '/admin/publications',
  'use-cases': '/admin/use-cases',
  datasets: '/admin/datasets',
  events: '/admin/events',
  media: '/admin/media',
  analytics: '/admin/analytics',
  users: '/admin/users',
  settings: '/admin/settings'
};

function getAdminView(pathname: string): { view: AdminView; editorOpen: boolean } {
  const section = pathname.split('/').filter(Boolean)[1];
  const view = section && Object.prototype.hasOwnProperty.call(adminRoutes, section) ? section as AdminView : 'dashboard';
  return { view, editorOpen: pathname.endsWith('/new') && (view === 'publications' || view === 'use-cases') };
}

type ContentStatus = 'Published' | 'Draft' | 'Scheduled' | 'Needs review';

const navGroups: { label: string; items: { label: string; view: AdminView; icon: LucideIcon }[] }[] = [
  {
    label: 'Workspace',
    items: [{ label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Content',
    items: [
      { label: 'Publications', view: 'publications', icon: BookOpen },
      { label: 'Use cases', view: 'use-cases', icon: FolderKanban },
      { label: 'Datasets', view: 'datasets', icon: Database },
      { label: 'Events', view: 'events', icon: CalendarDays },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Media library', view: 'media', icon: FileImage },
      { label: 'Analytics', view: 'analytics', icon: BarChart3 },
      { label: 'Users & roles', view: 'users', icon: Users },
    ],
  },
];

const recentContent = [
  { title: 'AI Governance in Sri Lanka', type: 'Policy brief', status: 'Published' as ContentStatus, author: 'Nadeesha Perera', updated: '20 Sep 2026' },
  { title: 'Responsible AI Readiness Index', type: 'Dataset', status: 'Needs review' as ContentStatus, author: 'Amal Jayasinghe', updated: '19 Sep 2026' },
  { title: 'Digital public infrastructure and AI', type: 'Research report', status: 'Draft' as ContentStatus, author: 'Maya Fernando', updated: '18 Sep 2026' },
  { title: 'AI for climate resilience in Asia', type: 'Use case', status: 'Scheduled' as ContentStatus, author: 'Ruwan Senanayake', updated: '17 Sep 2026' },
];

const publications = [
  { title: 'AI Governance in Sri Lanka', type: 'Policy brief', countries: 'Sri Lanka', topic: 'Governance', date: '20 Sep 2026', status: 'Published' as ContentStatus },
  { title: 'Responsible AI Readiness Index', type: 'Mapping study', countries: 'South Asia', topic: 'Readiness', date: '—', status: 'Needs review' as ContentStatus },
  { title: 'Digital public infrastructure and AI', type: 'Research report', countries: 'India, Nepal', topic: 'Public services', date: '—', status: 'Draft' as ContentStatus },
  { title: 'AI for climate resilience in Asia', type: 'Innovation brief', countries: 'Asia', topic: 'Climate', date: '01 Oct 2026', status: 'Scheduled' as ContentStatus },
  { title: 'Building inclusive AI ecosystems', type: 'Research brief', countries: 'Bangladesh', topic: 'Inclusion', date: '12 Aug 2026', status: 'Published' as ContentStatus },
];

const useCases = [
  { title: 'Flood forecasting for resilient communities', country: 'Bangladesh', sector: 'Climate', organization: 'BRAC', status: 'Published' as ContentStatus, updated: '18 Sep 2026' },
  { title: 'Language technology for public services', country: 'Sri Lanka', sector: 'Public sector', organization: 'ICTA', status: 'Needs review' as ContentStatus, updated: '16 Sep 2026' },
  { title: 'AI-assisted maternal health referrals', country: 'India', sector: 'Health', organization: 'Sangath', status: 'Draft' as ContentStatus, updated: '11 Sep 2026' },
  { title: 'Smallholder crop advisory network', country: 'Nepal', sector: 'Agriculture', organization: 'Practical Action', status: 'Published' as ContentStatus, updated: '05 Sep 2026' },
];

const attentionItems = [
  { label: '3 drafts older than 30 days', tone: 'amber' },
  { label: '7 resources missing country tags', tone: 'red' },
  { label: '2 events need post-event updates', tone: 'slate' },
];

function StatusBadge({ status }: { status: ContentStatus }) {
  const styles: Record<ContentStatus, string> = {
    Published: 'border-[#b9d6c6] bg-[#edf5ef] text-[#28613e]',
    Draft: 'border-line bg-raised text-ink-muted',
    Scheduled: 'border-[#c9d6e7] bg-[#eef3f8] text-[#315a7d]',
    'Needs review': 'border-[#ead2a5] bg-[#fff8e8] text-[#8b641c]',
  };

  return <span className={cn('inline-flex rounded border px-2 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.06em]', styles[status])}>{status}</span>;
}

function Sidebar({ activeView, onNavigate, mobileOpen, onClose }: { activeView: AdminView; onNavigate: (view: AdminView) => void; mobileOpen: boolean; onClose: () => void }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      {mobileOpen && <button type="button" aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-40 bg-ink/35 lg:hidden" />}
      <aside className={cn('fixed inset-y-0 left-0 z-50 flex h-dvh max-h-dvh w-[258px] -translate-x-full flex-col overflow-hidden bg-[#17343d] text-white transition-transform duration-200 ease-out lg:static lg:z-auto lg:translate-x-0', mobileOpen && 'translate-x-0')}>
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <Image src="/imagers/fav%20icon.png" alt="Asia AI4D Observatory" width={36} height={36} className="h-9 w-9 rounded object-cover" priority />
            <div>
              <p className="text-sm font-semibold tracking-[-0.01em]">Asia AI4D</p>
              <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-white/55">Observatory CMS</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="inline-flex h-9 w-9 items-center justify-center rounded text-white/65 hover:bg-white/10 hover:text-white lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="min-h-0 flex-1 px-3 py-5" aria-label="Admin navigation">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-6">
              <p className="px-3 pb-2 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-white/42">{group.label}</p>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.view;
                  return (
                    <li key={item.label}>
                      <button type="button" onClick={() => onNavigate(item.view)} className={cn('flex min-h-[42px] w-full items-center gap-3 rounded px-3 text-left text-sm transition-colors', isActive ? 'bg-white/12 font-medium text-white' : 'text-white/68 hover:bg-white/8 hover:text-white')}>
                        <Icon className="h-[17px] w-[17px] shrink-0" strokeWidth={1.8} />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="border-t border-white/10 pt-5">
            <p className="px-3 pb-2 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-white/42">Website</p>
            <button type="button" onClick={() => onNavigate('settings')} className="flex min-h-[42px] w-full items-center gap-3 rounded px-3 text-left text-sm text-white/68 hover:bg-white/8 hover:text-white">
              <Settings className="h-[17px] w-[17px]" strokeWidth={1.8} />
              Settings
            </button>
          </div>
        </nav>

        <div className="relative shrink-0 border-t border-white/10 p-4">
          {profileOpen && <div className="absolute bottom-[calc(100%-8px)] left-4 right-4 rounded-lg border border-white/10 bg-[#204650] p-2 shadow-lg">
            <button type="button" onClick={() => window.alert('Profile editing will be available when the CMS account API is connected.')} className="flex min-h-[40px] w-full items-center gap-3 rounded px-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white"><UserRound className="h-4 w-4" />Edit profile</button>
            <button type="button" onClick={() => { window.location.href = '/'; }} className="flex min-h-[40px] w-full items-center gap-3 rounded px-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white"><LogOut className="h-4 w-4" />Log out</button>
          </div>}
          <button type="button" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen} className="flex w-full items-center gap-3 rounded bg-white/7 p-3 text-left hover:bg-white/10">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8c5ad] text-xs font-semibold text-[#4f3d2a]">KA</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">Kamal Amara</p>
              <p className="text-[0.6875rem] text-white/50">Administrator</p>
            </div>
            <ChevronDown className={cn('h-4 w-4 text-white/45 transition-transform', profileOpen && 'rotate-180')} />
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ title, onOpenMenu, search, onSearch }: { title: string; onOpenMenu: () => void; search: string; onSearch: (value: string) => void }) {
  return (
    <header className="sticky top-0 z-30 flex min-h-[76px] items-center justify-between gap-4 border-b border-line bg-canvas/95 px-5 backdrop-blur sm:px-8 lg:px-10">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" onClick={onOpenMenu} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-line bg-surface text-ink-soft hover:bg-raised lg:hidden" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold tracking-[-0.02em] text-ink">{title}</p>
          <p className="hidden text-xs text-ink-muted sm:block">Asia AI4D Observatory / Admin</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <label className="hidden h-10 w-[min(28vw,280px)] items-center gap-2 rounded border border-line bg-surface px-3 text-ink-muted md:flex">
          <Search className="h-4 w-4 shrink-0" />
          <input value={search} onChange={(event) => onSearch(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted" placeholder="Search content" aria-label="Search content" />
          <kbd className="rounded border border-line bg-raised px-1.5 py-0.5 text-[0.625rem] text-ink-muted">⌘K</kbd>
        </label>
        <button type="button" onClick={() => window.alert('No new notifications')} className="relative inline-flex h-10 w-10 items-center justify-center rounded border border-line bg-surface text-ink-soft hover:bg-raised" aria-label="Notifications">
          <Bell className="h-[17px] w-[17px]" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#b97839]" aria-hidden="true" />
        </button>
        <span className="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />
        <span className="hidden text-right sm:block"><span className="block text-xs font-medium text-ink">Kamal Amara</span><span className="block text-[0.6875rem] text-ink-muted">Administrator</span></span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8c5ad] text-xs font-semibold text-[#4f3d2a] sm:hidden" aria-hidden="true">KA</span>
      </div>
    </header>
  );
}

function PageHeading({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="space-y-4 border-b border-line pb-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-[1.75rem] font-semibold tracking-[-0.04em] text-ink sm:text-[2rem]">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{description}</p></div>{action}</div><p role="note" className="rounded border border-[#ead2a5] bg-[#fff8e8] px-3 py-2 text-xs leading-relaxed text-[#7f5b1b]">CMS preview: content, media, users, and analytics are illustrative and are not persisted.</p></div>;
}

function Metric({ value, label, note }: { value: string; label: string; note: string }) {
  return <div className="border border-line bg-surface p-4"><p className="text-[1.7rem] font-semibold tracking-[-0.04em] text-ink">{value}</p><p className="mt-1 text-sm font-medium text-ink-soft">{label}</p><p className="mt-2 text-xs text-ink-muted">{note}</p></div>;
}

function Dashboard({ onNavigate, onAddPublication, onAddUseCase }: { onNavigate: (view: AdminView) => void; onAddPublication: () => void; onAddUseCase: () => void }) {
  return <div className="space-y-7">
    <PageHeading title="Dashboard" description="Overview of the Asia AI4D Observatory website and content activity." action={<div className="flex flex-wrap gap-2"><button type="button" onClick={onAddPublication} className="inline-flex min-h-[42px] items-center gap-2 rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-dark"><Plus className="h-4 w-4" />Add publication</button><button type="button" onClick={onAddUseCase} className="inline-flex min-h-[42px] items-center gap-2 rounded border border-line-strong bg-surface px-4 text-sm font-medium text-ink-soft hover:bg-raised"><Plus className="h-4 w-4" />Add use case</button></div>} />

    <section aria-labelledby="summary-heading"><div className="mb-3 flex items-center justify-between"><h2 id="summary-heading" className="text-sm font-semibold text-ink">Content summary</h2><button type="button" onClick={() => onNavigate('analytics')} className="text-xs font-medium text-accent hover:underline">View analytics <ChevronRight className="inline h-3.5 w-3.5" /></button></div><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><Metric value="128" label="Published content" note="+12 this quarter" /><Metric value="24" label="Draft content" note="3 older than 30 days" /><Metric value="6" label="Scheduled" note="Next on 01 Oct 2026" /><Metric value="18" label="Upcoming events" note="4 registrations open" /></div></section>

    <div className="grid gap-7 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
      <section aria-labelledby="recent-heading" className="min-w-0 border border-line bg-surface"><div className="flex items-center justify-between border-b border-line px-5 py-4"><div><h2 id="recent-heading" className="text-sm font-semibold text-ink">Recent content</h2><p className="mt-1 text-xs text-ink-muted">The latest changes across the observatory.</p></div><button type="button" onClick={() => onNavigate('publications')} className="text-xs font-medium text-accent hover:underline">View all</button></div><div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-raised/65 text-xs text-ink-muted"><tr><th className="px-5 py-3 font-medium">Title</th><th className="px-4 py-3 font-medium">Type</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Updated</th><th className="px-5 py-3"><span className="sr-only">Actions</span></th></tr></thead><tbody className="divide-y divide-line">{recentContent.map((item) => <tr key={item.title} className="hover:bg-raised/40"><td className="max-w-[260px] px-5 py-4 font-medium text-ink">{item.title}<span className="mt-1 block text-xs font-normal text-ink-muted">{item.author}</span></td><td className="px-4 py-4 text-ink-soft">{item.type}</td><td className="px-4 py-4"><StatusBadge status={item.status} /></td><td className="whitespace-nowrap px-4 py-4 text-xs text-ink-muted">{item.updated}</td><td className="px-5 py-4 text-right"><button type="button" className="rounded p-1.5 text-ink-muted hover:bg-raised hover:text-ink" aria-label={`More actions for ${item.title}`}><MoreHorizontal className="h-4 w-4" /></button></td></tr>)}</tbody></table></div></section>
      <div className="space-y-7"><section aria-labelledby="attention-heading" className="border border-line bg-surface"><div className="border-b border-line px-5 py-4"><h2 id="attention-heading" className="text-sm font-semibold text-ink">Content requiring attention</h2><p className="mt-1 text-xs text-ink-muted">Small checks that keep the repository useful.</p></div><ul className="divide-y divide-line">{attentionItems.map((item) => <li key={item.label} className="flex items-start gap-3 px-5 py-4 text-sm text-ink-soft"><span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', item.tone === 'red' ? 'bg-[#b35e52]' : item.tone === 'amber' ? 'bg-[#c3903c]' : 'bg-[#7c8790]')} aria-hidden="true" />{item.label}<ChevronRight className="ml-auto h-4 w-4 shrink-0 text-ink-muted" /></li>)}</ul></section><section aria-labelledby="events-heading" className="border border-line bg-surface"><div className="flex items-center justify-between border-b border-line px-5 py-4"><h2 id="events-heading" className="text-sm font-semibold text-ink">Upcoming events</h2><CalendarDays className="h-4 w-4 text-ink-muted" /></div><ul className="divide-y divide-line">{[['26 Sep', 'Regional AI policy roundtable', 'Online'], ['02 Oct', 'Responsible AI community call', 'Colombo'], ['10 Oct', 'Research partners workshop', 'Hybrid']].map(([date, title, location]) => <li key={title} className="flex gap-3 px-5 py-4"><span className="w-12 shrink-0 text-xs font-semibold text-accent">{date}</span><span className="min-w-0 text-sm text-ink"><span className="block font-medium">{title}</span><span className="mt-1 block text-xs text-ink-muted">{location}</span></span></li>)}</ul></section></div>
    </div>

    <section aria-labelledby="snapshot-heading" className="border border-line bg-surface"><div className="flex flex-col gap-2 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 id="snapshot-heading" className="text-sm font-semibold text-ink">Website snapshot</h2><p className="mt-1 text-xs text-ink-muted">Last 30 days compared with the previous period.</p></div><button type="button" onClick={() => onNavigate('analytics')} className="inline-flex items-center gap-1 self-start text-xs font-medium text-accent hover:underline">View analytics <ChevronRight className="h-3.5 w-3.5" /></button></div><div className="grid gap-6 p-5 lg:grid-cols-[1fr_300px]"><div><div className="flex items-end justify-between"><div><p className="text-2xl font-semibold tracking-[-0.04em] text-ink">18,742</p><p className="mt-1 text-xs text-ink-muted">Page views</p></div><p className="text-xs text-[#28613e]">+8.4%</p></div><svg viewBox="0 0 720 150" className="mt-5 h-36 w-full overflow-visible" role="img" aria-label="Page views trending upward over 30 days"><path d="M0 124 C42 132 51 96 94 104 S146 117 180 82 S229 86 268 91 S318 60 356 72 S401 38 444 54 S499 70 540 38 S598 57 632 26 S683 25 720 12" fill="none" stroke="#0e5265" strokeWidth="3" /><path d="M0 124 C42 132 51 96 94 104 S146 117 180 82 S229 86 268 91 S318 60 356 72 S401 38 444 54 S499 70 540 38 S598 57 632 26 S683 25 720 12 V150 H0 Z" fill="#edf3f5" /></svg><div className="mt-2 flex justify-between text-[0.6875rem] text-ink-muted"><span>22 Aug</span><span>05 Sep</span><span>20 Sep</span></div></div><div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"><div><p className="text-lg font-semibold text-ink">4,218</p><p className="mt-1 text-xs text-ink-muted">Visitors</p></div><div><p className="text-lg font-semibold text-ink">1,246</p><p className="mt-1 text-xs text-ink-muted">Downloads</p></div><div><p className="text-lg font-semibold text-ink">386</p><p className="mt-1 text-xs text-ink-muted">Searches</p></div><div><p className="text-lg font-semibold text-ink">74</p><p className="mt-1 text-xs text-ink-muted">Newsletter signups</p></div></div></div></section>
  </div>;
}

function FilterBar({ search, onSearch, placeholder, children }: { search: string; onSearch: (value: string) => void; placeholder: string; children: ReactNode }) {
  return <div className="flex flex-col gap-3 border-b border-line bg-surface p-4 sm:flex-row sm:flex-wrap sm:items-center"><label className="flex min-h-[40px] min-w-[220px] flex-1 items-center gap-2 rounded border border-line bg-canvas px-3 text-ink-muted"><Search className="h-4 w-4" /><input value={search} onChange={(event) => onSearch(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted" placeholder={placeholder} aria-label={placeholder} /></label>{children}</div>;
}

function SelectFilter({ label }: { label: string }) {
  return <label className="inline-flex min-h-[40px] items-center gap-2 rounded border border-line bg-surface px-3 text-sm text-ink-soft hover:bg-raised"><span className="sr-only">Filter by {label}</span><select defaultValue="" className="appearance-none bg-transparent outline-none"><option value="">{label}</option><option>All</option><option>Published</option><option>Draft</option><option>Needs review</option></select><ChevronDown className="h-4 w-4 text-ink-muted" aria-hidden="true" /></label>;
}

function PublicationsView({ initialEditor = false, onOpenEditor, onCloseEditor }: { initialEditor?: boolean; onOpenEditor: () => void; onCloseEditor: () => void }) {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => publications.filter((item) => `${item.title} ${item.type} ${item.countries}`.toLowerCase().includes(search.toLowerCase())), [search]);
  if (initialEditor) return <AdminPublicationEditor onBack={onCloseEditor} />;
  return <div className="space-y-6"><PageHeading title="Publications" description="Manage reports, briefs, working papers, and other research outputs." action={<button type="button" onClick={onOpenEditor} className="inline-flex min-h-[42px] items-center gap-2 self-start rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-dark"><Plus className="h-4 w-4" />Add publication</button>} /><div className="border border-line bg-surface"><FilterBar search={search} onSearch={setSearch} placeholder="Search publications"><SelectFilter label="Status" /><SelectFilter label="Type" /><SelectFilter label="Country" /><SelectFilter label="Topic" /><button type="button" className="inline-flex min-h-[40px] items-center gap-2 rounded border border-line bg-surface px-3 text-sm font-medium text-ink-soft hover:bg-raised"><ChevronDown className="h-4 w-4" />More filters</button></FilterBar><div className="flex items-center justify-between border-b border-line px-4 py-3 text-xs text-ink-muted"><span>{filtered.length} of {publications.length} publications</span><button type="button" className="font-medium text-accent hover:underline" onClick={() => { const csv = ['Title,Type,Countries,Topic,Date,Status', ...filtered.map((item) => [item.title, item.type, item.countries, item.topic, item.date, item.status].map((value) => `"${value.replace(/"/g, '""')}"`).join(','))].join('\n'); const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); const link = document.createElement('a'); link.href = url; link.download = 'publications.csv'; link.click(); URL.revokeObjectURL(url); }}>Export</button></div>{filtered.length > 0 ? <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-raised/65 text-xs text-ink-muted"><tr><th className="w-10 px-5 py-3"><input type="checkbox" aria-label="Select all publications" /></th><th className="px-3 py-3 font-medium">Title</th><th className="px-3 py-3 font-medium">Type</th><th className="px-3 py-3 font-medium">Countries</th><th className="px-3 py-3 font-medium">Topic</th><th className="px-3 py-3 font-medium">Publication date</th><th className="px-3 py-3 font-medium">Status</th><th className="px-5 py-3"><span className="sr-only">Actions</span></th></tr></thead><tbody className="divide-y divide-line">{filtered.map((item) => <tr key={item.title} className="hover:bg-raised/40"><td className="px-5 py-4"><input type="checkbox" aria-label={`Select ${item.title}`} /></td><td className="max-w-[260px] px-3 py-4 font-medium text-ink">{item.title}</td><td className="px-3 py-4 text-ink-soft">{item.type}</td><td className="px-3 py-4 text-ink-soft">{item.countries}</td><td className="px-3 py-4 text-ink-soft">{item.topic}</td><td className="px-3 py-4 text-xs text-ink-muted">{item.date}</td><td className="px-3 py-4"><StatusBadge status={item.status} /></td><td className="px-5 py-4 text-right"><button type="button" className="rounded p-1.5 text-ink-muted hover:bg-raised hover:text-ink" onClick={onOpenEditor} aria-label={`Edit ${item.title}`}><MoreHorizontal className="h-4 w-4" /></button></td></tr>)}</tbody></table></div> : <div className="px-6 py-16 text-center"><FileText className="mx-auto h-8 w-8 text-ink-muted" /><h2 className="mt-4 text-base font-semibold text-ink">No publications found</h2><p className="mt-2 text-sm text-ink-soft">Try a different search or clear the active filters.</p></div>}<div className="flex items-center justify-between border-t border-line px-5 py-3 text-xs text-ink-muted"><span>Showing 1–{filtered.length} of {publications.length}</span><div className="flex gap-1"><button type="button" disabled className="inline-flex h-8 w-8 items-center justify-center rounded border border-line text-ink-muted disabled:opacity-40" aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button><button type="button" disabled className="inline-flex h-8 w-8 items-center justify-center rounded border border-line text-ink-soft disabled:opacity-40" aria-label="Next page"><ChevronRight className="h-4 w-4" /></button></div></div></div></div>;
}


function UseCaseEditor({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [country, setCountry] = useState('');
  const [sector, setSector] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const save = (publish: boolean) => {
    if (!title.trim() || !summary.trim() || !country.trim() || !sector.trim() || !organization.trim()) {
      setError('Complete the required fields before saving this use case.');
      setMessage('');
      return;
    }
    setError('');
    setMessage(publish ? 'Use case validated and ready to publish. Connect the CMS API to persist it.' : 'Draft validated. Connect the CMS API to persist it.');
  };

  return <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); save(false); }}>
    <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between"><div><button type="button" onClick={onBack} className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"><ChevronLeft className="h-4 w-4" />Back to use cases</button><h1 className="text-[1.75rem] font-semibold tracking-[-0.04em] text-ink">Add use case</h1><p className="mt-2 text-sm text-ink-soft">Create a structured responsible AI use-case record.</p></div><div className="flex gap-2"><button type="submit" className="min-h-[42px] rounded border border-line-strong bg-surface px-4 text-sm font-medium text-ink-soft hover:bg-raised">Save draft</button><button type="button" onClick={() => save(true)} className="min-h-[42px] rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-dark">Publish</button></div></div>
    {error && <p role="alert" className="border border-[#e5b8b0] bg-[#fff3f0] px-4 py-3 text-sm text-[#8d3f35]">{error}</p>}
    {message && <p role="status" className="border border-[#b9d6c6] bg-[#edf5ef] px-4 py-3 text-sm text-[#28613e]">{message}</p>}
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]"><div className="space-y-6"><section className="border border-line bg-surface p-5"><h2 className="text-base font-semibold text-ink">Basic information</h2><div className="mt-5 space-y-5"><label className="block"><span className="block text-sm font-medium text-ink">Title <span className="text-[#a04c43]">*</span></span><input required value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" placeholder="Enter a clear public title" /></label><label className="block"><span className="block text-sm font-medium text-ink">Summary <span className="text-[#a04c43]">*</span></span><textarea required value={summary} onChange={(event) => setSummary(event.target.value)} rows={4} className="mt-2 block w-full resize-y rounded border border-line-strong bg-canvas px-3 py-3 text-sm text-ink outline-none focus:border-accent" placeholder="Describe the initiative and its responsible AI safeguards." /></label><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="block text-sm font-medium text-ink">Country <span className="text-[#a04c43]">*</span></span><input required value={country} onChange={(event) => setCountry(event.target.value)} className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" placeholder="e.g. Sri Lanka" /></label><label className="block"><span className="block text-sm font-medium text-ink">Sector <span className="text-[#a04c43]">*</span></span><input required value={sector} onChange={(event) => setSector(event.target.value)} className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" placeholder="e.g. Public sector" /></label></div></div></section><section className="border border-line bg-surface p-5"><h2 className="text-base font-semibold text-ink">Organisation and safeguards</h2><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="block"><span className="block text-sm font-medium text-ink">Organisation <span className="text-[#a04c43]">*</span></span><input required value={organization} onChange={(event) => setOrganization(event.target.value)} className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" placeholder="Implementing organisation" /></label><label className="block"><span className="block text-sm font-medium text-ink">Organisation type</span><select className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" defaultValue=""><option value="">Select type</option><option>Government</option><option>Civil Society / NGO</option><option>Private Sector</option><option>University / Research Institution</option></select></label><label className="block"><span className="block text-sm font-medium text-ink">Topics</span><input className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" placeholder="Separate topics with commas" /></label><label className="block"><span className="block text-sm font-medium text-ink">Safeguards</span><input className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" placeholder="Oversight, transparency, privacy" /></label></div></section></div><aside className="h-fit border border-line bg-surface p-5 xl:sticky xl:top-[100px]"><h2 className="text-base font-semibold text-ink">Publishing</h2><div className="mt-5 space-y-5"><label className="block"><span className="block text-sm font-medium text-ink">Status</span><select className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink" defaultValue="Draft"><option>Draft</option><option>Ready for review</option><option>Published</option></select></label><p className="border-t border-line pt-5 text-xs leading-relaxed text-ink-muted">Required fields are marked with an asterisk. Publishing is validated here and will persist once the CMS API is connected.</p></div></aside></div>
  </form>;
}

function UseCasesView({ initialEditor = false, onOpenEditor, onCloseEditor }: { initialEditor?: boolean; onOpenEditor: () => void; onCloseEditor: () => void }) {
  const [search, setSearch] = useState('');
  const filtered = useCases.filter((item) => `${item.title} ${item.country} ${item.organization}`.toLowerCase().includes(search.toLowerCase()));
  if (initialEditor) return <UseCaseEditor onBack={onCloseEditor} />;
  return <div className="space-y-6"><PageHeading title="Responsible AI use cases" description="Document practical examples of responsible AI across Asia." action={<button type="button" onClick={onOpenEditor} className="inline-flex min-h-[42px] items-center gap-2 self-start rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-dark"><Plus className="h-4 w-4" />Add use case</button>} /><div className="border border-line bg-surface"><FilterBar search={search} onSearch={setSearch} placeholder="Search use cases"><SelectFilter label="Country" /><SelectFilter label="Sector" /><SelectFilter label="Status" /><SelectFilter label="Topic" /></FilterBar>{filtered.length > 0 ? <div className="overflow-x-auto"><table className="w-full min-w-[740px] text-left text-sm"><thead className="bg-raised/65 text-xs text-ink-muted"><tr><th className="px-5 py-3 font-medium">Title</th><th className="px-3 py-3 font-medium">Country</th><th className="px-3 py-3 font-medium">Sector</th><th className="px-3 py-3 font-medium">Organization</th><th className="px-3 py-3 font-medium">Status</th><th className="px-3 py-3 font-medium">Updated</th><th className="px-5 py-3" /></tr></thead><tbody className="divide-y divide-line">{filtered.map((item) => <tr key={item.title} className="hover:bg-raised/40"><td className="max-w-[260px] px-5 py-4 font-medium text-ink">{item.title}</td><td className="px-3 py-4 text-ink-soft">{item.country}</td><td className="px-3 py-4 text-ink-soft">{item.sector}</td><td className="px-3 py-4 text-ink-soft">{item.organization}</td><td className="px-3 py-4"><StatusBadge status={item.status} /></td><td className="px-3 py-4 text-xs text-ink-muted">{item.updated}</td><td className="px-5 py-4 text-right"><button type="button" onClick={onOpenEditor} className="rounded p-1.5 text-ink-muted hover:bg-raised hover:text-ink" aria-label={`Edit ${item.title}`}><MoreHorizontal className="h-4 w-4" /></button></td></tr>)}</tbody></table></div> : <div className="px-6 py-16 text-center"><FolderKanban className="mx-auto h-8 w-8 text-ink-muted" /><h2 className="mt-4 text-base font-semibold text-ink">No use cases found</h2><p className="mt-2 text-sm text-ink-soft">Try a different search or add a new use case.</p></div>}</div></div>;
}

function DatasetsView() {
  const [search, setSearch] = useState('');
  const filtered = datasets.filter((item) => `${item.title} ${item.source} ${item.format}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="space-y-6"><PageHeading title="Datasets" description="Manage structured data resources published by the observatory." /><div className="border border-line bg-surface"><FilterBar search={search} onSearch={setSearch} placeholder="Search datasets"><SelectFilter label="Access" /><SelectFilter label="Format" /></FilterBar><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-raised/65 text-xs text-ink-muted"><tr><th className="px-5 py-3 font-medium">Title</th><th className="px-3 py-3 font-medium">Format</th><th className="px-3 py-3 font-medium">Access</th><th className="px-3 py-3 font-medium">Maintainer</th><th className="px-3 py-3 font-medium">Updated</th></tr></thead><tbody className="divide-y divide-line">{filtered.map((item) => <tr key={item.id} className="hover:bg-raised/40"><td className="max-w-[360px] px-5 py-4"><span className="block font-medium text-ink">{item.title}</span><span className="mt-1 block text-xs text-ink-muted">{item.description}</span></td><td className="px-3 py-4 text-ink-soft">{item.format}</td><td className="px-3 py-4 text-ink-soft">{item.access}</td><td className="px-3 py-4 text-ink-soft">{item.maintainer}</td><td className="px-3 py-4 text-xs text-ink-muted">{item.updated}</td></tr>)}</tbody></table></div>{filtered.length === 0 && <p className="px-6 py-12 text-center text-sm text-ink-soft">No datasets found.</p>}</div></div>;
}

function EventsView() {
  const [search, setSearch] = useState('');
  const filtered = events.filter((item) => `${item.title} ${item.country} ${item.format}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="space-y-6"><PageHeading title="Events" description="Schedule and maintain the observatory's public events." /><div className="border border-line bg-surface"><FilterBar search={search} onSearch={setSearch} placeholder="Search events"><SelectFilter label="Format" /><SelectFilter label="Registration" /></FilterBar><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-raised/65 text-xs text-ink-muted"><tr><th className="px-5 py-3 font-medium">Event</th><th className="px-3 py-3 font-medium">Date</th><th className="px-3 py-3 font-medium">Location</th><th className="px-3 py-3 font-medium">Format</th><th className="px-3 py-3 font-medium">Registration</th></tr></thead><tbody className="divide-y divide-line">{filtered.map((item) => <tr key={item.id} className="hover:bg-raised/40"><td className="max-w-[360px] px-5 py-4"><span className="block font-medium text-ink">{item.title}</span><span className="mt-1 block text-xs text-ink-muted">{item.type}</span></td><td className="whitespace-nowrap px-3 py-4 text-ink-soft">{item.date}</td><td className="px-3 py-4 text-ink-soft">{item.location}</td><td className="px-3 py-4 text-ink-soft">{item.format}</td><td className="px-3 py-4"><StatusBadge status={item.registration === 'Open' ? 'Published' : item.registration === 'Closed' ? 'Draft' : 'Scheduled'} /></td></tr>)}</tbody></table></div>{filtered.length === 0 && <p className="px-6 py-12 text-center text-sm text-ink-soft">No events found.</p>}</div></div>;
}

function SettingsView() {
  const [saved, setSaved] = useState(false);
  return <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}><PageHeading title="Settings" description="Manage the observatory's public-facing defaults and editorial workflow." action={<button type="submit" className="inline-flex min-h-[42px] items-center gap-2 rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-dark">Save settings</button>} />{saved && <p role="status" className="border border-[#b9d6c6] bg-[#edf5ef] px-4 py-3 text-sm text-[#28613e]">Settings saved for this session.</p>}<section className="max-w-2xl border border-line bg-surface p-5"><h2 className="text-base font-semibold text-ink">Website defaults</h2><div className="mt-5 space-y-5"><label className="block"><span className="block text-sm font-medium text-ink">Site title</span><input defaultValue="Asia AI4D Observatory" className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" /></label><label className="block"><span className="block text-sm font-medium text-ink">Editorial contact</span><input type="email" defaultValue="info@lirneasia.net" className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" /></label><label className="flex items-start gap-3"><input type="checkbox" defaultChecked className="mt-1" /><span><span className="block text-sm font-medium text-ink">Show prototype notice</span><span className="mt-1 block text-xs text-ink-muted">Keep the prototype status visible to public visitors.</span></span></label></div></section></form>;
}

function MediaView() {
  const files = [{ name: 'ai-governance-sri-lanka.pdf', type: 'PDF', size: '4.8 MB', used: 'AI Governance in Sri Lanka' }, { name: 'regional-map-cover.jpg', type: 'Image', size: '1.2 MB', used: 'Homepage feature' }, { name: 'observatory-methodology.pdf', type: 'PDF', size: '2.6 MB', used: '3 publications' }, { name: 'community-workshop-01.jpg', type: 'Image', size: '846 KB', used: 'No linked content' }];
  return <div className="space-y-6"><PageHeading title="Media library" description="Manage files and images used across the observatory." action={<button type="button" className="inline-flex min-h-[42px] items-center gap-2 self-start rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-dark"><Plus className="h-4 w-4" />Upload media</button>} /><div className="border border-line bg-surface"><div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row"><label className="flex min-h-[40px] flex-1 items-center gap-2 rounded border border-line bg-canvas px-3 text-ink-muted"><Search className="h-4 w-4" /><input className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted" placeholder="Search files" aria-label="Search files" /></label><SelectFilter label="All file types" /><button type="button" className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded border border-line bg-surface px-3 text-sm font-medium text-ink-soft hover:bg-raised"><FileImage className="h-4 w-4" />Grid</button></div><div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">{files.map((file) => <article key={file.name} className="bg-surface p-5"><div className="flex h-32 items-center justify-center border border-line bg-raised text-ink-muted">{file.type === 'PDF' ? <FileText className="h-10 w-10" strokeWidth={1.4} /> : <FileImage className="h-10 w-10" strokeWidth={1.4} />}</div><h2 className="mt-4 truncate text-sm font-medium text-ink" title={file.name}>{file.name}</h2><p className="mt-1 text-xs text-ink-muted">{file.type} · {file.size}</p><p className="mt-3 text-xs text-ink-soft">Used on: {file.used}</p><div className="mt-4 flex gap-2"><button type="button" className="text-xs font-medium text-accent hover:underline">Edit details</button><button type="button" className="text-xs font-medium text-ink-muted hover:text-ink">Copy URL</button></div></article>)}</div></div></div>;
}

const analyticsChartData = [
  { label: '22 Aug', pageViews: 11200, downloads: 620 },
  { label: '25 Aug', pageViews: 12800, downloads: 710 },
  { label: '28 Aug', pageViews: 10500, downloads: 580 },
  { label: '31 Aug', pageViews: 14600, downloads: 820 },
  { label: '03 Sep', pageViews: 13900, downloads: 760 },
  { label: '06 Sep', pageViews: 15800, downloads: 940 },
  { label: '09 Sep', pageViews: 16700, downloads: 1020 },
  { label: '12 Sep', pageViews: 15100, downloads: 880 },
  { label: '15 Sep', pageViews: 17600, downloads: 1100 },
  { label: '18 Sep', pageViews: 19400, downloads: 1260 },
  { label: '20 Sep', pageViews: 18742, downloads: 1246 },
];

const searchOpportunities = [
  { query: 'AI procurement', searches: '46', result: 'No direct match', action: 'Create a topic landing page', priority: 'High' },
  { query: 'rural connectivity', searches: '19', result: '2 related results', action: 'Add a topic tag', priority: 'Medium' },
  { query: 'language models', searches: '17', result: 'No direct match', action: 'Review content aliases', priority: 'High' },
];

const contentMix = [
  { label: 'Publications', value: 46, offset: 0, color: '#0e5265' },
  { label: 'Datasets', value: 31, offset: 46, color: '#b97839' },
  { label: 'Use cases', value: 15, offset: 77, color: '#33624a' },
  { label: 'Maps & tools', value: 8, offset: 92, color: '#657282' },
];

const topContent = [
  { title: 'AI Governance in Sri Lanka', type: 'Publication', views: '2,184', downloads: '284', searches: '61', engagement: '4m 12s' },
  { title: 'Responsible AI Readiness Index', type: 'Dataset', views: '1,476', downloads: '192', searches: '43', engagement: '3m 48s' },
  { title: 'Regional map', type: 'Visualization', views: '982', downloads: '—', searches: '28', engagement: '2m 06s' },
];

function AnalyticsAreaChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const width = 720;
  const height = 280;
  const chartTop = 18;
  const chartBottom = 218;
  const maxValue = 20000;
  const x = (index: number) => (index / (analyticsChartData.length - 1)) * width;
  const y = (value: number) => chartBottom - (value / maxValue) * (chartBottom - chartTop);
  const linePath = (key: 'pageViews' | 'downloads') => analyticsChartData.map((point, index) => `${index === 0 ? 'M' : 'L'} ${x(index)} ${y(point[key])}`).join(' ');
  const areaPath = (key: 'pageViews' | 'downloads') => `${linePath(key)} L ${width} ${chartBottom} L 0 ${chartBottom} Z`;
  const activePoint = activeIndex === null ? null : analyticsChartData[activeIndex];
  const activeX = activeIndex === null ? 0 : x(activeIndex);
  const tooltipX = Math.min(Math.max(activeX - 77, 8), width - 162);

  return <div>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-4 text-xs text-ink-muted" aria-label="Chart legend">
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#0e5265]" aria-hidden="true" />Page views</span>
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#b97839]" aria-hidden="true" />Downloads</span>
      </div>
      {activePoint && <p className="text-xs text-ink-soft" aria-live="polite">{activePoint.label}: {activePoint.pageViews.toLocaleString()} views · {activePoint.downloads.toLocaleString()} downloads</p>}
    </div>
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-5 h-64 w-full overflow-visible" role="img" aria-labelledby="traffic-chart-title traffic-chart-description">
      <title id="traffic-chart-title">Traffic over time</title>
      <desc id="traffic-chart-description">Page views and downloads across the last 30 days. Hover or focus a date to inspect its values.</desc>
      <defs>
        <linearGradient id="analytics-page-views-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e5265" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0e5265" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="analytics-downloads-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b97839" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#b97839" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 5000, 10000, 15000, 20000].map((value) => <line key={value} x1="0" x2={width} y1={y(value)} y2={y(value)} stroke="#e5e1d8" strokeDasharray="2 5" />)}
      <path d={areaPath('pageViews')} fill="url(#analytics-page-views-fill)" />
      <path d={areaPath('downloads')} fill="url(#analytics-downloads-fill)" />
      <path d={linePath('pageViews')} fill="none" stroke="#0e5265" strokeWidth="2.5" />
      <path d={linePath('downloads')} fill="none" stroke="#b97839" strokeWidth="2" />
      {analyticsChartData.map((point, index) => <rect key={point.label} x={x(index) - width / (analyticsChartData.length - 1) / 2} y={chartTop} width={width / (analyticsChartData.length - 1)} height={chartBottom - chartTop} fill="transparent" role="button" tabIndex={0} aria-label={`${point.label}: ${point.pageViews.toLocaleString()} page views, ${point.downloads.toLocaleString()} downloads`} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)} />)}
      {activePoint && <g pointerEvents="none">
        <line x1={activeX} x2={activeX} y1={chartTop} y2={chartBottom} stroke="#7c8790" strokeDasharray="3 4" />
        <circle cx={activeX} cy={y(activePoint.pageViews)} r="4.5" fill="#fbfaf7" stroke="#0e5265" strokeWidth="2" />
        <circle cx={activeX} cy={y(activePoint.downloads)} r="4" fill="#fbfaf7" stroke="#b97839" strokeWidth="2" />
        <g transform={`translate(${tooltipX} 8)`}>
          <rect width="154" height="60" rx="3" fill="#17343d" />
          <text x="10" y="18" fill="#ffffff" fontSize="11" fontWeight="600">{activePoint.label}</text>
          <text x="10" y="35" fill="#d5e1e4" fontSize="10">{activePoint.pageViews.toLocaleString()} views</text>
          <text x="10" y="49" fill="#d5e1e4" fontSize="10">{activePoint.downloads.toLocaleString()} downloads</text>
        </g>
      </g>}
    </svg>
    <div className="flex justify-between text-[0.6875rem] text-ink-muted"><span>22 Aug</span><span>31 Aug</span><span>09 Sep</span><span>20 Sep</span></div>
  </div>;
}

function AnalyticsRingChart() {
  return <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
    <div className="relative shrink-0">
      <svg viewBox="0 0 96 96" className="h-44 w-44" role="img" aria-labelledby="content-mix-title content-mix-description">
        <title id="content-mix-title">Content mix by page views</title>
        <desc id="content-mix-description">Publications account for 46 percent of views, datasets 31 percent, use cases 15 percent, and maps and tools 8 percent.</desc>
        <circle cx="48" cy="48" r="34" fill="none" stroke="#e5e1d8" strokeWidth="10" pathLength="100" />
        {contentMix.map((item) => <circle key={item.label} cx="48" cy="48" r="34" fill="none" stroke={item.color} strokeWidth="10" pathLength="100" strokeDasharray={`${item.value} ${100 - item.value}`} strokeDashoffset={`-${item.offset}`} />)}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-semibold tracking-[-0.04em] text-ink">46%</span><span className="text-[0.6875rem] text-ink-muted">publications</span></div>
    </div>
    <ul className="w-full space-y-3 text-sm sm:max-w-[180px]">
      {contentMix.map((item) => <li key={item.label} className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-ink-soft"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />{item.label}</span><span className="font-semibold text-ink">{item.value}%</span></li>)}
    </ul>
  </div>;
}

function AnalyticsView() {
  return <div className="space-y-6"><PageHeading title="Analytics overview" description="Understand what people are reading, searching for, and downloading." action={<SelectFilter label="Last 30 days" />} /><p className="-mt-2 text-xs text-ink-muted">Illustrative prototype data · connect the approved analytics provider before launch.</p><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><Metric value="4,218" label="Visitors" note="+8.4% vs previous period" /><Metric value="18,742" label="Page views" note="Across 128 published items" /><Metric value="1,246" label="Downloads" note="Most: Governance toolkit" /><Metric value="386" label="Searches" note="74 zero-result searches" /></div><div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]"><section className="border border-line bg-surface p-5"><div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold text-ink">Traffic over time</h2><p className="mt-1 text-xs text-ink-muted">Daily page views and downloads</p></div><BarChart3 className="h-4 w-4 text-ink-muted" /></div><AnalyticsAreaChart /></section><section className="border border-line bg-surface"><div className="border-b border-line px-5 py-4"><h2 className="text-sm font-semibold text-ink">Popular searches</h2><p className="mt-1 text-xs text-ink-muted">Searches with the most visitor demand.</p></div><ul className="divide-y divide-line">{[['AI procurement', '46', '0 results'], ['AI governance', '38', '12 results'], ['data protection', '31', '8 results'], ['public sector AI', '24', '4 results']].map(([term, count, result]) => <li key={term} className="flex items-center justify-between gap-3 px-5 py-4"><span className="text-sm text-ink">{term}<span className="mt-1 block text-xs text-ink-muted">{result}</span></span><span className="text-sm font-semibold text-ink">{count}</span></li>)}</ul></section></div><div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]"><section className="border border-line bg-surface"><div className="border-b border-line px-5 py-4"><h2 className="text-sm font-semibold text-ink">Search opportunities</h2><p className="mt-1 text-xs text-ink-muted">Queries that can guide the next editorial update.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-raised/65 text-xs text-ink-muted"><tr><th className="px-5 py-3 font-medium">Query</th><th className="px-3 py-3 font-medium">Searches</th><th className="px-3 py-3 font-medium">Current match</th><th className="px-5 py-3 font-medium">Suggested action</th></tr></thead><tbody className="divide-y divide-line">{searchOpportunities.map((item) => <tr key={item.query}><td className="px-5 py-4 font-medium text-ink">{item.query}<span className={cn('mt-1 block text-[0.6875rem] font-semibold uppercase tracking-[0.06em]', item.priority === 'High' ? 'text-[#9a5a26]' : 'text-ink-muted')}>{item.priority} priority</span></td><td className="px-3 py-4 text-ink-soft">{item.searches}</td><td className="px-3 py-4 text-ink-soft">{item.result}</td><td className="px-5 py-4 text-ink-soft">{item.action}</td></tr>)}</tbody></table></div></section><section className="border border-line bg-surface p-5"><div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold text-ink">Content mix</h2><p className="mt-1 text-xs text-ink-muted">Share of page views by format</p></div><BarChart3 className="h-4 w-4 text-ink-muted" /></div><div className="mt-5"><AnalyticsRingChart /></div></section></div><section className="border border-line bg-surface"><div className="border-b border-line px-5 py-4"><h2 className="text-sm font-semibold text-ink">Top articles &amp; resources</h2><p className="mt-1 text-xs text-ink-muted">Best-performing content and how often it appears in search journeys.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-raised/65 text-xs text-ink-muted"><tr><th className="px-5 py-3 font-medium">Content</th><th className="px-3 py-3 font-medium">Type</th><th className="px-3 py-3 font-medium">Views</th><th className="px-3 py-3 font-medium">Downloads</th><th className="px-3 py-3 font-medium">Search starts</th><th className="px-5 py-3 font-medium">Engagement</th></tr></thead><tbody className="divide-y divide-line">{topContent.map((row) => <tr key={row.title}><td className="px-5 py-4 font-medium text-ink">{row.title}</td><td className="px-3 py-4 text-ink-soft">{row.type}</td><td className="px-3 py-4 text-ink-soft">{row.views}</td><td className="px-3 py-4 text-ink-soft">{row.downloads}</td><td className="px-3 py-4 text-ink-soft">{row.searches}</td><td className="px-5 py-4 text-ink-soft">{row.engagement}</td></tr>)}</tbody></table></div></section></div>;
}

function UsersView() {
  const users = [['Ruwani Senanayake', 'ruwani@lirneasia.net', 'Administrator', 'Active', '20 Sep 2026'], ['Nadeesha Perera', 'nadeesha@lirneasia.net', 'Editor', 'Active', '19 Sep 2026'], ['Maya Fernando', 'maya@lirneasia.net', 'Editor', 'Active', '17 Sep 2026'], ['Amal Jayasinghe', 'amal@lirneasia.net', 'Editor', 'Invited', '—']];
  return <div className="space-y-6"><PageHeading title="Users & roles" description="Control who can create, review, publish, and manage the observatory." action={<button type="button" className="inline-flex min-h-[42px] items-center gap-2 self-start rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-dark"><Plus className="h-4 w-4" />Invite user</button>} /><section className="border border-line bg-surface"><div className="flex items-center justify-between border-b border-line px-5 py-4"><div><h2 className="text-sm font-semibold text-ink">Team members</h2><p className="mt-1 text-xs text-ink-muted">Administrators have full CMS access. Editors follow the publishing workflow.</p></div><button type="button" className="text-xs font-medium text-accent hover:underline">Role permissions</button></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-raised/65 text-xs text-ink-muted"><tr><th className="px-5 py-3 font-medium">Name</th><th className="px-3 py-3 font-medium">Role</th><th className="px-3 py-3 font-medium">Status</th><th className="px-3 py-3 font-medium">Last login</th><th className="px-5 py-3" /></tr></thead><tbody className="divide-y divide-line">{users.map(([name, email, role, status, lastLogin]) => <tr key={email} className="hover:bg-raised/40"><td className="px-5 py-4"><span className="block font-medium text-ink">{name}</span><span className="mt-1 block text-xs text-ink-muted">{email}</span></td><td className="px-3 py-4 text-ink-soft">{role}</td><td className="px-3 py-4"><span className={cn('inline-flex rounded border px-2 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.06em]', status === 'Active' ? 'border-[#b9d6c6] bg-[#edf5ef] text-[#28613e]' : 'border-[#c9d6e7] bg-[#eef3f8] text-[#315a7d]')}>{status}</span></td><td className="px-3 py-4 text-xs text-ink-muted">{lastLogin}</td><td className="px-5 py-4 text-right"><button type="button" className="rounded p-1.5 text-ink-muted hover:bg-raised hover:text-ink" aria-label={`More actions for ${name}`}><MoreHorizontal className="h-4 w-4" /></button></td></tr>)}</tbody></table></div></section></div>;
}

export function Admin() {
  const pathname = usePathname();
  const router = useRouter();
  const { view: activeView, editorOpen } = getAdminView(pathname);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState('');

  const navigate = (view: AdminView, editor = false) => {
    router.push(editor ? `${adminRoutes[view]}/new` : adminRoutes[view]);
    setMobileNavOpen(false);
  };

  const title = activeView === 'use-cases' ? 'Responsible AI use cases' : activeView === 'datasets' ? 'Datasets' : activeView === 'events' ? 'Events' : activeView === 'media' ? 'Media library' : activeView === 'analytics' ? 'Analytics overview' : activeView === 'users' ? 'Users & roles' : activeView === 'settings' ? 'Settings' : activeView === 'publications' ? 'Publications' : 'Dashboard';

  return <div className="flex h-[100dvh] overflow-hidden bg-canvas text-ink"><Sidebar activeView={activeView} onNavigate={navigate} mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} /><div className="flex min-h-0 min-w-0 flex-1 flex-col"><Topbar title={title} onOpenMenu={() => setMobileNavOpen(true)} search={search} onSearch={setSearch} /><main id="admin-main" className="min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-8 lg:px-10 lg:py-9"><div className="mx-auto max-w-[1440px]">{activeView === 'dashboard' && <Dashboard onNavigate={navigate} onAddPublication={() => navigate('publications', true)} onAddUseCase={() => navigate('use-cases', true)} />}{activeView === 'publications' && <PublicationsView initialEditor={editorOpen} onOpenEditor={() => navigate('publications', true)} onCloseEditor={() => navigate('publications')} />}{activeView === 'use-cases' && <UseCasesView initialEditor={editorOpen} onOpenEditor={() => navigate('use-cases', true)} onCloseEditor={() => navigate('use-cases')} />}{activeView === 'datasets' && <DatasetsView />}{activeView === 'events' && <EventsView />}{activeView === 'media' && <MediaView />}{activeView === 'analytics' && <AnalyticsView />}{activeView === 'users' && <UsersView />}{activeView === 'settings' && <SettingsView />}</div></main></div></div>;
}
