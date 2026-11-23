import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Palette,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react';
import {
  CAMPUS_GALLERY_ITEMS,
  GRADE_DIVISIONS,
  PageRoute,
  SCHOOL_CERTIFICATES,
  SCHOOL_IMAGES,
  SPORTS_PROGRAMS,
} from '../data/schoolData';
import { ResilientImage } from './ResilientImage';
import { SlideInFrame } from './SlideInFrame';
import { FacebookIcon, InstagramIcon } from './RainbowLogo';
import { useSchool } from '../context/SchoolContext';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectDivision?: (divisionId: string) => void;
  onOpenSocialModal: (network: 'facebook' | 'instagram') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectDivision,
  onOpenSocialModal,
}) => {
  const { user } = useSchool();
  const isStudent = user?.role === 'student';

  const [slideIdx, setSlideIdx] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  const slides = CAMPUS_GALLERY_ITEMS;

  useEffect(() => {
    if (carouselPaused) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [carouselPaused, slides.length]);

  const stepSlide = (delta: number) => {
    setSlideIdx((prev) => (prev + delta + slides.length) % slides.length);
  };

  const go = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeSlide = slides[slideIdx];

  const campusHighlights = isStudent
    ? [
        {
          title: 'My Classes & Labs',
          subtitle: 'View syllabi, lab schedules & assignments',
          image: SCHOOL_IMAGES.scienceLab,
          accent: '#264B8A',
          action: () => go('academics'),
        },
        {
          title: '2026–2027 Calendar',
          subtitle: 'Exams, open houses & school breaks',
          image: SCHOOL_IMAGES.admissionsLibrary,
          accent: '#1E6B52',
          action: () => go('about'),
        },
        {
          title: 'Robotics & Makerspace',
          subtitle: 'Open weekdays until 5:30 PM',
          image: SCHOOL_IMAGES.roboticsLab,
          accent: '#C85A32',
          action: () => go('portal'),
        },
      ]
    : [
        {
          title: 'Guided Campus Tours',
          subtitle: '45-minute weekday walks · Mon–Fri',
          image: SCHOOL_IMAGES.campusHero,
          accent: '#C85A32',
          action: () => go('admissions'),
        },
        {
          title: 'Student Shadow Days',
          subtitle: 'Morning classes with a Grade 3–10 host',
          image: SCHOOL_IMAGES.humanitiesClassroom,
          accent: '#1E6B52',
          action: () => go('admissions'),
        },
        {
          title: 'Campus Open Houses',
          subtitle: 'Live science labs, arts & parent Q&A',
          image: SCHOOL_IMAGES.admissionsLibrary,
          accent: '#264B8A',
          action: () => go('admissions'),
        },
      ];

  return (
    <div className="bg-[#FBF9F5]">
      {/* Full-Width Photography-First Sliding School Hero */}
      <section
        className="relative bg-[#10233D] overflow-hidden border-b border-stone-200"
        onMouseEnter={() => setCarouselPaused(true)}
        onMouseLeave={() => setCarouselPaused(false)}
      >
        <div className="relative h-[430px] sm:h-[500px] lg:h-[540px] w-full overflow-hidden">
          <SlideInFrame className="w-full h-full" distancePx={72} durationMs={800}>
            <div
              className="flex h-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${slideIdx * 100}%)` }}
            >
              {slides.map((slide) => (
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
          </SlideInFrame>

          {/* Cinematic Gradient Scrim for Crisp Headline Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C]/90 via-[#10233D]/55 to-[#10233D]/15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/85 via-transparent to-transparent pointer-events-none" />

          {/* Left / Right Slide Arrows */}
          <button
            type="button"
            onClick={() => stepSlide(-1)}
            aria-label="Previous campus slide"
            className="hidden sm:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#10233D]/70 hover:bg-[#10233D] text-white border border-white/25 backdrop-blur-xs items-center justify-center transition-all hover:scale-105 z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => stepSlide(1)}
            aria-label="Next campus slide"
            className="hidden sm:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#10233D]/70 hover:bg-[#10233D] text-white border border-white/25 backdrop-blur-xs items-center justify-center transition-all hover:scale-105 z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Hero Copy & CTAs Positioned Over Photography */}
          <div className="absolute inset-0 z-10 flex items-end sm:items-center">
            <div className="max-w-7xl mx-auto w-full px-5 sm:px-14 pb-16 sm:pb-8">
              <div className="max-w-xl space-y-4">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#E8C587]">
                  Rainbow School · KG-1 through Grade 10 · Est. 1998
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white drop-shadow-xs">
                  Inspiring Young Scholars Every Day
                </h1>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => go(isStudent ? 'portal' : 'admissions')}
                    className="min-h-[46px] px-6 py-2.5 bg-[#8B1E2D] hover:bg-[#721623] text-white text-sm font-medium rounded-lg shadow-md hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>{isStudent ? 'Open Student Portal' : 'Apply for 2026–2027'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(isStudent ? 'academics' : 'portal')}
                    className="min-h-[46px] px-5 py-2.5 bg-white/15 hover:bg-white text-white hover:text-[#10233D] border border-white/35 backdrop-blur-xs text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0"
                  >
                    {isStudent
                      ? 'Browse Courses'
                      : user?.role === 'teacher'
                      ? 'Teacher Dashboard'
                      : 'Portal Login'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Campus Space Label + Slide Indicators */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0B192C]/65 backdrop-blur-sm border-t border-white/15">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-white truncate">
                <span className="font-mono text-[#E8C587] shrink-0">
                  {String(slideIdx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
                <span className="text-white/40" aria-hidden="true">·</span>
                <span className="font-medium truncate">{activeSlide.title}</span>
                <span className="hidden md:inline text-stone-300 truncate">
                  — {activeSlide.building}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSlideIdx(idx)}
                    aria-label={`View ${s.title}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === slideIdx
                        ? 'w-7 bg-[#E8C587]'
                        : 'w-2 bg-white/40 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Institutional Highlights Bar */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 tabular-nums">
          {[
            { icon: GraduationCap, value: 'KG-1 – Grade 10', label: '12 Grade Levels', color: '#8B1E2D' },
            { icon: Users, value: '25 Seats', label: 'Per Class Section', color: '#1E6B52' },
            { icon: MapPin, value: '18 Acres', label: 'Oakridge Campus', color: '#264B8A' },
            { icon: Award, value: '100% Pass', label: 'Grade 10 Board Record', color: '#C85A32' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3.5 px-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FBF9F5] border border-stone-200"
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-semibold text-[#10233D] leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-stone-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Four Academic Divisions — Visual School Showcase Cards */}
      <section className="py-12 md:py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B1E2D]">
                Our Learning Wings
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#10233D] mt-1">
                Kindergarten to 10th Grade
              </h2>
            </div>
            <button
              type="button"
              onClick={() => go('academics')}
              className="text-sm font-medium text-[#10233D] hover:text-[#8B1E2D] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GRADE_DIVISIONS.map((div, idx) => (
              <article
                key={div.id}
                onClick={() => {
                  if (onSelectDivision) onSelectDivision(div.id);
                  go('academics');
                }}
                className="group cursor-pointer bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#10233D]/35"
              >
                <div>
                  <div className="h-2 w-full" style={{ backgroundColor: div.accentHex }} />
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <SlideInFrame className="w-full h-full" delayMs={idx * 90}>
                      <ResilientImage
                        src={div.image}
                        alt={`${div.label} at Rainbow School`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        fallbackLabel={div.label}
                      />
                    </SlideInFrame>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10233D]/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3.5 text-xs font-medium text-white">
                      {div.focusTag}
                    </span>
                  </div>

                  <div className="p-5">
                    <p
                      className="text-xs font-mono font-semibold tabular-nums"
                      style={{ color: div.accentHex }}
                    >
                      {div.grades} · {div.ageRange}
                    </p>
                    <h3 className="font-serif text-2xl font-semibold text-[#10233D] mt-0.5 group-hover:text-[#8B1E2D] transition-colors">
                      {div.label}
                    </h3>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-stone-100 bg-[#FBF9F5] flex items-center justify-between text-xs">
                  <span className="text-stone-600 inline-flex items-center gap-1.5 tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {div.scheduleHours}
                  </span>
                  <span className="font-semibold text-[#8B1E2D] inline-flex items-center gap-1">
                    Courses
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Prominent Mission, Vision & Core Values Section */}
      <section className="py-14 md:py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B1E2D]">
                Our Guiding Purpose
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#10233D] mt-1">
                Mission, Vision &amp; Core Values
              </h2>
            </div>
            <button
              type="button"
              onClick={() => go('about')}
              className="text-sm font-medium text-[#10233D] hover:text-[#8B1E2D] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>School Heritage &amp; Charter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
            {/* Left Column: Mission & Vision Statement Card with Photography */}
            <article className="lg:col-span-5 bg-gradient-to-br from-[#10233D] via-[#132B4D] to-[#1D3B68] text-white rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between border border-[#1E3B62]">
              <div>
                <div className="grid grid-cols-4 h-2 w-full">
                  <div className="bg-[#C85A32]" />
                  <div className="bg-[#1E6B52]" />
                  <div className="bg-[#264B8A]" />
                  <div className="bg-[#8B1E2D]" />
                </div>

                <div className="relative aspect-[16/9] overflow-hidden bg-stone-900">
                  <SlideInFrame className="w-full h-full" distancePx={54}>
                    <ResilientImage
                      src={SCHOOL_IMAGES.humanitiesClassroom}
                      alt="Rainbow School seminar discussion in Humanities Hall"
                      className="w-full h-full object-cover"
                      fallbackLabel="Rainbow School Mission & Vision"
                    />
                  </SlideInFrame>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10233D] via-[#10233D]/25 to-transparent" />
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E8C587]">
                      Our Mission
                    </p>
                    <p className="font-serif text-xl sm:text-2xl font-medium leading-snug text-white">
                      Cultivating curious minds, compassionate hearts, and confident scholars from
                      Kindergarten through 10th Grade.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/15 space-y-1.5">
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E8C587]">
                      Our Vision
                    </p>
                    <p className="text-sm text-stone-200 leading-relaxed">
                      A vibrant 18-acre learning community where early Montessori wonder grows into
                      scientific mastery, creative voice, and lifelong integrity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-7 py-4 bg-[#0B192C]/55 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
                <span className="font-medium text-white">Dr. Catherine Sterling</span>
                <span className="font-mono text-[#E8C587]">Head of School · Est. 1998</span>
              </div>
            </article>

            {/* Right Column: 4 Core Values Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  num: '01',
                  title: 'Curiosity & Inquiry',
                  desc: 'Hands-on science labs, robotics makerspaces, and Socratic dialogue in small 25-seat classes.',
                  accent: '#264B8A',
                  softBg: '#EFF4FC',
                  icon: Lightbulb,
                  pillar: 'Academic Discovery',
                },
                {
                  num: '02',
                  title: 'Integrity & Character',
                  desc: 'Honesty, accountability, and civic stewardship practiced across classrooms and student houses.',
                  accent: '#8B1E2D',
                  softBg: '#FDF2F4',
                  icon: Compass,
                  pillar: 'Honor & Ethics',
                },
                {
                  num: '03',
                  title: 'Compassion & Belonging',
                  desc: 'Cross-grade mentorship pairing KG–10 scholars so every learner is known, valued, and heard.',
                  accent: '#1E6B52',
                  softBg: '#EFF8F4',
                  icon: HeartHandshake,
                  pillar: 'Inclusive Community',
                },
                {
                  num: '04',
                  title: 'Creativity & Vitality',
                  desc: 'Studio arts, chamber music, and 400m athletics balancing scholarly rigor with joyful growth.',
                  accent: '#C85A32',
                  softBg: '#FFF4EE',
                  icon: Palette,
                  pillar: 'Whole-Child Flourishing',
                },
              ].map((val) => {
                const Icon = val.icon;
                return (
                  <article
                    key={val.num}
                    className="group bg-[#FBF9F5] border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:bg-white"
                  >
                    <div>
                      <div className="h-1.5 w-full" style={{ backgroundColor: val.accent }} />
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center border border-stone-200/70 transition-transform duration-200 group-hover:scale-105"
                            style={{ backgroundColor: val.softBg }}
                          >
                            <Icon className="w-5 h-5" style={{ color: val.accent }} />
                          </div>
                          <span
                            className="font-mono text-sm font-semibold tabular-nums"
                            style={{ color: val.accent }}
                          >
                            {val.num}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="font-serif text-2xl font-semibold text-[#10233D] group-hover:text-[#8B1E2D] transition-colors">
                            {val.title}
                          </h3>
                          <p className="text-sm text-[#44403C] leading-relaxed">{val.desc}</p>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-3 border-t border-stone-200/70 bg-white/80 flex items-center justify-between text-xs text-stone-500">
                      <span>Core Pillar</span>
                      <span className="font-medium text-[#10233D]">{val.pillar}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Role-Aware Campus Life Photography Grid */}
      <section className="py-12 md:py-16 bg-[#F3EFE6]/65 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B1E2D]">
                {isStudent ? 'Campus Life' : 'Visit Rainbow School'}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#10233D] mt-1">
                {isStudent ? 'Your Daily Campus Resources' : 'Experience Campus in Person'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => go(isStudent ? 'about' : 'admissions')}
              className="text-sm font-medium text-[#10233D] hover:text-[#8B1E2D] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>{isStudent ? 'Full Calendar & Gallery' : 'Book a Campus Visit'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campusHighlights.map((item, idx) => (
              <button
                key={item.title}
                type="button"
                onClick={item.action}
                className="group text-left bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: item.accent }} />
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <SlideInFrame className="w-full h-full" delayMs={idx * 100}>
                    <ResilientImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      fallbackLabel={item.title}
                    />
                  </SlideInFrame>
                </div>
                <div className="p-5 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#10233D] group-hover:text-[#8B1E2D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">{item.subtitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8B1E2D] shrink-0 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sports & Athletics Visual Banner */}
      <section className="py-12 md:py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <SlideInFrame distancePx={56}>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-stone-200 shadow-lg group">
                <ResilientImage
                  src={SCHOOL_IMAGES.athleticsField}
                  alt="Rainbow School 400m Olympic track and soccer stadium"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  fallbackLabel="Rainbow School Athletics Complex"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10233D]/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#E8C587]">
                    Athletic Complex · 400m Track &amp; 25m Pool
                  </p>
                  <p className="font-serif text-2xl font-semibold">Rainbow Varsity Athletics</p>
                </div>
                <button
                  type="button"
                  onClick={() => go('sports')}
                  className="min-h-[40px] px-4 py-2 bg-[#8B1E2D] hover:bg-[#10233D] text-white text-xs font-medium rounded-lg transition-colors shrink-0"
                >
                  Explore Sports
                </button>
              </div>
              </div>
            </SlideInFrame>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            {SPORTS_PROGRAMS.map((sport, sIdx) => {
              const stripColors = ['#C85A32', '#1E6B52', '#264B8A', '#8B1E2D', '#B45309', '#0F766E'];
              const accent = stripColors[sIdx % stripColors.length];
              return (
                <button
                  key={sport.id}
                  type="button"
                  onClick={() => go('sports')}
                  className="text-left bg-white border border-stone-200 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="h-1 w-full" style={{ backgroundColor: accent }} />
                  <div className="p-3.5">
                    <div className="flex items-center gap-2 text-[#10233D] font-semibold text-xs sm:text-sm">
                      <Trophy className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                      <span className="truncate">{sport.name}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 tabular-nums truncate">
                      {sport.grades} · {sport.season}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links: Official Certificates, Campus Map & Social */}
      <section className="py-12 md:py-16 bg-[#F3EFE6]/55">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article className="group bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="h-1.5 w-full bg-[#B08D57]" />
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-semibold text-[#10233D]">
                    Accreditations
                  </h3>
                  <Award className="w-5 h-5 text-[#8B1E2D]" />
                </div>
                <ul className="text-xs text-stone-600 space-y-2 pt-1">
                  {SCHOOL_CERTIFICATES.slice(0, 3).map((c) => (
                    <li key={c.id} className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1E6B52] shrink-0" />
                      <span className="truncate">{c.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="px-6 py-3.5 bg-[#FBF9F5] border-t border-stone-100">
              <button
                type="button"
                onClick={() => go('about')}
                className="text-sm font-semibold text-[#8B1E2D] hover:text-[#10233D] inline-flex items-center gap-1.5"
              >
                <span>Gallery &amp; Certificates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>

          <article className="group bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="h-1.5 w-full bg-[#1E6B52]" />
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-semibold text-[#10233D]">
                    Campus &amp; Transit
                  </h3>
                  <MapPin className="w-5 h-5 text-[#1E6B52]" />
                </div>
                <div className="text-xs text-stone-600 space-y-1.5 pt-1">
                  <p className="font-semibold text-[#10233D]">742 Crestview Meadow Lane</p>
                  <p>14 GPS Bus Routes · Visitor Gate B</p>
                  <p className="tabular-nums font-mono text-stone-500">
                    Mon–Fri 7:30 AM – 5:00 PM
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-3.5 bg-[#FBF9F5] border-t border-stone-100">
              <button
                type="button"
                onClick={() => go('location')}
                className="text-sm font-semibold text-[#1E6B52] hover:text-[#10233D] inline-flex items-center gap-1.5"
              >
                <span>Open Campus Map</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>

          <article className="bg-gradient-to-br from-[#10233D] via-[#132B4D] to-[#1D3B68] text-white rounded-2xl overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-[#1E3B62]">
            <div>
              <div className="grid grid-cols-4 h-1.5 w-full">
                <div className="bg-[#C85A32]" />
                <div className="bg-[#1E6B52]" />
                <div className="bg-[#264B8A]" />
                <div className="bg-[#8B1E2D]" />
              </div>
              <div className="p-6 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-semibold">Rainbow Community</h3>
                  <Calendar className="w-4 h-4 text-[#E8C587]" />
                </div>
                <p className="text-xs text-stone-300">
                  Student art, science fairs &amp; match highlights
                </p>
              </div>
            </div>
            <div className="px-6 pb-6 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onOpenSocialModal('facebook')}
                className="min-h-[44px] px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FacebookIcon className="w-4 h-4 text-[#60A5FA]" />
                <span>Facebook</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenSocialModal('instagram')}
                className="min-h-[44px] px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#F472B6]" />
                <span>Instagram</span>
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
