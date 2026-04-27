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

      <h2>Sleep and Academic Stress</h2>
      <p>
        Research indicates a strong link between sleep patterns and academic stress. According to student data, the majority of students do not meet the recommended sleep requirements.
      </p>
      <p>
        A study by <strong>Steinthal (2016)</strong> shows that:
      </p>
      <ul>
        <li><strong>55%</strong> of students sleep 6 hours or less per night.</li>
        <li>Only a small percentage achieve recommended sleep levels.</li>
        <li>Sleep deprivation increases stress, anxiety, and reduces academic performance.</li>
      </ul>

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
      <h1>Stress Management Strategies for Students</h1>
      <p className="mb-10 text-lg text-natural-primary/70">
        Empowering yourself with the right tools is essential for maintaining balance during high-pressure academic cycles.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {strategies.map((s, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white border border-natural-border/20 shadow-sm hover:border-natural-primary/50 transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-natural-bg flex items-center justify-center text-natural-primary group-hover:bg-natural-primary group-hover:text-white transition-all">
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
      <h1>Audience Analysis Profile</h1>
      <div className="bg-natural-accent rounded-3xl p-8 my-8 border border-natural-primary/5">
        <h3 className="text-xs font-bold uppercase tracking-widest text-natural-primary mb-4 italic">Analysis Context</h3>
        <p className="text-sm m-0">
          To ensure our Wiki is effective, we conducted an audience analysis specifically targeting the RIT student body. We prioritized technical clarity and actionable brevity.
        </p>
      </div>
      
      <h2>Demographics & Context</h2>
      <ul className="list-none p-0">
        <li><strong>Primary Audience:</strong> Full-time RIT Dubai undergraduate students (Ages 18–24).</li>
        <li><strong>Context:</strong> High-stress technical background (Engineering, Computing, Business).</li>
        <li><strong>Language:</strong> Standard formal English, as per Learning Outcome 1.</li>
      </ul>

      <h2>Informational Needs</h2>
      <p>
        Survey data indicated that RIT students value <strong>efficiency</strong>. They prefer bulleted coping tools over clinical psychological theories.
      </p>
    </>
  );
}

function ResearchSection() {
  return (
    <>
      <h1>Research & Bibliography</h1>
      <p>
        Grounded in Learning Outcome 6, this content is derived from credible academic sources, with formatting strictly following APA 7th Edition guidelines.
      </p>

      <div className="bg-white p-8 rounded-[32px] border border-natural-border/30 my-10 font-sans text-sm shadow-inner bg-natural-bg/10">
        <h4 className="font-serif font-bold mb-6 text-natural-heading italic border-b border-natural-border pb-3">References</h4>
        <div className="space-y-6 text-[#5d5d4d] leading-relaxed">
          <p className="pl-8 -indent-8 border-l-2 border-natural-primary/10 ml-2">
            American Psychological Association. (2024). <i>Stress management for high-achieving university students.</i> http://www.apa.org/topics/student-stress
          </p>
          <p className="pl-8 -indent-8 border-l-2 border-natural-primary/10 ml-2">
            Mayo Clinic. (2025). <i>Mindfulness exercises: How to get started.</i> http://www.mayoclinic.org/healthy-lifestyle/stress-management
          </p>
          <p className="pl-8 -indent-8 border-l-2 border-natural-primary/10 ml-2">
            Steinthal, J. (2016). <i>Student Sleep Patterns and Academic Performance.</i> University Academic Press.
          </p>
        </div>
      </div>

      <h2>Evaluation Metrics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {["Authority", "Currency", "Credibility"].map(metric => (
          <div key={metric} className="p-4 bg-white rounded-2xl border border-natural-border/40 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-natural-primary">{metric}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function TeamRoles() {
  return (
    <>
      <h1>Team Roles & Responsibilities</h1>
      <p>Strategic workload distribution based on individual technical communication strengths.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {[
          { name: "Student 1", role: "Project Lead", desc: "Managed timelines and final APA document formatting." },
          { name: "Student 2", role: "UI Designer", desc: "Developed the Wiki structure and accessibility layers." },
          { name: "Student 3", role: "Researcher", desc: "Conducted audience analysis and gathered verified sources." },
          { name: "Student 4", role: "Writer", desc: "Authored the stress management content and coping tips." },
        ].map((member, i) => (
          <div key={i} className="p-6 border border-natural-border/30 rounded-3xl bg-white hover:border-natural-primary transition-all group">
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
      
      <h2>The Collaboration Process</h2>
      <p>
        Our group utilized <strong>Slack</strong> for asynchronous communication and <strong>Zoom</strong> for weekly progress meetings. These tools enabled us to work collaboratively on writing projects as per LO 5.
      </p>

      <div className="p-8 bg-natural-sidebar rounded-[32px] my-10 border border-natural-border/20">
        <h3 className="text-sm font-serif font-bold text-natural-heading mb-4 italic">Challenges & Resolutions</h3>
        <p className="text-xs mb-0 leading-relaxed">
          The primary obstacle was aligning disjointed writing voices. We created a "Style Guide" to ensure the tone across the wiki and report was uniform—professional, technical, yet accessible.
        </p>
      </div>

      <h2>Future Performance</h2>
      <p>
        For subsequent technical documents, we aim to integrate more data-driven visuals using specialized charting tools to enhance the accessibility of the audience analysis section.
      </p>
    </>
  );
}


