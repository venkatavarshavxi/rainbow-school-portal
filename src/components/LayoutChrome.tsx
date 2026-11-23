import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CalendarCheck,
  GraduationCap,
  Home,
  MapPin,
  Menu,
  Trophy,
  UserCheck,
  X,
} from 'lucide-react';
import { PageRoute } from '../data/schoolData';
import { useSchool } from '../context/SchoolContext';
import { FacebookIcon, InstagramIcon, RainbowLogo } from './RainbowLogo';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenSocialModal: (network: 'facebook' | 'instagram') => void;
}

const DESKTOP_NAV_ITEMS: { id: PageRoute; label: string }[] = [
  { id: 'admissions', label: 'Admissions' },
  { id: 'academics', label: 'Academics' },
  { id: 'sports', label: 'Sports' },
  { id: 'about', label: 'About Us' },
  { id: 'location', label: 'Location' },
];

export const TopNavigation: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSocialModal,
}) => {
  const { user } = useSchool();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isStudent = user?.role === 'student';
  const navItems = isStudent
    ? DESKTOP_NAV_ITEMS.filter((item) => item.id !== 'admissions')
    : DESKTOP_NAV_ITEMS;

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top-of-Screen Sliding Announcement Bar */}
      <div className="marquee-wrapper relative z-40 bg-[#10233D] text-[#FBF9F5] border-b border-[#E8C587]/35">
        <div className="grid grid-cols-4 h-[3px] w-full">
          <div className="bg-[#C85A32]" />
          <div className="bg-[#1E6B52]" />
          <div className="bg-[#264B8A]" />
          <div className="bg-[#8B1E2D]" />
        </div>
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex-1 overflow-hidden py-2">
            <div className="animate-marquee text-xs sm:text-sm whitespace-nowrap">
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  aria-hidden={dup === 1}
                  className="flex items-center gap-6 px-4 text-stone-200"
                >
                  {isStudent ? (
                    <>
                      <span className="font-semibold text-white">
                        Welcome Back, {user.name} ({user.gradeOrDept})
                      </span>
                      <span aria-hidden="true" className="text-[#E8C587]">·</span>
                      <span>Fall Semester Exams Dec 14–18</span>
                      <span aria-hidden="true" className="text-[#E8C587]">·</span>
                      <span>Winter Science Exhibition Nov 21</span>
                      <span aria-hidden="true" className="text-[#E8C587]">·</span>
                      <span>Check Assignments &amp; Rainbow School Mail</span>
                      <span aria-hidden="true" className="text-[#E8C587]">·</span>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-white">
                        Admissions 2026–2027 Now Open
                      </span>
                      <span aria-hidden="true" className="text-[#E8C587]">·</span>
                      <span>Priority Application Deadline: January 31</span>
                      <span aria-hidden="true" className="text-[#E8C587]">·</span>
                      <span>Campus Tours Mon–Fri</span>
                      <span aria-hidden="true" className="text-[#E8C587]">·</span>
                      <span>Kindergarten through Grade 10</span>
                      <span aria-hidden="true" className="text-[#E8C587]">·</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleNav(isStudent ? 'portal' : 'admissions')}
            className="px-3.5 sm:px-5 py-2 bg-[#8B1E2D] hover:bg-[#721623] text-[#FBF9F5] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 border-l border-white/15 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E8C587]" />
            <span>{isStudent ? 'My Dashboard' : 'Schedule a Campus Tour'}</span>
          </button>
        </div>
      </div>

      {/* Desktop Top Bar — Strictly 3-Zone Contract */}
      <header className="hidden md:block sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 h-[74px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Crest + Wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10233D] rounded-md px-1 py-1"
          >
            <RainbowLogo size={38} className="transition-transform duration-200 group-hover:scale-[1.03]" />
            <span className="font-serif text-2xl font-bold tracking-tight text-[#10233D]">
              Rainbow School
            </span>
          </button>

          {/* Zone 2: Single-Line Navigation Links */}
          <nav className="flex items-center gap-7" aria-label="Main navigation">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10233D] rounded-sm ${
                    active ? 'text-[#8B1E2D]' : 'text-[#3F3A36] hover:text-[#10233D]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[#8B1E2D] transition-transform duration-200 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => handleNav('portal')}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#10233D] hover:bg-[#8B1E2D] rounded-md shadow-xs hover:shadow-md transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1E2D] focus-visible:ring-offset-2"
            >
              {user ? `${user.role === 'teacher' ? 'Teacher' : 'Student'} Dashboard` : 'Portal Login'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Top Bar (Compact 56px) */}
      <header className="md:hidden sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200">
        <div className="grid grid-cols-4 h-[2px] w-full">
          <div className="bg-[#C85A32]" />
          <div className="bg-[#1E6B52]" />
          <div className="bg-[#264B8A]" />
          <div className="bg-[#8B1E2D]" />
        </div>
        <div className="h-[54px] px-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 min-h-[44px] whitespace-nowrap shrink-0"
        >
          <RainbowLogo size={30} />
          <span className="font-serif text-lg font-bold text-[#10233D]">Rainbow School</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open school menu"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#10233D] rounded-lg hover:bg-stone-200/50"
        >
          <Menu className="w-6 h-6" />
        </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Natural Thumb Zone, 64px) */}
      <nav
        aria-label="Mobile quick navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 pb-safe bg-[#FBF9F5]/95 backdrop-blur-md border-t border-stone-200 grid grid-cols-5 items-center"
      >
        {[
          { id: 'home' as PageRoute, label: 'Home', icon: Home },
          isStudent
            ? { id: 'about' as PageRoute, label: 'Schedule', icon: Award }
            : { id: 'admissions' as PageRoute, label: 'Admissions', icon: CalendarCheck },
          { id: 'academics' as PageRoute, label: 'Courses', icon: BookOpen },
          { id: 'sports' as PageRoute, label: 'Sports', icon: Trophy },
          { id: 'portal' as PageRoute, label: user ? 'Dashboard' : 'Portal', icon: UserCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = currentPage === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleNav(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
                active ? 'text-[#8B1E2D]' : 'text-stone-500 hover:text-[#10233D]'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={active ? 2.3 : 1.8} />
              <span className="text-[11px] font-medium tracking-tight mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Slide-Up Drawer Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FBF9F5] rounded-t-3xl border-t border-stone-200 p-5 pb-8 max-h-[85vh] overflow-y-auto">
            <div className="w-10 h-1.5 bg-stone-300 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <RainbowLogo size={32} />
                <span className="font-serif text-xl font-bold text-[#10233D]">Rainbow School</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-stone-600 hover:bg-stone-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y divide-stone-200/80 my-2">
              {[
                { id: 'home' as PageRoute, label: 'School Overview', icon: Home },
                ...(!isStudent
                  ? [{ id: 'admissions' as PageRoute, label: 'Admissions & Visits', icon: CalendarCheck }]
                  : []),
                { id: 'academics' as PageRoute, label: 'Courses (KG to Grade 10)', icon: GraduationCap },
                { id: 'sports' as PageRoute, label: 'Sports & Athletics', icon: Trophy },
                { id: 'about' as PageRoute, label: 'About, Schedule & Gallery', icon: Award },
                { id: 'location' as PageRoute, label: 'Campus Location & Hours', icon: MapPin },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    className="w-full min-h-[52px] flex items-center justify-between px-2 py-3 text-left text-[#10233D] font-medium"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[#8B1E2D]" />
                      <span>{item.label}</span>
                    </span>
                    <span className="text-xs text-stone-400">Open</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 space-y-3">
              <button
                type="button"
                onClick={() => handleNav('portal')}
                className="w-full min-h-[48px] bg-[#10233D] text-white font-medium text-sm rounded-xl flex items-center justify-center"
              >
                {user ? `Open ${user.role === 'teacher' ? 'Teacher' : 'Student'} Dashboard` : 'Student & Teacher Portal Login'}
              </button>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSocialModal('facebook');
                  }}
                  className="min-h-[44px] flex items-center justify-center gap-2 border border-stone-300 rounded-xl text-sm font-medium text-[#10233D] bg-white"
                >
                  <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                  <span>Facebook</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSocialModal('instagram');
                  }}
                  className="min-h-[44px] flex items-center justify-center gap-2 border border-stone-300 rounded-xl text-sm font-medium text-[#10233D] bg-white"
                >
                  <InstagramIcon className="w-4 h-4 text-[#E4405F]" />
                  <span>Instagram</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const SchoolFooter: React.FC<{
  onNavigate: (page: PageRoute) => void;
  onOpenSocialModal: (network: 'facebook' | 'instagram') => void;
}> = ({ onNavigate, onOpenSocialModal }) => {
  const { user } = useSchool();
  const isStudent = user?.role === 'student';

  const go = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#10233D] to-[#0B192C] text-[#FBF9F5] pb-24 md:pb-12 border-t border-[#1D395E]">
      <div className="grid grid-cols-4 h-1 w-full mb-16">
        <div className="bg-[#C85A32]" />
        <div className="bg-[#1E6B52]" />
        <div className="bg-[#264B8A]" />
        <div className="bg-[#8B1E2D]" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* School Identity & Motto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <RainbowLogo size={42} />
              <div>
                <h2 className="font-serif text-2xl font-bold tracking-tight text-white">
                  Rainbow School
                </h2>
                <p className="text-xs text-stone-300 tracking-wide">
                  Kindergarten through Grade 10 · Classical & STEM Academy
                </p>
              </div>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed max-w-md">
              742 Crestview Meadow Lane, Oakridge District · Mon–Fri 7:30 AM – 5:00 PM
              <br />
              Phone: (555) 392-4810 · School Mail:{' '}
              <a href="mailto:info@rainbowschool.edu" className="underline hover:text-white">
                info@rainbowschool.edu
              </a>
              {' · '}
              <a href="mailto:admissions@rainbowschool.edu" className="underline hover:text-white">
                admissions@rainbowschool.edu
              </a>
            </p>

            {/* Explicit Follow Us on Facebook & Instagram with Brand Logos */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-[#D9B675] mb-3 font-medium">
                Follow Rainbow School
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenSocialModal('facebook')}
                  className="min-h-[44px] inline-flex items-center gap-2.5 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                >
                  <FacebookIcon className="w-4 h-4 text-[#60A5FA]" />
                  <span>Follow on Facebook</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenSocialModal('instagram')}
                  className="min-h-[44px] inline-flex items-center gap-2.5 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#F472B6]" />
                  <span>Follow on Instagram</span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-white">
              {isStudent ? 'My Academics' : 'Admissions'}
            </h3>
            {isStudent ? (
              <ul className="space-y-2 text-sm text-stone-300">
                <li>
                  <button type="button" onClick={() => go('portal')} className="hover:text-white transition-colors">
                    Student Dashboard
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => go('academics')} className="hover:text-white transition-colors">
                    Enrolled Courses
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => go('about')} className="hover:text-white transition-colors">
                    Campus Schedule
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="space-y-2 text-sm text-stone-300">
                <li>
                  <button type="button" onClick={() => go('admissions')} className="hover:text-white transition-colors">
                    How to Apply
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => go('admissions')} className="hover:text-white transition-colors">
                    Schedule a Tour
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => go('admissions')} className="hover:text-white transition-colors">
                    Scholarships & Aid
                  </button>
                </li>
              </ul>
            )}
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-white">School Life</h3>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button type="button" onClick={() => go('academics')} className="hover:text-white transition-colors">
                  Courses (KG–Grade 10)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('sports')} className="hover:text-white transition-colors">
                  Sports & Athletics
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('about')} className="hover:text-white transition-colors">
                  About & Certificates
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-white">Portals & Campus</h3>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button type="button" onClick={() => go('portal')} className="hover:text-white transition-colors">
                  Student Portal Login
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('portal')} className="hover:text-white transition-colors">
                  Teacher Portal Login
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('location')} className="hover:text-white transition-colors">
                  Campus Map & Directions
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Rainbow School. All rights reserved. Accredited KG–Grade 10 Institution.</p>
          <p>Affiliated Charter No. CBSE-AFF-9304812-RS · ISO 9001:2015 Certified</p>
        </div>
      </div>
    </footer>
  );
};
