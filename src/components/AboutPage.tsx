import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  Calendar as CalendarIcon,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Maximize2,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  ACADEMIC_MONTHS,
  CAMPUS_GALLERY_ITEMS,
  CAMPUS_YEAR_EVENTS,
  CalendarEventCategory,
  CampusCalendarEvent,
  CampusGalleryItem,
  GalleryCategory,
  SCHOOL_CERTIFICATES,
  SCHOOL_IMAGES,
  SchoolCertificate,
} from '../data/schoolData';
import { ResilientImage } from './ResilientImage';
import { SlideInFrame } from './SlideInFrame';
import { RainbowLogo } from './RainbowLogo';

const EVENT_CATEGORY_META: Record<
  CalendarEventCategory,
  { hex: string; softBg: string; shortTag: string }
> = {
  'Key Dates': { hex: '#264B8A', softBg: '#EFF4FC', shortTag: 'Academic' },
  'Campus Events': { hex: '#1E6B52', softBg: '#EFF8F4', shortTag: 'Event' },
  'School Holidays': { hex: '#C85A32', softBg: '#FFF4EE', shortTag: 'Holiday' },
};

function toIsoDate(year: number, monthIndex: number, day: number): string {
  const m = String(monthIndex + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function eventOccursOnDate(ev: CampusCalendarEvent, isoDate: string): boolean {
  if (!ev.endDate) return ev.date === isoDate;
  return isoDate >= ev.date && isoDate <= ev.endDate;
}

function formatReadableDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const AboutPage: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<SchoolCertificate | null>(null);

  // Virtual Campus Gallery state
  const [galleryCategory, setGalleryCategory] = useState<'All Spaces' | GalleryCategory>('All Spaces');
  const [activeGalleryItem, setActiveGalleryItem] = useState<CampusGalleryItem | null>(null);
  const [gallerySlideIdx, setGallerySlideIdx] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);

  const filteredGallery = useMemo(() => {
    if (galleryCategory === 'All Spaces') return CAMPUS_GALLERY_ITEMS;
    return CAMPUS_GALLERY_ITEMS.filter((item) => item.category === galleryCategory);
  }, [galleryCategory]);

  useEffect(() => {
    setGallerySlideIdx(0);
  }, [galleryCategory]);

  useEffect(() => {
    if (galleryPaused || filteredGallery.length <= 1 || activeGalleryItem) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setGallerySlideIdx((prev) => (prev + 1) % filteredGallery.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [galleryPaused, filteredGallery.length, activeGalleryItem]);

  const activeLightboxIndex = activeGalleryItem
    ? filteredGallery.findIndex((i) => i.id === activeGalleryItem.id)
    : -1;

  const stepLightbox = (delta: number) => {
    if (filteredGallery.length === 0 || activeLightboxIndex < 0) return;
    const nextIdx = (activeLightboxIndex + delta + filteredGallery.length) % filteredGallery.length;
    setActiveGalleryItem(filteredGallery[nextIdx]);
  };

  const stepGallerySlide = (delta: number) => {
    if (filteredGallery.length === 0) return;
    setGallerySlideIdx((prev) => (prev + delta + filteredGallery.length) % filteredGallery.length);
  };

  // Campus Schedule monthly state (defaults to November 2026)
  const [monthIdx, setMonthIdx] = useState<number>(3);
  const [eventFilter, setEventFilter] = useState<'All' | CalendarEventCategory>('All');
  const [selectedDateIso, setSelectedDateIso] = useState<string>('2026-11-21');

  const activeMonth = ACADEMIC_MONTHS[monthIdx];

  const monthEvents = useMemo(() => {
    const monthPrefix = activeMonth.key;
    return CAMPUS_YEAR_EVENTS.filter((ev) => {
      const matchesMonth =
        ev.date.startsWith(monthPrefix) || (ev.endDate ? ev.endDate.startsWith(monthPrefix) : false);
      const matchesCategory = eventFilter === 'All' || ev.category === eventFilter;
      return matchesMonth && matchesCategory;
    });
  }, [activeMonth.key, eventFilter]);

  const calendarCells = useMemo(() => {
    const firstWeekday = new Date(activeMonth.year, activeMonth.monthIndex, 1).getDay();
    const totalDays = new Date(activeMonth.year, activeMonth.monthIndex + 1, 0).getDate();
    const cells: Array<{ day: number | null; iso: string | null }> = [];
    for (let i = 0; i < firstWeekday; i++) {
      cells.push({ day: null, iso: null });
    }
    for (let d = 1; d <= totalDays; d++) {
      cells.push({ day: d, iso: toIsoDate(activeMonth.year, activeMonth.monthIndex, d) });
    }
    while (cells.length % 7 !== 0) {
      cells.push({ day: null, iso: null });
    }
    return cells;
  }, [activeMonth]);

  const selectedDayEvents = useMemo(
    () => monthEvents.filter((ev) => eventOccursOnDate(ev, selectedDateIso)),
    [monthEvents, selectedDateIso],
  );

  const handleSelectMonth = (nextIdx: number) => {
    setMonthIdx(nextIdx);
    const nextMeta = ACADEMIC_MONTHS[nextIdx];
    const firstEventInMonth = CAMPUS_YEAR_EVENTS.find(
      (ev) =>
        (eventFilter === 'All' || ev.category === eventFilter) &&
        ev.date.startsWith(nextMeta.key),
    );
    setSelectedDateIso(
      firstEventInMonth ? firstEventInMonth.date : toIsoDate(nextMeta.year, nextMeta.monthIndex, 1),
    );
  };

  return (
    <div className="bg-[#FBF9F5]">
      {/* Masthead */}
      <section className="bg-[#10233D] text-white border-b border-[#1E3B62]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs uppercase tracking-[0.18em] text-[#E8C587]">
              About Rainbow School · Heritage &amp; Accreditations
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight">
              Educating Wisdom &amp; Integrity Since 1998
            </h1>
            <p className="text-base text-stone-200 leading-relaxed max-w-xl">
              Oakridge District KG–10 academy pairing small 25-seat classes with lab mastery and
              certified national standards.
            </p>
          </div>
          <div className="lg:col-span-5">
            <SlideInFrame distancePx={60} durationMs={760}>
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 shadow-lg">
                <ResilientImage
                  src={SCHOOL_IMAGES.campusHero}
                  alt="Rainbow School Heritage Hall"
                  className="w-full h-full object-cover"
                  fallbackLabel="Rainbow School Heritage Hall"
                />
              </div>
            </SlideInFrame>
          </div>
        </div>
      </section>

      {/* Editorial Mission & Head of School */}
      <section className="py-12 md:py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B1E2D]">
              01. Mission &amp; Educational Philosophy
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#10233D]">
              Discovery from Kindergarten to 10th Grade
            </h2>
            <p className="text-base text-[#44403C] leading-relaxed max-w-prose">
              Early Montessori wonder and secondary academic rigor under one roof—guiding scholars
              from tactile phonics to Socratic inquiry, lab science, and Grade 10 board mastery.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-200">
            <div className="grid grid-cols-4 h-1.5 w-full">
              <div className="bg-[#C85A32]" />
              <div className="bg-[#1E6B52]" />
              <div className="bg-[#264B8A]" />
              <div className="bg-[#8B1E2D]" />
            </div>
            <div className="p-6 sm:p-7 space-y-4">
              <p className="text-xs uppercase tracking-widest text-[#8B1E2D] font-medium">
                Office of the Principal
              </p>
              <blockquote className="font-serif text-xl sm:text-2xl italic text-[#10233D] leading-snug">
                “Our highest credential is a tenth-grader who reads with the same delight they knew
                in Kindergarten.”
              </blockquote>
              <div className="pt-3 border-t border-stone-200">
                <p className="font-medium text-sm text-[#10233D]">Dr. Catherine Sterling</p>
                <p className="text-xs text-stone-500">Head of School · Ed.D., Curriculum &amp; Leadership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Certificates & Accreditations of Our School */}
      <section className="py-12 md:py-16 bg-[#F3EFE6]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl space-y-1.5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B1E2D]">
              02. Verified Credentials &amp; Charters
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#10233D]">
              Official Certificates of Rainbow School
            </h2>
            <p className="text-sm text-[#44403C]">
              Select any record below to inspect its official registration code and validity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOOL_CERTIFICATES.map((cert, cIdx) => {
              const certThemes = [
                { bar: '#264B8A', soft: '#EFF4FC' },
                { bar: '#B45309', soft: '#FEF7EC' },
                { bar: '#1E6B52', soft: '#EFF8F4' },
                { bar: '#C85A32', soft: '#FFF4EE' },
                { bar: '#8B1E2D', soft: '#FDF2F4' },
                { bar: '#0F766E', soft: '#F0FDFA' },
              ];
              const theme = certThemes[cIdx % certThemes.length];
              return (
                <article
                  key={cert.id}
                  className="group bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#B08D57]"
                >
                  <div>
                    <div className="h-2 w-full" style={{ backgroundColor: theme.bar }} />
                    <div
                      className="px-6 py-4 border-b border-stone-200/70"
                      style={{ backgroundColor: theme.soft }}
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-stone-600 tabular-nums">
                        <span className="font-semibold" style={{ color: theme.bar }}>
                          {cert.accessionNo}
                        </span>
                        <span>{cert.category}</span>
                      </div>
                      <div className="flex items-start gap-2.5 mt-2">
                        <Award className="w-5 h-5 shrink-0 mt-1" style={{ color: theme.bar }} />
                        <h3 className="font-serif text-xl font-semibold text-[#10233D] leading-snug group-hover:text-[#8B1E2D] transition-colors">
                          {cert.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 space-y-2">
                      <p className="text-xs font-semibold text-[#8B1E2D]">{cert.issuingBody}</p>
                      <p className="text-sm text-[#44403C] leading-relaxed line-clamp-2">{cert.summary}</p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-stone-100 space-y-3 bg-[#FBF9F5]">
                    <div className="flex items-center justify-between text-xs text-stone-500 tabular-nums">
                      <span>Issued: {cert.issuedDate}</span>
                      <span>Valid: {cert.validThrough}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="w-full min-h-[42px] px-4 py-2 border border-[#10233D] text-[#10233D] hover:bg-[#10233D] hover:text-white text-xs font-medium rounded-md transition-all duration-150 flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Inspect Official Certificate</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 03: Campus Schedule & Monthly Academic Calendar */}
      <section
        id="campus-schedule"
        className="py-14 md:py-20 bg-[#FBF9F5] border-t border-stone-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B1E2D] flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>03. Campus Schedule · 2026–2027 Academic Year</span>
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#10233D]">
                Monthly Key Dates, Events &amp; Holidays
              </h2>
              <p className="text-sm text-[#44403C]">
                Term dates, conferences, athletic meets, and breaks across 2026–2027.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter calendar dates by category"
              className="flex flex-wrap items-center gap-1.5 bg-[#F3EFE6] p-1.5 rounded-lg border border-stone-200 shrink-0"
            >
              {(['All', 'Key Dates', 'Campus Events', 'School Holidays'] as const).map((cat) => {
                const active = eventFilter === cat;
                const dotColor = cat === 'All' ? '#10233D' : EVENT_CATEGORY_META[cat].hex;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setEventFilter(cat)}
                    className={`min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#10233D] text-white'
                        : 'text-[#10233D] hover:bg-white/80'
                    }`}
                  >
                    {cat !== 'All' && (
                      <span
                        className="w-2.5 h-2.5 rounded-xs shrink-0"
                        style={{ backgroundColor: active ? '#E8C587' : dotColor }}
                        aria-hidden="true"
                      />
                    )}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Academic Month Selector Bar */}
          <div className="bg-white border border-stone-200 rounded-xl p-3 sm:p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
            <div className="flex items-center justify-between xl:justify-start gap-3">
              <button
                type="button"
                onClick={() => handleSelectMonth(Math.max(0, monthIdx - 1))}
                disabled={monthIdx === 0}
                aria-label="Previous academic month"
                className="min-h-[42px] min-w-[42px] flex items-center justify-center rounded-md border border-stone-300 text-[#10233D] hover:bg-[#10233D] hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="min-w-[190px] text-center xl:text-left">
                <p className="font-serif text-2xl font-semibold text-[#10233D] leading-tight">
                  {activeMonth.fullLabel}
                </p>
                <p className="text-xs font-mono text-[#8B1E2D]">{activeMonth.termLabel}</p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectMonth(Math.min(ACADEMIC_MONTHS.length - 1, monthIdx + 1))}
                disabled={monthIdx === ACADEMIC_MONTHS.length - 1}
                aria-label="Next academic month"
                className="min-h-[42px] min-w-[42px] flex items-center justify-center rounded-md border border-stone-300 text-[#10233D] hover:bg-[#10233D] hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {ACADEMIC_MONTHS.map((m, idx) => {
                const isSelected = idx === monthIdx;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => handleSelectMonth(idx)}
                    className={`min-h-[40px] px-3 py-1.5 text-xs font-mono font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                      isSelected
                        ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                        : 'bg-[#FBF9F5] text-[#10233D] border-stone-200 hover:border-[#10233D]/50 hover:bg-[#F3EFE6]'
                    }`}
                  >
                    {m.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Monthly Calendar Grid + Selected Month Agenda */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Monthly Grid */}
            <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl overflow-hidden">
              <div className="h-1.5 w-full bg-[#10233D]" />
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-mono uppercase tracking-wider text-stone-500 pb-2 border-b border-stone-200">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
                    <div key={dayName} className="py-1">
                      {dayName}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {calendarCells.map((cell, index) => {
                    if (!cell.day || !cell.iso) {
                      return (
                        <div
                          key={`empty-${index}`}
                          className="min-h-[58px] sm:min-h-[76px] rounded-lg bg-[#FBF9F5]/50 border border-stone-100"
                          aria-hidden="true"
                        />
                      );
                    }

                    const iso = cell.iso;
                    const dayEvents = monthEvents.filter((ev) => eventOccursOnDate(ev, iso));
                    const isSelected = selectedDateIso === iso;
                    const primaryEvent = dayEvents[0];
                    const primaryMeta = primaryEvent
                      ? EVENT_CATEGORY_META[primaryEvent.category]
                      : null;

                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => setSelectedDateIso(iso)}
                        aria-label={`${formatReadableDate(iso)}${
                          dayEvents.length > 0 ? `: ${dayEvents.map((e) => e.title).join(', ')}` : ''
                        }`}
                        className={`min-h-[58px] sm:min-h-[76px] p-1.5 sm:p-2 rounded-lg border text-left flex flex-col justify-between transition-all duration-150 ${
                          isSelected
                            ? 'border-[#10233D] ring-2 ring-[#10233D]/25 bg-[#F3EFE6]/70'
                            : primaryMeta
                            ? 'border-stone-300 hover:border-[#10233D]/60 bg-white'
                            : 'border-stone-200/80 hover:bg-[#FBF9F5] bg-white'
                        }`}
                        style={
                          !isSelected && primaryMeta
                            ? { backgroundColor: primaryMeta.softBg }
                            : undefined
                        }
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`text-xs sm:text-sm font-mono font-semibold tabular-nums ${
                              isSelected ? 'text-[#10233D]' : 'text-stone-700'
                            }`}
                          >
                            {cell.day}
                          </span>
                          {primaryMeta && (
                            <span
                              className="w-2 h-2 rounded-xs shrink-0"
                              style={{ backgroundColor: primaryMeta.hex }}
                              aria-hidden="true"
                            />
                          )}
                        </div>

                        {primaryEvent && primaryMeta && (
                          <span
                            className="hidden sm:block text-[10px] font-medium leading-tight line-clamp-2"
                            style={{ color: primaryMeta.hex }}
                          >
                            {primaryEvent.title}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Color & Text Legend */}
                <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center gap-5 text-xs text-stone-600">
                  {(['Key Dates', 'Campus Events', 'School Holidays'] as const).map((cat) => (
                    <span key={cat} className="inline-flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-xs shrink-0"
                        style={{ backgroundColor: EVENT_CATEGORY_META[cat].hex }}
                        aria-hidden="true"
                      />
                      <span>{cat}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Agenda & Selected Day Detail */}
            <div className="lg:col-span-5 space-y-5">
              {/* Highlighted Selected Date Box */}
              <div className="bg-[#10233D] text-white rounded-xl p-6 space-y-3">
                <p className="text-xs font-mono uppercase tracking-widest text-[#E8C587] tabular-nums">
                  Selected Date · {formatReadableDate(selectedDateIso)}
                </p>
                {selectedDayEvents.length === 0 ? (
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-semibold">Regular Academic Instruction</h3>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Standard classroom hours apply (KG: 8:15 AM – 1:30 PM · Primary & Secondary:
                      8:00 AM – 2:45/3:45 PM). Select any highlighted date for event details.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDayEvents.map((ev) => (
                      <div key={ev.id} className="space-y-1.5 border-t border-white/15 pt-3 first:border-t-0 first:pt-0">
                        <div className="flex items-center justify-between gap-2 text-xs text-[#E8C587]">
                          <span className="font-medium">{ev.category}</span>
                          <span className="font-mono tabular-nums">{ev.timeOrNote}</span>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold leading-snug">
                          {ev.title}
                        </h3>
                        <p className="text-xs text-stone-200 leading-relaxed">{ev.description}</p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-300 pt-1">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#E8C587]" />
                            <span>{ev.location}</span>
                          </span>
                          <span>· {ev.division}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chronological Monthly Events List */}
              <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <h3 className="font-serif text-xl font-semibold text-[#10233D]">
                    {activeMonth.fullLabel} Agenda
                  </h3>
                  <span className="text-xs font-mono text-stone-500 tabular-nums">
                    {monthEvents.length} {monthEvents.length === 1 ? 'Entry' : 'Entries'}
                  </span>
                </div>

                {monthEvents.length === 0 ? (
                  <p className="text-sm text-stone-500 py-4">
                    No entries match the selected filter for {activeMonth.fullLabel}. Try switching
                    back to All categories.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {monthEvents.map((ev) => {
                      const meta = EVENT_CATEGORY_META[ev.category];
                      const activeDay = eventOccursOnDate(ev, selectedDateIso);
                      return (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={() => setSelectedDateIso(ev.date)}
                          className={`w-full text-left rounded-lg border overflow-hidden transition-all duration-150 ${
                            activeDay
                              ? 'border-[#10233D] bg-[#F3EFE6]/60 shadow-xs'
                              : 'border-stone-200 bg-[#FBF9F5] hover:bg-white hover:border-[#10233D]/40'
                          }`}
                        >
                          <div className="h-1 w-full" style={{ backgroundColor: meta.hex }} />
                          <div className="p-3.5 space-y-1">
                            <div className="flex items-center justify-between gap-2 text-xs font-mono tabular-nums">
                              <span style={{ color: meta.hex }} className="font-semibold">
                                {formatReadableDate(ev.date)}
                              </span>
                              <span className="text-stone-500">{ev.category}</span>
                            </div>
                            <p className="font-serif text-lg font-semibold text-[#10233D] leading-snug">
                              {ev.title}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3 h-3 text-stone-400" />
                                <span>{ev.timeOrNote}</span>
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{ev.division}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Academic Year Terms & Daily Schedule Reference Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-1.5">
              <p className="text-xs font-mono uppercase tracking-wider text-[#264B8A]">
                Fall Semester 2026
              </p>
              <h4 className="font-serif text-xl font-semibold text-[#10233D] tabular-nums">
                August 17 – December 18, 2026
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Includes Quarter 1 Progress Reports (Oct 23), Parent Conferences (Oct 30), and
                Winter Recess (Dec 21 – Jan 4).
              </p>
            </div>
            <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-1.5">
              <p className="text-xs font-mono uppercase tracking-wider text-[#1E6B52]">
                Spring Semester 2027
              </p>
              <h4 className="font-serif text-xl font-semibold text-[#10233D] tabular-nums">
                January 5 – May 28, 2027
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Includes Admissions Assessments (Feb), Spring Break (Mar 22–26), Board Mocks (Apr
                26–30), and Grade 10 Commencement.
              </p>
            </div>
            <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-1.5">
              <p className="text-xs font-mono uppercase tracking-wider text-[#8B1E2D]">
                Regular Bell Schedule
              </p>
              <h4 className="font-serif text-xl font-semibold text-[#10233D]">
                Daily Campus Hours
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed tabular-nums">
                Kindergarten: 8:15 AM – 1:30 PM · Primary (1–4): 8:00 AM – 2:45 PM · Middle &
                Secondary (5–10): 8:00 AM – 3:45 PM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04: Virtual Campus Gallery */}
      <section
        id="virtual-campus-gallery"
        className="py-12 md:py-16 bg-[#F3EFE6]/70 border-t border-stone-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B1E2D] flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                <span>04. Virtual Campus Gallery</span>
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#10233D]">
                Classrooms, Laboratories &amp; Grounds
              </h2>
              <p className="text-sm text-[#44403C]">
                Explore sunlit Montessori rooms, labs, art studios, and our 18-acre courtyard.
              </p>
            </div>

            {/* Facility Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter campus gallery spaces"
              className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-stone-200 shrink-0 shadow-2xs"
            >
              {(['All Spaces', 'Classrooms', 'Laboratories', 'Campus Facilities'] as const).map(
                (cat) => {
                  const active = galleryCategory === cat;
                  const count =
                    cat === 'All Spaces'
                      ? CAMPUS_GALLERY_ITEMS.length
                      : CAMPUS_GALLERY_ITEMS.filter((i) => i.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setGalleryCategory(cat)}
                      className={`min-h-[40px] px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                        active
                          ? 'bg-[#10233D] text-white'
                          : 'text-[#10233D] hover:bg-[#F3EFE6]'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                },
              )}
            </div>
          </div>

          {/* Sliding Featured Campus Showcase Carousel */}
          {filteredGallery.length > 0 && (
            <SlideInFrame distancePx={56}>
              <div
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-md"
                onMouseEnter={() => setGalleryPaused(true)}
                onMouseLeave={() => setGalleryPaused(false)}
              >
              <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden bg-stone-900">
                <div
                  className="flex h-full transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${gallerySlideIdx * 100}%)` }}
                >
                  {filteredGallery.map((slide) => (
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

                <div className="absolute inset-0 bg-gradient-to-t from-[#10233D]/85 via-[#10233D]/15 to-transparent pointer-events-none" />

                {filteredGallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => stepGallerySlide(-1)}
                      aria-label="Previous gallery slide"
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#10233D]/70 hover:bg-[#10233D] text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all hover:scale-105"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepGallerySlide(1)}
                      aria-label="Next gallery slide"
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#10233D]/70 hover:bg-[#10233D] text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all hover:scale-105"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {filteredGallery[gallerySlideIdx] && (
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-[11px] font-mono uppercase tracking-widest text-[#E8C587]">
                        {filteredGallery[gallerySlideIdx].plateNo} ·{' '}
                        {filteredGallery[gallerySlideIdx].building} ·{' '}
                        {filteredGallery[gallerySlideIdx].gradesServed}
                      </p>
                      <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">
                        {filteredGallery[gallerySlideIdx].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-200 max-w-2xl line-clamp-1">
                        {filteredGallery[gallerySlideIdx].highlights}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveGalleryItem(filteredGallery[gallerySlideIdx])}
                      className="min-h-[40px] px-4 py-2 rounded-lg bg-white/15 hover:bg-white text-white hover:text-[#10233D] border border-white/30 backdrop-blur-xs text-xs font-medium inline-flex items-center gap-1.5 transition-colors shrink-0 self-start sm:self-end"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full View</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Slide Progress Dots & Counter */}
              <div className="px-5 py-3 bg-[#FBF9F5] border-t border-stone-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {filteredGallery.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setGallerySlideIdx(idx)}
                      aria-label={`Slide ${idx + 1}: ${s.title}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === gallerySlideIdx
                          ? 'w-7 bg-[#8B1E2D]'
                          : 'w-2 bg-stone-300 hover:bg-[#10233D]/50'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-stone-500 tabular-nums shrink-0">
                  {String(gallerySlideIdx + 1).padStart(2, '0')} /{' '}
                  {String(filteredGallery.length).padStart(2, '0')}
                </span>
              </div>
              </div>
            </SlideInFrame>
          )}

          {/* Warm Editorial Photography Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item, idx) => (
              <article
                key={item.id}
                className="group bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#10233D]/35"
              >
                <div>
                  <div className="h-1.5 w-full" style={{ backgroundColor: item.accentHex }} />
                  <button
                    type="button"
                    onClick={() => setActiveGalleryItem(item)}
                    aria-label={`View larger photograph of ${item.title}`}
                    className="relative block w-full aspect-[4/3] overflow-hidden bg-stone-100 text-left"
                  >
                    <SlideInFrame className="w-full h-full" delayMs={(idx % 4) * 85}>
                      <ResilientImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        fallbackLabel={item.title}
                      />
                    </SlideInFrame>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-md bg-[#10233D]/85 text-white text-xs font-medium inline-flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </span>
                  </button>

                  <div className="p-5 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span
                        className="font-mono font-semibold"
                        style={{ color: item.accentHex }}
                      >
                        {item.plateNo}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#10233D] leading-snug group-hover:text-[#8B1E2D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#44403C] leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-stone-100 bg-[#FBF9F5] flex items-center justify-between gap-2 text-xs text-stone-600">
                  <span className="truncate">{item.building}</span>
                  <span className="font-mono font-medium text-[#10233D] shrink-0">
                    {item.gradesServed}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Archival Certificate Inspection Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
        >
          <div className="bg-[#FBF9F5] border-2 border-[#B08D57] rounded-xl max-w-xl w-full p-6 sm:p-10 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              aria-label="Close certificate preview"
              className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-stone-600 hover:bg-stone-200/70"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3 border-b border-stone-300 pb-6">
              <div className="flex justify-center">
                <RainbowLogo size={48} />
              </div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#8B1E2D]">
                Official Institutional Record · {selectedCert.accessionNo}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#10233D]">
                {selectedCert.title}
              </h3>
              <p className="text-sm text-stone-600">{selectedCert.issuingBody}</p>
            </div>

            <p className="text-sm text-[#44403C] leading-relaxed text-center">
              {selectedCert.summary}
            </p>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-stone-200 rounded-lg p-4 text-xs tabular-nums">
              <div>
                <dt className="text-stone-400">Verification Code</dt>
                <dd className="font-mono font-medium text-[#10233D] mt-0.5">
                  {selectedCert.verificationCode}
                </dd>
              </div>
              <div>
                <dt className="text-stone-400">Certifying Signatory</dt>
                <dd className="font-medium text-[#10233D] mt-0.5">{selectedCert.signatory}</dd>
              </div>
              <div>
                <dt className="text-stone-400">Date of Issue</dt>
                <dd className="font-medium text-[#10233D] mt-0.5">{selectedCert.issuedDate}</dd>
              </div>
              <div>
                <dt className="text-stone-400">Valid Through</dt>
                <dd className="font-medium text-[#14532D] mt-0.5">{selectedCert.validThrough}</dd>
              </div>
            </dl>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="min-h-[44px] px-6 py-2 bg-[#10233D] text-white text-sm font-medium rounded-md"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Virtual Campus Gallery Architectural Lightbox Modal */}
      {activeGalleryItem && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeGalleryItem.title}
        >
          <div className="bg-[#FBF9F5] border border-stone-300 rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl">
            <div className="h-1.5 w-full" style={{ backgroundColor: activeGalleryItem.accentHex }} />

            <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-stone-200 bg-white">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span
                  className="font-mono font-semibold"
                  style={{ color: activeGalleryItem.accentHex }}
                >
                  {activeGalleryItem.plateNo}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeGalleryItem.building}</span>
                <span aria-hidden="true">·</span>
                <span>{activeGalleryItem.gradesServed}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveGalleryItem(null)}
                aria-label="Close virtual campus tour frame"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-md text-stone-600 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/10] w-full bg-stone-900 overflow-hidden">
              <SlideInFrame key={activeGalleryItem.id} className="w-full h-full" distancePx={44} durationMs={560}>
                <ResilientImage
                  src={activeGalleryItem.image}
                  alt={activeGalleryItem.title}
                  className="w-full h-full object-cover"
                  fallbackLabel={activeGalleryItem.title}
                />
              </SlideInFrame>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#10233D]">
                    {activeGalleryItem.title}
                  </h3>
                  <p className="text-sm text-[#44403C] leading-relaxed max-w-2xl">
                    {activeGalleryItem.caption}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => stepLightbox(-1)}
                    aria-label="Previous campus space"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md border border-stone-300 bg-white text-[#10233D] hover:bg-[#10233D] hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepLightbox(1)}
                    aria-label="Next campus space"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md border border-stone-300 bg-white text-[#10233D] hover:bg-[#10233D] hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-600">
                <span>
                  <strong className="text-[#10233D]">Highlights:</strong> {activeGalleryItem.highlights}
                </span>
                <span className="font-mono tabular-nums text-stone-500">
                  {activeLightboxIndex + 1} / {filteredGallery.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
