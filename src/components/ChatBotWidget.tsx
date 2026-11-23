import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Calendar,
  Check,
  Copy,
  GraduationCap,
  MapPin,
  RefreshCw,
  RotateCcw,
  Send,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';
import { PageRoute } from '../data/schoolData';
import { useSchool } from '../context/SchoolContext';
import { RainbowLogo } from './RainbowLogo';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface ChatBotWidgetProps {
  currentPage?: PageRoute;
}

const VISITOR_TOPICS = [
  {
    label: 'Admissions & Dates',
    prompt: 'How do I apply for admission and what are the 2026–2027 deadlines?',
    icon: Calendar,
    accent: '#8B1E2D',
    softBg: '#FDF2F4',
  },
  {
    label: 'KG–10th Courses',
    prompt: 'Which grades and courses do you offer from Kindergarten to 10th?',
    icon: BookOpen,
    accent: '#264B8A',
    softBg: '#EFF4FC',
  },
  {
    label: 'Sports & Pool',
    prompt: 'What sports teams, coaches, and athletic facilities are on campus?',
    icon: Trophy,
    accent: '#1E6B52',
    softBg: '#EFF8F4',
  },
  {
    label: 'Campus & Bus',
    prompt: 'Where is Rainbow School located and how do school buses work?',
    icon: MapPin,
    accent: '#C85A32',
    softBg: '#FFF4EE',
  },
];

const STUDENT_TOPICS = [
  {
    label: 'Study & Math Help',
    prompt: 'Can you help me understand quadratic equations or science lab concepts step by step?',
    icon: GraduationCap,
    accent: '#8B1E2D',
    softBg: '#FDF2F4',
  },
  {
    label: 'Exams & Holidays',
    prompt: 'What are the upcoming Fall exam dates, exhibitions, and school holidays?',
    icon: Calendar,
    accent: '#264B8A',
    softBg: '#EFF4FC',
  },
  {
    label: 'Library & Labs',
    prompt: 'What hours are the Vance Library and Robotics Makerspace open for students?',
    icon: BookOpen,
    accent: '#1E6B52',
    softBg: '#EFF8F4',
  },
  {
    label: 'Sports Tryouts',
    prompt: 'How do I join a varsity or junior athletics team and check practice schedules?',
    icon: Trophy,
    accent: '#C85A32',
    softBg: '#FFF4EE',
  },
];

const TEACHER_TOPICS = [
  {
    label: 'Gradebook & Roster',
    prompt: 'How do I filter all 12 classes (25 students per class) and update attendance or scores?',
    icon: GraduationCap,
    accent: '#264B8A',
    softBg: '#EFF4FC',
  },
  {
    label: 'Campus Calendar',
    prompt: 'List the major academic milestones and exam dates for 2026–2027.',
    icon: Calendar,
    accent: '#8B1E2D',
    softBg: '#FDF2F4',
  },
  {
    label: 'Admissions Queue',
    prompt: 'What are the required admissions documents and review statuses for applicants?',
    icon: BookOpen,
    accent: '#1E6B52',
    softBg: '#EFF8F4',
  },
  {
    label: 'School Mail & Notices',
    prompt: 'What are the official Rainbow School Mail addresses for offices and faculty?',
    icon: MapPin,
    accent: '#C85A32',
    softBg: '#FFF4EE',
  },
];

function nowLabel(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderInlineFormatting(line: string): React.ReactNode[] {
  const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|[a-zA-Z0-9._%+-]+@rainbowschool\.edu)/g;
  const parts = line.split(tokenRegex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-[#10233D]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-[#F3EFE6] text-[#8B1E2D] font-mono text-[12px]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (/^[a-zA-Z0-9._%+-]+@rainbowschool\.edu$/.test(part)) {
      return (
        <a
          key={idx}
          href={`mailto:${part}`}
          className="font-mono text-[12px] text-[#8B1E2D] underline underline-offset-2 hover:text-[#10233D]"
        >
          {part}
        </a>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

const FormattedAiText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: { ordered: boolean; text: string }[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    const isOrdered = listItems[0].ordered;
    const itemsCopy = [...listItems];
    listItems = [];

    if (isOrdered) {
      blocks.push(
        <ol key={`ol-${listKey++}`} className="list-decimal pl-5 space-y-1.5 text-sm text-[#1C1917]">
          {itemsCopy.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineFormatting(item.text)}
            </li>
          ))}
        </ol>
      );
    } else {
      blocks.push(
        <ul key={`ul-${listKey++}`} className="space-y-1.5 text-sm text-[#1C1917]">
          {itemsCopy.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E2D] mt-2 shrink-0" aria-hidden="true" />
              <span>{renderInlineFormatting(item.text)}</span>
            </li>
          ))}
        </ul>
      );
    }
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      return;
    }

    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    const headingMatch = line.match(/^#{1,3}\s+(.*)$/);

    if (bulletMatch) {
      if (listItems.length > 0 && listItems[0].ordered) flushList();
      listItems.push({ ordered: false, text: bulletMatch[1] });
    } else if (orderedMatch) {
      if (listItems.length > 0 && !listItems[0].ordered) flushList();
      listItems.push({ ordered: true, text: orderedMatch[1] });
    } else if (headingMatch) {
      flushList();
      blocks.push(
        <p key={`h-${idx}`} className="font-serif text-base font-semibold text-[#10233D] pt-1">
          {renderInlineFormatting(headingMatch[1])}
        </p>
      );
    } else {
      flushList();
      blocks.push(
        <p key={`p-${idx}`} className="text-sm text-[#1C1917] leading-relaxed">
          {renderInlineFormatting(line)}
        </p>
      );
    }
  });

  flushList();

  return <div className="px-4 py-3 space-y-2.5">{blocks}</div>;
};

export const ChatBotWidget: React.FC<ChatBotWidgetProps> = ({ currentPage = 'home' }) => {
  const { user } = useSchool();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);

  const welcomeMessage = useMemo(() => {
    if (user?.role === 'student') {
      return `Welcome back, **${user.name}** (${user.gradeOrDept}). I can help you with **study & homework doubts** (Math, Science, English, Coding), exam & holiday dates, Vance Library hours, or varsity sports.`;
    }
    if (user?.role === 'teacher') {
      return `Welcome, **${user.name}**. Ask me about class rosters (25 students per grade), campus calendar milestones, admissions review workflows, or official School Mail contacts.`;
    }
    return 'Welcome to Rainbow School. Ask me anything about **KG–Grade 10 admissions**, required documents, course syllabi, campus tours, athletics, certificates, or student & teacher portals.';
  }, [user]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      timestamp: 'Online',
      text: welcomeMessage,
    },
  ]);

  // Keep welcome message synced if user logs in or out before starting a conversation
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ ...prev[0], text: welcomeMessage }];
      }
      return prev;
    });
  }, [welcomeMessage]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  const starterTopics =
    user?.role === 'student'
      ? STUDENT_TOPICS
      : user?.role === 'teacher'
      ? TEACHER_TOPICS
      : VISITOR_TOPICS;

  const resetChat = () => {
    setErrorMsg(null);
    setLastFailedPrompt(null);
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        timestamp: nowLabel(),
        text: welcomeMessage,
      },
    ]);
  };

  const copyMessage = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 1800);
    } catch {
      // Ignore clipboard failures in restricted environments
    }
  };

  const sendQuestion = async (questionText: string, isRetry = false) => {
    const trimmed = questionText.trim();
    if (!trimmed || loading) return;

    // Build clean history excluding welcome card and any failed trailing user prompt
    const baseMessages = isRetry ? messages.slice(0, -1) : messages;
    const historyForApi = baseMessages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role, text: m.text }));

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      timestamp: nowLabel(),
      text: trimmed,
    };

    setMessages([...baseMessages, userMsg]);
    if (!isRetry) setInput('');
    setErrorMsg(null);
    setLastFailedPrompt(null);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
          context: {
            role: user?.role || 'visitor',
            name: user?.name,
            gradeOrDept: user?.gradeOrDept,
            currentPage,
          },
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? ((await res.json()) as { reply?: string; error?: string })
        : { error: `Server responded with status ${res.status}.` };

      if (!res.ok || !data.reply) {
        setErrorMsg(data.error || 'Could not reach Rainbow AI assistant. Please try again.');
        setLastFailedPrompt(trimmed);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: 'model',
          timestamp: nowLabel(),
          text: data.reply!,
        },
      ]);
    } catch {
      setErrorMsg('Network error reaching the Rainbow School AI server. Please check your connection and retry.');
      setLastFailedPrompt(trimmed);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  return (
    <>
      {/* Premium Floating AI Launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Rainbow School AI Guide"
          className="group fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 rounded-2xl bg-gradient-to-br from-[#10233D] via-[#152E50] to-[#1D3C66] text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 border border-[#E8C587]/45 overflow-hidden text-left"
        >
          <div className="grid grid-cols-4 h-1 w-full">
            <div className="bg-[#C85A32]" />
            <div className="bg-[#1E6B52]" />
            <div className="bg-[#264B8A]" />
            <div className="bg-[#8B1E2D]" />
          </div>
          <div className="px-4 py-2.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
              <RainbowLogo size={24} />
            </div>
            <div className="pr-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-white whitespace-nowrap">
                  Ask Rainbow AI
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#E8C587]" />
              </div>
              <p className="text-[11px] text-[#E8C587]/90 whitespace-nowrap leading-tight">
                {user?.role === 'student'
                  ? 'Study & Campus Guide'
                  : user?.role === 'teacher'
                  ? 'Faculty & Roster Guide'
                  : 'Admissions & Campus Guide'}
              </p>
            </div>
          </div>
        </button>
      )}

      {/* Elevated AI Assistant Drawer */}
      {open && (
        <div
          className="fixed bottom-20 right-3 left-3 sm:left-auto sm:w-[440px] md:bottom-6 md:right-6 z-50 bg-[#FBF9F5] border border-stone-300/90 rounded-2xl shadow-2xl flex flex-col max-h-[82vh] overflow-hidden"
          role="dialog"
          aria-label="Rainbow School AI Guide"
        >
          {/* Rainbow 4-Band Crest Strip */}
          <div className="grid grid-cols-4 h-1.5 shrink-0">
            <div className="bg-[#C85A32]" />
            <div className="bg-[#1E6B52]" />
            <div className="bg-[#264B8A]" />
            <div className="bg-[#8B1E2D]" />
          </div>

          {/* Rich Navy Gradient Header */}
          <div className="bg-gradient-to-br from-[#10233D] via-[#132B4D] to-[#1A365E] text-white px-5 py-4 flex items-center justify-between gap-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#E8C587]/35 flex items-center justify-center shrink-0">
                <RainbowLogo size={28} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-xl font-semibold leading-tight text-white truncate">
                    Rainbow AI Concierge
                  </h3>
                  <Sparkles className="w-3.5 h-3.5 text-[#E8C587] shrink-0" />
                </div>
                <p className="text-[11px] text-[#E8C587] tracking-wide truncate">
                  {user?.role === 'student'
                    ? `${user.name} · ${user.gradeOrDept}`
                    : user?.role === 'teacher'
                    ? `Faculty · ${user.name}`
                    : 'KG–Grade 10 Admissions, Courses & Campus Help'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={resetChat}
                title="Start fresh conversation"
                aria-label="Reset conversation"
                className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close AI Assistant"
                className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conversation Canvas */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-[#FBF9F5] to-[#F3EFE6]/70"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.role === 'model' ? (
                  <div className="w-full max-w-[94%] bg-white border border-stone-200/90 rounded-2xl rounded-tl-sm shadow-xs overflow-hidden">
                    <div className="px-4 py-2 bg-[#F3EFE6]/60 border-b border-stone-100 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-[11px] font-semibold text-[#10233D]">
                        <RainbowLogo size={15} />
                        <span>Rainbow School Guide</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-stone-400 tabular-nums">
                          {msg.timestamp}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyMessage(msg.id, msg.text)}
                          aria-label="Copy response"
                          className="p-1 rounded hover:bg-stone-200/70 text-stone-500 hover:text-[#10233D] transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-[#1E6B52]" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                    <FormattedAiText text={msg.text} />
                  </div>
                ) : (
                  <div className="max-w-[85%] bg-gradient-to-br from-[#8B1E2D] to-[#721623] text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed shadow-xs">
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className="block text-right text-[10px] font-mono text-white/75 mt-1 tabular-nums">
                      {msg.timestamp}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-[#10233D] flex items-center gap-2.5 shadow-xs">
                  <RainbowLogo size={16} />
                  <span className="font-medium">Composing answer</span>
                  <span className="inline-flex items-center gap-1" aria-hidden="true">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] animate-bounce [animation-delay:-0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B52] animate-bounce [animation-delay:-0.1s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#264B8A] animate-bounce" />
                  </span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3.5 bg-[#FDF2F4] border border-[#8B1E2D]/35 rounded-xl text-xs text-[#8B1E2D] space-y-2.5">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
                {lastFailedPrompt && (
                  <button
                    type="button"
                    onClick={() => sendQuestion(lastFailedPrompt, true)}
                    disabled={loading}
                    className="min-h-[34px] px-3 py-1.5 bg-[#8B1E2D] hover:bg-[#10233D] text-white text-[11px] font-medium rounded-md inline-flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Retry Question</span>
                  </button>
                )}
              </div>
            )}

            {/* Role-Aware Starter Topic Grid Cards */}
            {messages.length <= 2 && !loading && !errorMsg && (
              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-medium uppercase tracking-wider text-stone-500">
                  {user?.role === 'student'
                    ? 'Quick Student & Study Prompts'
                    : user?.role === 'teacher'
                    ? 'Quick Faculty Prompts'
                    : 'Explore Common Questions'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {starterTopics.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <button
                        key={topic.label}
                        type="button"
                        onClick={() => sendQuestion(topic.prompt)}
                        className="group text-left bg-white border border-stone-200 rounded-xl p-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md hover:border-[#10233D]/40"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                            style={{ backgroundColor: topic.softBg, color: topic.accent }}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-xs font-semibold text-[#10233D] group-hover:text-[#8B1E2D] transition-colors">
                            {topic.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 line-clamp-2 leading-snug">
                          {topic.prompt}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Elevated Prompt Composer */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3.5 bg-white border-t border-stone-200 flex items-center gap-2.5 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                user?.role === 'student'
                  ? 'Ask a study doubt, exam date, or campus question...'
                  : 'Ask about admissions, courses, bus routes...'
              }
              aria-label="Ask Rainbow School AI"
              className="flex-1 min-h-[44px] px-4 py-2 bg-[#FBF9F5] border border-stone-300 rounded-xl text-sm text-[#10233D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10233D]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send question"
              className="min-h-[44px] min-w-[44px] px-4 bg-[#10233D] hover:bg-[#8B1E2D] disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all duration-150 hover:shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
