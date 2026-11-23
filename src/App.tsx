/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SchoolProvider } from './context/SchoolContext';
import { PageRoute } from './data/schoolData';
import { SchoolFooter, TopNavigation } from './components/LayoutChrome';
import { HomePage } from './components/HomePage';
import { AdmissionsPage } from './components/AdmissionsPage';
import { AcademicsPage } from './components/AcademicsPage';
import { SportsPage } from './components/SportsPage';
import { AboutPage } from './components/AboutPage';
import { LocationPage } from './components/LocationPage';
import { PortalPage } from './components/PortalPage';
import { SocialModal } from './components/SocialModal';
import { ChatBotWidget } from './components/ChatBotWidget';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [socialModal, setSocialModal] = useState<'facebook' | 'instagram' | null>(null);

  const navigateTo = (page: PageRoute) => {
    if (page === 'academics') {
      setSelectedDivision('all');
    }
    setCurrentPage(page);
  };

  const openDivisionInAcademics = (divId: string) => {
    setSelectedDivision(divId);
    setCurrentPage('academics');
  };

  return (
    <SchoolProvider>
      <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
        <TopNavigation
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenSocialModal={setSocialModal}
        />

        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              onNavigate={navigateTo}
              onSelectDivision={openDivisionInAcademics}
              onOpenSocialModal={setSocialModal}
            />
          )}
          {currentPage === 'admissions' && <AdmissionsPage onNavigate={navigateTo} />}
          {currentPage === 'academics' && (
            <AcademicsPage
              initialDivision={selectedDivision}
              onGoToPortal={() => navigateTo('portal')}
            />
          )}
          {currentPage === 'sports' && (
            <SportsPage onGoToPortal={() => navigateTo('portal')} />
          )}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'location' && (
            <LocationPage onOpenSocialModal={setSocialModal} />
          )}
          {currentPage === 'portal' && <PortalPage />}
        </main>

        <SchoolFooter
          onNavigate={navigateTo}
          onOpenSocialModal={setSocialModal}
        />

        <SocialModal
          network={socialModal}
          onClose={() => setSocialModal(null)}
        />

        <ChatBotWidget currentPage={currentPage} />
      </div>
    </SchoolProvider>
  );
}
