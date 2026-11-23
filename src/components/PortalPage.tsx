import React, { useState } from 'react';
import {
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  EyeOff,
  Fingerprint,
  GraduationCap,
  KeyRound,
  LogOut,
  Mail,
  Search,
  Send,
  Trophy,
  Users,
} from 'lucide-react';
import {
  ALL_GRADES,
  COURSES_CATALOG,
  DivisionId,
  SCHOOL_EMAILS,
  SPORTS_PROGRAMS,
  TEACHERS_DIRECTORY,
  TeacherProfile,
} from '../data/schoolData';
import { UserRole, useSchool } from '../context/SchoolContext';
import { RainbowLogo } from './RainbowLogo';
import { TeacherQuickView } from './TeacherQuickView';

export const PortalPage: React.FC = () => {
  const {
    user,
    loginAs,
    logout,
    assignments,
    submitStudentAssignment,
    enrolledCourseCodes,
    toggleCourseEnrollment,
    toggleStudentSport,
    notices,
    publishNotice,
    roster,
    updateRosterGrade,
    applications,
    updateApplicationStatus,
    visits,
    schoolMail,
    sendSchoolMail,
  } = useSchool();

  // Login Form & Directory Search State
  const [loginRole, setLoginRole] = useState<UserRole>('teacher');
  const [teacherSearch, setTeacherSearch] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfile>(TEACHERS_DIRECTORY[1]); // Dr. Elena Vance default
  const [studentSearch, setStudentSearch] = useState('');
  const [studentLoginGradeFilter, setStudentLoginGradeFilter] = useState<string>('All');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('STU-09-001');

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [biometricScanning, setBiometricScanning] = useState(false);

  // Dashboard Tabs
  const [studentTab, setStudentTab] = useState<'overview' | 'assignments' | 'courses' | 'mail' | 'notices'>('overview');
  const [teacherTab, setTeacherTab] = useState<'roster' | 'admissions' | 'mail' | 'notices'>('roster');
  const [gradeFilter, setGradeFilter] = useState<string>('Grade 10');
  const [rosterSearch, setRosterSearch] = useState('');

  // Publish Notice State (Teacher)
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeAudience, setNoticeAudience] = useState<'All School' | 'Kindergarten–Grade 4' | 'Grades 5–10' | 'Athletics'>('All School');
  const [noticeBody, setNoticeBody] = useState('');
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  // School Mail Compose State
  const [mailTo, setMailTo] = useState<string>(SCHOOL_EMAILS.general);
  const [mailSubject, setMailSubject] = useState('');
  const [mailBody, setMailBody] = useState('');
  const [mailSentOk, setMailSentOk] = useState(false);

  const selectedStudent = roster.find((s) => s.id === selectedStudentId) || roster[0];

  const filteredTeachers = TEACHERS_DIRECTORY.filter((t) => {
    const q = teacherSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      t.name.toLowerCase().includes(q) ||
      t.department.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.assignedGrades.toLowerCase().includes(q)
    );
  });

  const filteredLoginStudents = roster.filter((s) => {
    const matchesGrade = studentLoginGradeFilter === 'All' || s.grade === studentLoginGradeFilter;
    const q = studentSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.rollNo.toLowerCase().includes(q) ||
      s.grade.toLowerCase().includes(q);
    return matchesGrade && matchesSearch;
  });

  const completeRoleLogin = (role: UserRole) => {
    if (role === 'teacher') {
      loginAs({
        role: 'teacher',
        name: selectedTeacher.name,
        identifier: selectedTeacher.id,
        email: selectedTeacher.email,
        gradeOrDept: `${selectedTeacher.department} (${selectedTeacher.assignedGrades})`,
      });
    } else {
      loginAs({
        role: 'student',
        name: selectedStudent.name,
        identifier: selectedStudent.rollNo,
        email: selectedStudent.email,
        gradeOrDept: selectedStudent.grade,
      });
    }
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const trimmed = passwordInput.trim();
    if (!trimmed) {
      setLoginError('Please enter the passcode (or use Thumbprint Verification).');
      return;
    }
    const expectedPasscode = loginRole === 'teacher' ? selectedTeacher.passcode : 'rainbow123';
    if (trimmed !== expectedPasscode) {
      setLoginError(
        `Incorrect passcode for ${
          loginRole === 'teacher' ? selectedTeacher.name : selectedStudent.name
        }. Use example passcode "${expectedPasscode}" or click Fill Password.`
      );
      return;
    }
    completeRoleLogin(loginRole);
  };

  const handleThumbprintLogin = () => {
    setLoginError(null);
    setBiometricScanning(true);
    setTimeout(() => {
      setBiometricScanning(false);
      completeRoleLogin(loginRole);
    }, 450);
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeBody.trim()) return;
    publishNotice({
      title: noticeTitle.trim(),
      audience: noticeAudience,
      author: user?.name || 'Rainbow Faculty',
      body: noticeBody.trim(),
    });
    setNoticeTitle('');
    setNoticeBody('');
    setNoticeSuccess(true);
    setTimeout(() => setNoticeSuccess(false), 3000);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mailSubject.trim() || !mailBody.trim() || !user) return;
    sendSchoolMail({
      fromName: user.name,
      fromEmail: user.email,
      toEmail: mailTo.trim() || SCHOOL_EMAILS.general,
      subject: mailSubject.trim(),
      body: mailBody.trim(),
    });
    setMailSubject('');
    setMailBody('');
    setMailSentOk(true);
    setTimeout(() => setMailSentOk(false), 3000);
  };

  // Unauthenticated Portal Login Screen
  if (!user) {
    const examplePass = loginRole === 'teacher' ? 'faculty2026' : 'rainbow123';

    return (
      <div className="bg-[#FBF9F5] py-10 md:py-16 min-h-[80vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Institutional Info + School Mail */}
          <div className="lg:col-span-4 bg-[#10233D] text-white rounded-xl p-7 space-y-6">
            <div className="flex items-center gap-3">
              <RainbowLogo size={42} />
              <div>
                <h1 className="font-serif text-2xl font-bold">Rainbow Portal</h1>
                <p className="text-xs text-stone-300">Pre-Declared Student & Teacher Access</p>
              </div>
            </div>
            <p className="text-sm text-stone-200 leading-relaxed">
              Select your name directly from the pre-declared Rainbow School directory using the
              search bar, then verify with your passcode or one-touch thumbprint verification.
            </p>

            <div className="p-4 bg-white/10 border border-white/15 rounded-lg space-y-2 text-xs">
              <p className="uppercase tracking-widest text-[#E8C587] font-medium">
                Rainbow School Mail Directory
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-stone-300">General</span>
                <span className="font-mono text-white">{SCHOOL_EMAILS.general}</span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-stone-300">Admissions</span>
                <span className="font-mono text-white">{SCHOOL_EMAILS.admissions}</span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-stone-300">Principal</span>
                <span className="font-mono text-white">{SCHOOL_EMAILS.principal}</span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-stone-300">IT Help</span>
                <span className="font-mono text-white">{SCHOOL_EMAILS.support}</span>
              </p>
            </div>

            <div className="pt-2 border-t border-white/15 text-xs text-stone-300 space-y-1 tabular-nums">
              <p>Pre-Declared Faculty: <strong className="text-white">{TEACHERS_DIRECTORY.length} Teachers</strong></p>
              <p>Pre-Declared Students: <strong className="text-white">{roster.length} Students (25 per class KG–10)</strong></p>
            </div>
          </div>

          {/* Right Pre-Declared Directory + Search + Passcode / Thumb Login */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
            <div className="grid grid-cols-4 h-1.5">
              <div className="bg-[#C85A32]" />
              <div className="bg-[#1E6B52]" />
              <div className="bg-[#264B8A]" />
              <div className="bg-[#8B1E2D]" />
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-3xl font-semibold text-[#10233D]">
                    Select Account & Sign In
                  </h2>
                  <p className="text-sm text-stone-500 mt-0.5">
                    Choose Teacher or Student portal, search your name, and verify.
                  </p>
                </div>

                {/* Role Switcher */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F3EFE6] rounded-lg shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginRole('teacher');
                      setPasswordInput('');
                      setLoginError(null);
                    }}
                    className={`min-h-[42px] px-4 py-1.5 text-xs font-medium rounded-md inline-flex items-center justify-center gap-1.5 transition-all ${
                      loginRole === 'teacher'
                        ? 'bg-[#10233D] text-white shadow-xs'
                        : 'text-stone-700 hover:text-[#10233D]'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Teacher Login</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginRole('student');
                      setPasswordInput('');
                      setLoginError(null);
                    }}
                    className={`min-h-[42px] px-4 py-1.5 text-xs font-medium rounded-md inline-flex items-center justify-center gap-1.5 transition-all ${
                      loginRole === 'student'
                        ? 'bg-[#8B1E2D] text-white shadow-xs'
                        : 'text-stone-700 hover:text-[#10233D]'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Student Login</span>
                  </button>
                </div>
              </div>

              {/* Searchable Pre-Declared Directory */}
              {loginRole === 'teacher' ? (
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={teacherSearch}
                      onChange={(e) => setTeacherSearch(e.target.value)}
                      placeholder="Search teacher by name, department, grade, or FAC ID..."
                      aria-label="Search teacher directory"
                      className="w-full min-h-[44px] pl-10 pr-4 py-2 bg-[#FBF9F5] border border-stone-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10233D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {filteredTeachers.map((teacher) => {
                      const active = selectedTeacher.id === teacher.id;
                      return (
                        <button
                          key={teacher.id}
                          type="button"
                          onClick={() => setSelectedTeacher(teacher)}
                          className={`p-3 rounded-lg border text-left transition-all duration-150 ${
                            active
                              ? 'bg-[#10233D] text-white border-[#10233D] shadow-sm'
                              : 'bg-[#FBF9F5] text-[#10233D] border-stone-200 hover:bg-[#F3EFE6] hover:border-[#10233D]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className={active ? 'text-[#E8C587]' : 'text-[#8B1E2D]'}>
                              {teacher.id}
                            </span>
                            <span className={active ? 'text-stone-300' : 'text-stone-500'}>
                              {teacher.assignedGrades}
                            </span>
                          </div>
                          <p className="font-medium text-sm mt-0.5 truncate">{teacher.name}</p>
                          <p className={`text-xs truncate ${active ? 'text-stone-300' : 'text-stone-500'}`}>
                            {teacher.title}
                          </p>
                        </button>
                      );
                    })}
                    {filteredTeachers.length === 0 && (
                      <p className="text-xs text-stone-500 col-span-2 py-4 text-center">
                        No teacher matched “{teacherSearch}”.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="sm:col-span-2 relative">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="search"
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        placeholder="Search student name or Roll No (e.g. Aarav, RS-10-001)..."
                        aria-label="Search student directory"
                        className="w-full min-h-[44px] pl-10 pr-4 py-2 bg-[#FBF9F5] border border-stone-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                      />
                    </div>
                    <select
                      value={studentLoginGradeFilter}
                      onChange={(e) => setStudentLoginGradeFilter(e.target.value)}
                      aria-label="Filter student login list by class"
                      className="min-h-[44px] px-3 py-2 bg-[#FBF9F5] border border-stone-300 rounded-lg text-sm"
                    >
                      <option value="All">All Classes (300)</option>
                      {ALL_GRADES.map((g) => (
                        <option key={g} value={g}>
                          {g} (25)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {filteredLoginStudents.slice(0, 40).map((stu) => {
                      const active = selectedStudent.id === stu.id;
                      return (
                        <button
                          key={stu.id}
                          type="button"
                          onClick={() => setSelectedStudentId(stu.id)}
                          className={`p-3 rounded-lg border text-left transition-all duration-150 ${
                            active
                              ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] shadow-sm'
                              : 'bg-[#FBF9F5] text-[#10233D] border-stone-200 hover:bg-[#F3EFE6] hover:border-[#8B1E2D]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className={active ? 'text-[#FDE68A]' : 'text-[#8B1E2D]'}>
                              {stu.rollNo}
                            </span>
                            <span className={active ? 'text-stone-200' : 'text-stone-500'}>
                              {stu.grade}
                            </span>
                          </div>
                          <p className="font-medium text-sm mt-0.5 truncate">{stu.name}</p>
                          <p className={`text-[11px] truncate ${active ? 'text-stone-200' : 'text-stone-500'}`}>
                            {stu.email}
                          </p>
                        </button>
                      );
                    })}
                    {filteredLoginStudents.length === 0 && (
                      <p className="text-xs text-stone-500 col-span-2 py-4 text-center">
                        No student matched “{studentSearch}”.
                      </p>
                    )}
                  </div>
                  {filteredLoginStudents.length > 40 && (
                    <p className="text-[11px] text-stone-500 font-mono tabular-nums">
                      Showing first 40 of {filteredLoginStudents.length} students — filter by class above or search your name / Roll No.
                    </p>
                  )}
                </div>
              )}

              {/* Selected Profile Confirmation + Example Password + Thumbprint Verification */}
              <div className="p-4 bg-[#F3EFE6]/80 border border-stone-200 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-stone-500">
                      Selected {loginRole === 'teacher' ? 'Faculty Member' : 'Student Profile'}
                    </p>
                    <p className="font-serif text-xl font-semibold text-[#10233D]">
                      {loginRole === 'teacher' ? selectedTeacher.name : selectedStudent.name}
                    </p>
                    <p className="text-xs font-mono text-stone-600">
                      {loginRole === 'teacher'
                        ? `${selectedTeacher.id} · ${selectedTeacher.email}`
                        : `${selectedStudent.rollNo} · ${selectedStudent.grade} · ${selectedStudent.email}`}
                    </p>
                  </div>
                  <div className="text-xs bg-white border border-stone-200 rounded-md px-3 py-2">
                    <span className="text-stone-500 block">Example Passcode</span>
                    <span className="font-mono font-semibold text-[#8B1E2D]">{examplePass}</span>
                  </div>
                </div>

                {loginError && (
                  <p className="text-xs text-[#8B1E2D] font-medium">{loginError}</p>
                )}

                <form onSubmit={handlePasswordLogin} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-6">
                    <label htmlFor="portal-pass" className="block text-xs font-medium text-[#10233D] mb-1">
                      Enter Passcode
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="portal-pass"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          if (loginError) setLoginError(null);
                        }}
                        placeholder={`Example: ${examplePass}`}
                        className="w-full min-h-[44px] pl-9 pr-10 py-2 bg-white border border-stone-300 rounded-md text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-stone-500 hover:text-[#10233D] rounded"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <button
                      type="button"
                      onClick={() => setPasswordInput(examplePass)}
                      className="w-full min-h-[44px] px-3 py-2 bg-white hover:bg-stone-100 border border-stone-300 text-[#10233D] text-xs font-medium rounded-md transition-colors"
                    >
                      Fill Password
                    </button>
                  </div>
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="w-full min-h-[44px] px-4 py-2 bg-[#10233D] hover:bg-[#8B1E2D] text-white text-xs font-medium rounded-md transition-colors"
                    >
                      Sign In
                    </button>
                  </div>
                </form>

                {/* Instant Thumbprint / Biometric Touch Option */}
                <div className="pt-2 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs text-stone-600">
                    Or sign in immediately with one-touch thumb verification:
                  </span>
                  <button
                    type="button"
                    onClick={handleThumbprintLogin}
                    disabled={biometricScanning}
                    className="min-h-[46px] px-5 py-2.5 bg-[#1E6B52] hover:bg-[#14532D] text-white text-xs font-medium rounded-md inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Fingerprint className={`w-5 h-5 ${biometricScanning ? 'animate-pulse' : ''}`} />
                    <span>
                      {biometricScanning
                        ? 'Verifying Thumbprint...'
                        : `Verify Thumb & Enter as ${loginRole === 'teacher' ? selectedTeacher.name.split(' ')[0] : selectedStudent.name.split(' ')[0]}`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Student Dashboard
  if (user.role === 'student') {
    const primaryStudentRecord =
      roster.find((s) => s.rollNo === user.identifier) || roster.find((s) => s.id === 'STU-09-001') || roster[0];
    const studentGrade = primaryStudentRecord.grade;
    const studentDivision: DivisionId =
      studentGrade === 'KG-1' || studentGrade === 'KG-2'
        ? 'kindergarten'
        : studentGrade === 'Grade 1' ||
          studentGrade === 'Grade 2' ||
          studentGrade === 'Grade 3' ||
          studentGrade === 'Grade 4'
        ? 'primary'
        : studentGrade === 'Grade 5' || studentGrade === 'Grade 6' || studentGrade === 'Grade 7'
        ? 'middle'
        : 'high';
    const divisionAssignments = assignments.filter(
      (a) => !a.division || a.division === studentDivision,
    );
    const enrolledCourses = COURSES_CATALOG.filter((c) => enrolledCourseCodes.includes(c.code));
    const pendingAssignments = divisionAssignments.filter((a) => a.status === 'Pending');

    const studentTimetable =
      studentGrade === 'KG-1' || studentGrade === 'KG-2'
        ? [
            { time: '08:15 – 09:05', subject: 'Morning Circle & Phonics', room: 'Montessori Studio 02A' },
            { time: '09:15 – 10:05', subject: 'Concrete Bead Numeracy', room: 'Montessori Studio 02B' },
            { time: '10:20 – 11:15', subject: 'Sensory Garden Discovery', room: 'Botanical Courtyard' },
            { time: '11:30 – 12:30', subject: 'Music, Rhythm & Studio Art', room: 'Fine Arts Atelier' },
            { time: '12:45 – 13:30', subject: 'Storytelling & Dismissal Prep', room: 'Early Childhood Wing' },
          ]
        : studentGrade === 'Grade 1' ||
          studentGrade === 'Grade 2' ||
          studentGrade === 'Grade 3' ||
          studentGrade === 'Grade 4'
        ? [
            { time: '08:00 – 08:55', subject: 'English Grammar & Literature', room: 'Primary Wing 104' },
            { time: '09:05 – 10:00', subject: 'Singapore Mathematics', room: 'Primary Wing 106' },
            { time: '10:20 – 11:15', subject: 'Natural Science & Ecosystems', room: 'Discovery Lab' },
            { time: '11:30 – 12:20', subject: 'Coding & Logic Foundations', room: 'Tech Studio 01' },
            { time: '13:30 – 14:45', subject: 'Studio Arts & Playground Athletics', room: 'Courtyard Grounds' },
          ]
        : studentGrade === 'Grade 5' || studentGrade === 'Grade 6' || studentGrade === 'Grade 7'
        ? [
            { time: '08:00 – 08:55', subject: 'Classical Literature & Rhetoric', room: 'Heritage 106' },
            { time: '09:05 – 10:05', subject: 'Pre-Algebra & Geometry', room: 'Heritage 202' },
            { time: '10:20 – 11:20', subject: 'Integrated Science Lab', room: 'Vance Lab 1' },
            { time: '11:30 – 12:25', subject: 'Python & Robotics Studio', room: 'Robotics Makerspace' },
            { time: '15:30 – 16:45', subject: 'Varsity & Developmental Sports', room: 'Oakridge Stadium' },
          ]
        : [
            { time: '08:00 – 08:55', subject: 'Honors Algebra II & Trigonometry', room: 'Heritage 204' },
            { time: '09:05 – 10:10', subject: 'Physics, Chemistry & Bio Lab', room: 'Vance Lab 2' },
            { time: '10:30 – 11:25', subject: 'World Literature & Civics', room: 'Heritage 108' },
            { time: '11:35 – 12:30', subject: 'Computer Science & Applied AI', room: 'Robotics Studio' },
            { time: '15:45 – 17:15', subject: 'Varsity Athletics Practice', room: 'Oakridge Stadium' },
          ];

    return (
      <div className="bg-[#FBF9F5] min-h-[80vh] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="bg-gradient-to-br from-[#10233D] via-[#132B4D] to-[#1A365E] text-white rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-4 h-1.5 w-full">
              <div className="bg-[#C85A32]" />
              <div className="bg-[#1E6B52]" />
              <div className="bg-[#264B8A]" />
              <div className="bg-[#8B1E2D]" />
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-[#E8C587] tabular-nums">
                  STUDENT PORTAL · {user.identifier} · {user.gradeOrDept} · {user.email}
                </p>
                <h1 className="font-serif text-3xl font-semibold mt-1">
                  Welcome back, {user.name}
                </h1>
              </div>
              <button
                type="button"
                onClick={logout}
                className="min-h-[42px] px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium rounded-lg inline-flex items-center gap-2 self-start sm:self-auto transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(16,35,61,0.1)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              <p className="text-xs text-stone-500">Current Term Score</p>
              <p className="font-serif text-3xl font-semibold text-[#10233D] mt-1">
                {primaryStudentRecord.currentScore}% ({primaryStudentRecord.letterGrade})
              </p>
            </div>
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(16,35,61,0.1)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              <p className="text-xs text-stone-500">Term Attendance</p>
              <p className="font-serif text-3xl font-semibold text-[#14532D] mt-1">
                {primaryStudentRecord.attendancePct}%
              </p>
            </div>
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(16,35,61,0.1)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              <p className="text-xs text-stone-500">Active Courses</p>
              <p className="font-serif text-3xl font-semibold text-[#264B8A] mt-1">
                {enrolledCourses.length}
              </p>
            </div>
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(16,35,61,0.1)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              <p className="text-xs text-stone-500">School Mail Messages</p>
              <p className="font-serif text-3xl font-semibold text-[#8B1E2D] mt-1">
                {schoolMail.length}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F3EFE6] rounded-xl border border-stone-200/60 w-fit">
            {[
              { id: 'overview' as const, label: 'Timetable & Sports' },
              { id: 'assignments' as const, label: `Assignments (${pendingAssignments.length} Pending)` },
              { id: 'courses' as const, label: 'Enrolled Courses' },
              { id: 'mail' as const, label: `School Mail (${schoolMail.length})` },
              { id: 'notices' as const, label: `Notices (${notices.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStudentTab(tab.id)}
                className={`min-h-[40px] px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  studentTab === tab.id
                    ? 'bg-white text-[#10233D] shadow-xs'
                    : 'text-stone-600 hover:text-[#10233D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {studentTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-2xl p-6 space-y-4 shadow-[0_10px_30px_-12px_rgba(16,35,61,0.1)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-[#10233D]">
                      Daily Academic Timetable
                    </h2>
                    <p className="text-xs text-stone-500">{studentGrade} Schedule</p>
                  </div>
                  <Calendar className="w-4 h-4 text-[#8B1E2D]" />
                </div>
                <div className="divide-y divide-stone-100 text-sm tabular-nums">
                  {studentTimetable.map((slot) => (
                    <div key={slot.time} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-[#FBF9F5] px-2.5 rounded-lg transition-colors">
                      <span className="font-mono text-xs font-semibold text-[#8B1E2D]">{slot.time}</span>
                      <span className="font-medium text-[#10233D]">{slot.subject}</span>
                      <span className="text-xs text-stone-500">{slot.room}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 space-y-4 shadow-[0_10px_30px_-12px_rgba(16,35,61,0.1)]">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-semibold text-[#10233D]">
                    My Sports & Athletics
                  </h2>
                  <Trophy className="w-4 h-4 text-[#A67C37]" />
                </div>
                <div className="divide-y divide-stone-100">
                  {SPORTS_PROGRAMS.map((sp) => {
                    const active = primaryStudentRecord.enrolledSports.includes(sp.name);
                    return (
                      <div key={sp.id} className="py-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-[#10233D]">{sp.name}</p>
                          <p className="text-xs text-stone-500">{sp.schedule}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleStudentSport(sp.name)}
                          className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                            active
                              ? 'bg-[#14532D]/10 text-[#14532D] border-[#14532D]/30'
                              : 'bg-[#FBF9F5] text-[#10233D] border-stone-300 hover:bg-[#10233D] hover:text-white'
                          }`}
                        >
                          {active ? 'Enrolled' : 'Join'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {studentTab === 'assignments' && (
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-[0_10px_30px_-12px_rgba(16,35,61,0.12)]">
              <div className="h-1.5 w-full bg-[#8B1E2D]" />
              <div className="p-6 border-b border-stone-200">
                <h2 className="font-serif text-2xl font-semibold text-[#10233D]">
                  Course Assignments & Submissions
                </h2>
              </div>
              <div className="divide-y divide-stone-100">
                {divisionAssignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-mono text-stone-500 tabular-nums">
                        {asg.courseCode} · Due {asg.dueDate}
                      </p>
                      <h3 className="text-base font-medium text-[#10233D]">{asg.title}</h3>
                      <p className="text-xs text-stone-500">{asg.courseTitle}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {asg.status === 'Pending' ? (
                        <button
                          type="button"
                          onClick={() => submitStudentAssignment(asg.id)}
                          className="min-h-[42px] px-4 py-2 bg-[#8B1E2D] hover:bg-[#10233D] text-white text-xs font-medium rounded-md transition-colors"
                        >
                          Mark as Submitted
                        </button>
                      ) : (
                        <span className="text-xs font-mono font-medium text-[#14532D] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          {asg.status} {asg.score ? `(${asg.score})` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {studentTab === 'courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {COURSES_CATALOG.map((course) => {
                const enrolled = enrolledCourseCodes.includes(course.code);
                return (
                  <div
                    key={course.id}
                    className="bg-white border border-stone-200 rounded-2xl p-5 flex items-start justify-between gap-4 shadow-xs hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-mono text-stone-500">
                        {course.code} · {course.grades}
                      </p>
                      <h3 className="font-serif text-xl font-semibold text-[#10233D]">
                        {course.title}
                      </h3>
                      <p className="text-xs text-stone-600">Faculty: {course.facultyLead}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleCourseEnrollment(course.code)}
                      className={`min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-md border shrink-0 transition-colors ${
                        enrolled
                          ? 'bg-[#10233D] text-white border-[#10233D]'
                          : 'bg-white text-[#10233D] border-stone-300 hover:bg-[#8B1E2D] hover:text-white hover:border-[#8B1E2D]'
                      }`}
                    >
                      {enrolled ? 'Enrolled' : 'Enroll'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {studentTab === 'mail' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form
                onSubmit={handleSendMail}
                className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-[0_10px_30px_-12px_rgba(16,35,61,0.1)]"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#8B1E2D]" />
                  <h2 className="font-serif text-2xl font-semibold text-[#10233D]">
                    Compose Rainbow School Mail
                  </h2>
                </div>
                <p className="text-xs font-mono text-stone-500">From: {user.email}</p>
                <div>
                  <label htmlFor="stu-mail-to" className="block text-xs font-medium text-[#10233D] mb-1">
                    Recipient Faculty / Office Mail
                  </label>
                  <select
                    id="stu-mail-to"
                    value={mailTo}
                    onChange={(e) => setMailTo(e.target.value)}
                    className="w-full min-h-[42px] px-3 py-2 border border-stone-300 rounded-md text-xs bg-white font-mono"
                  >
                    <option value={SCHOOL_EMAILS.general}>{SCHOOL_EMAILS.general} (General Office)</option>
                    <option value={SCHOOL_EMAILS.principal}>{SCHOOL_EMAILS.principal} (Principal Office)</option>
                    <option value={SCHOOL_EMAILS.athletics}>{SCHOOL_EMAILS.athletics} (Athletics Office)</option>
                    <option value={SCHOOL_EMAILS.support}>{SCHOOL_EMAILS.support} (Portal IT Support)</option>
                    {TEACHERS_DIRECTORY.map((t) => (
                      <option key={t.id} value={t.email}>
                        {t.email} ({t.name})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="stu-mail-sub" className="block text-xs font-medium text-[#10233D] mb-1">
                    Subject
                  </label>
                  <input
                    id="stu-mail-sub"
                    type="text"
                    required
                    value={mailSubject}
                    onChange={(e) => setMailSubject(e.target.value)}
                    placeholder="e.g. Question regarding Science Lab"
                    className="w-full min-h-[42px] px-3 py-2 border border-stone-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="stu-mail-body" className="block text-xs font-medium text-[#10233D] mb-1">
                    Message
                  </label>
                  <textarea
                    id="stu-mail-body"
                    rows={4}
                    required
                    value={mailBody}
                    onChange={(e) => setMailBody(e.target.value)}
                    placeholder="Write your school email message..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2 bg-[#10233D] hover:bg-[#8B1E2D] text-white text-xs font-medium rounded-md inline-flex items-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send School Mail</span>
                </button>
                {mailSentOk && (
                  <p className="text-xs text-[#14532D] font-medium">Mail sent via Rainbow School Mail.</p>
                )}
              </form>

              <div className="lg:col-span-7 space-y-3">
                {schoolMail.map((m) => (
                  <article key={m.id} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-1.5 shadow-xs hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-mono text-[#8B1E2D]">{m.folder} · {m.fromEmail} → {m.toEmail}</span>
                      <span className="font-mono text-stone-400">{m.sentAt}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#10233D]">{m.subject}</h3>
                    <p className="text-sm text-[#44403C] leading-relaxed">{m.body}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {studentTab === 'notices' && (
            <div className="space-y-4">
              {notices.map((notice) => (
                <article
                  key={notice.id}
                  className="bg-white border border-stone-200 rounded-2xl p-6 space-y-2 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                    <span className="font-medium text-[#8B1E2D]">{notice.audience}</span>
                    <span className="font-mono tabular-nums">{notice.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#10233D]">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-[#44403C] leading-relaxed">{notice.body}</p>
                  <p className="text-xs text-stone-500 pt-1">Posted by {notice.author}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Authenticated Teacher Dashboard
  const filteredRoster = roster.filter((s) => {
    const matchesGrade = gradeFilter === 'All' || s.grade === gradeFilter;
    const q = rosterSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.rollNo.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q);
    return matchesGrade && matchesSearch;
  });

  const avgClassAttendance = filteredRoster.length
    ? Math.round(
        filteredRoster.reduce((acc, s) => acc + s.attendancePct, 0) / filteredRoster.length
      )
    : 0;

  return (
    <div className="bg-[#FBF9F5] min-h-[80vh] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="bg-gradient-to-br from-[#10233D] via-[#132B4D] to-[#1A365E] text-white rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-4 h-1.5 w-full">
            <div className="bg-[#C85A32]" />
            <div className="bg-[#1E6B52]" />
            <div className="bg-[#264B8A]" />
            <div className="bg-[#8B1E2D]" />
          </div>
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-[#E8C587] tabular-nums">
                FACULTY PORTAL · {user.identifier} · {user.email}
              </p>
              <h1 className="font-serif text-3xl font-semibold mt-1">
                Teacher Dashboard — {user.name}
              </h1>
            </div>
            <button
              type="button"
              onClick={logout}
              className="min-h-[42px] px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium rounded-lg inline-flex items-center gap-2 self-start sm:self-auto transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(16,35,61,0.1)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            <p className="text-xs text-stone-500">Total Students (12 Classes × 25)</p>
            <p className="font-serif text-3xl font-semibold text-[#10233D] mt-1">
              {roster.length}
            </p>
          </div>
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(16,35,61,0.1)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            <p className="text-xs text-stone-500">Filtered Class Attendance</p>
            <p className="font-serif text-3xl font-semibold text-[#14532D] mt-1">
              {avgClassAttendance}%
            </p>
          </div>
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(16,35,61,0.1)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            <p className="text-xs text-stone-500">Admissions Queue</p>
            <p className="font-serif text-3xl font-semibold text-[#8B1E2D] mt-1">
              {applications.length}
            </p>
          </div>
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(16,35,61,0.1)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            <p className="text-xs text-stone-500">Scheduled Visits</p>
            <p className="font-serif text-3xl font-semibold text-[#264B8A] mt-1">
              {visits.length}
            </p>
          </div>
        </div>

        {/* Teacher Quick-View Widget: Today's Schedule & Upcoming Classroom Announcements */}
        <TeacherQuickView
          user={user}
          notices={notices}
          onSelectGradeForRoster={(grade) => {
            setGradeFilter(grade);
            setTeacherTab('roster');
          }}
          onJumpToPublishNotice={() => setTeacherTab('notices')}
        />

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F3EFE6] rounded-lg w-fit">
          {[
            { id: 'roster' as const, label: 'Class Attendance & Gradebook (25/Class)', icon: ClipboardCheck },
            { id: 'admissions' as const, label: `Admissions Review (${applications.length})`, icon: BookOpen },
            { id: 'mail' as const, label: `School Mail (${schoolMail.length})`, icon: Mail },
            { id: 'notices' as const, label: 'Publish Notice', icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTeacherTab(tab.id)}
                className={`min-h-[40px] px-4 py-2 text-xs font-medium rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap ${
                  teacherTab === tab.id
                    ? 'bg-white text-[#10233D] shadow-xs'
                    : 'text-stone-600 hover:text-[#10233D]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Interactive Class Gradebook & Attendance with 25 Students per Class + Student Search */}
        {teacherTab === 'roster' && (
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-[0_10px_30px_-12px_rgba(16,35,61,0.1)]">
            <div className="h-1.5 w-full bg-[#10233D]" />
            <div className="p-6 border-b border-stone-200 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#10233D]">
                    Student Attendance & Gradebook — {gradeFilter === 'All' ? 'All Classes (KG–10th)' : gradeFilter}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Every class from Kindergarten (KG-1, KG-2) to 10th Grade contains 25 students. Select any class or search by student name.
                  </p>
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={rosterSearch}
                    onChange={(e) => setRosterSearch(e.target.value)}
                    placeholder="Search student name or Roll No..."
                    aria-label="Search students in gradebook"
                    className="w-full min-h-[40px] pl-9 pr-3 py-1.5 bg-[#FBF9F5] border border-stone-300 rounded-md text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10233D]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter students by class from Kindergarten to Grade 10">
                {(['All', ...ALL_GRADES] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGradeFilter(g)}
                    className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-md border transition-all duration-150 whitespace-nowrap ${
                      gradeFilter === g
                        ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] shadow-xs'
                        : 'bg-[#FBF9F5] text-[#10233D] border-stone-300 hover:bg-[#10233D] hover:text-white hover:border-[#10233D]'
                    }`}
                  >
                    {g === 'Grade 10' ? '10th Grade' : g}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-[#8B1E2D] tabular-nums">
                Showing {filteredRoster.length} Students · Average Class Attendance: {avgClassAttendance}%
              </div>
            </div>

            <div className="overflow-x-auto max-h-[540px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[#FBF9F5] border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500">
                    <th className="py-3.5 px-5 font-medium">Roll No</th>
                    <th className="py-3.5 px-5 font-medium">Student</th>
                    <th className="py-3.5 px-5 font-medium">Class</th>
                    <th className="py-3.5 px-5 font-medium">Attendance %</th>
                    <th className="py-3.5 px-5 font-medium">Term Score %</th>
                    <th className="py-3.5 px-5 font-medium text-right">Standing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm tabular-nums">
                  {filteredRoster.map((student) => (
                    <tr key={student.id} className="hover:bg-[#F3EFE6]/55 transition-colors">
                      <td className="py-3 px-5 font-mono text-xs text-stone-500">
                        {student.rollNo}
                      </td>
                      <td className="py-3 px-5">
                        <p className="font-medium text-[#10233D]">{student.name}</p>
                        <p className="text-[11px] font-mono text-stone-400">{student.email}</p>
                      </td>
                      <td className="py-3 px-5 text-stone-600">{student.grade}</td>
                      <td className="py-3 px-5">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          aria-label={`Attendance for ${student.name}`}
                          value={student.attendancePct}
                          onChange={(e) =>
                            updateRosterGrade(
                              student.id,
                              student.currentScore,
                              Number(e.target.value)
                            )
                          }
                          className="w-20 min-h-[36px] px-2.5 py-1 border border-stone-300 rounded-md text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#10233D]"
                        />
                      </td>
                      <td className="py-3 px-5">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          aria-label={`Score for ${student.name}`}
                          value={student.currentScore}
                          onChange={(e) =>
                            updateRosterGrade(
                              student.id,
                              Number(e.target.value),
                              student.attendancePct
                            )
                          }
                          className="w-20 min-h-[36px] px-2.5 py-1 border border-stone-300 rounded-md text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#10233D]"
                        />
                      </td>
                      <td className="py-3 px-5 text-right font-mono font-semibold text-[#10233D]">
                        {student.letterGrade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Admissions Review */}
        {teacherTab === 'admissions' && (
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-[0_10px_30px_-12px_rgba(16,35,61,0.1)]">
            <div className="h-1.5 w-full bg-[#1E6B52]" />
            <div className="p-6 border-b border-stone-200">
              <h2 className="font-serif text-2xl font-semibold text-[#10233D]">
                Admissions Applications & Decision Queue
              </h2>
            </div>
            <div className="divide-y divide-stone-100">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                >
                  <div className="space-y-1.5">
                    <p className="text-xs font-mono text-stone-500 tabular-nums">
                      {app.id} · {app.gradeApplying} · Submitted {app.submittedAt}
                    </p>
                    <h3 className="font-serif text-xl font-semibold text-[#10233D]">
                      {app.studentName}
                    </h3>
                    <p className="text-xs text-stone-600">
                      Parent: {app.parentName} ({app.parentEmail} · WhatsApp: {app.whatsappNumber || app.parentPhone}) · Prior:{' '}
                      {app.previousSchool}
                    </p>
                    <p className="text-xs text-[#44403C]">{app.notes}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {(['Under Review', 'Interview Scheduled', 'Admitted'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => updateApplicationStatus(app.id, status)}
                        className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                          app.status === status
                            ? 'bg-[#10233D] text-white border-[#10233D]'
                            : 'bg-[#FBF9F5] text-stone-600 border-stone-300 hover:bg-[#8B1E2D] hover:text-white hover:border-[#8B1E2D]'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: School Mail */}
        {teacherTab === 'mail' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleSendMail}
              className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-[0_10px_30px_-12px_rgba(16,35,61,0.1)]"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#8B1E2D]" />
                <h2 className="font-serif text-2xl font-semibold text-[#10233D]">
                  Send Rainbow School Mail
                </h2>
              </div>
              <p className="text-xs font-mono text-stone-500">From: {user.email}</p>
              <div>
                <label htmlFor="fac-mail-to" className="block text-xs font-medium text-[#10233D] mb-1">
                  Recipient Email Address
                </label>
                <input
                  id="fac-mail-to"
                  type="email"
                  required
                  value={mailTo}
                  onChange={(e) => setMailTo(e.target.value)}
                  placeholder="students@rainbowschool.edu"
                  className="w-full min-h-[42px] px-3 py-2 border border-stone-300 rounded-md text-sm font-mono"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    { label: 'Students', email: 'students@rainbowschool.edu' },
                    { label: 'Faculty', email: 'faculty@rainbowschool.edu' },
                    { label: 'Admissions', email: SCHOOL_EMAILS.admissions },
                  ].map((preset) => (
                    <button
                      key={preset.email}
                      type="button"
                      onClick={() => setMailTo(preset.email)}
                      className="px-2.5 py-1 text-[11px] rounded border border-stone-200 bg-[#FBF9F5] hover:bg-[#10233D] hover:text-white text-stone-600 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="fac-mail-sub" className="block text-xs font-medium text-[#10233D] mb-1">
                  Subject
                </label>
                <input
                  id="fac-mail-sub"
                  type="text"
                  required
                  value={mailSubject}
                  onChange={(e) => setMailSubject(e.target.value)}
                  placeholder="e.g. Grade 10 Mock Exam Timetable"
                  className="w-full min-h-[42px] px-3 py-2 border border-stone-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label htmlFor="fac-mail-body" className="block text-xs font-medium text-[#10233D] mb-1">
                  Message
                </label>
                <textarea
                  id="fac-mail-body"
                  rows={4}
                  required
                  value={mailBody}
                  onChange={(e) => setMailBody(e.target.value)}
                  placeholder="Write your faculty email..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm"
                />
              </div>
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2 bg-[#10233D] hover:bg-[#8B1E2D] text-white text-xs font-medium rounded-md inline-flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send School Mail</span>
              </button>
              {mailSentOk && (
                <p className="text-xs text-[#14532D] font-medium">Mail dispatched via Rainbow School Mail.</p>
              )}
            </form>

            <div className="lg:col-span-7 space-y-3">
              {schoolMail.map((m) => (
                <article key={m.id} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-1.5 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-[#8B1E2D]">{m.folder} · {m.fromEmail} → {m.toEmail}</span>
                    <span className="font-mono text-stone-400">{m.sentAt}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#10233D]">{m.subject}</h3>
                  <p className="text-sm text-[#44403C] leading-relaxed">{m.body}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Publish Notice */}
        {teacherTab === 'notices' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handlePublishNotice}
              className="lg:col-span-6 bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-[0_10px_30px_-12px_rgba(16,35,61,0.1)]"
            >
              <h2 className="font-serif text-2xl font-semibold text-[#10233D]">
                Post Announcement to Student Portal
              </h2>
              <div>
                <label htmlFor="notice-title" className="block text-xs font-medium text-[#10233D] mb-1.5">
                  Announcement Headline
                </label>
                <input
                  id="notice-title"
                  type="text"
                  required
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="e.g. Science Fair Lab Prep Session"
                  className="w-full min-h-[44px] px-3.5 py-2 border border-stone-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label htmlFor="notice-aud" className="block text-xs font-medium text-[#10233D] mb-1.5">
                  Target Audience
                </label>
                <select
                  id="notice-aud"
                  value={noticeAudience}
                  onChange={(e) =>
                    setNoticeAudience(
                      e.target.value as 'All School' | 'Kindergarten–Grade 4' | 'Grades 5–10' | 'Athletics'
                    )
                  }
                  className="w-full min-h-[44px] px-3.5 py-2 border border-stone-300 rounded-md text-sm bg-white"
                >
                  <option value="All School">All School</option>
                  <option value="Kindergarten–Grade 4">Kindergarten–Grade 4</option>
                  <option value="Grades 5–10">Grades 5–10</option>
                  <option value="Athletics">Athletics</option>
                </select>
              </div>
              <div>
                <label htmlFor="notice-body" className="block text-xs font-medium text-[#10233D] mb-1.5">
                  Message Details
                </label>
                <textarea
                  id="notice-body"
                  rows={4}
                  required
                  value={noticeBody}
                  onChange={(e) => setNoticeBody(e.target.value)}
                  placeholder="Write details, dates, and instructions for students and families..."
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm"
                />
              </div>
              <button
                type="submit"
                className="min-h-[46px] px-6 py-2.5 bg-[#8B1E2D] hover:bg-[#10233D] text-white text-sm font-medium rounded-md inline-flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Publish Notice</span>
              </button>
              {noticeSuccess && (
                <p className="text-xs text-[#14532D] font-medium">
                  Notice published to the Student Portal.
                </p>
              )}
            </form>

            <div className="lg:col-span-6 space-y-4">
              {notices.map((n) => (
                <div key={n.id} className="bg-white border border-stone-200 rounded-lg p-5 space-y-1.5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-medium text-[#8B1E2D]">{n.audience}</span>
                    <span className="font-mono tabular-nums">{n.date}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#10233D]">{n.title}</h3>
                  <p className="text-xs text-[#44403C] leading-relaxed">{n.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
