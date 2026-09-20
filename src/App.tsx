'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return <>{children}</>;

  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen w-full flex-col bg-canvas">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2.5 focus:text-white">
          
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </div>
    </>);

}
