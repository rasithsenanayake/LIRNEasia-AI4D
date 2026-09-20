import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { UseCaseDetail } from './pages/UseCaseDetail';
import { DataMaps } from './pages/DataMaps';
import { CountryExplorer } from './pages/CountryExplorer';
import { CountryProfile } from './pages/CountryProfile';
import { PublicationDetail } from './pages/PublicationDetail';
import { SectionPlaceholder } from './pages/SectionPlaceholder';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen w-full flex-col bg-canvas">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2.5 focus:text-white">
          
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/use-cases" element={<Navigate to="/explore?type=Use%20Case" replace />} />
            <Route path="/use-cases/:slug" element={<UseCaseDetail />} />
            <Route path="/data-maps" element={<DataMaps />} />
            <Route path="/countries" element={<CountryExplorer />} />
            <Route path="/countries/:slug" element={<CountryProfile />} />
            <Route path="/publications/:slug" element={<PublicationDetail />} />
            <Route path="/topics" element={<SectionPlaceholder />} />
            <Route path="/topics/:slug" element={<SectionPlaceholder />} />
            <Route path="/research" element={<SectionPlaceholder />} />
            <Route path="/datasets/:slug" element={<SectionPlaceholder />} />
            <Route path="/people" element={<SectionPlaceholder />} />
            <Route path="/people/:slug" element={<SectionPlaceholder />} />
            <Route path="/organizations" element={<SectionPlaceholder />} />
            <Route path="/organizations/:slug" element={<SectionPlaceholder />} />
            <Route path="/events" element={<SectionPlaceholder />} />
            <Route path="/events/:slug" element={<SectionPlaceholder />} />
            <Route path="/opportunities" element={<SectionPlaceholder />} />
            <Route path="/learning-resources" element={<SectionPlaceholder />} />
            <Route path="/newsletter" element={<SectionPlaceholder />} />
            <Route path="/partners" element={<SectionPlaceholder />} />
            <Route path="/about" element={<SectionPlaceholder />} />
            <Route path="/contact" element={<SectionPlaceholder />} />
            <Route path="/accessibility" element={<SectionPlaceholder />} />
            <Route path="/privacy" element={<SectionPlaceholder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>);

}