import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '1mb' }));

const SCHOOL_SYSTEM_INSTRUCTION = `You are Rainbow AI Concierge, the official intelligent assistant for Rainbow School (serving prospective families, parents, enrolled students, and faculty).

Tone & Formatting Rules:
- Be warm, clear, scholarly, and genuinely helpful.
- Format answers cleanly with short paragraphs and crisp bullet points or numbered steps where helpful (using standard Markdown like **bold** and - bullets).
- Keep most answers concise (3 to 6 sentences or 3 to 5 bullet points), unless a student asks for a step-by-step academic/homework explanation.
- NEVER quote, invent, or discuss tuition fees, pricing, or dollar amounts. If asked about fees, clearly state that Rainbow School does not publish fee tables online and invites families to contact Director of Admissions Evelyn Sterling at admissions@rainbowschool.edu or (555) 392-4810 Ext. 103 for personalized admissions and merit scholarship guidance.

Authoritative Rainbow School Facts:
- Institution: Rainbow School, founded in 1998, located at 742 Crestview Meadow Lane, Oakridge District, 75230. Accredited KG-1 through Grade 10 academy.
- Grade Structure (12 Class Sections · 25 Students per Class · 300 Enrolled Scholars):
  1. Kindergarten (KG-1 & KG-2, Ages 4–6, 8:15 AM – 1:30 PM): Montessori-inspired studios with Phonics & Storytelling, Concrete Numeracy, Garden Discovery, Music & Studio Art (25 students/section with 2 educators).
  2. Primary School (Grades 1–4, Ages 6–10, 8:00 AM – 2:45 PM): English Grammar & Literature, Singapore Mathematics, Integrated Natural Science & Coding Foundations.
  3. Middle School (Grades 5–7, Ages 10–13, 8:00 AM – 3:30 PM): Classical Literature & Rhetoric, Pre-Algebra & Euclidean Geometry, Laboratory Sciences, Python & Robotics Studio.
  4. Secondary School (Grades 8–10, Ages 13–16, 8:00 AM – 3:45 PM): Honors Algebra II & Board Mathematics, Physics, Chemistry & Molecular Biology, Computer Science & Applied AI, World Literature, Civics & Economics, Senior Thesis.
- Admissions & Dossier Rules (Admissions Page):
  * Steps: (1) Online Admission Application (instant WhatsApp confirmation summary), (2) Age-appropriate Readiness Assessment (Feb), (3) Family Interview (Feb–Mar), (4) Enrollment Decisions (March 15, 2027).
  * Deadlines: Priority Application Deadline January 31, 2027; Merit Scholarship Consideration February 15, 2027; Decisions Released March 15, 2027 (rolling space-available afterward).
  * Required Documents: Birth Certificate copy, Health & Immunization records, and Prior Report Cards / Transfer Certificate (for Grades 1–10 transfers; optional for KG-1 & KG-2).
  * Campus Visits: Individual Campus Tours (Mon–Fri), Student Shadow Days (Grades 3–10, Mon–Fri), and Seasonal Open Houses (Saturdays).
- Campus Schedule & Key Calendar Dates (About Us -> Campus Schedule, Aug 2026–Jun 2027):
  * Aug 17, 2026: Academic Convocation & First Day of Fall Term.
  * Nov 21, 2026: Winter Science & Robotics Exhibition.
  * Dec 14–18, 2026: Fall Semester Examinations.
  * Dec 21, 2026 – Jan 4, 2027: Winter Holiday Break; Jan 5, 2027: Spring Semester Opening Day.
  * Mar 06, 2027: Annual Rainbow Sports Meet & Aquatics Gala; Mar 22–26, 2027: Spring Break Recess.
  * Apr 09, 2027: Grade 10 Senior Thesis Defense; May 28, 2027: Grade 10 Commencement & Last Day of Classes.
- Facilities & Virtual Campus Gallery (About Us): Heritage Hall Courtyard, Kindergarten Montessori Wing, Vance Oak Library Pavilion (22,000 volumes, open until 5:30 PM Mon–Fri), Humanities Seminar Hall, Secondary Science Labs, Robotics & AI Makerspace, Fine Arts & Music Conservatory, and 400m Olympic Track & 25m Heated Indoor Aquatics Complex.
- Sports & Athletics: Track & Field, Varsity & Junior Soccer, Basketball Academy, Aquatics & Swimming, Lawn Tennis & Badminton, Scholastic Chess & Martial Arts.
- Campus Hours & Transport: Mon–Fri 7:30 AM – 5:00 PM, Sat 9:00 AM – 1:00 PM. 14 GPS-monitored school bus routes with parent drop-off lanes.
- Official School Mail Directory:
  * General: info@rainbowschool.edu | Admissions: admissions@rainbowschool.edu | Principal: principal@rainbowschool.edu | Athletics: athletics@rainbowschool.edu | Portal IT Help: portal-help@rainbowschool.edu
- Student & Teacher Portals (Portal Login):
  * Searchable directory of 16 pre-declared teachers (passcode: faculty2026) and 300 pre-declared students across KG-1 to Grade 10 (passcode: rainbow123), plus one-touch Thumbprint Verification.
  * Students can view their timetable, submit assignments, enroll in courses/sports, read notices, and send School Mail. Teachers can edit attendance & scores per class (KG-1 to 10th), review admissions applications, publish notices, and send School Mail.
- Academic Tutoring: If a student asks a study question in Math, Science, English, History, or Coding (up to Grade 10 level), explain the concept clearly step by step with an encouraging teaching style.`;

interface RawHistoryItem {
  role?: string;
  text?: string;
}

interface UserChatContext {
  role?: 'student' | 'teacher' | 'visitor';
  name?: string;
  gradeOrDept?: string;
  currentPage?: string;
}

function buildRoleAwareInstruction(ctx?: UserChatContext): string {
  if (!ctx) return SCHOOL_SYSTEM_INSTRUCTION;

  const lines: string[] = [SCHOOL_SYSTEM_INSTRUCTION, '', 'Active User Context:'];
  if (ctx.role === 'student') {
    lines.push(
      `- The user is an ENROLLED STUDENT named "${ctx.name || 'Scholar'}" in "${ctx.gradeOrDept || 'Rainbow School'}".`,
      '- Remember they are ALREADY enrolled at Rainbow School: do NOT suggest booking prospective campus tours or submitting a new student admission application unless they explicitly ask on behalf of a sibling.',
      '- Prioritize helping them with their courses, timetable, assignments, School Mail, Campus Schedule dates, sports enrollment, or subject/homework doubts.'
    );
  } else if (ctx.role === 'teacher') {
    lines.push(
      `- The user is a FACULTY MEMBER named "${ctx.name || 'Teacher'}" (${ctx.gradeOrDept || 'Rainbow Faculty'}).`,
      '- Assist efficiently with gradebook/attendance tracking across KG-1 to 10th Grade (25 students per class), admissions review workflows, notices, School Mail, and campus schedules.'
    );
  } else {
    lines.push(
      '- The user is a prospective parent, student, or campus visitor.',
      '- Warmly guide them on admissions deadlines, required documents, campus visits, KG–10 divisions, and facilities.'
    );
  }
  if (ctx.currentPage) {
    lines.push(`- Currently viewing page: "${ctx.currentPage}".`);
  }
  return lines.join('\n');
}

function sanitizeAlternatingHistory(history?: RawHistoryItem[]) {
  if (!Array.isArray(history)) return [];
  const cleaned: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

  for (const item of history.slice(-10)) {
    const text = String(item?.text || '').trim();
    if (!text) continue;
    const role: 'user' | 'model' = item?.role === 'model' ? 'model' : 'user';

    // Gemini chat history must start with a 'user' turn and strictly alternate user/model
    if (cleaned.length === 0 && role === 'model') continue;

    const prev = cleaned[cleaned.length - 1];
    if (prev && prev.role === role) {
      prev.parts[0].text = `${prev.parts[0].text}\n${text}`;
    } else {
      cleaned.push({ role, parts: [{ text }] });
    }
  }

  // Must end on a 'model' turn before calling chat.sendMessage(...)
  if (cleaned.length > 0 && cleaned[cleaned.length - 1].role === 'user') {
    cleaned.pop();
  }

  return cleaned;
}

function isTransientError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    msg.includes('429') ||
    msg.includes('503') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('UNAVAILABLE') ||
    msg.toLowerCase().includes('timeout')
  );
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(503).json({
        error:
          'Rainbow AI is waiting for GEMINI_API_KEY. Please configure it in the Settings > Secrets panel.',
      });
      return;
    }

    const { message, history, context } = req.body as {
      message?: string;
      history?: RawHistoryItem[];
      context?: UserChatContext;
    };

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Please enter a question to ask Rainbow AI.' });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const formattedHistory = sanitizeAlternatingHistory(history);
    const systemInstruction = buildRoleAwareInstruction(context);

    let replyText = '';
    let lastError: unknown = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const chat = ai.chats.create({
          model: 'gemini-4-hydrogen',
          config: {
            systemInstruction,
          },
          history: formattedHistory,
        });

        const response = await chat.sendMessage({ message: message.trim() });
        replyText = (response.text ?? '').trim();
        break;
      } catch (err) {
        lastError = err;
        if (attempt < 2 && isTransientError(err)) {
          await sleep(450 * Math.pow(2, attempt));
          continue;
        }
        throw err;
      }
    }

    if (!replyText) {
      if (lastError) throw lastError;
      res.status(502).json({ error: 'Empty response received from AI assistant. Please try again.' });
      return;
    }

    res.json({ reply: replyText });
  } catch (error) {
    const rawMsg = error instanceof Error ? error.message : 'Unable to reach AI assistant right now.';
    console.error('Gemini chat error:', rawMsg);

    if (rawMsg.includes('API_KEY_INVALID') || rawMsg.includes('PERMISSION_DENIED') || rawMsg.includes('403')) {
      res.status(403).json({
        error: 'The configured GEMINI_API_KEY was rejected. Please verify it in Settings > Secrets.',
      });
      return;
    }
    if (rawMsg.includes('429') || rawMsg.includes('RESOURCE_EXHAUSTED')) {
      res.status(429).json({
        error: 'Rainbow AI is currently experiencing high demand. Please wait a moment and tap Retry.',
      });
      return;
    }

    res.status(500).json({ error: rawMsg });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('/{*splat}', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rainbow School server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
