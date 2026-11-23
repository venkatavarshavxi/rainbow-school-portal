import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
  X,
} from 'lucide-react';
import {
  COURSES_CATALOG,
  CourseItem,
  DivisionId,
  GRADE_DIVISIONS,
} from '../data/schoolData';
import { useSchool } from '../context/SchoolContext';
import { ResilientImage } from './ResilientImage';
import { SlideInFrame } from './SlideInFrame';

interface AcademicsPageProps {
  initialDivision?: string;
  onGoToPortal: () => void;
}

const DIVISION_THEME: Record<
  DivisionId,
  {
    topBar: string;
    softHeader: string;
    accentText: string;
    hoverBorder: string;
    hoverTint: string;
    btnBg: string;
  }
> = {
  kindergarten: {
    topBar: 'bg-[#C85A32]',
    softHeader: 'bg-[#FFF4EE]',
    accentText: 'text-[#A8431F]',
    hoverBorder: 'hover:border-[#C85A32]/60',
    hoverTint: 'hover:bg-[#FFF9F6]',
    btnBg: 'hover:bg-[#C85A32] hover:text-white hover:border-[#C85A32]',
  },
  primary: {
    topBar: 'bg-[#1E6B52]',
    softHeader: 'bg-[#EFF8F4]',
    accentText: 'text-[#165440]',
    hoverBorder: 'hover:border-[#1E6B52]/60',
    hoverTint: 'hover:bg-[#F5FBF8]',
    btnBg: 'hover:bg-[#1E6B52] hover:text-white hover:border-[#1E6B52]',
  },
  middle: {
    topBar: 'bg-[#264B8A]',
    softHeader: 'bg-[#EFF4FC]',
    accentText: 'text-[#1D3B6F]',
    hoverBorder: 'hover:border-[#264B8A]/60',
    hoverTint: 'hover:bg-[#F5F8FE]',
    btnBg: 'hover:bg-[#264B8A] hover:text-white hover:border-[#264B8A]',
  },
  high: {
    topBar: 'bg-[#8B1E2D]',
    softHeader: 'bg-[#FDF2F4]',
    accentText: 'text-[#8B1E2D]',
    hoverBorder: 'hover:border-[#8B1E2D]/60',
    hoverTint: 'hover:bg-[#FFF7F8]',
    btnBg: 'hover:bg-[#8B1E2D] hover:text-white hover:border-[#8B1E2D]',
  },
};

export const AcademicsPage: React.FC<AcademicsPageProps> = ({
  initialDivision = 'all',
  onGoToPortal,
}) => {
  const { user, enrolledCourseCodes, toggleCourseEnrollment } = useSchool();
  const [selectedDivision, setSelectedDivision] = useState<'all' | DivisionId>(
    initialDivision === 'kindergarten' ||
      initialDivision === 'primary' ||
      initialDivision === 'middle' ||
      initialDivision === 'high'
      ? initialDivision
      : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectCourse, setInspectCourse] = useState<CourseItem | null>(null);
  const [divSlideIdx, setDivSlideIdx] = useState(0);
  const [divPaused, setDivPaused] = useState(false);

  useEffect(() => {
    if (
      initialDivision === 'kindergarten' ||
      initialDivision === 'primary' ||
      initialDivision === 'middle' ||
      initialDivision === 'high' ||
      initialDivision === 'all'
    ) {
      setSelectedDivision(initialDivision);
    }
  }, [initialDivision]);

  useEffect(() => {
    if (divPaused) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setDivSlideIdx((prev) => (prev + 1) % GRADE_DIVISIONS.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [divPaused]);

  const stepDivSlide = (delta: number) => {
    setDivSlideIdx((prev) => (prev + delta + GRADE_DIVISIONS.length) % GRADE_DIVISIONS.length);
  };

  const filteredCourses = COURSES_CATALOG.filter((course) => {
    const matchesDiv = selectedDivision === 'all' || course.division === selectedDivision;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      course.title.toLowerCase().includes(q) ||
      course.department.toLowerCase().includes(q) ||
      course.code.toLowerCase().includes(q) ||
      course.grades.toLowerCase().includes(q);
    return matchesDiv && matchesSearch;
  });

  const activeStage = GRADE_DIVISIONS[divSlideIdx];

  return (
    <div className="bg-[#FBF9F5]">
      {/* Masthead with Sliding 4-Stage Learning Wings Carousel */}
      <section className="bg-[#10233D] text-white border-b border-[#1E3B62]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3.5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#E8C587]">
              Curriculum &amp; Courses · KG-1 to Grade 10
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight">
              Structured Mastery Across Every Stage
            </h1>
            <p className="text-base text-stone-200 leading-relaxed max-w-xl">
              Four progressive wings—Kindergarten, Primary, Middle, and Secondary—capped at 25
              students per section.
            </p>
          </div>

          <div
            className="lg:col-span-6"
            onMouseEnter={() => setDivPaused(true)}
            onMouseLeave={() => setDivPaused(false)}
          >
            <SlideInFrame distancePx={60} durationMs={760}>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-stone-900">
              <div
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${divSlideIdx * 100}%)` }}
              >
                {GRADE_DIVISIONS.map((stage) => (
                  <div key={stage.id} className="w-full h-full shrink-0 relative">
                    <ResilientImage
                      src={stage.image}
                      alt={`${stage.label} classroom at Rainbow School`}
                      className="w-full h-full object-cover"
                      fallbackLabel={stage.label}
                    />
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#10233D]/85 via-transparent to-transparent pointer-events-none" />

              <button
                type="button"
                onClick={() => stepDivSlide(-1)}
                aria-label="Previous academic division slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#10233D]/70 hover:bg-[#10233D] text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => stepDivSlide(1)}
                aria-label="Next academic division slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#10233D]/70 hover:bg-[#10233D] text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#E8C587]">
                    {activeStage.grades} · {activeStage.scheduleHours}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedDivision(activeStage.id)}
                    className="font-serif text-lg sm:text-xl font-semibold text-white hover:text-[#E8C587] text-left transition-colors"
                  >
                    {activeStage.label} — {activeStage.focusTag}
                  </button>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 pb-1">
                  {GRADE_DIVISIONS.map((stage, idx) => (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setDivSlideIdx(idx)}
                      aria-label={`View ${stage.label}`}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === divSlideIdx ? 'w-6 bg-[#E8C587]' : 'w-1.5 bg-white/45'
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

      {/* Vibrant Division Overview Strip */}
      <section className="py-10 bg-[#F3EFE6]/70 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GRADE_DIVISIONS.map((div) => {
            const active = selectedDivision === div.id;
            const theme = DIVISION_THEME[div.id];
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => setSelectedDivision(active ? 'all' : div.id)}
                className={`group text-left rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  active
                    ? 'bg-[#10233D] text-white border-[#10233D] shadow-md'
                    : `bg-white text-[#10233D] border-stone-200 ${theme.hoverBorder}`
                }`}
              >
                <div className={`h-2 w-full ${theme.topBar}`} />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-xs font-mono font-medium tabular-nums ${
                        active ? 'text-[#E8C587]' : theme.accentText
                      }`}
                    >
                      {div.grades} · {div.ageRange}
                    </p>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        active ? 'text-[#E8C587]' : 'text-stone-400 group-hover:text-[#10233D]'
                      }`}
                    />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold mt-1.5">{div.label}</h2>
                  <p
                    className={`text-xs mt-2 leading-relaxed ${
                      active ? 'text-stone-200' : 'text-stone-600'
                    }`}
                  >
                    {div.classSize}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter Toolbar & Vibrant Course Catalog */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F3EFE6] rounded-lg">
              {[
                { id: 'all' as const, label: 'All Grades (KG–10)' },
                { id: 'kindergarten' as const, label: 'Kindergarten' },
                { id: 'primary' as const, label: 'Grades 1–4' },
                { id: 'middle' as const, label: 'Grades 5–7' },
                { id: 'high' as const, label: 'Grades 8–10' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedDivision(tab.id)}
                  className={`min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap shrink-0 ${
                    selectedDivision === tab.id
                      ? 'bg-[#10233D] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-white hover:text-[#10233D]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses or grades..."
                aria-label="Search courses"
                className="w-full min-h-[42px] pl-10 pr-4 py-2 bg-white border border-stone-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#10233D]"
              />
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="p-12 bg-white border border-stone-200 rounded-lg text-center space-y-3">
              <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="font-serif text-xl text-[#10233D]">No courses match your filter.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDivision('all');
                  setSearchQuery('');
                }}
                className="text-sm font-medium text-[#8B1E2D] underline"
              >
                Reset course filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const isEnrolled = enrolledCourseCodes.includes(course.code);
                const theme = DIVISION_THEME[course.division];
                return (
                  <article
                    key={course.id}
                    className={`group bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${theme.hoverBorder} ${theme.hoverTint}`}
                  >
                    <div>
                      {/* Vibrant Color Band */}
                      <div className={`h-1.5 w-full ${theme.topBar}`} />

                      {/* Tinted Course Header Strip */}
                      <div className={`${theme.softHeader} px-6 py-4 border-b border-stone-200/70`}>
                        <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                          <span className={`font-semibold ${theme.accentText}`}>
                            {course.code} · {course.grades}
                          </span>
                          <span className="text-stone-600">{course.weeklyHours} hrs/wk</span>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold text-[#10233D] leading-snug mt-2 group-hover:text-[#8B1E2D] transition-colors">
                          {course.title}
                        </h3>
                      </div>

                      <div className="px-6 pt-4 pb-2 space-y-2.5">
                        <p className={`text-xs font-medium ${theme.accentText}`}>
                          {course.department} · {course.facultyLead}
                        </p>
                        <p className="text-sm text-[#44403C] leading-relaxed line-clamp-2">
                          {course.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 py-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setInspectCourse(course)}
                        className={`min-h-[40px] px-4 py-2 border border-stone-300 bg-white rounded-md text-xs font-medium text-[#10233D] transition-all duration-150 ${theme.btnBg}`}
                      >
                        View Syllabus
                      </button>

                      {user?.role === 'student' ? (
                        <button
                          type="button"
                          onClick={() => toggleCourseEnrollment(course.code)}
                          className={`min-h-[40px] px-3.5 py-2 rounded-md text-xs font-medium inline-flex items-center gap-1.5 transition-all duration-150 ${
                            isEnrolled
                              ? 'bg-[#14532D]/10 text-[#14532D] border border-[#14532D]/30'
                              : 'bg-[#10233D] text-white hover:bg-[#8B1E2D]'
                          }`}
                        >
                          {isEnrolled ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Enrolled</span>
                            </>
                          ) : (
                            <span>Add to Schedule</span>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={onGoToPortal}
                          className="text-xs font-medium text-stone-600 hover:text-[#8B1E2D] underline underline-offset-4 transition-colors"
                        >
                          {user?.role === 'teacher' ? 'Faculty Dashboard' : 'Portal Login'}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Course Syllabus Inspection Modal */}
      {inspectCourse && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Syllabus for ${inspectCourse.title}`}
        >
          <div className="bg-[#FBF9F5] border border-stone-200 rounded-xl max-w-lg w-full overflow-hidden shadow-xl">
            <div className={`h-2 w-full ${DIVISION_THEME[inspectCourse.division].topBar}`} />
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-[#8B1E2D] tabular-nums">
                    {inspectCourse.code} · {inspectCourse.grades}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#10233D] mt-1">
                    {inspectCourse.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectCourse(null)}
                  aria-label="Close syllabus"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-stone-200/70 text-stone-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 border-y border-stone-200 py-3">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#10233D]" />
                  {inspectCourse.weeklyHours} Instructional Hours / Week
                </span>
                <span>Faculty Lead: {inspectCourse.facultyLead}</span>
              </div>

              <p className="text-sm text-[#44403C] leading-relaxed">{inspectCourse.summary}</p>

              <div>
                <p className="text-xs uppercase tracking-wider font-medium text-stone-500 mb-2">
                  Key Syllabus Modules
                </p>
                <ul className="space-y-2 text-sm text-[#10233D]">
                  {inspectCourse.syllabusHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#8B1E2D] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setInspectCourse(null)}
                  className="min-h-[44px] px-5 py-2 bg-[#10233D] hover:bg-[#8B1E2D] text-white text-sm font-medium rounded-md transition-colors"
                >
                  Close Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
