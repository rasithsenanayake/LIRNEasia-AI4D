'use client';

import { useState } from 'react';
import { ArrowUpRight, Mail, Send } from 'lucide-react';
import { Breadcrumbs, Container, DemoDataNote, SectionHeading } from '../components/ui/Primitives';
import { NewsletterSignup } from '../components/content/NewsletterSignup';
import { partners } from '../data/network';

export function PartnersPage() {
  return <Container className="py-12">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Partners' }]} />
    <div className="mt-6">
      <SectionHeading eyebrow="Partners" title="The network behind the Observatory" description="The Observatory connects research, policy and practice through a regional network of institutions and programmes." />
      <DemoDataNote className="-mt-2 mb-8">The partner records below are illustrative placeholders for prototype evaluation.</DemoDataNote>
      <div className="divide-y divide-line rounded-lg border border-line bg-surface">{partners.map((partner) => <article key={partner.id} className="grid gap-4 p-5 sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:items-start"><span aria-hidden="true" className="flex h-12 w-16 items-center justify-center rounded border border-line bg-raised text-xs font-bold tracking-wide text-ink-soft">{partner.abbr}</span><div><h2 className="text-lg font-semibold text-ink">{partner.name}</h2><p className="mt-1 text-sm font-medium text-accent">{partner.role}</p><p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">{partner.description}</p></div>{partner.website && <a href={partner.website} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center gap-1 text-sm font-medium text-accent hover:underline">Visit website<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>}</article>)}</div>
    </div>
  </Container>;
}

export function NewsletterPage() {
  return <><Container className="py-12"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Newsletter' }]} /><div className="mt-6"><SectionHeading eyebrow="Newsletter" title="Quarterly evidence from across Asia" description="Get a concise view of new research, use cases, datasets, events and opportunities from the Observatory." /><DemoDataNote className="-mt-2">The subscription form is functional for preview validation only; it does not send or store addresses.</DemoDataNote></div><section className="mt-10 max-w-3xl border-t border-line pt-6"><h2 className="font-serif text-2xl text-ink">Newsletter archive</h2><p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">No Observatory newsletter issues have been published yet. Future quarterly editions will be archived here for browsing and download.</p></section></Container><NewsletterSignup /></>;
}

export function AccessibilityPage() {
  return <Container className="py-12"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Accessibility' }]} /><article className="mt-6 max-w-reading"><SectionHeading eyebrow="Accessibility" title="Accessibility commitment" description="The Observatory is being designed to target WCAG 2.2 AA principles where practicable. A formal audit will take place during production implementation." /><DemoDataNote>Prototype commitment; this is not a certification claim.</DemoDataNote><h2 className="mt-8 font-serif text-2xl text-ink">Accessibility features in this prototype</h2><ul className="mt-3 grid gap-2 text-[0.9375rem] text-ink-soft sm:grid-cols-2">{['Keyboard navigation and skip-to-content', 'Visible focus states and semantic headings', 'Labeled forms and descriptive controls', 'Text alternatives for visualisations', 'Reduced-motion support', 'Responsive layouts', 'Data is not communicated by colour alone', 'Table alternatives for maps and charts'].map((item) => <li key={item} className="border-b border-line py-2">{item}</li>)}</ul><h2 className="mt-8 font-serif text-2xl text-ink">Data visualisations</h2><p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">Interactive data views should include accompanying text, table alternatives, sources, update dates and methodology context so the information remains available without a visual map.</p><h2 className="mt-8 font-serif text-2xl text-ink">Known prototype limitations</h2><p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">Production data and third-party embeds are not integrated. Final assistive-technology and keyboard testing remains part of implementation. To report an issue, contact <a className="text-accent underline" href="mailto:info@lirneasia.net">info@lirneasia.net</a>.</p></article></Container>;
}

export function PrivacyPage() {
  return <Container className="py-12"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Privacy' }]} /><article className="mt-6 max-w-reading"><SectionHeading eyebrow="Privacy" title="Privacy information" description="This prototype describes the proposed information flows. LIRNEasia will supply or approve final privacy policy language before launch." /><DemoDataNote>No contact, newsletter or gated-download details are transmitted or retained by this prototype.</DemoDataNote>{[['Information the platform may collect', 'Newsletter and gated-download email addresses, contact-form information, and technical or analytics information.'], ['Why information may be collected', 'To deliver requested downloads, manage subscriptions, respond to enquiries, understand site use and improve the service.'], ['Email-gated downloads and newsletters', 'Selected resources may request an email address. Newsletter subscriptions may be passed to a Client-selected service after production setup.'], ['Analytics and retention', 'A privacy-conscious analytics approach will be agreed with LIRNEasia. Production retention arrangements will follow its approved policy.'], ['Third parties and contact', 'External providers will be disclosed where required. Contact info@lirneasia.net for privacy questions; rights and request procedures await Client-approved wording.']].map(([heading, body]) => <section key={heading} className="mt-7"><h2 className="font-serif text-xl text-ink">{heading}</h2><p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p></section>)}</article></Container>;
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return <Container className="py-12">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
    <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
      <div><SectionHeading eyebrow="Contact" title="Talk to the Observatory team" description="Use the form for research questions, media requests, partnerships or event enquiries." /><div className="border-t border-line pt-5 text-sm text-ink-soft"><p className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" aria-hidden="true" /><a href="mailto:info@lirneasia.net" className="text-accent hover:underline">info@lirneasia.net</a></p><DemoDataNote className="mt-5">This preview does not transmit form submissions.</DemoDataNote></div></div>
      <form className="border border-line bg-surface p-5 sm:p-6" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        {submitted && <p role="status" className="mb-5 border border-[#b9d6c6] bg-[#edf5ef] px-4 py-3 text-sm text-[#28613e]">Message prepared for preview. The production contact workflow is not connected.</p>}
        <div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="block text-sm font-medium text-ink">Name</span><input required className="mt-2 min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" /></label><label className="block"><span className="block text-sm font-medium text-ink">Email</span><input required type="email" className="mt-2 min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" /></label><label className="block sm:col-span-2"><span className="block text-sm font-medium text-ink">Inquiry type</span><select required defaultValue="" className="mt-2 min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent"><option value="" disabled>Select an inquiry type</option><option>General</option><option>Research</option><option>Media</option><option>Partnership</option><option>Events</option></select></label><label className="block sm:col-span-2"><span className="block text-sm font-medium text-ink">Message</span><textarea required rows={6} className="mt-2 w-full resize-y rounded border border-line-strong bg-canvas px-3 py-3 text-sm text-ink outline-none focus:border-accent" /></label></div>
        <button type="submit" className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-dark"><Send className="h-4 w-4" aria-hidden="true" />Prepare message</button>
      </form>
    </div>
  </Container>;
}
