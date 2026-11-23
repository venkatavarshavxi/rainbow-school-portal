import React, { useEffect, useState } from 'react';
import { Check, CheckCircle2, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { CAMPUS_GALLERY_ITEMS, SPORTS_PROGRAMS } from '../data/schoolData';
import { useSchool } from '../context/SchoolContext';
import { ResilientImage } from './ResilientImage';
import { SlideInFrame } from './SlideInFrame';

const ATHLETIC_SLIDES = [
  CAMPUS_GALLERY_ITEMS.find((g) => g.id === 'gal-stadium') || CAMPUS_GALLERY_ITEMS[7],
  CAMPUS_GALLERY_ITEMS.find((g) => g.id === 'gal-courtyard') || CAMPUS_GALLERY_ITEMS[6],
  CAMPUS_GALLERY_ITEMS.find((g) => g.id === 'gal-art-music') || CAMPUS_GALLERY_ITEMS[4],
];

export const SportsPage: React.FC<{ onGoToPortal: () => void }> = ({ onGoToPortal }) => {
  const { user, roster, toggleStudentSport } = useSchool();
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [tryoutSport, setTryoutSport] = useState<string | null>(null);
  const [tryoutStudent, setTryoutStudent] = useState('');
  const [tryoutGrade, setTryoutGrade] = useState('Grade 7');
  const [tryoutError, setTryoutError] = useState<string | null>(null);
  const [tryoutConfirmed, setTryoutConfirmed] = useState<string | null>(null);
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  const activeStudent =
    user?.role === 'student'
      ? roster.find((r) => r.rollNo === user.identifier)
      : undefined;

  const openTryoutModal = (sportName: string) => {
    setTryoutError(null);
    setTryoutSport(sportName);
    if (activeStudent) {
      setTryoutStudent(activeStudent.name);
      setTryoutGrade(activeStudent.grade);
    }
  };

  useEffect(() => {
    if (heroPaused) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % ATHLETIC_SLIDES.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  const stepHeroSlide = (delta: number) => {
    setHeroSlideIdx((prev) => (prev + delta + ATHLETIC_SLIDES.length) % ATHLETIC_SLIDES.length);
  };

  const seasons = ['All', 'Fall & Spring', 'Fall & Winter', 'Winter & Spring', 'Year-Round'];
  const filteredSports = SPORTS_PROGRAMS.filter(
    (s) => selectedSeason === 'All' || s.season === selectedSeason
  );

  const handleTryoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = tryoutStudent.trim().replace(/\s+/g, ' ');
    if (!cleaned || cleaned.length < 3 || !/^[\p{L}][\p{L}\s.'-]{1,59}$/u.test(cleaned)) {
      setTryoutError('Please enter a valid student name using letters only (min 3 characters).');
      return;
    }
    if (!tryoutSport) return;
    setTryoutConfirmed(`${cleaned} registered for ${tryoutSport} (${tryoutGrade}) trials.`);
    setTryoutStudent('');
    setTryoutError(null);
    setTryoutSport(null);
  };

  const activeHeroSlide = ATHLETIC_SLIDES[heroSlideIdx];

  return (
    <div className="bg-[#FBF9F5]">
      {/* Athletics Hero */}
      <section className="relative bg-[#10233D] text-white border-b border-[#1E3B62]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#E8C587]">
              Athletics &amp; Co-Curriculars · KG–Grade 10
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight">
              Rainbow School Athletics
            </h1>
            <p className="text-base text-stone-200 leading-relaxed">
              400m synthetic track, FIFA turf pitch, 25m heated lap pool, and indoor arena.
            </p>
            <div className="pt-2 grid grid-cols-3 gap-4 border-t border-white/15 tabular-nums">
              <div>
                <p className="font-serif text-2xl font-semibold text-white">6</p>
                <p className="text-xs text-stone-300">Varsity Programs</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-white">400m</p>
                <p className="text-xs text-stone-300">Olympic Track</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-white">25m</p>
                <p className="text-xs text-stone-300">Heated Pool</p>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-7 flex flex-col gap-2.5"
            onMouseEnter={() => setHeroPaused(true)}
            onMouseLeave={() => setHeroPaused(false)}
          >
            <SlideInFrame distancePx={60} durationMs={760}>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-stone-900">
              <div
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${heroSlideIdx * 100}%)` }}
              >
                {ATHLETIC_SLIDES.map((slide) => (
                  <div key={slide.id} className="w-full h-full shrink-0 relative">
                    <ResilientImage
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      fallbackLabel={slide.title}
                    />
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#10233D]/80 via-transparent to-transparent pointer-events-none" />

              <button
                type="button"
                onClick={() => stepHeroSlide(-1)}
                aria-label="Previous athletics facility slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#10233D]/70 hover:bg-[#10233D] text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => stepHeroSlide(1)}
                aria-label="Next athletics facility slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#10233D]/70 hover:bg-[#10233D] text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#E8C587]">
                    {activeHeroSlide.building}
                  </p>
                  <p className="font-serif text-lg sm:text-xl font-semibold text-white leading-tight">
                    {activeHeroSlide.title}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 pb-1">
                  {ATHLETIC_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setHeroSlideIdx(idx)}
                      aria-label={`View ${s.title}`}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === heroSlideIdx ? 'w-6 bg-[#E8C587]' : 'w-1.5 bg-white/45'
                      }`}
                    />
                  ))}
                </div>
              </div>
              </div>
            </SlideInFrame>
          </div>
        </div>
      </section>

      {/* Sports Catalog */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-[#10233D]">
                Varsity &amp; Developmental Programs
              </h2>
              <p className="text-sm text-stone-600 mt-0.5">
                Filter by season or register directly for trials.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F3EFE6] rounded-xl border border-stone-200/70">
              {seasons.map((season) => (
                <button
                  key={season}
                  type="button"
                  onClick={() => setSelectedSeason(season)}
                  className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    selectedSeason === season
                      ? 'bg-[#10233D] text-white shadow-xs'
                      : 'text-stone-600 hover:text-[#10233D]'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>

          {tryoutConfirmed && (
            <div className="p-4 bg-[#EFF8F4] border border-[#1E6B52]/30 rounded-xl text-sm text-[#10233D] flex items-center justify-between gap-4">
              <span className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#14532D] shrink-0" />
                <span>{tryoutConfirmed}</span>
              </span>
              <button
                type="button"
                onClick={() => setTryoutConfirmed(null)}
                className="text-xs underline text-stone-600"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSports.map((sport, idx) => {
              const isJoined = activeStudent?.enrolledSports.includes(sport.name);
              const sportThemes = [
                { bar: '#C85A32', soft: '#FFF4EE' },
                { bar: '#1E6B52', soft: '#EFF8F4' },
                { bar: '#264B8A', soft: '#EFF4FC' },
                { bar: '#0F766E', soft: '#F0FDFA' },
                { bar: '#B45309', soft: '#FEF7EC' },
                { bar: '#8B1E2D', soft: '#FDF2F4' },
              ];
              const theme = sportThemes[idx % sportThemes.length];
              return (
                <article
                  key={sport.id}
                  className="group bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#10233D]/35"
                >
                  <div>
                    <div className="h-2 w-full" style={{ backgroundColor: theme.bar }} />
                    <div
                      className="px-6 py-4 border-b border-stone-200/70"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                        <span className="font-semibold" style={{ color: theme.bar }}>
                          {sport.season}
                        </span>
                        <span className="text-stone-600">{sport.grades}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-semibold text-[#10233D] mt-1 group-hover:text-[#8B1E2D] transition-colors">
                        {sport.name}
                      </h3>
                    </div>

                    <div className="p-6 space-y-4">
                      <p className="text-sm text-[#44403C] leading-relaxed line-clamp-2">
                        {sport.description}
                      </p>

                      <dl className="pt-3 space-y-2 text-xs text-stone-600 border-t border-stone-100">
                        <div className="flex justify-between gap-2">
                          <dt className="text-stone-400">Head Coach</dt>
                          <dd className="font-semibold text-[#10233D]">{sport.coach}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-stone-400">Venue</dt>
                          <dd className="text-right font-medium text-[#10233D]">{sport.venue}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-stone-400">Practice</dt>
                          <dd className="text-right tabular-nums">{sport.schedule}</dd>
                        </div>
                      </dl>

                      <div className="p-3 bg-[#FBF6EB] border border-[#E8C587]/50 rounded-lg flex items-start gap-2.5 text-xs text-[#78350F] font-medium">
                        <Trophy className="w-4 h-4 shrink-0 mt-0.5 text-[#A67C37]" />
                        <span>{sport.honors}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-stone-100 flex items-center justify-between gap-3 bg-[#FBF9F5]">
                    <button
                      type="button"
                      onClick={() => openTryoutModal(sport.name)}
                      className="min-h-[42px] px-4 py-2 bg-[#10233D] hover:bg-[#8B1E2D] text-white text-xs font-medium rounded-md shadow-2xs hover:shadow-md transition-all duration-150"
                    >
                      Register for Tryouts
                    </button>

                    {user?.role === 'student' ? (
                      <button
                        type="button"
                        onClick={() => toggleStudentSport(sport.name)}
                        className={`min-h-[42px] px-3.5 py-2 rounded-md text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
                          isJoined
                            ? 'bg-[#14532D]/10 text-[#14532D] border border-[#14532D]/30'
                            : 'border border-stone-300 text-[#10233D] hover:bg-stone-50'
                        }`}
                      >
                        {isJoined ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>On Squad</span>
                          </>
                        ) : (
                          <span>Join Club</span>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onGoToPortal}
                        className="text-xs font-medium text-stone-600 underline underline-offset-4 hover:text-[#8B1E2D]"
                      >
                        {user?.role === 'teacher' ? 'Faculty Dashboard' : 'Student Portal'}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tryout Registration Modal */}
      {tryoutSport && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <form
            onSubmit={handleTryoutSubmit}
            className="bg-[#FBF9F5] border border-stone-200 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8B1E2D]">Athletics Tryouts</p>
              <h3 className="font-serif text-2xl font-semibold text-[#10233D] mt-1">
                {tryoutSport}
              </h3>
            </div>

            <div>
              <label htmlFor="tryout-name" className="block text-xs font-medium text-[#10233D] mb-1.5">
                Student Name
              </label>
              <input
                id="tryout-name"
                type="text"
                required
                value={tryoutStudent}
                onChange={(e) => {
                  setTryoutStudent(e.target.value);
                  if (tryoutError) setTryoutError(null);
                }}
                placeholder="Full student name"
                className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-stone-300 rounded-md text-sm"
              />
              {tryoutError && (
                <p className="mt-1 text-[11px] text-[#8B1E2D]">{tryoutError}</p>
              )}
            </div>

            <div>
              <label htmlFor="tryout-grade" className="block text-xs font-medium text-[#10233D] mb-1.5">
                Current Grade
              </label>
              <select
                id="tryout-grade"
                value={tryoutGrade}
                onChange={(e) => setTryoutGrade(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-stone-300 rounded-md text-sm"
              >
                {['KG-1', 'KG-2', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTryoutSport(null)}
                className="min-h-[44px] px-4 py-2 border border-stone-300 rounded-md text-sm text-stone-700 bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2 bg-[#8B1E2D] text-white text-sm font-medium rounded-md"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
