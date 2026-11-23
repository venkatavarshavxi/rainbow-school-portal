export const SCHOOL_IMAGES = {
  campusHero: '/src/assets/images/hero_campus_courtyard_1795411151469.jpg',
  admissionsLibrary: '/src/assets/images/admissions_library_tour_1795411151112.jpg',
  scienceLab: '/src/assets/images/academics_science_lab_1795411151678.jpg',
  kindergartenRoom: '/src/assets/images/kindergarten_montessori_room_1795411150624.jpg',
  athleticsField: '/src/assets/images/sports_athletics_field_1795411151368.jpg',
  humanitiesClassroom: '/src/assets/images/gallery_humanities_classroom_1795413651003.jpg',
  roboticsLab: '/src/assets/images/gallery_robotics_makerspace_1795413651287.jpg',
  artMusicStudio: '/src/assets/images/gallery_art_music_studio_1795413651922.jpg',
} as const;

export type PageRoute = 'home' | 'admissions' | 'academics' | 'sports' | 'about' | 'location' | 'portal';

export type DivisionId = 'kindergarten' | 'primary' | 'middle' | 'high';

export const ALL_GRADES = [
  'KG-1',
  'KG-2',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
] as const;

export type GradeLevel = (typeof ALL_GRADES)[number];

export const SCHOOL_EMAILS = {
  general: 'info@rainbowschool.edu',
  admissions: 'admissions@rainbowschool.edu',
  principal: 'principal@rainbowschool.edu',
  athletics: 'athletics@rainbowschool.edu',
  support: 'portal-help@rainbowschool.edu',
} as const;

export interface TeacherProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  assignedGrades: string;
  email: string;
  passcode: string;
}

export const TEACHERS_DIRECTORY: TeacherProfile[] = [
  { id: 'FAC-201', name: 'Dr. Catherine Sterling', title: 'Head of School & Literature', department: 'Administration & Humanities', assignedGrades: 'Grades 8–10', email: 'c.sterling@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-204', name: 'Dr. Elena Vance', title: 'Senior Science & Academic Coordinator', department: 'Natural Sciences & STEM', assignedGrades: 'Grades 6–10', email: 'elena.vance@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-205', name: 'Dr. Vikram Sethi', title: 'Chair of Mathematics', department: 'Mathematics', assignedGrades: 'Grades 8–10', email: 'v.sethi@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-206', name: 'Clara Bennett', title: 'Lead Early Childhood Educator', department: 'Kindergarten', assignedGrades: 'KG-1 & KG-2', email: 'c.bennett@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-207', name: 'Meera Nair', title: 'Montessori Numeracy Specialist', department: 'Kindergarten', assignedGrades: 'KG-1 & KG-2', email: 'm.nair@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-208', name: 'Hannah Brooks', title: 'Studio Art & Music Educator', department: 'Arts & Nature', assignedGrades: 'KG-1 – Grade 4', email: 'h.brooks@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-209', name: 'Margaret Ellison', title: 'Primary Literacy Lead', department: 'Primary Humanities', assignedGrades: 'Grades 1–4', email: 'm.ellison@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-210', name: 'Rajesh Kulkarni', title: 'Singapore Mathematics Educator', department: 'Primary Mathematics', assignedGrades: 'Grades 1–4', email: 'r.kulkarni@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-211', name: 'David Chen', title: 'Primary STEM & Coding Educator', department: 'STEM', assignedGrades: 'Grades 1–5', email: 'd.chen@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-212', name: 'Prof. Julian Mercer', title: 'Classical Rhetoric & History Chair', department: 'Middle Humanities', assignedGrades: 'Grades 5–7', email: 'j.mercer@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-213', name: 'Ananya Deshmukh', title: 'Middle School Geometry & Algebra', department: 'Mathematics', assignedGrades: 'Grades 5–7', email: 'a.deshmukh@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-214', name: 'Marcus Holloway', title: 'Computer Science & Robotics Lead', department: 'Computer Science & AI', assignedGrades: 'Grades 6–10', email: 'm.holloway@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-215', name: 'Evelyn Sterling', title: 'Director of Admissions', department: 'Admissions Office', assignedGrades: 'All Grades (KG–10)', email: 'admissions@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-216', name: 'Coach Samuel Vance', title: 'Director of Athletics & Track', department: 'Sports & Athletics', assignedGrades: 'Grades 3–10', email: 's.vance@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-217', name: 'Coach Mateo Silva', title: 'Head Soccer Coach', department: 'Sports & Athletics', assignedGrades: 'Grades 1–10', email: 'm.silva@rainbowschool.edu', passcode: 'faculty2026' },
  { id: 'FAC-218', name: 'Coach Priya Nair', title: 'Aquatics & Swimming Director', department: 'Sports & Athletics', assignedGrades: 'KG-2 – Grade 10', email: 'p.nair@rainbowschool.edu', passcode: 'faculty2026' },
];

export interface CourseItem {
  id: string;
  code: string;
  title: string;
  division: DivisionId;
  grades: string;
  department: string;
  weeklyHours: number;
  facultyLead: string;
  summary: string;
  syllabusHighlights: string[];
}

export interface SchoolCertificate {
  id: string;
  accessionNo: string;
  title: string;
  issuingBody: string;
  issuedDate: string;
  validThrough: string;
  category: string;
  summary: string;
  verificationCode: string;
  signatory: string;
}

export interface SportProgram {
  id: string;
  name: string;
  season: string;
  grades: string;
  coach: string;
  venue: string;
  schedule: string;
  honors: string;
  description: string;
}

export interface AdmissionsApplication {
  id: string;
  studentName: string;
  dateOfBirth?: string;
  gradeApplying: string;
  academicInterest?: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  whatsappNumber: string;
  address?: string;
  busRequired?: boolean;
  previousSchool: string;
  submittedAt: string;
  status: 'Under Review' | 'Interview Scheduled' | 'Admitted';
  notes: string;
}

export interface CampusVisitBooking {
  id: string;
  visitType: 'Campus Tour' | 'Student Shadow Day' | 'Open House';
  familyName: string;
  email: string;
  preferredDate: string;
  studentGrade: string;
  createdAt: string;
}

export interface StudentAssignment {
  id: string;
  division?: DivisionId;
  courseCode: string;
  courseTitle: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  score?: string;
}

export interface SchoolNotice {
  id: string;
  title: string;
  audience: 'All School' | 'Kindergarten–Grade 4' | 'Grades 5–10' | 'Athletics';
  author: string;
  date: string;
  body: string;
}

export interface SchoolMailMessage {
  id: string;
  fromName: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  body: string;
  sentAt: string;
  folder: 'Inbox' | 'Sent';
}

export interface RosterStudent {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  grade: GradeLevel;
  attendancePct: number;
  currentScore: number;
  letterGrade: string;
  enrolledSports: string[];
}

export type FaqCategory = 'Documents' | 'Timelines' | 'School Policies';

export interface AdmissionsFaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  accentHex: string;
}

export type CalendarEventCategory = 'Key Dates' | 'Campus Events' | 'School Holidays';

export interface CampusCalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // optional multi-day range YYYY-MM-DD
  title: string;
  category: CalendarEventCategory;
  division: string;
  timeOrNote: string;
  location: string;
  description: string;
}

export interface AcademicMonthMeta {
  year: number;
  monthIndex: number; // 0-indexed (0 = Jan, 7 = Aug, etc.)
  key: string; // YYYY-MM
  shortLabel: string;
  fullLabel: string;
  termLabel: string;
}

export const GRADE_DIVISIONS: {
  id: DivisionId;
  label: string;
  grades: string;
  ageRange: string;
  classSize: string;
  scheduleHours: string;
  accentHex: string;
  softBg: string;
  focusTag: string;
  overview: string;
  image: string;
}[] = [
  {
    id: 'kindergarten',
    label: 'Kindergarten',
    grades: 'KG-1 & KG-2',
    ageRange: 'Ages 4–6',
    classSize: '25 Students / Section · 2 Educators',
    scheduleHours: '8:15 AM – 1:30 PM',
    accentHex: '#C85A32',
    softBg: '#FFF4EE',
    focusTag: 'Montessori Studios & Phonics',
    overview:
      'Foundational literacy, tactile numeracy, guided nature study, music, and joyful social formation in sunlit Montessori-inspired studios.',
    image: SCHOOL_IMAGES.kindergartenRoom,
  },
  {
    id: 'primary',
    label: 'Primary School',
    grades: 'Grades 1–4',
    ageRange: 'Ages 6–10',
    classSize: '25 Students / Section · Homeroom + Specialists',
    scheduleHours: '8:00 AM – 2:45 PM',
    accentHex: '#1E6B52',
    softBg: '#EFF8F4',
    focusTag: 'Singapore Math & Inquiry',
    overview:
      'Structured reading fluency, Singapore bar-model mathematics, hands-on earth sciences, cursive composition, and foundational coding.',
    image: SCHOOL_IMAGES.humanitiesClassroom,
  },
  {
    id: 'middle',
    label: 'Middle School',
    grades: 'Grades 5–7',
    ageRange: 'Ages 10–13',
    classSize: '25 Students / Section · Departmental Faculty',
    scheduleHours: '8:00 AM – 3:30 PM',
    accentHex: '#264B8A',
    softBg: '#EFF4FC',
    focusTag: 'Socratic Seminar & Robotics',
    overview:
      'Classical seminar discussion, formal logic, pre-algebra to geometry, laboratory biology and chemistry, world civilizations, and robotics.',
    image: SCHOOL_IMAGES.roboticsLab,
  },
  {
    id: 'high',
    label: 'Secondary School',
    grades: 'Grades 8–10',
    ageRange: 'Ages 13–16',
    classSize: '25 Students / Section · Honors & Board Prep',
    scheduleHours: '8:00 AM – 3:45 PM',
    accentHex: '#8B1E2D',
    softBg: '#FDF2F4',
    focusTag: 'Board Honors & Senior Thesis',
    overview:
      'Rigorous board-preparatory humanities, trigonometry and calculus foundations, honors physics and organic chemistry, rhetoric, and senior thesis.',
    image: SCHOOL_IMAGES.scienceLab,
  },
];

export const COURSES_CATALOG: CourseItem[] = [
  {
    id: 'kg-lit',
    code: 'KG-101',
    title: 'Phonics, Storytelling & Early Reading',
    division: 'kindergarten',
    grades: 'KG-1 & KG-2',
    department: 'Early Literacy',
    weeklyHours: 6,
    facultyLead: 'Clara Bennett, M.Ed.',
    summary: 'Multi-sensory phonemic awareness, classic fables, handwriting posture, and expressive circle-time narration.',
    syllabusHighlights: ['Letter-sound synthesis & blending', 'Daily read-aloud literature circles', 'Tactile sand-letter formation'],
  },
  {
    id: 'kg-num',
    code: 'KG-102',
    title: 'Concrete Numeracy & Spatial Geometry',
    division: 'kindergarten',
    grades: 'KG-1 & KG-2',
    department: 'Mathematics',
    weeklyHours: 5,
    facultyLead: 'Meera Nair, B.Ed.',
    summary: 'Number sense up to 100, wooden rod grouping, pattern recognition, measurement, and calendar time.',
    syllabusHighlights: ['Place value with Montessori beads', '2D & 3D geometric solids', 'Sorting, sequencing & early logic'],
  },
  {
    id: 'kg-nat',
    code: 'KG-103',
    title: 'Garden Discovery, Music & Studio Art',
    division: 'kindergarten',
    grades: 'KG-1 & KG-2',
    department: 'Arts & Nature',
    weeklyHours: 5,
    facultyLead: 'Hannah Brooks',
    summary: 'Botanical observation in our campus courtyard garden paired with Orff rhythm instruments and watercolor painting.',
    syllabusHighlights: ['Seasonal plant & seed journals', 'Choral singing & percussion rhythm', 'Tempera, clay & collage studio'],
  },
  {
    id: 'pri-eng',
    code: 'PR-201',
    title: 'English Grammar, Composition & Literature',
    division: 'primary',
    grades: 'Grades 1–4',
    department: 'Humanities',
    weeklyHours: 6,
    facultyLead: 'Margaret Ellison, M.A.',
    summary: 'Structured grammar diagramming, rich children’s classics, persuasive paragraphs, and weekly recitation.',
    syllabusHighlights: ['Classic mythology & fables', 'Narrative & descriptive essays', 'Public speaking & poetry recitation'],
  },
  {
    id: 'pri-math',
    code: 'PR-202',
    title: 'Singapore Mathematics & Mental Arithmetic',
    division: 'primary',
    grades: 'Grades 1–4',
    department: 'Mathematics',
    weeklyHours: 6,
    facultyLead: 'Rajesh Kulkarni, M.Sc.',
    summary: 'Concrete-Pictorial-Abstract mastery covering multi-digit operations, fractions, ratios, and bar-model problem solving.',
    syllabusHighlights: ['Visual bar-model word problems', 'Fractions, decimals & area', 'Weekly math olympiad puzzles'],
  },
  {
    id: 'pri-sci',
    code: 'PR-203',
    title: 'Integrated Natural Science & Coding Foundations',
    division: 'primary',
    grades: 'Grades 1–4',
    department: 'STEM',
    weeklyHours: 5,
    facultyLead: 'David Chen, M.S.',
    summary: 'Hands-on inquiry into ecosystems, weather systems, simple machines, and block-based algorithmic thinking.',
    syllabusHighlights: ['Botany, habitats & water cycle', 'Forces, magnets & simple circuits', 'Visual block coding & logic loops'],
  },
  {
    id: 'mid-hum',
    code: 'MS-501',
    title: 'Classical Literature, Rhetoric & World Civilizations',
    division: 'middle',
    grades: 'Grades 5–7',
    department: 'Humanities',
    weeklyHours: 6,
    facultyLead: 'Prof. Julian Mercer',
    summary: 'Seminar-style study of ancient to Renaissance civilizations paired with structured five-paragraph essays and debate.',
    syllabusHighlights: ['Socratic seminar discussions', 'Primary historical source analysis', 'Formal rhetoric & parliamentary debate'],
  },
  {
    id: 'mid-math',
    code: 'MS-502',
    title: 'Pre-Algebra, Linear Foundations & Euclidean Geometry',
    division: 'middle',
    grades: 'Grades 5–7',
    department: 'Mathematics',
    weeklyHours: 6,
    facultyLead: 'Ananya Deshmukh, M.Sc.',
    summary: 'Proportional reasoning, integers, algebraic expressions, coordinate graphing, and geometric proofs.',
    syllabusHighlights: ['Linear equations & inequalities', 'Compass-and-straightedge constructions', 'Probability & data analysis'],
  },
  {
    id: 'mid-stem',
    code: 'MS-503',
    title: 'Laboratory Sciences, Python & Robotics Studio',
    division: 'middle',
    grades: 'Grades 5–7',
    department: 'STEM',
    weeklyHours: 6,
    facultyLead: 'Dr. Elena Vance',
    summary: 'Microscopy, chemical reactions, Newtonian mechanics, and introductory Python programming with sensor robotics.',
    syllabusHighlights: ['Weekly wet-lab experiments', 'Python variables, functions & data', 'Autonomous rover engineering'],
  },
  {
    id: 'hs-math',
    code: 'HS-801',
    title: 'Honors Algebra II, Trigonometry & Board Mathematics',
    division: 'high',
    grades: 'Grades 8–10',
    department: 'Mathematics',
    weeklyHours: 6,
    facultyLead: 'Dr. Vikram Sethi',
    summary: 'Comprehensive secondary mathematics preparing Grade 10 scholars for national board examinations and AP-track calculus.',
    syllabusHighlights: ['Quadratic, polynomial & exponential models', 'Trigonometric identities & vectors', 'Mensuration, statistics & proof writing'],
  },
  {
    id: 'hs-sci',
    code: 'HS-802',
    title: 'Physics, Chemistry & Molecular Biology',
    division: 'high',
    grades: 'Grades 8–10',
    department: 'Natural Sciences',
    weeklyHours: 7,
    facultyLead: 'Dr. Elena Vance',
    summary: 'Dedicated laboratory tracks in optics, electromagnetism, stoichiometry, organic foundations, and cellular genetics.',
    syllabusHighlights: ['Quantitative lab reports & error analysis', 'Titration & chemical thermodynamics', 'Genetics, ecology & human physiology'],
  },
  {
    id: 'hs-cs',
    code: 'HS-803',
    title: 'Computer Science, Web Systems & Applied AI',
    division: 'high',
    grades: 'Grades 8–10',
    department: 'Computer Science',
    weeklyHours: 4,
    facultyLead: 'Marcus Holloway, M.Eng.',
    summary: 'Data structures in Python, relational databases, web architecture, and ethical foundations of machine learning.',
    syllabusHighlights: ['Algorithms, sorting & recursion', 'SQL querying & full-stack basics', 'Grade 10 Capstone Engineering Project'],
  },
  {
    id: 'hs-lit',
    code: 'HS-804',
    title: 'World Literature, Civics & Economics',
    division: 'high',
    grades: 'Grades 8–10',
    department: 'Humanities',
    weeklyHours: 5,
    facultyLead: 'Dr. Catherine Sterling',
    summary: 'Close reading of global literary classics, constitutional civics, macroeconomics, and the Grade 10 Senior Colloquium.',
    syllabusHighlights: ['Shakespeare, world novels & criticism', 'Constitutional law & civic institutions', '2,500-word Senior Thesis defense'],
  },
];

export const SCHOOL_CERTIFICATES: SchoolCertificate[] = [
  {
    id: 'cert-board',
    accessionNo: 'CERT-2026-01',
    title: 'Senior Secondary Academic Affiliation Charter (KG–Grade 10)',
    issuingBody: 'Central & State Board of Secondary Education Directorate',
    issuedDate: 'April 12, 2021',
    validThrough: 'March 31, 2031',
    category: 'Academic Accreditation',
    summary: 'Full permanent recognition authorizing Rainbow School to deliver Kindergarten through 10th Grade curriculum and administer Grade 10 Board Examinations.',
    verificationCode: 'CBSE-AFF-9304812-RS',
    signatory: 'Dr. R. Narayanan, Regional Academic Registrar',
  },
  {
    id: 'cert-iso',
    accessionNo: 'CERT-2026-02',
    title: 'ISO 9001:2015 Educational Quality Management Certification',
    issuingBody: 'International Quality Assurance & Educational Standards Bureau',
    issuedDate: 'September 04, 2024',
    validThrough: 'September 03, 2027',
    category: 'Quality Management',
    summary: 'Audited excellence in curriculum governance, faculty professional development, student assessment transparency, and parent communication.',
    verificationCode: 'ISO-9001-EDU-44192',
    signatory: 'H. Lindqvist, Lead Quality Auditor',
  },
  {
    id: 'cert-green',
    accessionNo: 'CERT-2026-03',
    title: 'National Green & Sustainable Campus Gold Recognition',
    issuingBody: 'Ministry of Environmental Education & Green Schools Council',
    issuedDate: 'January 19, 2025',
    validThrough: 'January 18, 2028',
    category: 'Sustainability',
    summary: 'Awarded for 65% solar energy generation, rainwater harvesting across all academic halls, zero-plastic dining, and campus arboretum stewardship.',
    verificationCode: 'GSC-GOLD-2025-884',
    signatory: 'S. Bhattacharya, Council Director',
  },
  {
    id: 'cert-stem',
    accessionNo: 'CERT-2026-04',
    title: 'Distinguished STEM & Laboratory Excellence Charter',
    issuingBody: 'National Council for Science, Robotics & Innovation in Schools',
    issuedDate: 'November 10, 2024',
    validThrough: 'November 09, 2027',
    category: 'STEM & Innovation',
    summary: 'Recognizes Rainbow School’s Physics, Chemistry, Biology, and Robotics laboratories for meeting collegiate safety and equipment benchmarks.',
    verificationCode: 'NCSR-LAB-77201',
    signatory: 'Prof. A. Menon, Chair of Lab Standards',
  },
  {
    id: 'cert-safety',
    accessionNo: 'CERT-2026-05',
    title: 'Campus Safety, Fire & Child Safeguarding Compliance Certificate',
    issuingBody: 'Municipal Department of School Safety & Civil Protection',
    issuedDate: 'July 01, 2025',
    validThrough: 'June 30, 2027',
    category: 'Health & Safeguarding',
    summary: 'Annual structural, fire-suppression, infirmary, background-vetted staff, and GPS-monitored school transport compliance clearance.',
    verificationCode: 'MDSP-SAFE-2025-119',
    signatory: 'Chief Inspector K. Mercer',
  },
  {
    id: 'cert-sports',
    accessionNo: 'CERT-2026-06',
    title: 'Inter-Scholastic Athletics & Aquatics Safety Charter',
    issuingBody: 'Regional Independent Schools Athletic Association (RISAA)',
    issuedDate: 'August 15, 2025',
    validThrough: 'August 14, 2028',
    category: 'Athletics',
    summary: 'Certifies Rainbow School’s 400m synthetic track, FIFA-grade turf pitch, and indoor heated lap pool for regional varsity championships.',
    verificationCode: 'RISAA-ATH-3094',
    signatory: 'Coach D. Whitmore, Association Commissioner',
  },
];

export const SPORTS_PROGRAMS: SportProgram[] = [
  {
    id: 'track',
    name: 'Track & Field Athletics',
    season: 'Fall & Spring',
    grades: 'Grades 3–10',
    coach: 'Coach Samuel Vance',
    venue: 'Rainbow 400m Olympic Track',
    schedule: 'Mon, Wed, Fri · 3:45 PM – 5:15 PM',
    honors: '3x Regional Inter-School Track Champions (2023–2025)',
    description: 'Sprints, middle-distance running, hurdles, long jump, and relay teamwork coached with biomechanics feedback.',
  },
  {
    id: 'soccer',
    name: 'Varsity & Junior Soccer',
    season: 'Fall & Winter',
    grades: 'Grades 1–10',
    coach: 'Coach Mateo Silva',
    venue: 'Crestview Turf Stadium',
    schedule: 'Tue, Thu, Sat · 4:00 PM – 5:30 PM',
    honors: '2025 District Cup Semi-Finalists (U-14 & U-16)',
    description: 'Possession fundamentals, tactical awareness, and sportsmanship across age-grouped developmental and varsity squads.',
  },
  {
    id: 'basketball',
    name: 'Basketball Academy',
    season: 'Winter & Spring',
    grades: 'Grades 4–10',
    coach: 'Coach Jordan Ellis',
    venue: 'Heritage Indoor Hardwood Arena',
    schedule: 'Mon, Wed, Thu · 3:45 PM – 5:15 PM',
    honors: '2024 State Invitational Trophy Winners',
    description: 'Ball handling, defensive footwork, shooting mechanics, and competitive league play in our climate-controlled gymnasium.',
  },
  {
    id: 'swimming',
    name: 'Aquatics & Competitive Swimming',
    season: 'Year-Round',
    grades: 'KG-2 – Grade 10',
    coach: 'Coach Priya Nair',
    venue: '25m Heated Indoor Aquatics Center',
    schedule: 'Tue, Thu, Fri · 7:00 AM & 3:45 PM',
    honors: '14 Individual Regional Medley Gold Medals',
    description: 'Certified water safety for younger grades progressing to stroke refinement, endurance sets, and competitive swim meets.',
  },
  {
    id: 'tennis',
    name: 'Lawn Tennis & Badminton',
    season: 'Fall & Spring',
    grades: 'Grades 2–10',
    coach: 'Coach Claire Beaumont',
    venue: 'East Courtyard Championship Courts',
    schedule: 'Mon, Wed · 4:00 PM – 5:15 PM',
    honors: '2025 Singles & Doubles Regional Runners-Up',
    description: 'Agility, serve technique, court strategy, and singles/doubles match play on four floodlit cushioned courts.',
  },
  {
    id: 'chess',
    name: 'Scholastic Chess & Martial Arts',
    season: 'Year-Round',
    grades: 'KG-1 – Grade 10',
    coach: 'Master Kenji Sato / IM Arjun Rao',
    venue: 'Founders Hall & Dojo Studio',
    schedule: 'Tue, Fri · 3:30 PM – 4:45 PM',
    honors: '2025 National Junior Chess Team 4th Place',
    description: 'Mind-body discipline combining competitive FIDE-rated chess tactics with traditional non-contact Taekwondo forms.',
  },
];

export const CAMPUS_BUILDINGS = [
  {
    id: 'heritage',
    name: 'Main Heritage Hall & Admissions',
    code: 'BLDG 01',
    hours: 'Mon–Fri 7:30 AM – 5:00 PM · Sat 9:00 AM – 1:00 PM',
    summary: 'Houses the Admissions Welcome Center, Head of School’s Office, Registrar, and Classical Humanities seminar rooms.',
  },
  {
    id: 'kindergarten',
    name: 'Kindergarten & Primary Wing',
    code: 'BLDG 02',
    hours: 'Mon–Fri 7:45 AM – 3:15 PM',
    summary: 'Sunlit ground-floor classrooms for KG-1 through Grade 4 with enclosed botanical sensory garden and play courtyard.',
  },
  {
    id: 'pavilion',
    name: 'Vance Science & Library Pavilion',
    code: 'BLDG 03',
    hours: 'Mon–Fri 7:45 AM – 5:30 PM',
    summary: '22,000-volume classical & digital library, Physics/Chemistry/Biology laboratories, and Grade 5–10 Robotics Studio.',
  },
  {
    id: 'athletics',
    name: 'Athletic Stadium & Aquatics Center',
    code: 'BLDG 04',
    hours: 'Mon–Sat 6:30 AM – 6:30 PM',
    summary: '400m synthetic track, FIFA turf pitch, indoor hardwood basketball arena, 25m heated lap pool, and tennis courts.',
  },
];

export const INITIAL_APPLICATIONS: AdmissionsApplication[] = [
  {
    id: 'APP-2026-101',
    studentName: 'Maya Krishnan',
    gradeApplying: 'Grade 6',
    academicInterest: 'STEM & Robotics',
    parentName: 'Suresh Krishnan',
    parentEmail: 'suresh.krishnan@example.org',
    parentPhone: '+1 555 234 8891',
    whatsappNumber: '+1 555 234 8891',
    previousSchool: 'Oakwood Preparatory',
    submittedAt: 'Nov 12, 2026',
    status: 'Interview Scheduled',
    notes: 'Strong math assessment; family attending Friday campus tour.',
  },
  {
    id: 'APP-2026-102',
    studentName: 'Lucas Fernandez',
    gradeApplying: 'KG-2',
    academicInterest: 'Arts & Discovery',
    parentName: 'Sofia Fernandez',
    parentEmail: 'sofia.f@example.org',
    parentPhone: '+1 555 892 1104',
    whatsappNumber: '+1 555 892 1104',
    previousSchool: 'Little Oaks Montessori',
    submittedAt: 'Nov 18, 2026',
    status: 'Under Review',
    notes: 'Priority early-childhood application received.',
  },
  {
    id: 'APP-2026-103',
    studentName: 'Ethan Reynolds',
    gradeApplying: 'Grade 9',
    academicInterest: 'Varsity Track & Honors Physics',
    parentName: 'Claire Reynolds',
    parentEmail: 'creynolds@example.org',
    parentPhone: '+1 555 441 7209',
    whatsappNumber: '+1 555 441 7209',
    previousSchool: 'St. Jude Academy',
    submittedAt: 'Nov 04, 2026',
    status: 'Admitted',
    notes: 'Honors STEM & Varsity Track candidate.',
  },
];

export const INITIAL_VISITS: CampusVisitBooking[] = [
  {
    id: 'VIS-2026-01',
    visitType: 'Open House',
    familyName: 'The Patel Family',
    email: 'patel.family@example.org',
    preferredDate: '2026-12-05',
    studentGrade: 'Grade 5',
    createdAt: 'Nov 19, 2026',
  },
];

export const INITIAL_ASSIGNMENTS: StudentAssignment[] = [
  // Secondary (Grades 8–10)
  {
    id: 'ASG-1',
    division: 'high',
    courseCode: 'HS-801',
    courseTitle: 'Honors Algebra II & Trigonometry',
    title: 'Problem Set 6: Trigonometric Identities',
    dueDate: 'Nov 26, 2026',
    status: 'Pending',
  },
  {
    id: 'ASG-2',
    division: 'high',
    courseCode: 'HS-802',
    courseTitle: 'Physics, Chemistry & Molecular Biology',
    title: 'Optics Lab Report: Concave Mirror Focal Length',
    dueDate: 'Nov 28, 2026',
    status: 'Pending',
  },
  {
    id: 'ASG-3',
    division: 'high',
    courseCode: 'HS-804',
    courseTitle: 'World Literature, Civics & Economics',
    title: 'Comparative Essay: Classical Rhetoric & Modern Civics',
    dueDate: 'Nov 18, 2026',
    status: 'Graded',
    score: '94 / 100',
  },
  {
    id: 'ASG-4',
    division: 'high',
    courseCode: 'HS-803',
    courseTitle: 'Computer Science & Applied AI',
    title: 'Recursive Binary Search Implementation in Python',
    dueDate: 'Nov 21, 2026',
    status: 'Submitted',
  },
  // Middle School (Grades 5–7)
  {
    id: 'ASG-MS-1',
    division: 'middle',
    courseCode: 'MS-502',
    courseTitle: 'Pre-Algebra, Linear Foundations & Euclidean Geometry',
    title: 'Compass Constructions & Triangle Congruence Set',
    dueDate: 'Nov 26, 2026',
    status: 'Pending',
  },
  {
    id: 'ASG-MS-2',
    division: 'middle',
    courseCode: 'MS-503',
    courseTitle: 'Laboratory Sciences, Python & Robotics Studio',
    title: 'Python Sensor Loop & Line-Following Rover Log',
    dueDate: 'Nov 28, 2026',
    status: 'Pending',
  },
  {
    id: 'ASG-MS-3',
    division: 'middle',
    courseCode: 'MS-501',
    courseTitle: 'Classical Literature, Rhetoric & World Civilizations',
    title: 'Primary Source Analysis: Ancient Civic Charters',
    dueDate: 'Nov 19, 2026',
    status: 'Graded',
    score: '92 / 100',
  },
  // Primary School (Grades 1–4)
  {
    id: 'ASG-PR-1',
    division: 'primary',
    courseCode: 'PR-202',
    courseTitle: 'Singapore Mathematics & Mental Arithmetic',
    title: 'Bar-Model Fractions & Word Problem Folio',
    dueDate: 'Nov 26, 2026',
    status: 'Pending',
  },
  {
    id: 'ASG-PR-2',
    division: 'primary',
    courseCode: 'PR-203',
    courseTitle: 'Integrated Natural Science & Coding Foundations',
    title: 'Botanical Leaf Classification & Weather Chart',
    dueDate: 'Nov 28, 2026',
    status: 'Pending',
  },
  {
    id: 'ASG-PR-3',
    division: 'primary',
    courseCode: 'PR-201',
    courseTitle: 'English Grammar, Composition & Literature',
    title: 'Reading Journal & Aesop Fable Narration',
    dueDate: 'Nov 19, 2026',
    status: 'Graded',
    score: '96 / 100',
  },
  // Kindergarten (KG-1 & KG-2)
  {
    id: 'ASG-KG-1',
    division: 'kindergarten',
    courseCode: 'KG-101',
    courseTitle: 'Phonics, Storytelling & Early Reading',
    title: 'Phonics Sound Blend Cards & Read-Aloud Circle',
    dueDate: 'Nov 26, 2026',
    status: 'Pending',
  },
  {
    id: 'ASG-KG-2',
    division: 'kindergarten',
    courseCode: 'KG-102',
    courseTitle: 'Concrete Numeracy & Spatial Geometry',
    title: 'Montessori Bead Frame Grouping Activity',
    dueDate: 'Nov 28, 2026',
    status: 'Pending',
  },
  {
    id: 'ASG-KG-3',
    division: 'kindergarten',
    courseCode: 'KG-103',
    courseTitle: 'Garden Discovery, Music & Studio Art',
    title: 'Courtyard Seed Observation & Watercolor Sketch',
    dueDate: 'Nov 19, 2026',
    status: 'Graded',
    score: 'Complete',
  },
];

export const INITIAL_NOTICES: SchoolNotice[] = [
  {
    id: 'NOT-1',
    title: 'Winter Open House & Science Exhibition',
    audience: 'All School',
    author: 'Dr. Elena Vance, Academic Coordinator',
    date: 'Nov 21, 2026',
    body: 'Prospective families and current parents are invited to Vance Science Pavilion this Saturday from 10:00 AM to 1:00 PM for Grade 5–10 laboratory demonstrations.',
  },
  {
    id: 'NOT-2',
    title: 'Regional Track & Swimming Trials Schedule',
    audience: 'Athletics',
    author: 'Coach Samuel Vance',
    date: 'Nov 19, 2026',
    body: 'Time trials for Grades 4–10 will be held Wednesday at 3:45 PM on Rainbow 400m Track. Bring house jerseys and hydration.',
  },
  {
    id: 'NOT-3',
    title: 'Grade 10 Board Exam Preparation Workshop',
    audience: 'Grades 5–10',
    author: 'Dr. Vikram Sethi',
    date: 'Nov 15, 2026',
    body: 'Mock Mathematics and Science diagnostic reviews begin December 2. Study packets are available in the Student Portal.',
  },
];

export const INITIAL_SCHOOL_MAIL: SchoolMailMessage[] = [
  {
    id: 'MAIL-1',
    fromName: 'Dr. Elena Vance',
    fromEmail: 'elena.vance@rainbowschool.edu',
    toEmail: 'students@rainbowschool.edu',
    subject: 'Science Pavilion Lab Safety & Schedule Update',
    body: 'Please bring your lab notebooks and safety goggles for Thursday practical sessions in Vance Science Pavilion Room 202.',
    sentAt: 'Nov 21, 2026 · 09:15 AM',
    folder: 'Inbox',
  },
  {
    id: 'MAIL-2',
    fromName: 'Evelyn Sterling · Admissions',
    fromEmail: 'admissions@rainbowschool.edu',
    toEmail: 'faculty@rainbowschool.edu',
    subject: 'Open House Tour Ambassadors & Classroom Hosts',
    body: 'Thank you to all Grade 8–10 student ambassadors and homeroom teachers hosting prospective families this Saturday morning.',
    sentAt: 'Nov 20, 2026 · 02:40 PM',
    folder: 'Inbox',
  },
  {
    id: 'MAIL-3',
    fromName: 'Rainbow School Principal Office',
    fromEmail: 'principal@rainbowschool.edu',
    toEmail: 'all@rainbowschool.edu',
    subject: 'Term Honor Roll & Attendance Excellence',
    body: 'Congratulations to our Kindergarten through 10th Grade scholars maintaining over 95% term attendance.',
    sentAt: 'Nov 18, 2026 · 11:00 AM',
    folder: 'Inbox',
  },
];

// Deterministic generator producing exactly 25 distinct students in EVERY class (KG-1 through Grade 10 = 300 students)
const FIRST_NAMES = [
  'Aarav', 'Aadhya', 'Aditya', 'Ananya', 'Arjun',
  'Chloe', 'Daniel', 'Diya', 'Elena', 'Emma',
  'Ethan', 'Grace', 'Hannah', 'Ishaan', 'Kavya',
  'Leo', 'Liam', 'Lucas', 'Maya', 'Meera',
  'Mira', 'Noah', 'Oliver', 'Priya', 'Rohan',
  'Saanvi', 'Siddharth', 'Sophia', 'Vihaan', 'Zara',
];

const LAST_NAMES = [
  'Sharma', 'Menon', 'Verma', 'Nair', 'Kulkarni',
  'Patel', 'Deshmukh', 'Iyer', 'Reddy', 'Subramanian',
  'Rao', 'Bose', 'Joshi', 'Grant', 'Bennett',
  'Brooks', 'Martin', 'Foster', 'Carter', 'Kim',
  'Morales', 'Gallagher', 'Lin', 'Alverez', 'Lindholm',
  'Okafor', 'Rostova', 'Vance', 'Fernandez', 'Krishnan',
];

const GRADE_CODE_PREFIX: Record<GradeLevel, string> = {
  'KG-1': 'K1',
  'KG-2': 'K2',
  'Grade 1': '01',
  'Grade 2': '02',
  'Grade 3': '03',
  'Grade 4': '04',
  'Grade 5': '05',
  'Grade 6': '06',
  'Grade 7': '07',
  'Grade 8': '08',
  'Grade 9': '09',
  'Grade 10': '10',
};

function computeLetterGrade(score: number): string {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 86) return 'A-';
  if (score >= 82) return 'B+';
  if (score >= 76) return 'B';
  return 'C+';
}

function buildFullSchoolRoster(): RosterStudent[] {
  const list: RosterStudent[] = [];

  ALL_GRADES.forEach((grade, gIdx) => {
    const prefix = GRADE_CODE_PREFIX[grade];
    for (let i = 1; i <= 25; i++) {
      const fName = FIRST_NAMES[(gIdx * 7 + i * 3) % FIRST_NAMES.length];
      const lName = LAST_NAMES[(gIdx * 5 + i * 7) % LAST_NAMES.length];
      const fullName =
        grade === 'Grade 9' && i === 1
          ? 'Aarav Sharma'
          : `${fName} ${lName}`;

      const numStr = String(i).padStart(3, '0');
      const rollNo = `RS-${prefix}-${numStr}`;
      const attendancePct = 86 + ((gIdx * 3 + i * 5) % 15); // 86 to 100
      const currentScore = 78 + ((gIdx * 4 + i * 6) % 22); // 78 to 99
      const sport = SPORTS_PROGRAMS[(gIdx + i) % SPORTS_PROGRAMS.length].name;

      const cleanSlug = fullName.toLowerCase().replace(/[^a-z0-9]+/g, '.');

      list.push({
        id: `STU-${prefix}-${numStr}`,
        rollNo,
        name: fullName,
        email: `${cleanSlug}.${prefix.toLowerCase()}${numStr}@rainbowschool.edu`,
        grade,
        attendancePct,
        currentScore,
        letterGrade: computeLetterGrade(currentScore),
        enrolledSports: [sport],
      });
    }
  });

  return list;
}

export const INITIAL_ROSTER: RosterStudent[] = buildFullSchoolRoster();

export const ADMISSIONS_FAQS: AdmissionsFaqItem[] = [
  {
    id: 'faq-doc-1',
    category: 'Documents',
    accentHex: '#C85A32',
    question: 'What documents are required to complete an admissions dossier?',
    answer:
      'Prepare three records: (1) Student Birth Certificate, (2) two recent years of Report Cards or a Transfer Certificate for Grades 1–10 (optional for Kindergarten), and (3) a current Health & Immunization Record. Originals are verified upon enrollment in Heritage Hall.',
  },
  {
    id: 'faq-doc-2',
    category: 'Documents',
    accentHex: '#C85A32',
    question: 'Are previous school transcripts or Transfer Certificates mandatory for Kindergarten?',
    answer:
      'No prior transcripts or Transfer Certificates are needed for KG-1 or KG-2. Preschool observation summaries may be shared optionally.',
  },
  {
    id: 'faq-doc-3',
    category: 'Documents',
    accentHex: '#C85A32',
    question: 'How are application confirmations and status updates delivered?',
    answer:
      'You receive an Application ID immediately upon submission along with an instant WhatsApp receipt and email confirmation from admissions@rainbowschool.edu.',
  },
  {
    id: 'faq-doc-4',
    category: 'Documents',
    accentHex: '#C85A32',
    question: 'Does Rainbow School accept Merit or Need-Based Scholarship documentation?',
    answer:
      'Yes. Request scholarship review in Part C of your application and email supporting awards or aid forms to admissions@rainbowschool.edu before February 15.',
  },
  {
    id: 'faq-time-1',
    category: 'Timelines',
    accentHex: '#1E6B52',
    question: 'What are the key admissions deadlines for the 2026–2027 academic year?',
    answer:
      'Priority Applications close January 31, 2027. Scholarship review closes February 15, assessments and interviews run Feb–Mar, and decisions release March 15, 2027.',
  },
  {
    id: 'faq-time-2',
    category: 'Timelines',
    accentHex: '#1E6B52',
    question: 'Can families apply after the Priority Deadline or transfer mid-year?',
    answer:
      'Yes. Rolling and mid-year applications are reviewed whenever seats remain available within our 25-student section limit.',
  },
  {
    id: 'faq-time-3',
    category: 'Timelines',
    accentHex: '#1E6B52',
    question: 'What happens during the Student Readiness Assessment and Family Interview?',
    answer:
      'KG–Grade 4 applicants join a relaxed 30-minute reading & numeracy session; Grades 5–10 complete placement evaluations, followed by a brief family meeting with our Admissions Director.',
  },
  {
    id: 'faq-time-4',
    category: 'Timelines',
    accentHex: '#1E6B52',
    question: 'How soon are Campus Tours and Student Shadow Days confirmed?',
    answer:
      'Within one school day. Check in at Main Heritage Hall (Building 01) 10 minutes before your scheduled slot.',
  },
  {
    id: 'faq-pol-1',
    category: 'School Policies',
    accentHex: '#264B8A',
    question: 'What are the age cutoffs and class size limits for KG-1 through Grade 10?',
    answer:
      'Kindergarten (KG-1 & KG-2) welcomes ages 4–6 by September 1, progressing through Grade 10 (ages 13–16). Every grade section is strictly capped at 25 students.',
  },
  {
    id: 'faq-pol-2',
    category: 'School Policies',
    accentHex: '#264B8A',
    question: 'What are campus arrival, dismissal, and attendance policies?',
    answer:
      'KG: 8:15 AM – 1:30 PM · Primary (1–4): 8:00 AM – 2:45 PM · Middle (5–7): 8:00 AM – 3:30 PM · Secondary (8–10): 8:00 AM – 3:45 PM. Minimum 85% attendance is tracked live in the portals.',
  },
  {
    id: 'faq-pol-3',
    category: 'School Policies',
    accentHex: '#264B8A',
    question: 'How does Rainbow School manage bus transport, uniforms, and campus safety?',
    answer:
      '14 GPS-monitored bus routes with RFID boarding and background-vetted staff serve Oakridge District. Seasonal crest uniforms are worn Mon–Thu, with athletics attire on sports days.',
  },
  {
    id: 'faq-pol-4',
    category: 'School Policies',
    accentHex: '#8B1E2D',
    question: 'Are athletics, swimming, and co-curricular clubs open to all admitted students?',
    answer:
      'Yes. Physical education and swimming safety begin in Kindergarten (KG-2 for aquatics), with Varsity & Developmental teams open via Sports or the Student Portal.',
  },
];

export const ACADEMIC_MONTHS: AcademicMonthMeta[] = [
  { year: 2026, monthIndex: 7, key: '2026-08', shortLabel: 'Aug', fullLabel: 'August 2026', termLabel: 'Fall Term Opening' },
  { year: 2026, monthIndex: 8, key: '2026-09', shortLabel: 'Sep', fullLabel: 'September 2026', termLabel: 'Fall Term' },
  { year: 2026, monthIndex: 9, key: '2026-10', shortLabel: 'Oct', fullLabel: 'October 2026', termLabel: 'Fall Term' },
  { year: 2026, monthIndex: 10, key: '2026-11', shortLabel: 'Nov', fullLabel: 'November 2026', termLabel: 'Fall Term' },
  { year: 2026, monthIndex: 11, key: '2026-12', shortLabel: 'Dec', fullLabel: 'December 2026', termLabel: 'Fall Examinations & Recess' },
  { year: 2027, monthIndex: 0, key: '2027-01', shortLabel: 'Jan', fullLabel: 'January 2027', termLabel: 'Spring Term Opening' },
  { year: 2027, monthIndex: 1, key: '2027-02', shortLabel: 'Feb', fullLabel: 'February 2027', termLabel: 'Spring Term & Assessments' },
  { year: 2027, monthIndex: 2, key: '2027-03', shortLabel: 'Mar', fullLabel: 'March 2027', termLabel: 'Spring Term & Decisions' },
  { year: 2027, monthIndex: 3, key: '2027-04', shortLabel: 'Apr', fullLabel: 'April 2027', termLabel: 'Spring Term & Boards' },
  { year: 2027, monthIndex: 4, key: '2027-05', shortLabel: 'May', fullLabel: 'May 2027', termLabel: 'Closing Convocation' },
  { year: 2027, monthIndex: 5, key: '2027-06', shortLabel: 'Jun', fullLabel: 'June 2027', termLabel: 'Summer Enrichment' },
];

export const CAMPUS_YEAR_EVENTS: CampusCalendarEvent[] = [
  // August 2026
  {
    id: 'cal-aug-1',
    date: '2026-08-13',
    title: 'Kindergarten & New Family Orientation',
    category: 'Campus Events',
    division: 'KG-1 – Grade 10',
    timeOrNote: '9:00 AM – 12:00 PM',
    location: 'Main Heritage Hall & Wing 02',
    description: 'Meet homeroom educators, tour Montessori and lab classrooms, verify bus badges, and pick up uniform kits.',
  },
  {
    id: 'cal-aug-2',
    date: '2026-08-17',
    title: 'First Day of School · Fall Term Convocation',
    category: 'Key Dates',
    division: 'All Grades (KG–10)',
    timeOrNote: '8:00 AM Assembly',
    location: 'Founders Courtyard',
    description: 'Opening bell for the 2026–2027 Academic Year with Head of School welcome address and house induction.',
  },
  {
    id: 'cal-aug-3',
    date: '2026-08-28',
    title: 'Fall Athletics & Aquatics Club Sign-Ups',
    category: 'Campus Events',
    division: 'KG-2 – Grade 10',
    timeOrNote: '3:30 PM – 5:00 PM',
    location: 'Athletic Stadium & Pool',
    description: 'Coaching demonstrations and seasonal squad placements for Track, Soccer, Tennis, and Swimming.',
  },
  // September 2026
  {
    id: 'cal-sep-1',
    date: '2026-09-07',
    title: 'Labor Day · School Holiday',
    category: 'School Holidays',
    division: 'Campus Closed',
    timeOrNote: 'All-Day Holiday',
    location: 'No Classes or Bus Service',
    description: 'Rainbow School academic wings and administrative offices are closed in observance of Labor Day.',
  },
  {
    id: 'cal-sep-2',
    date: '2026-09-18',
    title: 'Back-to-School Curriculum Evening',
    category: 'Campus Events',
    division: 'Parents · KG–Grade 10',
    timeOrNote: '5:30 PM – 7:30 PM',
    location: 'Classrooms & Science Pavilion',
    description: 'Parents follow their child’s daily timetable, review course syllabi with faculty, and visit subject laboratories.',
  },
  {
    id: 'cal-sep-3',
    date: '2026-09-25',
    title: 'Founders Heritage Day & Green Campus Showcase',
    category: 'Campus Events',
    division: 'All School',
    timeOrNote: '10:00 AM – 2:00 PM',
    location: 'Main Lawn & Arboretum',
    description: 'Celebrating Rainbow School’s 1998 founding with student botanical exhibits, choral music, and alumni remarks.',
  },
  // October 2026
  {
    id: 'cal-oct-1',
    date: '2026-10-09',
    title: 'Faculty Professional Development · Student Holiday',
    category: 'School Holidays',
    division: 'No Classes for Students',
    timeOrNote: 'Faculty In-Service',
    location: 'Campus Closed to Students',
    description: 'Scheduled instructional workshop day for teachers; no student attendance or bus routes.',
  },
  {
    id: 'cal-oct-2',
    date: '2026-10-12',
    title: 'Autumn Holiday · Indigenous Peoples’ & Civic Observance',
    category: 'School Holidays',
    division: 'Campus Closed',
    timeOrNote: 'All-Day Holiday',
    location: 'No Classes or Athletics',
    description: 'Mid-October long weekend holiday across all Kindergarten through Grade 10 divisions.',
  },
  {
    id: 'cal-oct-3',
    date: '2026-10-23',
    title: 'Quarter 1 Academic Progress Reports Issued',
    category: 'Key Dates',
    division: 'All Grades (KG–10)',
    timeOrNote: 'Published 4:00 PM',
    location: 'Student & Parent Portal',
    description: 'First-quarter narrative evaluations and attendance summaries released via Rainbow School Portal.',
  },
  {
    id: 'cal-oct-4',
    date: '2026-10-30',
    title: 'Parent-Teacher Fall Conferences',
    category: 'Key Dates',
    division: 'All Grades · Half Day',
    timeOrNote: '8:30 AM – 4:00 PM',
    location: 'Homeroom Studios',
    description: 'Individual 20-minute guardian consultations reviewing academic growth, literacy, and numeracy milestones.',
  },
  // November 2026
  {
    id: 'cal-nov-1',
    date: '2026-11-11',
    title: 'Veterans Day Commemoration Assembly & Half Day',
    category: 'Key Dates',
    division: 'Grades 1–10',
    timeOrNote: '12:15 PM Early Dismissal',
    location: 'Main Heritage Hall',
    description: 'Student civic readings and brass ensemble tribute followed by midday dismissal.',
  },
  {
    id: 'cal-nov-2',
    date: '2026-11-21',
    title: 'Winter Open House & Science Exhibition',
    category: 'Campus Events',
    division: 'Prospective & Current Families',
    timeOrNote: '10:00 AM – 1:00 PM',
    location: 'Vance Science Pavilion',
    description: 'Grades 5–10 physics, chemistry, and robotics demonstrations plus Admissions campus tours.',
  },
  {
    id: 'cal-nov-3',
    date: '2026-11-25',
    endDate: '2026-11-27',
    title: 'Thanksgiving Autumn Break',
    category: 'School Holidays',
    division: 'Campus Closed',
    timeOrNote: 'Nov 25 – Nov 27',
    location: 'All Wings & Offices Closed',
    description: 'Three-day Thanksgiving recess; classes resume promptly on Monday, November 30 at 8:00 AM.',
  },
  // December 2026
  {
    id: 'cal-dec-1',
    date: '2026-12-05',
    title: 'Admissions Open House & Arts Morning',
    category: 'Campus Events',
    division: 'Prospective Families (KG–10)',
    timeOrNote: '9:30 AM – 12:00 PM',
    location: 'Heritage Hall & Studio Wing',
    description: 'Guided lessons, department chair Q&A, and student musical performances for visiting families.',
  },
  {
    id: 'cal-dec-2',
    date: '2026-12-14',
    endDate: '2026-12-18',
    title: 'Fall Semester Examinations & Senior Colloquium',
    category: 'Key Dates',
    division: 'Grades 5–10',
    timeOrNote: '8:30 AM – 12:30 PM',
    location: 'Academic Halls',
    description: 'Mid-year cumulative assessments in Mathematics, Sciences, Humanities, and Computer Science.',
  },
  {
    id: 'cal-dec-3',
    date: '2026-12-21',
    endDate: '2026-12-31',
    title: 'Winter Recess & Year-End Holiday',
    category: 'School Holidays',
    division: 'Campus Closed',
    timeOrNote: 'Dec 21 – Jan 4',
    location: 'Campus Closed',
    description: 'Two-week winter holiday break covering Christmas and New Year’s celebrations.',
  },
  // January 2027
  {
    id: 'cal-jan-1',
    date: '2027-01-01',
    endDate: '2027-01-04',
    title: 'New Year Winter Break (Continued)',
    category: 'School Holidays',
    division: 'Campus Closed',
    timeOrNote: 'Jan 1 – Jan 4',
    location: 'Campus Closed',
    description: 'Final days of Winter Recess; Faculty preparation day on Jan 4 ahead of Spring Term.',
  },
  {
    id: 'cal-jan-2',
    date: '2027-01-05',
    title: 'Spring Semester Opening Day',
    category: 'Key Dates',
    division: 'All Grades (KG–10)',
    timeOrNote: '8:00 AM Regular Hours',
    location: 'All Campus Buildings',
    description: 'Students return for Spring Term coursework, winter basketball, and indoor aquatics sessions.',
  },
  {
    id: 'cal-jan-3',
    date: '2027-01-18',
    title: 'Martin Luther King Jr. Day · School Holiday',
    category: 'School Holidays',
    division: 'Campus Closed',
    timeOrNote: 'All-Day Holiday',
    location: 'No Classes or Athletics',
    description: 'School closed in honor of Dr. Martin Luther King Jr. Civic service projects precede on Jan 15.',
  },
  {
    id: 'cal-jan-4',
    date: '2027-01-31',
    title: 'Priority Admissions Application Deadline (2027–2028)',
    category: 'Key Dates',
    division: 'Prospective KG–Grade 10',
    timeOrNote: 'Online Portal 11:59 PM',
    location: 'Admissions Portal',
    description: 'Priority cutoff for submitting online student dossiers for Fall 2027 Kindergarten through Grade 10 seating.',
  },
  // February 2027
  {
    id: 'cal-feb-1',
    date: '2027-02-06',
    title: 'Student Readiness Assessments & Campus Interviews',
    category: 'Key Dates',
    division: 'Admissions Candidates',
    timeOrNote: '9:00 AM – 2:00 PM',
    location: 'Heritage Hall & Wing 02',
    description: 'Small-group literacy/numeracy sessions for KG–4 and placement reviews for Grades 5–10 applicants.',
  },
  {
    id: 'cal-feb-2',
    date: '2027-02-15',
    title: 'Presidents’ Day Holiday & Scholarship Review Cutoff',
    category: 'School Holidays',
    division: 'Campus Closed · Aid Cutoff',
    timeOrNote: 'Holiday / Portal Deadline',
    location: 'Campus Closed',
    description: 'No regular classes for Presidents’ Day. Supporting documentation for Merit & Need-Based Scholarships due online.',
  },
  {
    id: 'cal-feb-3',
    date: '2027-02-26',
    title: 'Annual Regional Chess & Robotics Invitational',
    category: 'Campus Events',
    division: 'Grades 3–10',
    timeOrNote: '9:30 AM – 4:00 PM',
    location: 'Founders Hall & Science Pavilion',
    description: 'Inter-school FIDE scholastic chess tournament and autonomous rover engineering showcase.',
  },
  // March 2027
  {
    id: 'cal-mar-1',
    date: '2027-03-06',
    title: 'Annual Rainbow Sports Meet & Aquatics Gala',
    category: 'Campus Events',
    division: 'All Grades (KG–10)',
    timeOrNote: '8:30 AM – 3:00 PM',
    location: 'Rainbow 400m Track & Pool',
    description: 'House relays, hurdles, long jump, soccer finals, and swimming medley championships with parent seating.',
  },
  {
    id: 'cal-mar-2',
    date: '2027-03-15',
    title: 'Priority Admissions Decisions Released',
    category: 'Key Dates',
    division: '2027–2028 Applicants',
    timeOrNote: '4:00 PM Release',
    location: 'Email & WhatsApp Notice',
    description: 'Official enrollment offers dispatched to priority KG–Grade 10 applicant families.',
  },
  {
    id: 'cal-mar-3',
    date: '2027-03-22',
    endDate: '2027-03-26',
    title: 'Spring Break Recess',
    category: 'School Holidays',
    division: 'Campus Closed',
    timeOrNote: 'Mar 22 – Mar 26',
    location: 'No Classes or Bus Service',
    description: 'One-week Spring Break across Kindergarten, Primary, Middle, and Secondary divisions.',
  },
  // April 2027
  {
    id: 'cal-apr-1',
    date: '2027-04-09',
    title: 'Grade 10 Senior Thesis Defense & Classical Colloquium',
    category: 'Campus Events',
    division: 'Grades 8–10 & Families',
    timeOrNote: '1:00 PM – 4:30 PM',
    location: 'Heritage Hall Auditorium',
    description: 'Tenth-grade scholars present and defend their capstone humanities and STEM research papers before faculty panels.',
  },
  {
    id: 'cal-apr-2',
    date: '2027-04-16',
    title: 'Spring Holiday · Good Friday / Community Observance',
    category: 'School Holidays',
    division: 'Campus Closed',
    timeOrNote: 'All-Day Holiday',
    location: 'Campus Closed',
    description: 'Spring long-weekend holiday; regular timetable resumes Monday, April 19.',
  },
  {
    id: 'cal-apr-3',
    date: '2027-04-26',
    endDate: '2027-04-30',
    title: 'National Board Preparation & Mock Examinations',
    category: 'Key Dates',
    division: 'Grade 10 Scholars',
    timeOrNote: '8:30 AM – 12:30 PM',
    location: 'Heritage Examination Hall',
    description: 'Full-length board simulation examinations in Mathematics, Physics, Chemistry, Biology, and Literature.',
  },
  // May 2027
  {
    id: 'cal-may-1',
    date: '2027-05-07',
    title: 'Spring Fine Arts, Watercolor & Choral Exhibition',
    category: 'Campus Events',
    division: 'KG-1 – Grade 10',
    timeOrNote: '4:00 PM – 6:30 PM',
    location: 'East Courtyard & Studio Wing',
    description: 'Student gallery exhibition curated by Studio Art and Music faculty featuring performances across all grades.',
  },
  {
    id: 'cal-may-2',
    date: '2027-05-19',
    endDate: '2027-05-24',
    title: 'Final Semester Assessments',
    category: 'Key Dates',
    division: 'Grades 4–9',
    timeOrNote: '8:30 AM – 12:00 PM',
    location: 'Academic Halls',
    description: 'Year-end summative academic assessments ahead of final grade promotion.',
  },
  {
    id: 'cal-may-3',
    date: '2027-05-28',
    title: 'Grade 10 Commencement & Last Day of Classes',
    category: 'Key Dates',
    division: 'All Grades (KG–10)',
    timeOrNote: '10:00 AM Ceremony',
    location: 'Founders Courtyard',
    description: 'Graduating Grade 10 honors convocation, award certificates, and official closing of the regular school year.',
  },
  {
    id: 'cal-may-4',
    date: '2027-05-31',
    title: 'Memorial Day · Campus Closed',
    category: 'School Holidays',
    division: 'Campus Closed',
    timeOrNote: 'All-Day Holiday',
    location: 'Campus Closed',
    description: 'Administrative offices closed following commencement.',
  },
  // June 2027
  {
    id: 'cal-jun-1',
    date: '2027-06-07',
    title: 'Final Term Transcripts & Certificates Published',
    category: 'Key Dates',
    division: 'KG-1 – Grade 10',
    timeOrNote: 'Portal Release 12:00 PM',
    location: 'Student & Parent Portal',
    description: 'Official promotion records, attendance certificates, and Grade 10 Board transcripts released online.',
  },
  {
    id: 'cal-jun-2',
    date: '2027-06-14',
    endDate: '2027-06-25',
    title: 'Summer Robotics, Tennis & Aquatics Enrichment Camp',
    category: 'Campus Events',
    division: 'Optional · KG-2 – Grade 9',
    timeOrNote: '9:00 AM – 1:00 PM',
    location: 'Science Pavilion & Aquatics',
    description: 'Two-week optional summer workshop in coding, STEM projects, swimming, and court athletics.',
  },
  {
    id: 'cal-jun-3',
    date: '2027-06-19',
    title: 'Juneteenth National Holiday · Campus Closed',
    category: 'School Holidays',
    division: 'Campus Closed',
    timeOrNote: 'All-Day Holiday',
    location: 'No Summer Camp Sessions',
    description: 'Campus closed for the Juneteenth observance; summer enrichment resumes Monday, June 21.',
  },
];

export type GalleryCategory = 'Classrooms' | 'Laboratories' | 'Campus Facilities';

export interface CampusGalleryItem {
  id: string;
  plateNo: string;
  title: string;
  category: GalleryCategory;
  building: string;
  gradesServed: string;
  accentHex: string;
  image: string;
  aspectClass?: string;
  caption: string;
  highlights: string;
}

export const CAMPUS_GALLERY_ITEMS: CampusGalleryItem[] = [
  {
    id: 'gal-humanities',
    plateNo: 'PLATE 01',
    title: 'Harkness Classical Humanities Seminar Room',
    category: 'Classrooms',
    building: 'Main Heritage Hall · BLDG 01',
    gradesServed: 'Grades 5–10',
    accentHex: '#264B8A',
    image: SCHOOL_IMAGES.humanitiesClassroom,
    caption:
      'Sunlit oak seminar classrooms designed around a single round table where students practice Socratic dialogue, close textual reading, and collaborative proof discussion.',
    highlights: '18-seat solid oak table · Arched garden windows · Floor-to-ceiling reference library',
  },
  {
    id: 'gal-kindergarten',
    plateNo: 'PLATE 02',
    title: 'Kindergarten & Montessori Discovery Studio',
    category: 'Classrooms',
    building: 'Early Childhood Wing · BLDG 02',
    gradesServed: 'KG-1 & KG-2',
    accentHex: '#C85A32',
    image: SCHOOL_IMAGES.kindergartenRoom,
    caption:
      'Warm ground-floor early childhood studios filled with natural timber manipulatives, tactile phonics trays, reading nooks, and direct courtyard garden access.',
    highlights: '25 students max · 2 educators · Enclosed sensory courtyard',
  },
  {
    id: 'gal-robotics',
    plateNo: 'PLATE 03',
    title: 'Applied Robotics & Engineering Makerspace',
    category: 'Laboratories',
    building: 'Vance Science Pavilion · BLDG 03',
    gradesServed: 'Grades 5–10',
    accentHex: '#1E6B52',
    image: SCHOOL_IMAGES.roboticsLab,
    caption:
      'Hands-on STEM studio equipped with workbench power stations, microcontroller kits, 3D fabrication units, and test tracks for autonomous student rovers.',
    highlights: '24 workbench stations · 3D printing bay · Regional robotics tournament prep',
  },
  {
    id: 'gal-science',
    plateNo: 'PLATE 04',
    title: 'Physics, Chemistry & Molecular Biology Lab',
    category: 'Laboratories',
    building: 'Vance Science Pavilion · BLDG 03',
    gradesServed: 'Grades 6–10',
    accentHex: '#8B1E2D',
    image: SCHOOL_IMAGES.scienceLab,
    caption:
      'Distinguished STEM-certified wet and optics laboratory supporting weekly Grade 6–10 empirical experiments, microscopy, titration, and board practicals.',
    highlights: 'Certified fume hoods · Digital sensor probes · Dedicated safety eyewash stations',
  },
  {
    id: 'gal-art-music',
    plateNo: 'PLATE 05',
    title: 'Fine Arts, Ceramics & Choral Studio',
    category: 'Classrooms',
    building: 'Studio Wing · BLDG 02',
    gradesServed: 'KG-1 – Grade 10',
    accentHex: '#C85A32',
    image: SCHOOL_IMAGES.artMusicStudio,
    caption:
      'North-lit creative atelier housing easel painting bays, pottery wheels, kiln shelving, and acoustic piano rehearsal space for music and choral ensembles.',
    highlights: 'Natural north daylight · Ceramic kiln room · Annual Spring Fine Arts Gallery',
  },
  {
    id: 'gal-library',
    plateNo: 'PLATE 06',
    title: 'Vance 22,000-Volume Archive & Reading Library',
    category: 'Campus Facilities',
    building: 'Vance Science Pavilion · BLDG 03',
    gradesServed: 'All Grades (KG–10)',
    accentHex: '#264B8A',
    image: SCHOOL_IMAGES.admissionsLibrary,
    caption:
      'Quiet reading gallery anchored by curated print monographs, quiet study alcoves, Grade 10 Senior Thesis research guidance, and digital academic journals.',
    highlights: '22,000+ curated volumes · Quiet study desks · Dedicated librarian mentorship',
  },
  {
    id: 'gal-courtyard',
    plateNo: 'PLATE 07',
    title: 'Main Heritage Hall & Founders Green Courtyard',
    category: 'Campus Facilities',
    building: 'Main Heritage Hall · BLDG 01',
    gradesServed: 'All School & Visitors',
    accentHex: '#8B1E2D',
    image: SCHOOL_IMAGES.campusHero,
    caption:
      'Rainbow School’s historic brick-and-limestone quad shaded by mature oaks—hosting morning assemblies, Founders Day recitals, and welcoming prospective families.',
    highlights: '18-acre green arboretum · 65% solar canopy power · RFID-secured campus perimeter',
  },
  {
    id: 'gal-stadium',
    plateNo: 'PLATE 08',
    title: '400m Olympic Track & Crestview Turf Stadium',
    category: 'Campus Facilities',
    building: 'Athletic Complex · BLDG 04',
    gradesServed: 'KG-1 – Grade 10',
    accentHex: '#1E6B52',
    image: SCHOOL_IMAGES.athleticsField,
    caption:
      'Regional championship outdoor athletics complex featuring an eight-lane synthetic running track, FIFA-grade turf pitch, and floodlit courtyard tennis courts.',
    highlights: 'RISAA certified track · Floodlit spectator stands · Connected to 25m heated pool',
  },
];


