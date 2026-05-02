/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  BookOpen, 
  Users, 
  Search, 
  MessageSquare, 
  Layout, 
  ChevronRight,
  Brain,
  Wind,
  Clock,
  ExternalLink,
  GraduationCap,
  AlertCircle,
  Moon,
  Activity,
  Smartphone,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type Section = "identifying" | "coping" | "audience" | "research" | "team-roles" | "reflection";

const SLEEP_DATA = [
  { name: '6 hours or less', value: 55, color: '#F76902' },
  { name: '7 hours', value: 25, color: '#5A5A40' },
  { name: '8+ hours', value: 20, color: '#e3e3d8' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("identifying");

  const menuItems = [
    { id: "identifying", label: "Identifying Stress", icon: BookOpen },
    { id: "coping", label: "Coping Strategies", icon: Wind },
    { id: "audience", label: "Audience Analysis", icon: GraduationCap },
    { id: "research", label: "Research & Sources", icon: Search },
    { id: "team-roles", label: "Team Roles", icon: Users },
    { id: "reflection", label: "Group Reflection", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text font-sans p-8 flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col gap-8">
        {/* Navigation Header */}
        <header className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-natural-primary rounded-full flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-natural-heading">
              StudentMind <span className="font-normal opacity-50 text-lg italic">Wiki</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search topics..." 
                className="bg-white border border-natural-border rounded-full py-2 px-10 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-natural-primary transition-all shadow-sm"
              />
              <Search className="absolute left-3 top-2.5 opacity-30 w-4 h-4" />
            </div>
            <button className="text-sm font-medium hover:text-natural-primary transition-colors">Community</button>
            <button className="bg-natural-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-sm">
              Login
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation */}
          <aside className="col-span-12 lg:col-span-3 flex flex-col gap-8 sticky top-8">
            <section>
              <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#8a8a70] mb-4">Wiki Content</h3>
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as Section)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium text-left ${
                      activeSection === item.id
                        ? "bg-natural-item-bg text-natural-primary shadow-sm"
                        : "text-[#6b6b54] hover:bg-white/50"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all ${activeSection === item.id ? "bg-natural-primary" : "bg-transparent"}`}></span>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </section>

            <div className="mt-4 p-6 bg-natural-sidebar rounded-3xl border border-natural-border/30 shadow-sm">
              <p className="text-xs text-[#6b6b54] mb-4 leading-relaxed font-medium">
                Feeling overwhelmed? Our RIT peer support line is open until midnight for all students.
              </p>
              <button className="w-full py-3 bg-white text-natural-primary text-xs font-bold rounded-full shadow-sm hover:shadow-md transition-all">
                Talk to a Peer
              </button>
            </div>
          </aside>

          {/* Main Article Content */}
          <main className="col-span-12 lg:col-span-9 bg-white rounded-[40px] p-10 shadow-sm border border-[#ececea] flex flex-col min-h-[800px]">
             <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] bg-natural-bg text-[#8a8a70] px-3 py-1 rounded-md uppercase font-bold tracking-wider border border-natural-border/20 shadow-sm">
                Technical Communication Wiki
              </span>
              <span className="text-[10px] bg-natural-accent text-[#5A5A40] px-3 py-1 rounded-md uppercase font-bold tracking-wider">
                Ver. 2.0
              </span>
            </div>

            <div className="flex-1 markdown-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === "identifying" && <IdentifyingStress />}
                  {activeSection === "coping" && <CopingStrategies />}
                  {activeSection === "audience" && <AudienceAnalysis />}
                  {activeSection === "research" && <ResearchSection />}
                  {activeSection === "team-roles" && <TeamRoles />}
                  {activeSection === "reflection" && <TeamReflection />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-12 pt-8 border-t border-[#f0f0e8] flex flex-wrap gap-4 justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[#8a8a70] font-bold uppercase tracking-tight">Technical Reference: COMM 142</span>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-natural-primary group">
                Contribution Activity
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-8 flex flex-col md:flex-row justify-between items-center px-4 py-8 border-t border-natural-border/20 gap-6">
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold text-[#8a8a70] uppercase tracking-widest">
            <span>© 2026 RIT Dubai Wiki project</span>
            <span>Technical Communication</span>
            <span>Stress Management</span>
          </div>
          <div className="text-xs text-natural-primary italic font-serif opacity-80 max-w-sm text-center md:text-right leading-relaxed">
            "Prioritizing mental health is the first step toward academic excellence."
          </div>
        </footer>
      </div>
    </div>
  );
}

function IdentifyingStress() {
  return (
    <>
      <h1 className="mb-8">Mental Health & Stress Management for Students</h1>
      
      <div className="mb-10 rounded-[40px] overflow-hidden border border-natural-border/20 shadow-sm bg-natural-sidebar">
        <img 
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200" 
          alt="Illustration of mental stress and digital overload" 
          className="w-full h-[300px] object-cover"
        />
        <div className="p-4 text-center">
          <p className="text-[10px] text-[#8a8a70] italic m-0">Visualizing the weight of digital and academic expectations on modern students.</p>
        </div>
      </div>

      <h2>Introduction</h2>
      <p>
        Stress is a common experience among university students caused by academic pressure, deadlines, and personal responsibilities. While some stress can improve performance, excessive stress can negatively affect both mental and physical health.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
        <div className="p-6 bg-natural-sidebar rounded-3xl border border-natural-border/20">
          <h3 className="text-sm font-serif font-bold text-natural-heading mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rit-orange" /> Causes of Stress
          </h3>
          <ul className="text-xs space-y-2 list-none p-0">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-natural-primary rounded-full mt-1.5 shrink-0"></span>
              <span>Academic workload</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-natural-primary rounded-full mt-1.5 shrink-0"></span>
              <span>Exams and deadlines</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-natural-primary rounded-full mt-1.5 shrink-0"></span>
              <span>Poor sleep habits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-natural-primary rounded-full mt-1.5 shrink-0"></span>
              <span>Time management issues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-natural-primary rounded-full mt-1.5 shrink-0"></span>
              <span>High performance expectations</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-natural-accent rounded-3xl border border-natural-primary/10">
          <h3 className="text-sm font-serif font-bold text-natural-heading mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-natural-primary" /> Effects of Stress
          </h3>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-natural-primary">Mental Effects</span>
              <p className="text-xs m-0">Anxiety, reduced concentration, and burnout.</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-natural-primary">Physical Effects</span>
              <p className="text-xs m-0">Fatigue, headaches, and sleep deprivation.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center bg-natural-bg/10 p-8 rounded-[32px] my-10 border border-natural-border/20">
        <div className="flex-1">
          <h2>Sleep and Academic Stress</h2>
          <p>
            Research indicates a strong link between sleep patterns and academic stress. According to student data, the majority of students do not meet the recommended sleep requirements.
          </p>
          <p>
            A study by <strong>Steinthal (2016)</strong> shows that 55% of students sleep 6 hours or less per night, directly increasing anxiety and reducing academic performance.
          </p>
        </div>
        <div className="w-full md:w-64 shrink-0 overflow-hidden rounded-2xl border border-natural-border/30 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1506784926709-22f1ec395907?auto=format&fit=crop&q=80&w=800" 
            alt="Hourglass representing time pressure" 
            className="w-full h-48 object-cover"
          />
        </div>
      </div>

      <div className="my-12 p-8 bg-white border border-natural-border/30 rounded-[32px] shadow-sm flex flex-col items-center">
        <h4 className="text-sm font-serif font-bold text-natural-heading mb-2">Figure 1: Student Sleep Patterns</h4>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={SLEEP_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {SLEEP_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-[#8a8a70] italic text-center max-w-md mt-4">
          Figure 1: Distribution of sleep duration among students, showing that most students sleep fewer hours than recommended, which may contribute to higher stress levels.
        </p>
      </div>

      <h2>Conclusion</h2>
      <p>
        Stress is a common but manageable part of student life. With proper sleep, time management, and support systems, students can significantly improve both their mental health and academic performance.
      </p>
    </>
  );
}

function CopingStrategies() {
  const strategies = [
    {
      title: "Time Management",
      icon: Clock,
      content: "The biggest cause of stress is deadline pressure. Practical tips include breaking large tasks into smaller steps, using a weekly planner, and the 2-hour study rule (focused study with breaks)."
    },
    {
      title: "Breathing & Relaxation",
      icon: Wind,
      content: "Reset your nervous system with the 4-7-8 method (Inhale 4s, Hold 7s, Exhale 8s) or Box Breathing (4-4-4-4). Just 5-10 minutes of daily mediation improves focus."
    },
    {
      title: "Sleep Management",
      icon: Moon,
      content: "Aim for 7–9 hours. Avoid screens 60 mins before bed and keep a consistent schedule. Poor sleep directly increases anxiety and reduces concentration."
    },
    {
      title: "Physical Activity",
      icon: Activity,
      content: "Exercise releases endorphins. Walking for 20 minutes or light stretching between study sessions are natural stress reducers."
    },
    {
      title: "Digital Overload",
      icon: Smartphone,
      content: "Reduce screen time to fight mental fatigue. Use 'Do Not Disturb' during sessions and avoid multitasking with your phone while studying."
    },
    {
      title: "Seek Support",
      icon: Users,
      content: "Don't handle it alone. Talk to friends, family, or RIT counseling services. Talking about stress reduces emotional pressure significantly."
    },
    {
      title: "Healthy Study Habits",
      icon: CheckCircle2,
      content: "Use active recall (testing yourself) and the Pomodoro technique (25m study / 5m break). Avoid cramming; regular review prevents last-minute panic."
    },
    {
      title: "Mindset & Awareness",
      icon: Brain,
      content: "Aim for progress, not perfection. Mistakes are part of learning. Avoid comparing yourself to others and focus on what you can control."
    }
  ];

  return (
    <>
      <h1 className="mb-6">Stress Management Strategies for Students</h1>
      <p className="mb-10 text-lg text-natural-primary/70">
        Empowering yourself with the right tools is essential for maintaining balance during high-pressure academic cycles.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
        <div className="rounded-[32px] overflow-hidden border border-natural-border/20 shadow-sm group">
          <img 
            src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800" 
            alt="Peaceful sunset representing meditation" 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="p-4 bg-natural-sidebar">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#8a8a70] m-0 italic">Meditation & Presence</h4>
          </div>
        </div>
        <div className="rounded-[32px] overflow-hidden border border-natural-border/20 shadow-sm group">
          <img 
            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800" 
            alt="Group exercise activity" 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="p-4 bg-natural-accent">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-natural-primary m-0 italic">Active Stress Resolution</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {strategies.map((s, i) => (
          <div 
            key={i} 
            className={`p-6 rounded-3xl border shadow-sm transition-all group hover:scale-[1.02] ${
              i % 2 === 0 
                ? "bg-natural-sidebar border-natural-border/20 shadow-sm hover:border-natural-primary/50" 
                : "bg-natural-accent border-natural-primary/5 shadow-sm hover:border-natural-primary/50"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-natural-primary group-hover:bg-natural-primary group-hover:text-white transition-all shadow-sm">
                <s.icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-natural-heading m-0">{i + 1}. {s.title}</h3>
            </div>
            <p className="text-xs text-[#6b6b54] leading-relaxed m-0">{s.content}</p>
          </div>
        ))}
      </div>

      <div className="bg-rit-orange/5 border border-rit-orange/20 rounded-[32px] p-8 mt-12">
        <h3 className="text-rit-orange font-serif font-bold flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5" /> When to Seek Help
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
          <li className="text-xs bg-white/50 p-3 rounded-xl border border-rit-orange/10 italic">"Stress affects sleep for long periods"</li>
          <li className="text-xs bg-white/50 p-3 rounded-xl border border-rit-orange/10 italic">"You feel constantly overwhelmed"</li>
          <li className="text-xs bg-white/50 p-3 rounded-xl border border-rit-orange/10 italic">"You lose motivation completely"</li>
          <li className="text-xs bg-white/50 p-3 rounded-xl border border-rit-orange/10 italic">"Anxiety affects daily functioning"</li>
        </ul>
      </div>
    </>
  );
}

function AudienceAnalysis() {
  return (
    <>
      <h1 className="mb-8">Audience Analysis Profile</h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-center border-b border-natural-border/10 pb-10 mb-10">
        <div className="flex-1">
          <div className="bg-natural-accent rounded-3xl p-8 border border-natural-primary/5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-natural-primary mb-4 italic">Analysis Context</h3>
            <p className="text-sm m-0">
              To understand our audience at RIT Dubai, we utilized informal discussions, workload observations, and academic research to ensure the wiki addresses real student challenges.
            </p>
          </div>
        </div>
        <div className="w-full md:w-80 shrink-0 overflow-hidden rounded-[32px] border border-natural-border/30 shadow-sm relative grayscale hover:grayscale-0 transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800" 
            alt="Overwhelmed student with reminders" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-natural-primary/10 mix-blend-overlay"></div>
        </div>
      </div>
      
      <h2>Target Audience Identification</h2>
      <ul className="list-none p-0">
        <li><strong>Primary Audience:</strong> Students at RIT Dubai aged 18–24 facing academic pressure and deadlines.</li>
        <li><strong>Secondary Audience:</strong> Instructors reviewing the wiki for educational quality and effectiveness.</li>
      </ul>

      <h2>Audience Needs</h2>
      <p>
        Our analysis identified that students require <strong>simple, clear information</strong> (not overly technical) with practical strategies and <strong>quick readability</strong> through bullet points and visual support.
      </p>

      <h2>Influence on Design</h2>
      <div className="p-8 bg-natural-sidebar rounded-[32px] border border-natural-border/20 my-8">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 m-0">
          <li className="flex items-start gap-2 text-xs">
            <span className="w-1.5 h-1.5 bg-natural-primary rounded-full mt-1.5 shrink-0"></span>
            Simple and easily understandable language.
          </li>
          <li className="flex items-start gap-2 text-xs">
            <span className="w-1.5 h-1.5 bg-natural-primary rounded-full mt-1.5 shrink-0"></span>
            Information broken into short sections and bullet points.
          </li>
          <li className="flex items-start gap-2 text-xs">
            <span className="w-1.5 h-1.5 bg-natural-primary rounded-full mt-1.5 shrink-0"></span>
            Visuals added to improve conceptual understanding.
          </li>
          <li className="flex items-start gap-2 text-xs">
            <span className="w-1.5 h-1.5 bg-natural-primary rounded-full mt-1.5 shrink-0"></span>
            Structure designed for quick scanning and navigation.
          </li>
        </ul>
      </div>
    </>
  );
}

function ResearchSection() {
  return (
    <>
      <h1>Research & Bibliography</h1>
      <p>
        A range of credible academic, medical, and governmental sources were analyzed to ensure all content is evidence-based and reliable.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {[
          "Academic stress negatively affects concentration and performance.",
          "Lack of sleep increases anxiety and reduces productivity.",
          "Time management significantly improves academic outcomes.",
          "Physical activity improves mental health and focus.",
          "Excessive screen time contributes to mental fatigue.",
        ].map((finding, i) => (
          <div 
            key={i} 
            className={`flex gap-3 p-4 border rounded-2xl text-xs text-[#5d5d4d] transition-all hover:scale-[1.02] ${
              i % 2 === 0 
                ? "bg-natural-sidebar border-natural-border/30" 
                : "bg-natural-accent border-natural-primary/5"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-natural-primary shrink-0" />
            {finding}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-natural-border/30 my-10 font-sans text-xs shadow-sm">
        <div className="flex items-center gap-2 mb-6 border-b border-natural-border pb-3">
          <BookOpen className="w-4 h-4 text-natural-primary" />
          <h4 className="font-serif font-bold text-natural-heading italic m-0">Full Bibliography</h4>
        </div>
        <div className="space-y-4 text-[#5d5d4d] leading-relaxed">
          <p className="pl-8 -indent-8">
            American Psychological Association. (2023). <i>Stress effects on the body.</i> https://www.apa.org/topics/stress/body
          </p>
          <p className="pl-8 -indent-8">
            Harvard Health Publishing. (2021). <i>Understanding the stress response.</i> https://www.health.harvard.edu/staying-healthy/understanding-the-stress-response
          </p>
          <p className="pl-8 -indent-8">
            National Institute of Mental Health. (2023). <i>Coping with stress.</i> https://www.nimh.nih.gov/health/topics/coping-with-stress
          </p>
          <p className="pl-8 -indent-8">
            Pérez-Jorge, D., et al. (2025). <i>Examining the effects of academic stress on student well-being.</i> Humanities and Social Sciences Communications.
          </p>
          <p className="pl-8 -indent-8">
            Steinthal, D. (2016). <i>Academic anxiety: Where to draw the line.</i> The Oracle.
          </p>
          <p className="pl-8 -indent-8">
            World Health Organization. (2022). <i>Adolescent mental health.</i> https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health
          </p>
        </div>
      </div>
    </>
  );
}

function TeamRoles() {
  const memberData = [
    { name: "Ifzaan", role: "Audience Analysis & Intro", desc: "Conducted audience research and summarized key findings to shape the wiki's readability." },
    { name: "Faizah", role: "Research specialist", desc: "Selected and filtered credible sources from health organizations to ensure accuracy." },
    { name: "Swati", role: "Content Architect", desc: "Structured the wiki content, focused on causes, effects, and practical management strategies." },
    { name: "Zain", role: "Visual & UI Designer", desc: "Selected imagery and ensured proper formatting, accessibility, and visual-text integration." },
    { name: "Jagadip", role: "Editor & Quality Lead", desc: "Reviewed the entire wiki for grammar, consistency, and professional quality before publication." },
  ];

  return (
    <>
      <h1>Team Roles & Responsibilities</h1>
      <p>Our group collaborated using WhatsApp and Google Docs to ensure real-time communication and consistency across all sections.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {memberData.map((member, i) => (
          <div 
            key={i} 
            className={`p-6 border rounded-3xl transition-all group hover:border-natural-primary shadow-sm hover:shadow-md ${
              i === 4 ? "md:col-span-2" : ""
            } ${
              i % 2 === 0 
                ? "bg-natural-sidebar border-natural-border/20" 
                : "bg-natural-accent border-natural-primary/5"
            }`}
          >
            <h4 className="font-serif font-bold text-natural-heading group-hover:text-natural-primary transition-colors">{member.name}</h4>
            <div className="text-[10px] font-bold text-natural-primary/60 mb-3 uppercase tracking-tighter italic">{member.role}</div>
            <p className="text-xs text-slate-500 m-0 leading-relaxed italic">"{member.desc}"</p>
          </div>
        ))}
      </div>
    </>
  );
}

function TeamReflection() {
  return (
    <>
      <h1>Group Reflection</h1>
      
      <h2>Collaboration Process</h2>
      <p>
        The group collaborated using tools such as <strong>WhatsApp</strong> and <strong>Google Docs</strong> which allowed real-time communication and shared editing of content. Meetings were scheduled online due to different timetables which helped maintain flexibility. Each member was assigned a specific role, which helped in dividing a workload.
      </p>
      <p>Overall the collaboration process was effective and most members contributed consistently throughout the project.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="p-6 bg-natural-sidebar rounded-3xl border border-natural-border/20">
          <h3 className="text-sm font-serif font-bold text-natural-heading mb-4 italic">Scheduling Conflicts</h3>
          <p className="text-xs mb-0 leading-relaxed text-[#6b6b54]">
            Resolved by switching to online meetings and using shared documents for progress tracking when physical meetings were difficult to arrange.
          </p>
        </div>
        <div className="p-6 bg-natural-accent rounded-3xl border border-natural-primary/5">
          <h3 className="text-sm font-serif font-bold text-natural-heading mb-4 italic">Writing Consistency</h3>
          <p className="text-xs mb-0 leading-relaxed text-[#6b6b54]">
            Ensuring a uniform writing style was solved through iterative group editing and final proofreading by a designated member (Jagadip).
          </p>
        </div>
      </div>

      <h2>Reflection and Improvements</h2>
      <p>
        Overall, the group worked well together to meet the deadlines and maintain a high standard of technical writing.
      </p>
      <div className="p-6 border-l-4 border-rit-orange bg-rit-orange/5 rounded-r-2xl">
        <p className="text-xs italic m-0">
          "For future projects, communication could have been more structured to avoid last-minute changes on the webpage, report, and final presentation."
        </p>
      </div>
    </>
  );
}


