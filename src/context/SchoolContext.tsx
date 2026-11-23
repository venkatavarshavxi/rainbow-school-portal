import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AdmissionsApplication,
  CampusVisitBooking,
  INITIAL_APPLICATIONS,
  INITIAL_ASSIGNMENTS,
  INITIAL_NOTICES,
  INITIAL_ROSTER,
  INITIAL_SCHOOL_MAIL,
  INITIAL_VISITS,
  RosterStudent,
  SchoolMailMessage,
  SchoolNotice,
  StudentAssignment,
} from '../data/schoolData';

export type UserRole = 'student' | 'teacher';

export interface AuthUser {
  role: UserRole;
  name: string;
  identifier: string;
  email: string;
  gradeOrDept: string;
}

interface SchoolPersistedState {
  user: AuthUser | null;
  applications: AdmissionsApplication[];
  visits: CampusVisitBooking[];
  assignments: StudentAssignment[];
  notices: SchoolNotice[];
  roster: RosterStudent[];
  enrolledCourseCodes: string[];
  schoolMail: SchoolMailMessage[];
}

const STORAGE_KEY = 'rainbow_school_portal_v2';

const DEFAULT_STATE: SchoolPersistedState = {
  user: null,
  applications: INITIAL_APPLICATIONS,
  visits: INITIAL_VISITS,
  assignments: INITIAL_ASSIGNMENTS,
  notices: INITIAL_NOTICES,
  roster: INITIAL_ROSTER,
  enrolledCourseCodes: ['HS-801', 'HS-802', 'HS-803', 'HS-804'],
  schoolMail: INITIAL_SCHOOL_MAIL,
};

interface SchoolContextValue extends SchoolPersistedState {
  loginAs: (user: AuthUser) => void;
  logout: () => void;
  submitApplication: (app: Omit<AdmissionsApplication, 'id' | 'submittedAt' | 'status'>) => AdmissionsApplication;
  updateApplicationStatus: (id: string, status: AdmissionsApplication['status']) => void;
  bookCampusVisit: (visit: Omit<CampusVisitBooking, 'id' | 'createdAt'>) => CampusVisitBooking;
  submitStudentAssignment: (assignmentId: string) => void;
  toggleCourseEnrollment: (courseCode: string) => void;
  toggleStudentSport: (sportName: string) => void;
  updateRosterGrade: (studentId: string, newScore: number, newAttendance: number) => void;
  publishNotice: (notice: Omit<SchoolNotice, 'id' | 'date'>) => void;
  sendSchoolMail: (mail: Omit<SchoolMailMessage, 'id' | 'sentAt' | 'folder'>) => void;
}

const SchoolContext = createContext<SchoolContextValue | null>(null);

function scoreToLetter(score: number): string {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 86) return 'A-';
  if (score >= 82) return 'B+';
  if (score >= 76) return 'B';
  if (score >= 70) return 'C+';
  return 'C';
}

function getDivisionCoursesForGrade(grade: string): string[] {
  if (grade === 'KG-1' || grade === 'KG-2') return ['KG-101', 'KG-102', 'KG-103'];
  if (grade === 'Grade 1' || grade === 'Grade 2' || grade === 'Grade 3' || grade === 'Grade 4') {
    return ['PR-201', 'PR-202', 'PR-203'];
  }
  if (grade === 'Grade 5' || grade === 'Grade 6' || grade === 'Grade 7') {
    return ['MS-501', 'MS-502', 'MS-503'];
  }
  return ['HS-801', 'HS-802', 'HS-803', 'HS-804'];
}

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SchoolPersistedState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_STATE;
      const parsed = JSON.parse(raw) as Partial<SchoolPersistedState>;
      const existingAssignments = parsed.assignments || [];
      const existingIds = new Set(existingAssignments.map((a) => a.id));
      const mergedAssignments = [
        ...existingAssignments.map((a) => {
          const fresh = INITIAL_ASSIGNMENTS.find((init) => init.id === a.id);
          return fresh && !a.division ? { ...a, division: fresh.division } : a;
        }),
        ...INITIAL_ASSIGNMENTS.filter((init) => !existingIds.has(init.id)),
      ];
      return {
        ...DEFAULT_STATE,
        ...parsed,
        assignments: mergedAssignments.length > 0 ? mergedAssignments : INITIAL_ASSIGNMENTS,
        roster: parsed.roster && parsed.roster.length >= 300 ? parsed.roster : INITIAL_ROSTER,
      };
    } catch {
      return DEFAULT_STATE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota issues in private browsing
    }
  }, [state]);

  const loginAs = (user: AuthUser) => {
    setState((prev) => ({
      ...prev,
      user,
      enrolledCourseCodes:
        user.role === 'student'
          ? getDivisionCoursesForGrade(user.gradeOrDept)
          : prev.enrolledCourseCodes,
    }));
  };

  const logout = () => {
    setState((prev) => ({ ...prev, user: null }));
  };

  const submitApplication = (app: Omit<AdmissionsApplication, 'id' | 'submittedAt' | 'status'>) => {
    const created: AdmissionsApplication = {
      ...app,
      id: `APP-2026-${Math.floor(200 + Math.random() * 799)}`,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Under Review',
    };
    setState((prev) => ({
      ...prev,
      applications: [created, ...prev.applications],
    }));
    return created;
  };

  const updateApplicationStatus = (id: string, status: AdmissionsApplication['status']) => {
    setState((prev) => ({
      ...prev,
      applications: prev.applications.map((a) => (a.id === id ? { ...a, status } : a)),
    }));
  };

  const bookCampusVisit = (visit: Omit<CampusVisitBooking, 'id' | 'createdAt'>) => {
    const created: CampusVisitBooking = {
      ...visit,
      id: `VIS-2026-${Math.floor(10 + Math.random() * 89)}`,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    setState((prev) => ({
      ...prev,
      visits: [created, ...prev.visits],
    }));
    return created;
  };

  const submitStudentAssignment = (assignmentId: string) => {
    setState((prev) => ({
      ...prev,
      assignments: prev.assignments.map((a) =>
        a.id === assignmentId ? { ...a, status: 'Submitted' } : a
      ),
    }));
  };

  const toggleCourseEnrollment = (courseCode: string) => {
    setState((prev) => {
      const exists = prev.enrolledCourseCodes.includes(courseCode);
      return {
        ...prev,
        enrolledCourseCodes: exists
          ? prev.enrolledCourseCodes.filter((c) => c !== courseCode)
          : [...prev.enrolledCourseCodes, courseCode],
      };
    });
  };

  const toggleStudentSport = (sportName: string) => {
    setState((prev) => {
      const targetRoll = prev.user?.role === 'student' ? prev.user.identifier : 'RS-09-001';
      return {
        ...prev,
        roster: prev.roster.map((stu) => {
          if (stu.rollNo !== targetRoll) return stu;
          const enrolled = stu.enrolledSports.includes(sportName);
          return {
            ...stu,
            enrolledSports: enrolled
              ? stu.enrolledSports.filter((s) => s !== sportName)
              : [...stu.enrolledSports, sportName],
          };
        }),
      };
    });
  };

  const updateRosterGrade = (studentId: string, newScore: number, newAttendance: number) => {
    const clampedScore = Math.max(0, Math.min(100, newScore));
    const clampedAtt = Math.max(0, Math.min(100, newAttendance));
    setState((prev) => ({
      ...prev,
      roster: prev.roster.map((s) =>
        s.id === studentId
          ? {
              ...s,
              currentScore: clampedScore,
              attendancePct: clampedAtt,
              letterGrade: scoreToLetter(clampedScore),
            }
          : s
      ),
    }));
  };

  const publishNotice = (notice: Omit<SchoolNotice, 'id' | 'date'>) => {
    const created: SchoolNotice = {
      ...notice,
      id: `NOT-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    setState((prev) => ({
      ...prev,
      notices: [created, ...prev.notices],
    }));
  };

  const sendSchoolMail = (mail: Omit<SchoolMailMessage, 'id' | 'sentAt' | 'folder'>) => {
    const created: SchoolMailMessage = {
      ...mail,
      id: `MAIL-${Date.now()}`,
      sentAt: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      folder: 'Sent',
    };
    setState((prev) => ({
      ...prev,
      schoolMail: [created, ...prev.schoolMail],
    }));
  };

  return (
    <SchoolContext.Provider
      value={{
        ...state,
        loginAs,
        logout,
        submitApplication,
        updateApplicationStatus,
        bookCampusVisit,
        submitStudentAssignment,
        toggleCourseEnrollment,
        toggleStudentSport,
        updateRosterGrade,
        publishNotice,
        sendSchoolMail,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export function useSchool() {
  const ctx = useContext(SchoolContext);
  if (!ctx) throw new Error('useSchool must be used inside SchoolProvider');
  return ctx;
}
