'use client';

import { useState } from 'react';
import { ChevronLeft, FileText, ShieldCheck } from 'lucide-react';
import { PUBLICATION_TYPES } from '../data/publications';

export function AdminPublicationEditor({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [externalPublisher, setExternalPublisher] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [externalPublicationDate, setExternalPublicationDate] = useState('');
  const [summary, setSummary] = useState('');
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [revisionMessage, setRevisionMessage] = useState('');
  const [confirmRestore, setConfirmRestore] = useState(false);

  function save(publish: boolean) {
    if (!title.trim() || !type || !summary.trim()) {
      setError('Complete the required title, type, and summary fields before saving.');
      setMessage('');
      return;
    }

    setError('');
    setMessage(publish ? 'Publication validated for publishing. CMS persistence is not connected in this preview.' : 'Draft validated for this session. CMS persistence is not connected in this preview.');
  }

  return (
    <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); save(false); }}>
      <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button type="button" onClick={onBack} className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
            <ChevronLeft className="h-4 w-4" />Back to publications
          </button>
          <h1 className="text-[1.75rem] font-semibold tracking-[-0.04em] text-ink">Add publication</h1>
          <p className="mt-2 text-sm text-ink-soft">Create a structured research record for the public observatory.</p>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="min-h-[42px] rounded border border-line-strong bg-surface px-4 text-sm font-medium text-ink-soft hover:bg-raised">Save draft</button>
          <button type="button" onClick={() => setMessage('Preview ready for this session. Nothing has been published or persisted.')} className="min-h-[42px] rounded border border-line-strong bg-surface px-4 text-sm font-medium text-ink-soft hover:bg-raised">Preview</button>
          <button type="button" onClick={() => save(true)} className="min-h-[42px] rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-dark">Publish</button>
        </div>
      </div>

      {error && <p role="alert" className="border border-[#e5b8b0] bg-[#fff3f0] px-4 py-3 text-sm text-[#8d3f35]">{error}</p>}
      {message && <p role="status" className="border border-[#b9d6c6] bg-[#edf5ef] px-4 py-3 text-sm text-[#28613e]">{message}</p>}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <section className="border border-line bg-surface p-5">
            <h2 className="text-base font-semibold text-ink">Basic information</h2>
            <div className="mt-5 space-y-5">
              <label className="block">
                <span className="block text-sm font-medium text-ink">Publication title <span className="text-[#a04c43]">*</span></span>
                <input required value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" placeholder="Enter a clear public title" />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-sm font-medium text-ink">Publication type <span className="text-[#a04c43]">*</span></span>
                  <select required value={type} onChange={(event) => setType(event.target.value)} className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent">
                    <option value="" disabled>Select type</option>
                    {PUBLICATION_TYPES.map((publicationType) => <option key={publicationType}>{publicationType}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-ink">Publication date</span>
                  <input type="date" className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" />
                </label>
              </div>
              {type === 'Op-ed / External Publication' && <fieldset className="grid gap-5 rounded border border-line p-4 sm:grid-cols-2"><legend className="px-1 text-sm font-semibold text-ink">External publication details</legend><label className="block"><span className="block text-sm font-medium text-ink">External publisher</span><input value={externalPublisher} onChange={(event) => setExternalPublisher(event.target.value)} className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink" /></label><label className="block"><span className="block text-sm font-medium text-ink">Original publication date</span><input type="date" value={externalPublicationDate} onChange={(event) => setExternalPublicationDate(event.target.value)} className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink" /></label><label className="block sm:col-span-2"><span className="block text-sm font-medium text-ink">External URL</span><input type="url" value={externalUrl} onChange={(event) => setExternalUrl(event.target.value)} placeholder="https://" className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink" /></label></fieldset>}
              <label className="block">
                <span className="block text-sm font-medium text-ink">Short summary <span className="text-[#a04c43]">*</span></span>
                <textarea required value={summary} onChange={(event) => setSummary(event.target.value)} rows={3} className="mt-2 block w-full resize-y rounded border border-line-strong bg-canvas px-3 py-3 text-sm text-ink outline-none focus:border-accent" placeholder="Summarise the publication in two or three sentences." />
              </label>
            </div>
          </section>

          <section className="border border-line bg-surface p-5">
            <h2 className="text-base font-semibold text-ink">Classification</h2>
            <p className="mt-1 text-sm text-ink-soft">Use consistent relationships so the research remains discoverable.</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block"><span className="block text-sm font-medium text-ink">Countries</span><input className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" placeholder="Search countries" /></label>
              <label className="block"><span className="block text-sm font-medium text-ink">Topics</span><input className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" placeholder="Search topics" /></label>
              <label className="block"><span className="block text-sm font-medium text-ink">Authors</span><input className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" placeholder="Search existing people" /></label>
              <label className="block"><span className="block text-sm font-medium text-ink">Related content</span><input className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink outline-none focus:border-accent" placeholder="Search publications and use cases" /></label>
            </div>
          </section>

          <section className="border border-line bg-surface p-5">
            <h2 className="text-base font-semibold text-ink">File and SEO</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="block text-sm font-medium text-ink">Publication file</span>
                <span className="mt-2 flex min-h-[92px] w-full flex-col items-center justify-center gap-2 rounded border border-dashed border-line-strong bg-canvas px-3 text-sm text-ink-muted hover:border-accent hover:text-accent">
                  <FileText className="h-5 w-5" />
                  <span>{fileName || 'Choose PDF'}</span>
                  <input type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')} />
                </span>
              </label>
              <label className="block"><span className="block text-sm font-medium text-ink">SEO description</span><textarea rows={4} className="mt-2 block w-full resize-y rounded border border-line-strong bg-canvas px-3 py-3 text-sm text-ink outline-none focus:border-accent" placeholder="Optional description for search and sharing." /></label>
            </div>
          </section>
        </div>

        <aside className="h-fit border border-line bg-surface p-5 xl:sticky xl:top-[100px]">
          <h2 className="text-base font-semibold text-ink">Publishing</h2>
          <div className="mt-5 space-y-5">
            <label className="block"><span className="block text-sm font-medium text-ink">Status</span><select className="mt-2 block min-h-[44px] w-full rounded border border-line-strong bg-canvas px-3 text-sm text-ink" defaultValue="Draft"><option>Draft</option><option>Ready for review</option><option>Scheduled</option><option>Published</option><option>Archived</option></select></label>
          <div className="border-t border-line pt-5"><p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">Content check</p><ul className="mt-3 space-y-3 text-sm"><li className="flex gap-2 text-[#28613e]"><ShieldCheck className="h-4 w-4 shrink-0" />Required fields validate locally</li><li className="flex gap-2 text-ink-muted"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-line-strong" />Country and topic links are preview-only</li><li className="flex gap-2 text-[#8b641c]"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c3903c]" />CMS persistence is not connected</li></ul></div>
          <div className="mt-5 border-t border-line pt-5"><h2 className="text-sm font-semibold text-ink">Version history · preview</h2><ol className="mt-3 space-y-3 text-xs text-ink-soft"><li><strong>Version 4 · Published</strong><span className="block text-ink-muted">Communications Editor · 25 Sep 2026, 14:10</span></li><li><strong>Version 3 · Draft</strong><span className="block text-ink-muted">Administrator · 24 Sep 2026, 17:42</span></li><li><strong>Version 2 · Published</strong><span className="block text-ink-muted">Communications Editor · 22 Sep 2026, 11:16</span></li></ol><div className="mt-3 flex gap-3"><button type="button" onClick={() => setRevisionMessage('Version preview is illustrative; no revision data is connected.')} className="text-xs font-medium text-accent">Preview</button><button type="button" onClick={() => setConfirmRestore(true)} className="text-xs font-medium text-accent">Restore</button></div>{confirmRestore && <div className="mt-3 rounded border border-line p-3"><p className="text-xs text-ink">Restore Version 3 in this prototype?</p><div className="mt-2 flex gap-2"><button type="button" onClick={() => { setRevisionMessage('Restore preview completed; no content was changed.'); setConfirmRestore(false); }} className="text-xs font-semibold text-accent">Confirm</button><button type="button" onClick={() => setConfirmRestore(false)} className="text-xs text-ink-muted">Cancel</button></div></div>}{revisionMessage && <p role="status" className="mt-2 text-xs text-ink-muted">{revisionMessage}</p>}</div>
          </div>
        </aside>
      </div>
    </form>
  );
}
