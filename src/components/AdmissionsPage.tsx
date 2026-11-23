import React, { useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Bus,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock,
  FileCheck2,
  GraduationCap,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import {
  ADMISSIONS_FAQS,
  ALL_GRADES,
  AdmissionsApplication,
  FaqCategory,
  GRADE_DIVISIONS,
  PageRoute,
  SCHOOL_EMAILS,
  SCHOOL_IMAGES,
} from '../data/schoolData';
import { useSchool } from '../context/SchoolContext';
import { ResilientImage } from './ResilientImage';
import { SlideInFrame } from './SlideInFrame';
import {
  ConfettiBurst,
  SubmissionToast,
  SubmissionToastData,
} from './CelebrationFeedback';

const WhatsAppLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.141 5.266-1.375c1.469.797 3.109 1.219 4.766 1.219 5.516 0 9.969-4.453 9.969-9.969s-4.453-9.984-9.969-9.984zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.516.078-1.172.109-1.891-.125-.438-.141-1-.328-1.719-.641-3.016-1.297-4.984-4.344-5.141-4.547-.141-.203-1.219-1.625-1.219-3.094 0-1.469.766-2.188 1.047-2.484.266-.297.594-.375.797-.375.203 0 .391.016.563.016.188 0 .422-.078.656.5.25.594.844 2.063.922 2.219.078.156.125.344.031.547-.094.203-.141.328-.297.5-.156.172-.313.391-.453.516-.156.141-.313.297-.141.594.172.297.781 1.281 1.672 2.078 1.156 1.031 2.125 1.344 2.422 1.5.297.141.469.125.641-.078.172-.203.75-.875.953-1.172.203-.297.391-.25.656-.156.266.094 1.719.813 2.016.953.297.156.484.219.563.344.078.125.078.734-.172 1.438z" />
  </svg>
);

const APPLY_STEPS = [
  {
    num: '01',
    title: 'Submit Application',
    desc: 'Complete the online dossier for an instant WhatsApp receipt.',
    accent: '#C85A32',
    softBg: '#FFF4EE',
    icon: ClipboardList,
    timing: 'Priority: Jan 31',
  },
  {
    num: '02',
    title: 'Readiness Assessment',
    desc: 'Age-fit reading & math session (KG–4) or placement review (5–10).',
    accent: '#1E6B52',
    softBg: '#EFF8F4',
    icon: BookOpen,
    timing: 'February',
  },
  {
    num: '03',
    title: 'Family Interview',
    desc: 'Brief conversation with our Division Head & Admissions Director.',
    accent: '#264B8A',
    softBg: '#EFF4FC',
    icon: Users,
    timing: 'Feb – Early Mar',
  },
  {
    num: '04',
    title: 'Enrollment Offer',
    desc: 'Priority admission decisions release mid-March.',
    accent: '#8B1E2D',
    softBg: '#FDF2F4',
    icon: GraduationCap,
    timing: 'March 15',
  },
];

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PERSON_NAME_REGEX = /^[\p{L}][\p{L}\s.'-]{1,59}$/u;
const PHONE_CHARS_REGEX = /^\+?[\d\s()-]+$/;

function validateFullName(value: string, label: string): string | null {
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (!trimmed) return `${label} is required.`;
  if (trimmed.length < 3 || trimmed.length > 60) {
    return `${label} must be between 3 and 60 characters.`;
  }
  if (!PERSON_NAME_REGEX.test(trimmed)) {
    return `${label} must contain letters only (no numbers or special symbols).`;
  }
  const words = trimmed.split(' ').filter((w) => w.replace(/[.'-]/g, '').length >= 1);
  if (words.length < 2) {
    return `Please enter ${label.toLowerCase()} with both first and last name.`;
  }
  return null;
}

function validateEmailAddress(value: string, label: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required.`;
  if (/\s/.test(trimmed) || !EMAIL_REGEX.test(trimmed)) {
    return `Enter a valid ${label.toLowerCase()} (e.g., parent@example.com).`;
  }
  return null;
}

function validateMobileNumber(value: string, label: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required.`;
  if (!PHONE_CHARS_REGEX.test(trimmed)) {
    return `${label} can only contain digits, spaces, +, -, or parentheses (no letters).`;
  }
  const digits = trimmed.replace(/\D/g, '');
  const hasCountryCode = trimmed.startsWith('+');
  if (hasCountryCode) {
    if (digits.length < 11 || digits.length > 15) {
      return `${label} with country code must contain 11 to 15 digits (e.g., +91 9876543210).`;
    }
  } else if (digits.length !== 10) {
    return `${label} must be a 10-digit mobile number (or include country code with +).`;
  }
  const subscriberDigits = digits.slice(-10);
  if (/^(\d)\1{9}$/.test(subscriberDigits)) {
    return `${label} cannot be all identical digits.`;
  }
  if (subscriberDigits === '1234567890' || subscriberDigits === '0123456789') {
    return `Please enter a genuine ${label.toLowerCase()}, not a placeholder sequence.`;
  }
  return null;
}

function getGradeAgeRange(grade: string): [number, number] {
  if (grade === 'KG-1') return [3, 6];
  if (grade === 'KG-2') return [4, 7];
  const match = grade.match(/\d+/);
  const gNum = match ? parseInt(match[0], 10) : 5;
  return [gNum + 4, gNum + 8];
}

function validateDateOfBirth(dob: string, grade: string): string | null {
  if (!dob) return 'Date of Birth is required.';
  const birth = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return 'Enter a valid Date of Birth.';
  const refDate = new Date('2026-09-01T00:00:00');
  if (birth >= new Date()) return 'Date of Birth must be in the past.';
  let age = refDate.getFullYear() - birth.getFullYear();
  const m = refDate.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && refDate.getDate() < birth.getDate())) {
    age--;
  }
  if (age < 3 || age > 18) {
    return 'Student age must be between 3 and 18 years for KG-1 through Grade 10.';
  }
  const [minAge, maxAge] = getGradeAgeRange(grade);
  if (age < minAge || age > maxAge) {
    return `For ${grade}, typical entry age is ${minAge}–${maxAge} years (student would be ${age}). Please verify DOB or grade.`;
  }
  return null;
}

function validateAddressDetails(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Residential neighborhood or street address is required.';
  if (trimmed.length < 5) return 'Please enter at least 5 characters for your address.';
  if (!/\p{L}/u.test(trimmed)) {
    return 'Address must include street or neighborhood letters (not numbers only).';
  }
  return null;
}

function validatePreviousSchool(value: string, grade: string): string | null {
  const isKindergarten = grade === 'KG-1' || grade === 'KG-2';
  const trimmed = value.trim();
  if (!trimmed) {
    return isKindergarten ? null : `Current or previous school name is required for ${grade}.`;
  }
  if (trimmed.length < 3 || !/\p{L}/u.test(trimmed)) {
    return 'Enter a valid school name (at least 3 characters with letters).';
  }
  return null;
}

type AppFieldKey =
  | 'studentName'
  | 'dateOfBirth'
  | 'previousSchool'
  | 'parentName'
  | 'parentEmail'
  | 'parentPhone'
  | 'whatsappNumber'
  | 'address';

type VisitFieldKey = 'visitFamily' | 'visitEmail' | 'visitDate';

export const AdmissionsPage: React.FC<{ onNavigate?: (page: PageRoute) => void }> = ({
  onNavigate,
}) => {
  const { user, applications, visits, submitApplication, bookCampusVisit } = useSchool();
  const isEnrolledStudent = user?.role === 'student';
  const [showSiblingAdmissions, setShowSiblingAdmissions] = useState(false);

  // Visit Booking Form State
  const [visitType, setVisitType] = useState<'Campus Tour' | 'Student Shadow Day' | 'Open House'>('Campus Tour');
  const [visitFamily, setVisitFamily] = useState('');
  const [visitEmail, setVisitEmail] = useState('');
  const [visitDate, setVisitDate] = useState('2026-12-10');
  const [visitGrade, setVisitGrade] = useState('Grade 5');
  const [visitSuccessId, setVisitSuccessId] = useState<string | null>(null);
  const [visitTouched, setVisitTouched] = useState<Partial<Record<VisitFieldKey, boolean>>>({});
  const [visitSubmittedAttempt, setVisitSubmittedAttempt] = useState(false);

  // Rich Admissions Application Form State
  const [studentName, setStudentName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('2015-05-14');
  const [gradeApplying, setGradeApplying] = useState('Grade 6');
  const [academicInterest, setAcademicInterest] = useState('STEM & Robotics');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [address, setAddress] = useState('');
  const [busRequired, setBusRequired] = useState(true);
  const [previousSchool, setPreviousSchool] = useState('');
  const [notes, setNotes] = useState('');
  const [docsReady, setDocsReady] = useState({
    birthCert: true,
    reportCard: true,
    immunization: true,
  });
  const [sendWhatsappConfirm, setSendWhatsappConfirm] = useState(true);
  const [submittedApp, setSubmittedApp] = useState<AdmissionsApplication | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<AppFieldKey, boolean>>>({});
  const [submittedAttempt, setSubmittedAttempt] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [celebrationToast, setCelebrationToast] = useState<SubmissionToastData | null>(null);

  // Admissions FAQ State
  const [faqCategory, setFaqCategory] = useState<'All' | FaqCategory>('All');
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>([ADMISSIONS_FAQS[0].id]);

  const effectiveWhatsapp = sameAsPhone ? parentPhone : whatsappNumber;

  const appValidationErrors: Record<AppFieldKey, string | null> = {
    studentName: validateFullName(studentName, 'Student Full Name'),
    dateOfBirth: validateDateOfBirth(dateOfBirth, gradeApplying),
    previousSchool: validatePreviousSchool(previousSchool, gradeApplying),
    parentName: validateFullName(parentName, 'Parent / Guardian Name'),
    parentEmail: validateEmailAddress(parentEmail, 'Parent Email'),
    parentPhone: validateMobileNumber(parentPhone, 'Mobile Number'),
    whatsappNumber: validateMobileNumber(effectiveWhatsapp, 'WhatsApp Number'),
    address: validateAddressDetails(address),
  };

  const getFieldError = (field: AppFieldKey): string | null =>
    touched[field] || submittedAttempt ? appValidationErrors[field] : null;

  const isFieldValid = (field: AppFieldKey, value: string): boolean =>
    (touched[field] || submittedAttempt) && value.trim().length > 0 && !appValidationErrors[field];

  const markTouched = (field: AppFieldKey) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateVisitDate = (dateStr: string): string | null => {
    if (!dateStr) return 'Preferred visit date is required.';
    const picked = new Date(`${dateStr}T00:00:00`);
    if (Number.isNaN(picked.getTime())) return 'Enter a valid date.';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (picked < today) return 'Please choose today or an upcoming school date.';
    const day = picked.getDay();
    if (visitType !== 'Open House' && (day === 0 || day === 6)) {
      return `${visitType}s take place Monday–Friday. Choose a weekday or switch to Open House.`;
    }
    return null;
  };

  const visitErrors: Record<VisitFieldKey, string | null> = {
    visitFamily:
      !visitFamily.trim() || visitFamily.trim().length < 3
        ? 'Enter a family or parent name (letters only, min 3 chars).'
        : !PERSON_NAME_REGEX.test(visitFamily.trim())
        ? 'Family name must use letters only (no numbers or symbols).'
        : null,
    visitEmail: validateEmailAddress(visitEmail, 'Email Address'),
    visitDate: validateVisitDate(visitDate),
  };

  const getVisitError = (field: VisitFieldKey): string | null =>
    visitTouched[field] || visitSubmittedAttempt ? visitErrors[field] : null;

  const filteredFaqs = ADMISSIONS_FAQS.filter((item) => {
    const matchesCat = faqCategory === 'All' || item.category === faqCategory;
    const q = faqSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const allFilteredOpen =
    filteredFaqs.length > 0 && filteredFaqs.every((f) => openFaqIds.includes(f.id));

  const handleToggleAllFaqs = () => {
    if (allFilteredOpen) {
      const filteredSet = new Set(filteredFaqs.map((f) => f.id));
      setOpenFaqIds((prev) => prev.filter((id) => !filteredSet.has(id)));
    } else {
      const merged = new Set([...openFaqIds, ...filteredFaqs.map((f) => f.id)]);
      setOpenFaqIds(Array.from(merged));
    }
  };

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitSubmittedAttempt(true);
    if (visitErrors.visitFamily || visitErrors.visitEmail || visitErrors.visitDate) {
      return;
    }
    const booked = bookCampusVisit({
      visitType,
      familyName: visitFamily.trim().replace(/\s+/g, ' '),
      email: visitEmail.trim(),
      preferredDate: visitDate,
      studentGrade: visitGrade,
    });
    setVisitSuccessId(booked.id);
    setVisitFamily('');
    setVisitEmail('');
    setVisitTouched({});
    setVisitSubmittedAttempt(false);
    setCelebrationToast({
      id: `toast-${Date.now()}`,
      referenceId: booked.id,
      title: 'Campus Visit Scheduled',
      subtitle: `${booked.visitType} for ${booked.familyName} (${booked.studentGrade}) on ${booked.preferredDate}.`,
    });
  };

  const buildWhatsappUrl = (app: AdmissionsApplication) => {
    const digits = (app.whatsappNumber || app.parentPhone).replace(/[^0-9]/g, '');
    const message = [
      `*Rainbow School Admissions Confirmation*`,
      `Application ID: ${app.id}`,
      `Student Name: ${app.studentName}`,
      `Grade Applying: ${app.gradeApplying}`,
      `Academic Track: ${app.academicInterest || 'General Curriculum'}`,
      `Parent/Guardian: ${app.parentName}`,
      `School Bus Transport: ${app.busRequired ? 'Requested' : 'Parent Drop-Off'}`,
      `Submitted: ${app.submittedAt}`,
      `Status: ${app.status}`,
      ``,
      `School Mail: ${SCHOOL_EMAILS.admissions}`,
      `Thank you for applying to Rainbow School (742 Crestview Meadow Lane). Our Admissions Office will contact you shortly to schedule your Readiness Assessment & Family Interview.`,
    ].join('\n');

    return `https://wa.me/${digits || '15553924810'}?text=${encodeURIComponent(message)}`;
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedAttempt(true);
    setFormError(null);

    const fieldOrder: { key: AppFieldKey; inputId: string }[] = [
      { key: 'studentName', inputId: 'app-student' },
      { key: 'dateOfBirth', inputId: 'app-dob' },
      { key: 'previousSchool', inputId: 'app-prev' },
      { key: 'parentName', inputId: 'app-parent' },
      { key: 'parentEmail', inputId: 'app-email' },
      { key: 'parentPhone', inputId: 'app-phone' },
      { key: 'whatsappNumber', inputId: 'app-whatsapp' },
      { key: 'address', inputId: 'app-address' },
    ];

    const invalidEntries = fieldOrder.filter((f) => Boolean(appValidationErrors[f.key]));
    if (invalidEntries.length > 0) {
      setFormError(
        `Please fix ${invalidEntries.length} highlighted field${
          invalidEntries.length > 1 ? 's' : ''
        } below: ${appValidationErrors[invalidEntries[0].key]}`,
      );
      const firstEl = document.getElementById(invalidEntries[0].inputId);
      if (firstEl) {
        firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstEl.focus();
      }
      return;
    }

    const created = submitApplication({
      studentName: studentName.trim().replace(/\s+/g, ' '),
      dateOfBirth,
      gradeApplying,
      academicInterest,
      parentName: parentName.trim().replace(/\s+/g, ' '),
      parentEmail: parentEmail.trim(),
      parentPhone: parentPhone.trim(),
      whatsappNumber: effectiveWhatsapp.trim(),
      address: address.trim().replace(/\s+/g, ' '),
      busRequired,
      previousSchool: previousSchool.trim() || 'First-Time Enrollment',
      notes: notes.trim() || `${academicInterest} focus · Submitted online.`,
    });
    setSubmittedApp(created);
    setConfettiKey((k) => k + 1);
    setCelebrationToast({
      id: `toast-${Date.now()}`,
      referenceId: created.id,
      title: 'Admission Application Submitted!',
      subtitle: `${created.studentName} (${created.gradeApplying}) is now registered in our Admissions Queue. Your WhatsApp confirmation summary is ready below.`,
      actionLabel: 'Jump to WhatsApp Receipt',
    });
    setStudentName('');
    setParentName('');
    setParentEmail('');
    setParentPhone('');
    setWhatsappNumber('');
    setSameAsPhone(false);
    setAddress('');
    setPreviousSchool('');
    setNotes('');
    setTouched({});
    setSubmittedAttempt(false);

    window.setTimeout(() => {
      document.getElementById('admission-receipt-card')?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 120);
  };

  if (isEnrolledStudent && !showSiblingAdmissions) {
    return (
      <div className="bg-[#FBF9F5] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 h-2 w-full">
              <div className="bg-[#C85A32]" />
              <div className="bg-[#1E6B52]" />
              <div className="bg-[#264B8A]" />
              <div className="bg-[#8B1E2D]" />
            </div>
            <div className="p-6 sm:p-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EFF8F4] border border-[#1E6B52]/25 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#1E6B52]" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#1E6B52] font-semibold">
                    Already Enrolled · Rainbow School Scholar
                  </p>
                  <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#10233D]">
                    You Are Already Enrolled at Rainbow School
                  </h1>
                  <p className="text-sm sm:text-base text-[#44403C] leading-relaxed max-w-2xl">
                    Since you are signed in as an active student, you do not need to schedule a
                    prospective Campus Visit or submit a new Admission Application.
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FBF9F5] border border-stone-200 rounded-xl p-4 text-xs tabular-nums">
                <div>
                  <dt className="text-stone-500">Enrolled Student</dt>
                  <dd className="font-semibold text-[#10233D] mt-0.5 text-sm">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Grade & Roll ID</dt>
                  <dd className="font-mono font-semibold text-[#8B1E2D] mt-0.5 text-sm">
                    {user.gradeOrDept} · {user.identifier}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone-500">School Mail</dt>
                  <dd className="font-mono text-[#10233D] mt-0.5 truncate">{user.email}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {onNavigate && (
                  <>
                    <button
                      type="button"
                      onClick={() => onNavigate('portal')}
                      className="min-h-[46px] px-6 py-2.5 bg-[#10233D] hover:bg-[#8B1E2D] text-white text-sm font-medium rounded-md transition-colors"
                    >
                      Go to Student Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('academics')}
                      className="min-h-[46px] px-5 py-2.5 bg-white border border-stone-300 hover:bg-[#F3EFE6] text-[#10233D] text-sm font-medium rounded-md transition-colors"
                    >
                      View My Courses
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('about')}
                      className="min-h-[46px] px-5 py-2.5 bg-white border border-stone-300 hover:bg-[#F3EFE6] text-[#10233D] text-sm font-medium rounded-md transition-colors"
                    >
                      Campus Schedule & Calendar
                    </button>
                  </>
                )}
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
                <span>Applying on behalf of a younger sibling or family friend?</span>
                <button
                  type="button"
                  onClick={() => setShowSiblingAdmissions(true)}
                  className="font-medium text-[#8B1E2D] hover:text-[#10233D] underline underline-offset-4 text-left sm:text-right"
                >
                  Open Prospective Admissions & Visit Forms
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F5]">
      <ConfettiBurst burstKey={confettiKey} />
      <SubmissionToast
        toast={celebrationToast}
        onDismiss={() => setCelebrationToast(null)}
        onAction={() => {
          setCelebrationToast(null);
          document.getElementById('admission-receipt-card')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }}
      />

      {/* Page Masthead */}
      <section className="bg-[#10233D] text-white border-b border-[#1E3B62]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs uppercase tracking-[0.18em] text-[#E8C587]">
              Admissions · 2026–2027 Academic Year
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight">
              Rainbow School Admissions
            </h1>
            <p className="text-base text-stone-200 leading-relaxed max-w-xl">
              Now welcoming applicants for KG-1 through Grade 10. Visit campus or submit your online
              application below.
            </p>
          </div>
          <div className="lg:col-span-5 bg-white/10 border border-white/15 rounded-2xl p-6 space-y-3 hover:bg-white/15 transition-colors duration-200">
            <p className="text-xs uppercase tracking-widest text-[#E8C587]">Key Admissions Dates</p>
            <dl className="space-y-2 text-sm tabular-nums">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                <dt className="text-stone-300">Priority Deadline</dt>
                <dd className="font-medium text-white">January 31, 2027</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                <dt className="text-stone-300">Scholarship Review</dt>
                <dd className="font-medium text-white">February 15, 2027</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                <dt className="text-stone-300">Decisions Released</dt>
                <dd className="font-medium text-white">March 15, 2027</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-300">Admissions Mail</dt>
                <dd className="font-mono text-xs text-[#E8C587]">{SCHOOL_EMAILS.admissions}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Section 01: Discover & Visit Rainbow */}
      <section className="py-12 md:py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B1E2D]">
                01. Discover &amp; Visit Rainbow
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#10233D]">
                Experience Our Campus Firsthand
              </h2>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  title: 'Campus Tours',
                  desc: '45-minute weekday guided walks across Kindergarten, labs, and courtyards.',
                  accent: '#C85A32',
                },
                {
                  title: 'Student Shadow Days',
                  desc: 'Grades 3–10 visitors spend a morning attending classes with a host scholar.',
                  accent: '#1E6B52',
                },
                {
                  title: 'Open Houses',
                  desc: 'Saturday showcases featuring live lab demos, athletics, and faculty Q&A.',
                  accent: '#264B8A',
                },
              ].map((visitOption) => (
                <div
                  key={visitOption.title}
                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#10233D]/40"
                >
                  <div className="h-1 w-full" style={{ backgroundColor: visitOption.accent }} />
                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif text-xl font-semibold text-[#10233D]">
                      {visitOption.title}
                    </h3>
                    <p className="text-sm text-[#44403C] mt-0.5">{visitOption.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <SlideInFrame distancePx={54}>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                <ResilientImage
                  src={SCHOOL_IMAGES.admissionsLibrary}
                  alt="Rainbow School library and seminar tables"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  fallbackLabel="Rainbow School Seminar Library"
                />
              </div>
            </SlideInFrame>
          </div>

          {/* Interactive Visit Scheduler */}
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-200">
            <div className="h-1.5 w-full bg-[#10233D]" />
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#10233D]">
                  Plan a Campus Visit
                </h3>
                <p className="text-sm text-stone-600 mt-0.5">
                  Confirmed by our Admissions Office within one school day.
                </p>
              </div>

              <form onSubmit={handleBookVisit} noValidate className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#10233D] mb-2">
                    Visit Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(['Campus Tour', 'Student Shadow Day', 'Open House'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setVisitType(type)}
                        className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-md border transition-all duration-150 ${
                          visitType === type
                            ? 'bg-[#10233D] text-white border-[#10233D] shadow-xs'
                            : 'bg-[#FBF9F5] text-[#10233D] border-stone-300 hover:bg-[#10233D]/5 hover:border-[#10233D]/50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="visit-family" className="block text-xs font-medium text-[#10233D] mb-1.5">
                      Parent / Family Name *
                    </label>
                    <input
                      id="visit-family"
                      type="text"
                      value={visitFamily}
                      onChange={(e) => setVisitFamily(e.target.value)}
                      onBlur={() => setVisitTouched((p) => ({ ...p, visitFamily: true }))}
                      placeholder="e.g. The Nair Family"
                      aria-invalid={Boolean(getVisitError('visitFamily'))}
                      className={`w-full min-h-[44px] px-3.5 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                        getVisitError('visitFamily')
                          ? 'border-[#8B1E2D] bg-[#FDF2F4]/50 focus:ring-[#8B1E2D]'
                          : 'border-stone-300 focus:ring-[#10233D]'
                      }`}
                    />
                    {getVisitError('visitFamily') && (
                      <p className="mt-1 text-[11px] text-[#8B1E2D] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{getVisitError('visitFamily')}</span>
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="visit-email" className="block text-xs font-medium text-[#10233D] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="visit-email"
                      type="email"
                      value={visitEmail}
                      onChange={(e) => setVisitEmail(e.target.value)}
                      onBlur={() => setVisitTouched((p) => ({ ...p, visitEmail: true }))}
                      placeholder="parent@example.com"
                      aria-invalid={Boolean(getVisitError('visitEmail'))}
                      className={`w-full min-h-[44px] px-3.5 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                        getVisitError('visitEmail')
                          ? 'border-[#8B1E2D] bg-[#FDF2F4]/50 focus:ring-[#8B1E2D]'
                          : 'border-stone-300 focus:ring-[#10233D]'
                      }`}
                    />
                    {getVisitError('visitEmail') && (
                      <p className="mt-1 text-[11px] text-[#8B1E2D] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{getVisitError('visitEmail')}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="visit-date" className="block text-xs font-medium text-[#10233D] mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      id="visit-date"
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      onBlur={() => setVisitTouched((p) => ({ ...p, visitDate: true }))}
                      aria-invalid={Boolean(getVisitError('visitDate'))}
                      className={`w-full min-h-[44px] px-3.5 py-2 border rounded-md text-sm tabular-nums focus:outline-none focus:ring-2 ${
                        getVisitError('visitDate')
                          ? 'border-[#8B1E2D] bg-[#FDF2F4]/50 focus:ring-[#8B1E2D]'
                          : 'border-stone-300 focus:ring-[#10233D]'
                      }`}
                    />
                    {getVisitError('visitDate') && (
                      <p className="mt-1 text-[11px] text-[#8B1E2D] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{getVisitError('visitDate')}</span>
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="visit-grade" className="block text-xs font-medium text-[#10233D] mb-1.5">
                      Prospective Grade
                    </label>
                    <select
                      id="visit-grade"
                      value={visitGrade}
                      onChange={(e) => setVisitGrade(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 border border-stone-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#10233D]"
                    >
                      {ALL_GRADES.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] px-6 py-3 bg-[#8B1E2D] hover:bg-[#10233D] text-white text-sm font-medium rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Visit Request</span>
                </button>

                {visitSuccessId && (
                  <div className="p-3.5 bg-[#F3EFE6] border border-stone-300 rounded-md text-xs text-[#10233D] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0 mt-0.5" />
                    <span>
                      Visit request <strong className="font-mono">{visitSuccessId}</strong> scheduled.
                      Check in at Main Heritage Hall 10 minutes prior.
                    </span>
                  </div>
                )}
              </form>

              <div className="pt-4 border-t border-stone-200">
                <p className="text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">
                  Upcoming Scheduled Campus Visits ({visits.length})
                </p>
                <div className="divide-y divide-stone-100 max-h-40 overflow-y-auto">
                  {visits.map((v) => (
                    <div key={v.id} className="py-2 flex items-center justify-between text-xs gap-3">
                      <div>
                        <span className="font-medium text-[#10233D]">{v.familyName}</span>
                        <span className="text-stone-500"> · {v.visitType} ({v.studentGrade})</span>
                      </div>
                      <span className="font-mono text-stone-600 tabular-nums shrink-0">{v.preferredDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Vibrant How to Apply & Colorful Class Divisions Showcase */}
      <section className="py-14 md:py-20 bg-[#F3EFE6]/70 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
          {/* Colorful 4-Step How to Apply */}
          <div className="space-y-8">
            <div className="max-w-2xl space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B1E2D]">
                02. Step-by-Step Admissions Pathway
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#10233D]">
                How to Apply (KG-1 to Grade 10)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {APPLY_STEPS.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.num}
                    className="group bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div>
                      <div className="h-2 w-full" style={{ backgroundColor: item.accent }} />
                      <div
                        className="px-5 py-4 border-b border-stone-200/60 flex items-center justify-between"
                        style={{ backgroundColor: item.softBg }}
                      >
                        <span
                          className="font-serif text-3xl font-bold tabular-nums"
                          style={{ color: item.accent }}
                        >
                          {item.num}
                        </span>
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110"
                          style={{ backgroundColor: item.accent }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-serif text-2xl font-semibold text-[#10233D] group-hover:text-[#8B1E2D] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#44403C] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className="px-5 py-3 border-t border-stone-100 bg-[#FBF9F5] flex items-center justify-between text-xs font-mono">
                      <span className="text-stone-500">Timeline</span>
                      <span className="font-medium" style={{ color: item.accent }}>
                        {item.timing}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Rich & Attractive Class Divisions, Ratio & Campus Schedule */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <h3 className="font-serif text-3xl font-semibold text-[#10233D]">
                  Class Divisions, Ratio & Campus Schedule
                </h3>
                <p className="text-sm text-stone-600 mt-1">
                  Intentional small-group seminar sizes across all 12 grades (KG-1 through 10th Grade).
                </p>
              </div>
              <span className="text-xs font-mono text-[#8B1E2D] font-medium tabular-nums">
                25 Seats per Class Section · 2026–2027
              </span>
            </div>

            {/* Interactive Colorful Division Cards with Classroom Photography */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {GRADE_DIVISIONS.map((div, idx) => (
                <div
                  key={div.id}
                  className="group bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="h-2 w-full" style={{ backgroundColor: div.accentHex }} />
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <SlideInFrame className="w-full h-full" delayMs={idx * 90}>
                      <ResilientImage
                        src={div.image}
                        alt={div.label}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        fallbackLabel={div.label}
                      />
                    </SlideInFrame>
                  </div>
                  <div
                    className="px-5 py-3.5 border-b border-stone-200/70"
                    style={{ backgroundColor: div.softBg }}
                  >
                    <p
                      className="text-xs font-mono font-semibold tabular-nums"
                      style={{ color: div.accentHex }}
                    >
                      {div.grades} · {div.ageRange}
                    </p>
                    <h4 className="font-serif text-xl font-semibold text-[#10233D] mt-0.5">
                      {div.label}
                    </h4>
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Section Limit</span>
                      <span className="font-medium text-[#10233D]">25 Students</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Hours
                      </span>
                      <span className="font-mono font-medium text-[#10233D] tabular-nums">
                        {div.scheduleHours}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-stone-500">Focus</span>
                      <span className="font-medium truncate max-w-[140px]" style={{ color: div.accentHex }}>
                        {div.focusTag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Rich, Detailed Online Application Portal with WhatsApp & School Mail */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Application Dossier Form */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
            {/* Multi-band Rainbow Academic Accent Top Strip */}
            <div className="grid grid-cols-4 h-2">
              <div className="bg-[#C85A32]" />
              <div className="bg-[#1E6B52]" />
              <div className="bg-[#264B8A]" />
              <div className="bg-[#8B1E2D]" />
            </div>

            <div className="p-6 sm:p-8 space-y-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B1E2D] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>03. Online Admission Dossier</span>
                  </p>
                  <h2 className="font-serif text-3xl font-semibold text-[#10233D] mt-1">
                    Student Admission Application
                  </h2>
                  <p className="text-sm text-stone-600 mt-0.5">
                    Logged for faculty review with instant WhatsApp summary upon submission.
                  </p>
                </div>
                <div className="bg-[#F3EFE6] border border-stone-200 rounded-lg px-4 py-2.5 text-xs shrink-0">
                  <p className="text-stone-500">Admissions School Mail</p>
                  <a
                    href={`mailto:${SCHOOL_EMAILS.admissions}`}
                    className="font-mono font-medium text-[#10233D] hover:text-[#8B1E2D] underline underline-offset-2"
                  >
                    {SCHOOL_EMAILS.admissions}
                  </a>
                </div>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="p-4 bg-[#FDF2F4] border border-[#8B1E2D]/40 rounded-lg text-xs text-[#8B1E2D] flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Please verify your application details</p>
                    <p className="mt-0.5 text-[#721623]">{formError}</p>
                  </div>
                </div>
              )}

              {/* Clear Verification Rules Summary */}
              <div className="bg-[#FBF9F5] border border-stone-200 rounded-lg px-4 py-3 text-[11px] text-stone-600 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <span>
                  <strong className="text-[#10233D]">Names:</strong> First &amp; Last, letters only
                </span>
                <span>
                  <strong className="text-[#10233D]">Mobile / WhatsApp:</strong> 10–15 valid digits
                </span>
                <span>
                  <strong className="text-[#10233D]">Email:</strong> Valid domain (name@site.com)
                </span>
                <span>
                  <strong className="text-[#10233D]">Details:</strong> Age fit &amp; street address
                </span>
              </div>

              <form onSubmit={handleApplicationSubmit} noValidate className="space-y-8">
                {/* Part A: Student Profile */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                    <span className="w-6 h-6 rounded-md bg-[#10233D] text-white text-xs font-mono flex items-center justify-center">
                      A
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-[#10233D]">
                      Student Profile & Academic Track
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="app-student" className="text-xs font-medium text-[#10233D]">
                          Student Full Name *
                        </label>
                        {isFieldValid('studentName', studentName) && (
                          <span className="text-[11px] font-medium text-[#1E6B52] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        )}
                      </div>
                      <input
                        id="app-student"
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        onBlur={() => markTouched('studentName')}
                        placeholder="e.g. Rohan Deshmukh"
                        aria-invalid={Boolean(getFieldError('studentName'))}
                        className={`w-full min-h-[44px] px-3.5 py-2 border rounded-md text-sm focus:bg-white focus:outline-none focus:ring-2 ${
                          getFieldError('studentName')
                            ? 'bg-[#FDF2F4]/50 border-[#8B1E2D] focus:ring-[#8B1E2D]'
                            : isFieldValid('studentName', studentName)
                            ? 'bg-[#EFF8F4]/40 border-[#1E6B52]/60 focus:ring-[#1E6B52]'
                            : 'bg-[#FBF9F5] border-stone-300 focus:ring-[#10233D]'
                        }`}
                      />
                      {getFieldError('studentName') ? (
                        <p className="mt-1 text-[11px] text-[#8B1E2D] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{getFieldError('studentName')}</span>
                        </p>
                      ) : (
                        <p className="mt-1 text-[11px] text-stone-500">
                          First &amp; Last name using letters only (3–60 characters).
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="app-dob" className="text-xs font-medium text-[#10233D]">
                          Date of Birth *
                        </label>
                        {isFieldValid('dateOfBirth', dateOfBirth) && (
                          <span className="text-[11px] font-medium text-[#1E6B52] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Age Fit
                          </span>
                        )}
                      </div>
                      <input
                        id="app-dob"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        onBlur={() => markTouched('dateOfBirth')}
                        aria-invalid={Boolean(getFieldError('dateOfBirth'))}
                        className={`w-full min-h-[44px] px-3.5 py-2 border rounded-md text-sm tabular-nums focus:bg-white focus:outline-none focus:ring-2 ${
                          getFieldError('dateOfBirth')
                            ? 'bg-[#FDF2F4]/50 border-[#8B1E2D] focus:ring-[#8B1E2D]'
                            : 'bg-[#FBF9F5] border-stone-300 focus:ring-[#10233D]'
                        }`}
                      />
                      {getFieldError('dateOfBirth') && (
                        <p className="mt-1 text-[11px] text-[#8B1E2D] flex items-start gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{getFieldError('dateOfBirth')}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="app-grade" className="block text-xs font-medium text-[#10233D] mb-1.5">
                        Grade Applying For (KG-1 to 10th) *
                      </label>
                      <select
                        id="app-grade"
                        value={gradeApplying}
                        onChange={(e) => {
                          setGradeApplying(e.target.value);
                          markTouched('dateOfBirth');
                        }}
                        className="w-full min-h-[44px] px-3.5 py-2 bg-[#FBF9F5] border border-stone-300 rounded-md text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10233D]"
                      >
                        {ALL_GRADES.map((g) => (
                          <option key={g} value={g}>
                            {g === 'Grade 10' ? 'Grade 10 (10th Standard)' : g}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="app-prev" className="text-xs font-medium text-[#10233D]">
                          Current / Previous School{' '}
                          {gradeApplying === 'KG-1' || gradeApplying === 'KG-2' ? '(Optional)' : '*'}
                        </label>
                        {isFieldValid('previousSchool', previousSchool) && (
                          <span className="text-[11px] font-medium text-[#1E6B52] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        )}
                      </div>
                      <input
                        id="app-prev"
                        type="text"
                        value={previousSchool}
                        onChange={(e) => setPreviousSchool(e.target.value)}
                        onBlur={() => markTouched('previousSchool')}
                        placeholder={
                          gradeApplying === 'KG-1' || gradeApplying === 'KG-2'
                            ? 'Optional for Kindergarten applicants'
                            : 'e.g. Oakridge Public Academy'
                        }
                        aria-invalid={Boolean(getFieldError('previousSchool'))}
                        className={`w-full min-h-[44px] px-3.5 py-2 border rounded-md text-sm focus:bg-white focus:outline-none focus:ring-2 ${
                          getFieldError('previousSchool')
                            ? 'bg-[#FDF2F4]/50 border-[#8B1E2D] focus:ring-[#8B1E2D]'
                            : isFieldValid('previousSchool', previousSchool)
                            ? 'bg-[#EFF8F4]/40 border-[#1E6B52]/60 focus:ring-[#1E6B52]'
                            : 'bg-[#FBF9F5] border-stone-300 focus:ring-[#10233D]'
                        }`}
                      />
                      {getFieldError('previousSchool') && (
                        <p className="mt-1 text-[11px] text-[#8B1E2D] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{getFieldError('previousSchool')}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#10233D] mb-2">
                      Primary Academic & Co-Curricular Interest
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'STEM & Robotics',
                        'Classical Humanities',
                        'Visual & Performing Arts',
                        'Varsity Athletics',
                      ].map((track) => (
                        <button
                          key={track}
                          type="button"
                          onClick={() => setAcademicInterest(track)}
                          className={`min-h-[42px] px-3 py-2 text-xs font-medium rounded-md border transition-all duration-150 ${
                            academicInterest === track
                              ? 'bg-[#264B8A] text-white border-[#264B8A] shadow-xs'
                              : 'bg-[#FBF9F5] text-[#10233D] border-stone-300 hover:bg-stone-100'
                          }`}
                        >
                          {track}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Part B: Guardian Contact, WhatsApp & Transport */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                    <span className="w-6 h-6 rounded-md bg-[#1E6B52] text-white text-xs font-mono flex items-center justify-center">
                      B
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-[#10233D]">
                      Parent Contact, WhatsApp & Campus Transport
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="app-parent" className="text-xs font-medium text-[#10233D]">
                          Parent / Guardian Full Name *
                        </label>
                        {isFieldValid('parentName', parentName) && (
                          <span className="text-[11px] font-medium text-[#1E6B52] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        )}
                      </div>
                      <input
                        id="app-parent"
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        onBlur={() => markTouched('parentName')}
                        placeholder="e.g. Priya Deshmukh"
                        aria-invalid={Boolean(getFieldError('parentName'))}
                        className={`w-full min-h-[44px] px-3.5 py-2 border rounded-md text-sm focus:bg-white focus:outline-none focus:ring-2 ${
                          getFieldError('parentName')
                            ? 'bg-[#FDF2F4]/50 border-[#8B1E2D] focus:ring-[#8B1E2D]'
                            : isFieldValid('parentName', parentName)
                            ? 'bg-[#EFF8F4]/40 border-[#1E6B52]/60 focus:ring-[#1E6B52]'
                            : 'bg-[#FBF9F5] border-stone-300 focus:ring-[#10233D]'
                        }`}
                      />
                      {getFieldError('parentName') ? (
                        <p className="mt-1 text-[11px] text-[#8B1E2D] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{getFieldError('parentName')}</span>
                        </p>
                      ) : (
                        <p className="mt-1 text-[11px] text-stone-500">
                          First &amp; Last name using letters only.
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="app-email" className="text-xs font-medium text-[#10233D]">
                          Parent Email Address *
                        </label>
                        {isFieldValid('parentEmail', parentEmail) && (
                          <span className="text-[11px] font-medium text-[#1E6B52] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Valid Email
                          </span>
                        )}
                      </div>
                      <input
                        id="app-email"
                        type="email"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        onBlur={() => markTouched('parentEmail')}
                        placeholder="parent@example.com"
                        aria-invalid={Boolean(getFieldError('parentEmail'))}
                        className={`w-full min-h-[44px] px-3.5 py-2 border rounded-md text-sm focus:bg-white focus:outline-none focus:ring-2 ${
                          getFieldError('parentEmail')
                            ? 'bg-[#FDF2F4]/50 border-[#8B1E2D] focus:ring-[#8B1E2D]'
                            : isFieldValid('parentEmail', parentEmail)
                            ? 'bg-[#EFF8F4]/40 border-[#1E6B52]/60 focus:ring-[#1E6B52]'
                            : 'bg-[#FBF9F5] border-stone-300 focus:ring-[#10233D]'
                        }`}
                      />
                      {getFieldError('parentEmail') ? (
                        <p className="mt-1 text-[11px] text-[#8B1E2D] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{getFieldError('parentEmail')}</span>
                        </p>
                      ) : (
                        <p className="mt-1 text-[11px] text-stone-500">
                          Admissions updates &amp; interview invite will be emailed here.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="app-phone" className="text-xs font-medium text-[#10233D]">
                          Primary Mobile Number *
                        </label>
                        {isFieldValid('parentPhone', parentPhone) && (
                          <span className="text-[11px] font-medium text-[#1E6B52] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Valid Number
                          </span>
                        )}
                      </div>
                      <input
                        id="app-phone"
                        type="tel"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        onBlur={() => markTouched('parentPhone')}
                        placeholder="+91 98765 43210 or 9876543210"
                        aria-invalid={Boolean(getFieldError('parentPhone'))}
                        className={`w-full min-h-[44px] px-3.5 py-2 border rounded-md text-sm tabular-nums focus:bg-white focus:outline-none focus:ring-2 ${
                          getFieldError('parentPhone')
                            ? 'bg-[#FDF2F4]/50 border-[#8B1E2D] focus:ring-[#8B1E2D]'
                            : isFieldValid('parentPhone', parentPhone)
                            ? 'bg-[#EFF8F4]/40 border-[#1E6B52]/60 focus:ring-[#1E6B52]'
                            : 'bg-[#FBF9F5] border-stone-300 focus:ring-[#10233D]'
                        }`}
                      />
                      {getFieldError('parentPhone') ? (
                        <p className="mt-1 text-[11px] text-[#8B1E2D] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{getFieldError('parentPhone')}</span>
                        </p>
                      ) : (
                        <p className="mt-1 text-[11px] text-stone-500">
                          10-digit mobile or +country code with 11–15 digits.
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <label htmlFor="app-whatsapp" className="text-xs font-medium text-[#10233D]">
                          Student / Parent WhatsApp Number *
                        </label>
                        <label className="inline-flex items-center gap-1.5 text-[11px] text-[#15803D] font-medium cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={sameAsPhone}
                            onChange={(e) => {
                              setSameAsPhone(e.target.checked);
                              if (e.target.checked) markTouched('whatsappNumber');
                            }}
                            className="w-3.5 h-3.5 accent-[#15803D] rounded"
                          />
                          <span>Same as mobile</span>
                        </label>
                      </div>
                      <input
                        id="app-whatsapp"
                        type="tel"
                        value={effectiveWhatsapp}
                        disabled={sameAsPhone}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        onBlur={() => markTouched('whatsappNumber')}
                        placeholder="With country code (e.g. +91 9876543210)"
                        aria-invalid={Boolean(getFieldError('whatsappNumber'))}
                        className={`w-full min-h-[44px] px-3.5 py-2 border rounded-md text-sm tabular-nums focus:bg-white focus:outline-none focus:ring-2 disabled:opacity-75 ${
                          getFieldError('whatsappNumber')
                            ? 'bg-[#FDF2F4]/50 border-[#8B1E2D] focus:ring-[#8B1E2D]'
                            : isFieldValid('whatsappNumber', effectiveWhatsapp)
                            ? 'bg-[#EFFAF3] border-[#16A34A]/60 focus:ring-[#15803D]'
                            : 'bg-[#EFFAF3] border-[#16A34A]/40 focus:ring-[#15803D]'
                        }`}
                      />
                      {getFieldError('whatsappNumber') ? (
                        <p className="mt-1 text-[11px] text-[#8B1E2D] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{getFieldError('whatsappNumber')}</span>
                        </p>
                      ) : (
                        <p className="mt-1 text-[11px] text-stone-500">
                          Must be a valid 10–15 digit WhatsApp number for admission receipt.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="app-address" className="text-xs font-medium text-[#10233D]">
                          Residential Neighborhood / Street Address *
                        </label>
                        {isFieldValid('address', address) && (
                          <span className="text-[11px] font-medium text-[#1E6B52] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        )}
                      </div>
                      <input
                        id="app-address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onBlur={() => markTouched('address')}
                        placeholder="e.g. North Oakridge, 42 Maple Ave"
                        aria-invalid={Boolean(getFieldError('address'))}
                        className={`w-full min-h-[44px] px-3.5 py-2 border rounded-md text-sm focus:bg-white focus:outline-none focus:ring-2 ${
                          getFieldError('address')
                            ? 'bg-[#FDF2F4]/50 border-[#8B1E2D] focus:ring-[#8B1E2D]'
                            : isFieldValid('address', address)
                            ? 'bg-[#EFF8F4]/40 border-[#1E6B52]/60 focus:ring-[#1E6B52]'
                            : 'bg-[#FBF9F5] border-stone-300 focus:ring-[#10233D]'
                        }`}
                      />
                      {getFieldError('address') ? (
                        <p className="mt-1 text-[11px] text-[#8B1E2D] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{getFieldError('address')}</span>
                        </p>
                      ) : (
                        <p className="mt-1 text-[11px] text-stone-500">
                          Used for school bus stop assignment (min 5 characters).
                        </p>
                      )}
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-[#10233D] mb-1.5">
                        School Bus Transport
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setBusRequired(true)}
                          className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-md border flex items-center justify-center gap-1.5 transition-colors ${
                            busRequired
                              ? 'bg-[#1E6B52] text-white border-[#1E6B52]'
                              : 'bg-[#FBF9F5] text-stone-600 border-stone-300'
                          }`}
                        >
                          <Bus className="w-3.5 h-3.5" />
                          <span>Bus Route Needed</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setBusRequired(false)}
                          className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                            !busRequired
                              ? 'bg-[#10233D] text-white border-[#10233D]'
                              : 'bg-[#FBF9F5] text-stone-600 border-stone-300'
                          }`}
                        >
                          Parent Drop-Off
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part C: Document Readiness Checklist & Notes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                    <span className="w-6 h-6 rounded-md bg-[#8B1E2D] text-white text-xs font-mono flex items-center justify-center">
                      C
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-[#10233D]">
                      Document Readiness & Additional Notes
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'birthCert' as const, label: 'Birth Certificate Copy' },
                      { key: 'reportCard' as const, label: 'Prior Report Card / TC' },
                      { key: 'immunization' as const, label: 'Health & Immunization' },
                    ].map((doc) => (
                      <label
                        key={doc.key}
                        className={`p-3 rounded-lg border text-xs flex items-center gap-2.5 cursor-pointer transition-colors ${
                          docsReady[doc.key]
                            ? 'bg-[#F3EFE6] border-[#10233D]/40 text-[#10233D] font-medium'
                            : 'bg-[#FBF9F5] border-stone-200 text-stone-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={docsReady[doc.key]}
                          onChange={(e) =>
                            setDocsReady((prev) => ({ ...prev, [doc.key]: e.target.checked }))
                          }
                          className="w-4 h-4 accent-[#10233D]"
                        />
                        <FileCheck2 className="w-4 h-4 text-[#8B1E2D] shrink-0" />
                        <span>{doc.label}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="app-notes" className="block text-xs font-medium text-[#10233D] mb-1.5">
                      Student Achievements, Learning Preferences or Scholarship Notes
                    </label>
                    <textarea
                      id="app-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us about your child’s strengths, awards, sports interests, or any questions..."
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-stone-300 rounded-md text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10233D]"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 text-xs text-[#10233D] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sendWhatsappConfirm}
                      onChange={(e) => setSendWhatsappConfirm(e.target.checked)}
                      className="w-4 h-4 accent-[#15803D] rounded"
                    />
                    <span className="flex items-center gap-1.5 font-medium">
                      <WhatsAppLogo className="w-4 h-4 text-[#15803D]" />
                      Prepare instant admission confirmation receipt for student’s WhatsApp
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto min-h-[50px] px-8 py-3 bg-[#8B1E2D] hover:bg-[#10233D] text-white text-sm font-medium rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Complete & Submit Admission Application
                </button>

                {/* Post-Submission WhatsApp Receipt Card */}
                {submittedApp && (
                  <div
                    id="admission-receipt-card"
                    className="animate-receipt-pop p-5 sm:p-6 bg-[#EFFAF3] border-2 border-[#16A34A]/45 rounded-xl space-y-4 shadow-md"
                  >
                    <div className="flex items-start gap-3 text-sm text-[#10233D]">
                      <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold text-[#14532D]">
                          Admission Application <span className="font-mono">{submittedApp.id}</span> Completed
                        </p>
                        <p className="text-xs text-stone-700">
                          Your details for <strong>{submittedApp.studentName}</strong> ({submittedApp.gradeApplying}) are logged in the Admissions Queue.
                        </p>
                      </div>
                    </div>

                    {sendWhatsappConfirm && (
                      <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#15803D] flex items-center gap-1.5">
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp Admission Summary Ready ({submittedApp.whatsappNumber})
                          </span>
                          <span className="font-mono text-stone-400">{submittedApp.submittedAt}</span>
                        </div>
                        <pre className="text-xs text-stone-700 bg-[#FBF9F5] p-3 rounded border border-stone-100 whitespace-pre-wrap font-sans leading-relaxed">
{`Rainbow School Admissions Confirmation
Application ID: ${submittedApp.id}
Student Name: ${submittedApp.studentName}
Grade Applying: ${submittedApp.gradeApplying}
Academic Track: ${submittedApp.academicInterest}
Parent/Guardian: ${submittedApp.parentName}
Bus Transport: ${submittedApp.busRequired ? 'Requested' : 'Parent Drop-Off'}
Status: ${submittedApp.status}`}
                        </pre>
                        <a
                          href={buildWhatsappUrl(submittedApp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] w-full sm:w-auto px-5 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-medium rounded-md inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <WhatsAppLogo className="w-4 h-4" />
                          <span>Send Admission Details via WhatsApp</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Admissions Contact & School Mail Directory */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#10233D] text-white rounded-xl p-6 space-y-4 hover:shadow-lg transition-shadow duration-200">
              <p className="text-xs uppercase tracking-widest text-[#E8C587]">
                Admissions & School Mail
              </p>
              <div>
                <h3 className="font-serif text-2xl font-semibold">Evelyn Sterling</h3>
                <p className="text-xs text-stone-300">Director of Admissions · Rainbow School</p>
              </div>
              <div className="space-y-2.5 text-sm text-stone-200 pt-2 border-t border-white/15">
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#E8C587]" />
                  <span className="tabular-nums">(555) 392-4810 · Ext. 103</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#E8C587]" />
                  <a href={`mailto:${SCHOOL_EMAILS.admissions}`} className="hover:underline">
                    {SCHOOL_EMAILS.admissions}
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#E8C587]" />
                  <a href={`mailto:${SCHOOL_EMAILS.general}`} className="hover:underline">
                    {SCHOOL_EMAILS.general}
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#E8C587]" />
                  <span>Main Heritage Hall, Suite 102</span>
                </p>
              </div>
            </div>

            {/* Recent Applications Status Board */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold text-[#10233D]">
                  Recent Applications
                </h3>
                <span className="text-xs font-mono text-stone-500 tabular-nums">
                  {applications.length} Active
                </span>
              </div>
              <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                {applications.map((app) => (
                  <div key={app.id} className="py-3 space-y-1 hover:bg-stone-50/70 px-1.5 rounded transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-[#10233D]">{app.studentName}</span>
                      <span className="text-xs font-mono text-[#8B1E2D]">{app.status}</span>
                    </div>
                    <p className="text-xs text-stone-500 tabular-nums">
                      {app.id} · {app.gradeApplying} · {app.submittedAt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04: Parent Admissions FAQ (Documents, Timelines & School Policies) */}
      <section
        id="admissions-faq"
        className="py-14 md:py-20 bg-[#F3EFE6]/70 border-t border-stone-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B1E2D] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>04. Parent Questions &amp; Policies</span>
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#10233D]">
                Admissions FAQs
              </h2>
              <p className="text-sm text-[#44403C]">
                Quick answers on required documents, key dates, transport, and class limits.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleToggleAllFaqs}
                disabled={filteredFaqs.length === 0}
                className="min-h-[44px] px-4 py-2 text-xs font-medium text-[#10233D] bg-white border border-stone-300 rounded-md hover:bg-[#10233D] hover:text-white hover:border-[#10233D] transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
              >
                {allFilteredOpen ? 'Collapse All Answers' : 'Expand All Answers'}
              </button>
            </div>
          </div>

          {/* Filter Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-stone-200 rounded-xl p-4">
            <div
              role="tablist"
              aria-label="Filter admissions FAQs by topic"
              className="flex flex-wrap items-center gap-1.5"
            >
              {(['All', 'Documents', 'Timelines', 'School Policies'] as const).map((cat) => {
                const count =
                  cat === 'All'
                    ? ADMISSIONS_FAQS.length
                    : ADMISSIONS_FAQS.filter((f) => f.category === cat).length;
                const active = faqCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFaqCategory(cat)}
                    className={`min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#10233D] text-white'
                        : 'bg-[#FBF9F5] text-[#10233D] hover:bg-[#F3EFE6]'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search
                className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search documents, bus, dates..."
                aria-label="Search admissions frequently asked questions"
                className="w-full min-h-[42px] pl-10 pr-3.5 py-2 bg-[#FBF9F5] border border-stone-300 rounded-md text-xs text-[#10233D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10233D]"
              />
            </div>
          </div>

          {/* FAQ Accordion Grid */}
          {filteredFaqs.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-xl p-10 text-center space-y-3">
              <p className="font-serif text-2xl text-[#10233D]">
                No matching questions found
              </p>
              <p className="text-sm text-stone-600">
                Try clearing your search filter or write directly to{' '}
                <a
                  href={`mailto:${SCHOOL_EMAILS.admissions}`}
                  className="text-[#8B1E2D] underline underline-offset-2 font-medium"
                >
                  {SCHOOL_EMAILS.admissions}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => {
                  setFaqCategory('All');
                  setFaqSearch('');
                }}
                className="min-h-[44px] px-5 py-2 bg-[#10233D] text-white text-xs font-medium rounded-md hover:bg-[#8B1E2D] transition-colors"
              >
                Reset FAQ Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-3">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openFaqIds.includes(faq.id);
                  const numLabel = String(idx + 1).padStart(2, '0');
                  return (
                    <article
                      key={faq.id}
                      className="bg-white border border-stone-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-[#10233D]/40 hover:shadow-sm"
                    >
                      <div
                        className="h-1 w-full transition-opacity duration-200"
                        style={{
                          backgroundColor: faq.accentHex,
                          opacity: isOpen ? 1 : 0.45,
                        }}
                      />
                      <h3>
                        <button
                          type="button"
                          id={`faq-btn-${faq.id}`}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${faq.id}`}
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full px-5 sm:px-6 py-4 text-left flex items-start justify-between gap-4 hover:bg-[#FBF9F5] transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-stone-500">
                              <span
                                className="font-mono font-semibold tabular-nums"
                                style={{ color: faq.accentHex }}
                              >
                                {numLabel}.
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-medium text-stone-600">{faq.category}</span>
                            </div>
                            <span className="block font-serif text-xl sm:text-[22px] font-semibold text-[#10233D] leading-snug">
                              {faq.question}
                            </span>
                          </div>
                          <span
                            className={`w-8 h-8 rounded-md border border-stone-200 bg-[#FBF9F5] flex items-center justify-center shrink-0 mt-1 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 bg-[#10233D] text-white border-[#10233D]' : 'text-[#10233D]'
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </button>
                      </h3>

                      {isOpen && (
                        <div
                          id={`faq-panel-${faq.id}`}
                          role="region"
                          aria-labelledby={`faq-btn-${faq.id}`}
                          className="px-5 sm:px-6 pb-5 pt-2 border-t border-stone-100 text-sm text-[#44403C] leading-relaxed max-w-prose"
                        >
                          {faq.answer}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              {/* Margin Summary Card for Quick Reference */}
              <aside className="lg:col-span-4 space-y-5">
                <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
                  <div className="h-1.5 w-full bg-[#8B1E2D]" />
                  <div className="p-6 space-y-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#8B1E2D] font-medium">
                      Document Checklist at a Glance
                    </p>
                    <h3 className="font-serif text-2xl font-semibold text-[#10233D]">
                      Before You Submit
                    </h3>
                    <dl className="space-y-3 text-xs border-t border-stone-200 pt-3">
                      <div className="flex justify-between gap-3 pb-2 border-b border-stone-100">
                        <dt className="text-stone-500">All Applicants (KG–10)</dt>
                        <dd className="font-medium text-[#10233D] text-right">
                          Birth Certificate & Immunization
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3 pb-2 border-b border-stone-100">
                        <dt className="text-stone-500">Grades 1–10 Transfers</dt>
                        <dd className="font-medium text-[#10233D] text-right">
                          Prior Report Cards / TC
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3 pb-2 border-b border-stone-100">
                        <dt className="text-stone-500">Kindergarten Entry Age</dt>
                        <dd className="font-medium text-[#10233D] text-right tabular-nums">
                          4–6 Years by Sept 1
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-stone-500">Section Capacity</dt>
                        <dd className="font-medium text-[#10233D] text-right tabular-nums">
                          25 Students per Class
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="bg-[#10233D] text-white rounded-xl p-6 space-y-3">
                  <p className="text-xs uppercase tracking-widest text-[#E8C587]">
                    Speak With Admissions
                  </p>
                  <h4 className="font-serif text-2xl font-semibold">
                    Have a Specific Policy Question?
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Whether you are relocating mid-year, requesting bus stop details, or preparing
                    a scholarship dossier, our Admissions Team replies within one school day.
                  </p>
                  <div className="pt-2 space-y-2 text-xs">
                    <a
                      href={`mailto:${SCHOOL_EMAILS.admissions}`}
                      className="flex items-center gap-2 text-[#E8C587] hover:underline font-mono"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{SCHOOL_EMAILS.admissions}</span>
                    </a>
                    <p className="flex items-center gap-2 text-stone-200 tabular-nums">
                      <Phone className="w-3.5 h-3.5 text-[#E8C587]" />
                      <span>(555) 392-4810 · Ext. 103</span>
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
