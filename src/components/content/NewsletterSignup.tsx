'use client';

import React, { useState } from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { Container } from '../ui/Primitives';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@') || email.trim().length < 5) {
      setError('Enter a valid email address, for example name@organisation.org');
      return;
    }
    setError(null);
    setDone(true);
  }

  return (
    <section aria-labelledby="newsletter-heading" className="border-y border-line bg-accent-dark">
      <Container className="py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-center lg:gap-16">
          <div>
            <h2 id="newsletter-heading" className="font-serif text-[1.75rem] leading-tight text-white sm:text-[2rem]">
              Stay informed about responsible AI across Asia
            </h2>
            <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-accent-soft">
              Preview the quarterly updates featuring research, responsible AI use cases, datasets, events and opportunities from across South and Southeast Asia.
            </p>
          </div>

          {done ?
          <div
            role="status"
            className="flex items-start gap-3 rounded-lg border border-white/20 bg-white/10 p-5 text-white">
            
              <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium">Preview signup submitted.</p>
                <p className="mt-1 text-[0.9375rem] text-accent-soft">
                  This preview form does not send or store email addresses. The production newsletter will confirm subscriptions here.
                </p>
              </div>
            </div> :

          <form onSubmit={onSubmit} noValidate className="rounded-lg bg-surface p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="nl-email" className="block text-meta font-semibold text-ink">
                    Email address <span className="text-cat-readiness">*</span>
                  </label>
                  <input
                  id="nl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'nl-email-error' : undefined}
                  className="mt-1.5 min-h-[48px] w-full rounded-md border border-line-strong bg-white px-3 text-[0.9375rem] text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  placeholder="name@organisation.org" />
                
                  {error &&
                <p id="nl-email-error" className="mt-1.5 text-meta font-medium text-cat-readiness">
                      {error}
                    </p>
                }
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="nl-name" className="block text-meta font-semibold text-ink">
                    Name <span className="font-normal text-ink-muted">(optional)</span>
                  </label>
                  <input
                  id="nl-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 min-h-[48px] w-full rounded-md border border-line-strong bg-white px-3 text-[0.9375rem] text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  placeholder="Your name" />
                
                </div>
              </div>
              <button
              type="submit"
              className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-accent px-5 text-[0.9375rem] font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-dark sm:w-auto">
              
                Preview signup
              </button>
              <p className="mt-3 text-meta leading-relaxed text-ink-muted">
                Prototype only: this form does not send or store your details.
              </p>
            </form>
          }
        </div>
      </Container>
    </section>);

}
