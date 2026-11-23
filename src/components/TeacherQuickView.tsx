import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CalendarClock,
  Clock,
  MapPin,
  Megaphone,
  Plus,
  Sparkles,
} from 'lucide-react';
import { AuthUser } from '../context/SchoolContext';
import {
  ALL_GRADES,
  SchoolNotice,
  TEACHERS_DIRECTORY,
} from '../data/schoolData';

interface ScheduleSlot {
  id: string;
  time: string;
  title: string;
  gradeLabel: string;
  filterGrade?: string;
  room: string;
  accentHex: string;
  isCurrent?: boolean;
}

function buildFacultySchedule(user: AuthUser): ScheduleSlot[] {
  const teacher = TEACHERS_DIRECTORY.find((t) => t.id === user.identifier);
  const dept = (teacher?.department || user.gradeOrDept || '').toLowerCase();
  const assigned = teacher?.assignedGrades || '';

  if (dept.includes('kindergarten')) {
    return [
      {
        id: 'sch-1',
        time: '08:15 – 09:15',
        title: 'Morning Circle & Phonics Discovery',
        gradeLabel: 'KG-1',
        filterGrade: 'KG-1',
        room: 'Studio 02A · Sunlit Wing',
        accentHex: '#C85A32',
        isCurrent: true,
      },
      {
        id: 'sch-2',
        time: '09:30 – 10:30',
        title: 'Montessori Bead Numeracy Lab',
        gradeLabel: 'KG-2',
        filterGrade: 'KG-2',
        room: 'Studio 02B · Sensory Wing',
        accentHex: '#1E6B52',
      },
      {
        id: 'sch-3',
        time: '11:00 – 12:00',
        title: 'Botanical Courtyard Observation',
        gradeLabel: 'KG-1 & KG-2',
        filterGrade: 'KG-1',
        room: 'Sensory Garden',
        accentHex: '#264B8A',
      },
      {
        id: 'sch-4',
        time: '12:30 – 13:30',
        title: 'Parent Narrative Notes & Dismissal',
        gradeLabel: 'Early Childhood',
        room: 'Early Childhood Office',
        accentHex: '#8B1E2D',
      },
    ];
  }

  if (dept.includes('sports') || dept.includes('athletics')) {
    return [
      {
        id: 'sch-1',
        time: '08:15 – 09:15',
        title: 'Aquatics & Water Safety Conditioning',
        gradeLabel: 'Grade 4',
        filterGrade: 'Grade 4',
        room: '25m Indoor Aquatics Center',
        accentHex: '#1E6B52',
        isCurrent: true,
      },
      {
        id: 'sch-2',
        time: '10:00 – 11:00',
        title: 'Physical Education & Track Sprints',
        gradeLabel: 'Grade 7',
        filterGrade: 'Grade 7',
        room: '400m Olympic Track',
        accentHex: '#C85A32',
      },
      {
        id: 'sch-3',
        time: '13:30 – 14:30',
        title: 'Varsity Tactical Film & Match Prep',
        gradeLabel: 'Grade 10',
        filterGrade: 'Grade 10',
        room: 'Athletic Pavilion',
        accentHex: '#264B8A',
      },
      {
        id: 'sch-4',
        time: '15:45 – 17:15',
        title: 'After-School Squad Trials & Practice',
        gradeLabel: 'Grades 5–10',
        filterGrade: 'Grade 9',
        room: 'Crestview Turf Stadium',
        accentHex: '#8B1E2D',
      },
    ];
  }

  if (dept.includes('primary')) {
    return [
      {
        id: 'sch-1',
        time: '08:00 – 09:00',
        title: 'Primary Literacy & Grammar Seminar',
        gradeLabel: 'Grade 2',
        filterGrade: 'Grade 2',
        room: 'Wing 02 · Room 104',
        accentHex: '#1E6B52',
        isCurrent: true,
      },
      {
        id: 'sch-2',
        time: '09:15 – 10:15',
        title: 'Singapore Bar-Model Mathematics',
        gradeLabel: 'Grade 3',
        filterGrade: 'Grade 3',
        room: 'Wing 02 · Room 106',
        accentHex: '#264B8A',
      },
      {
        id: 'sch-3',
        time: '11:00 – 12:00',
        title: 'Earth Science & Ecosystem Inquiry',
        gradeLabel: 'Grade 4',
        filterGrade: 'Grade 4',
        room: 'Primary Discovery Lab',
        accentHex: '#C85A32',
      },
      {
        id: 'sch-4',
        time: '13:30 – 14:45',
        title: 'Guided Reading & Parent Office Hours',
        gradeLabel: 'Grades 1–4',
        filterGrade: 'Grade 1',
        room: 'Vance Reading Alcove',
        accentHex: '#8B1E2D',
      },
    ];
  }

  if (dept.includes('mathematics')) {
    return [
      {
        id: 'sch-1',
        time: '08:00 – 09:00',
        title: 'Pre-Algebra & Linear Foundations',
        gradeLabel: assigned.includes('5–7') ? 'Grade 6' : 'Grade 8',
        filterGrade: assigned.includes('5–7') ? 'Grade 6' : 'Grade 8',
        room: 'Heritage Hall · Room 204',
        accentHex: '#264B8A',
        isCurrent: true,
      },
      {
        id: 'sch-2',
        time: '09:15 – 10:15',
        title: 'Euclidean Proofs & Analytic Geometry',
        gradeLabel: assigned.includes('5–7') ? 'Grade 7' : 'Grade 9',
        filterGrade: assigned.includes('5–7') ? 'Grade 7' : 'Grade 9',
        room: 'Heritage Hall · Room 204',
        accentHex: '#1E6B52',
      },
      {
        id: 'sch-3',
        time: '11:00 – 12:00',
        title: 'Board Mathematics & Trigonometry',
        gradeLabel: 'Grade 10',
        filterGrade: 'Grade 10',
        room: 'Heritage Hall · Room 208',
        accentHex: '#8B1E2D',
      },
      {
        id: 'sch-4',
        time: '14:00 – 15:00',
        title: 'Math Olympiad Coaching Hour',
        gradeLabel: 'Grades 6–10',
        filterGrade: 'Grade 9',
        room: 'Vance Study Pavilion',
        accentHex: '#C85A32',
      },
    ];
  }

  return [
    {
      id: 'sch-1',
      time: '08:00 – 09:00',
      title: 'Laboratory Seminar & Practical Prep',
      gradeLabel: 'Grade 8',
      filterGrade: 'Grade 8',
      room: 'Vance Science Lab 202',
      accentHex: '#1E6B52',
      isCurrent: true,
    },
    {
      id: 'sch-2',
      time: '09:15 – 10:15',
      title: 'Honors Physics & Optics Practicum',
      gradeLabel: 'Grade 9',
      filterGrade: 'Grade 9',
      room: 'Vance Physics Studio',
      accentHex: '#264B8A',
    },
    {
      id: 'sch-3',
      time: '10:45 – 11:45',
      title: 'Board Science & Research Colloquium',
      gradeLabel: 'Grade 10',
      filterGrade: 'Grade 10',
      room: 'Heritage Seminar Room 108',
      accentHex: '#8B1E2D',
    },
    {
      id: 'sch-4',
      time: '13:45 – 14:45',
      title: 'STEM Makerspace Mentorship & Review',
      gradeLabel: 'Grade 6',
      filterGrade: 'Grade 6',
      room: 'Robotics Makerspace',
      accentHex: '#C85A32',
    },
  ];
}

const AUDIENCE_COLOR: Record<SchoolNotice['audience'], { dot: string; text: string; softBg: string }> = {
  'All School': { dot: '#264B8A', text: '#1D3B6F', softBg: '#EFF4FC' },
  'Kindergarten–Grade 4': { dot: '#C85A32', text: '#A8431F', softBg: '#FFF4EE' },
  'Grades 5–10': { dot: '#8B1E2D', text: '#8B1E2D', softBg: '#FDF2F4' },
  Athletics: { dot: '#1E6B52', text: '#165440', softBg: '#EFF8F4' },
};

interface TeacherQuickViewProps {
  user: AuthUser;
  notices: SchoolNotice[];
  onSelectGradeForRoster: (grade: string) => void;
  onJumpToPublishNotice: () => void;
}

export const TeacherQuickView: React.FC<TeacherQuickViewProps> = ({
  user,
  notices,
  onSelectGradeForRoster,
  onJumpToPublishNotice,
}) => {
  const [noticeFilter, setNoticeFilter] = useState<'All' | SchoolNotice['audience']>('All');
  const scheduleSlots = useMemo(() => buildFacultySchedule(user), [user]);

  const todayFormatted = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      }),
    [],
  );

  const visibleNotices = useMemo(() => {
    const filtered =
      noticeFilter === 'All'
        ? notices
        : notices.filter((n) => n.audience === noticeFilter);
    return filtered.slice(0, 4);
  }, [notices, noticeFilter]);

  return (
    <section aria-label="Teacher Quick-View" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8B1E2D]" />
          <h2 className="font-serif text-2xl font-semibold text-[#10233D]">
            Teacher Quick-View
          </h2>
          <span className="text-xs text-stone-500 hidden sm:inline">
            · Today’s teaching blocks &amp; classroom announcements at a glance
          </span>
        </div>
        <span className="text-xs font-mono text-stone-500 tabular-nums">
          {todayFormatted} · {user.gradeOrDept}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Card 1: Today's Teaching Schedule */}
        <div className="lg:col-span-6 bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-[0_10px_30px_-12px_rgba(16,35,61,0.12)] hover:shadow-[0_16px_38px_-12px_rgba(16,35,61,0.16)] transition-shadow duration-200 flex flex-col justify-between">
          <div>
            <div className="grid grid-cols-4 h-1.5 w-full">
              <div className="bg-[#C85A32]" />
              <div className="bg-[#1E6B52]" />
              <div className="bg-[#264B8A]" />
              <div className="bg-[#8B1E2D]" />
            </div>

            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between gap-3 bg-[#FBF9F5]/70">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EFF4FC] border border-[#264B8A]/20 flex items-center justify-center shrink-0">
                  <CalendarClock className="w-4 h-4 text-[#264B8A]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#10233D] leading-tight">
                    Today’s Schedule
                  </h3>
                  <p className="text-[11px] text-stone-500 tabular-nums">
                    {scheduleSlots.length} scheduled faculty sessions
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-medium text-[#1E6B52] bg-[#EFF8F4] border border-[#1E6B52]/20 px-2.5 py-1 rounded-md">
                On Campus
              </span>
            </div>

            <div className="p-4 sm:p-5 space-y-2.5">
              {scheduleSlots.map((slot) => {
                const validGrade =
                  slot.filterGrade && (ALL_GRADES as readonly string[]).includes(slot.filterGrade);
                return (
                  <div
                    key={slot.id}
                    className={`group rounded-xl border p-3.5 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      slot.isCurrent
                        ? 'bg-[#FBF9F5] border-[#10233D]/30 shadow-2xs'
                        : 'bg-white border-stone-200/80 hover:border-[#10233D]/30 hover:bg-[#FBF9F5]/50'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span
                        className="w-1.5 self-stretch rounded-full shrink-0 mt-0.5 mb-0.5"
                        style={{ backgroundColor: slot.accentHex }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tabular-nums">
                          <span className="font-semibold text-[#10233D] inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-stone-400" />
                            {slot.time}
                          </span>
                          {slot.isCurrent && (
                            <span className="text-[#8B1E2D] font-semibold">· Next Session</span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-[#10233D] truncate">
                          {slot.title}
                        </p>
                        <p className="text-xs text-stone-500 flex items-center gap-1.5 truncate">
                          <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                          <span className="truncate">{slot.room}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pl-4 sm:pl-0">
                      <span
                        className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md border border-stone-200 bg-white text-[#10233D] whitespace-nowrap"
                      >
                        {slot.gradeLabel}
                      </span>
                      {validGrade && slot.filterGrade && (
                        <button
                          type="button"
                          onClick={() => onSelectGradeForRoster(slot.filterGrade!)}
                          title={`Open ${slot.filterGrade} roster`}
                          className="min-h-[34px] px-2.5 py-1 rounded-md bg-[#10233D] hover:bg-[#8B1E2D] text-white text-[11px] font-medium inline-flex items-center gap-1 transition-colors whitespace-nowrap"
                        >
                          <span>Roster</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 2: Upcoming Classroom Announcements */}
        <div className="lg:col-span-6 bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-[0_10px_30px_-12px_rgba(16,35,61,0.12)] hover:shadow-[0_16px_38px_-12px_rgba(16,35,61,0.16)] transition-shadow duration-200 flex flex-col justify-between">
          <div>
            <div className="h-1.5 w-full bg-[#8B1E2D]" />

            <div className="px-6 py-4 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3 bg-[#FBF9F5]/70">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FDF2F4] border border-[#8B1E2D]/20 flex items-center justify-center shrink-0">
                  <Megaphone className="w-4 h-4 text-[#8B1E2D]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#10233D] leading-tight">
                    Upcoming Classroom Announcements
                  </h3>
                  <p className="text-[11px] text-stone-500 tabular-nums">
                    {notices.length} active bulletin{notices.length === 1 ? '' : 's'} synced with Student Portal
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onJumpToPublishNotice}
                className="min-h-[36px] px-3 py-1.5 bg-[#8B1E2D] hover:bg-[#10233D] text-white text-xs font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Post</span>
              </button>
            </div>

            {/* Quick Audience Filter Strip */}
            <div className="px-5 pt-3.5 flex flex-wrap items-center gap-1.5">
              {(['All', 'All School', 'Grades 5–10', 'Kindergarten–Grade 4', 'Athletics'] as const).map(
                (aud) => (
                  <button
                    key={aud}
                    type="button"
                    onClick={() => setNoticeFilter(aud)}
                    className={`min-h-[30px] px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap ${
                      noticeFilter === aud
                        ? 'bg-[#10233D] text-white'
                        : 'bg-[#F3EFE6]/70 text-stone-600 hover:bg-[#F3EFE6] hover:text-[#10233D]'
                    }`}
                  >
                    {aud === 'Kindergarten–Grade 4' ? 'KG–Grade 4' : aud}
                  </button>
                ),
              )}
            </div>

            <div className="p-4 sm:p-5 space-y-2.5">
              {visibleNotices.length === 0 ? (
                <div className="p-6 text-center bg-[#FBF9F5] border border-stone-200/80 rounded-xl space-y-2">
                  <p className="text-sm font-medium text-[#10233D]">
                    No announcements for {noticeFilter}
                  </p>
                  <button
                    type="button"
                    onClick={onJumpToPublishNotice}
                    className="text-xs font-medium text-[#8B1E2D] underline underline-offset-4"
                  >
                    Post a new classroom notice
                  </button>
                </div>
              ) : (
                visibleNotices.map((notice) => {
                  const styleMeta = AUDIENCE_COLOR[notice.audience] || AUDIENCE_COLOR['All School'];
                  return (
                    <article
                      key={notice.id}
                      className="rounded-xl border border-stone-200/80 bg-[#FBF9F5]/60 hover:bg-white hover:border-[#10233D]/25 hover:shadow-xs p-3.5 transition-all duration-150 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span
                          className="font-semibold inline-flex items-center gap-1.5"
                          style={{ color: styleMeta.text }}
                        >
                          <span
                            className="w-2 h-2 rounded-xs shrink-0"
                            style={{ backgroundColor: styleMeta.dot }}
                            aria-hidden="true"
                          />
                          {notice.audience}
                        </span>
                        <span className="font-mono text-stone-400 tabular-nums">{notice.date}</span>
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-[#10233D] leading-snug">
                        {notice.title}
                      </h4>
                      <p className="text-xs text-[#44403C] leading-relaxed line-clamp-2">
                        {notice.body}
                      </p>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
