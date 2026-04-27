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
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Section = "wiki" | "audience" | "research" | "team-roles" | "reflection";

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("wiki");

  const menuItems = [
    { id: "wiki", label: "Wiki Content", icon: BookOpen },
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
              <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#8a8a70] mb-4">Wiki Navigation</h3>
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
                    {item.label}
                  </button>
                ))}
              </nav>
            </section>

            <div className="mt-4 p-6 bg-natural-sidebar rounded-3xl border border-natural-border/30">
              <p className="text-xs text-[#6b6b54] mb-4 leading-relaxed font-medium">
                Feeling overwhelmed? Our RIT peer support line is open until midnight for all students.
              </p>
              <button className="w-full py-3 bg-white text-natural-primary text-xs font-bold rounded-full shadow-sm hover:shadow-md transition-all">
                Talk to a Peer
              </button>
            </div>
          </aside>

          {/* Main Article Content */}
          <main className="col-span-12 lg:col-span-6 bg-white rounded-[40px] p-10 shadow-sm border border-[#ececea] flex flex-col min-h-[700px]">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] bg-natural-bg text-[#8a8a70] px-3 py-1 rounded-md uppercase font-bold tracking-wider border border-natural-border/20 shadow-sm">
                Last updated: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
              <span className="text-[10px] bg-natural-accent text-[#5A5A40] px-3 py-1 rounded-md uppercase font-bold tracking-wider">
                LO CHECKED
              </span>
            </div>

            <div className="flex-1 markdown-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === "wiki" && <WikiContent />}
                  {activeSection === "audience" && <AudienceAnalysis />}
                  {activeSection === "research" && <ResearchSection />}
                  {activeSection === "team-roles" && <TeamRoles />}
                  {activeSection === "reflection" && <TeamReflection />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-12 pt-8 border-t border-[#f0f0e8] flex flex-wrap gap-4 justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400"></div>
                </div>
                <span className="text-[10px] text-[#8a8a70] font-bold uppercase tracking-tight">Edited by 4 students</span>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-natural-primary group">
                View Full Changelog 
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </main>

          {/* Right Context Panel */}
          <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6 sticky top-8">
            <div className="bg-natural-accent rounded-[32px] p-6 border border-natural-primary/5">
              <h4 className="text-sm font-serif font-bold text-natural-heading mb-6">Quick Tools</h4>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white rounded-2xl p-4 flex flex-col items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <div className="w-10 h-10 rounded-full bg-natural-bg flex items-center justify-center">
                    <Wind className="w-5 h-5 text-natural-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide">Breathe</span>
                </button>
                <button className="bg-white rounded-2xl p-4 flex flex-col items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <div className="w-10 h-10 rounded-full bg-natural-bg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-natural-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide">Study Timer</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-[#ececea] flex-1 shadow-sm">
              <h4 className="text-sm font-serif font-bold text-natural-heading mb-6">Support Resources</h4>
              <ul className="space-y-6">
                {[
                  { title: "Counseling Portal", source: "RIT University Admin", link: "#" },
                  { title: "Exam Anxiety Lab", source: "PDF Guide, 2.4 MB", link: "#" },
                  { title: "Sleep Hygiene", source: "Interactive Checklist", link: "#" }
                ].map((res, i) => (
                  <li key={i} className="flex flex-col group">
                    <a href={res.link} className="text-xs text-natural-primary underline underline-offset-4 decoration-natural-primary/30 font-bold group-hover:decoration-natural-primary transition-all">
                      {res.title}
                    </a>
                    <span className="text-[10px] text-[#8a8a70] mt-1 font-medium">{res.source}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 pt-8 border-t border-natural-bg">
                <h4 className="text-[10px] uppercase font-bold text-[#8a8a70] tracking-[0.2em] mb-6">Related Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {["Academics", "Self-Care", "Peer-Help", "Hydration", "Focus"].map(tag => (
                    <span key={tag} className="bg-natural-bg px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#8a8a70] border border-natural-border/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-8 flex flex-col md:flex-row justify-between items-center px-4 py-8 border-t border-natural-border/20 gap-6">
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold text-[#8a8a70] uppercase tracking-widest">
            <span>© 2026 RIT Student Support</span>
            <span className="hover:text-natural-primary cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-natural-primary cursor-pointer transition-colors">Privacy</span>
          </div>
          <div className="text-xs text-natural-primary italic font-serif opacity-80 max-w-sm text-center md:text-right leading-relaxed">
            "Rest is not idleness, and to lie sometimes on the grass... is by no means a waste of time."
          </div>
        </footer>
      </div>
    </div>
  );
}

function WikiContent() {
  return (
    <>
      <h1 className="mb-8">Mental Health & Stress Management</h1>
      
      <p className="text-lg leading-relaxed text-[#5d5d4d] mb-10 italic">
        Building resilience is not about eliminating stress, but about developing the cognitive tools to navigate the rigors of technical education at RIT.
      </p>

      <div className="space-y-6 my-12">
        {[
          { icon: Brain, title: "Step 01: The 20-Minute Focus Rule", desc: "Study in concentrated blocks to prevent mental fatigue and cortisol spikes. Follow with a 5-minute movement break." },
          { icon: Layout, title: "Step 02: Environmental Auditing", desc: "Regularly changing study locations—from the library to the student lounge—can reduce the feeling of being 'stuck'." },
          { icon: Users, title: "Step 03: Social Anchoring", desc: "Maintain at least two non-academic social activities per week to regulate neurochemical mood balance." }
        ].map((step, i) => (
          <div key={i} className="flex gap-6 p-6 rounded-3xl bg-natural-bg/30 border border-natural-border/10 group hover:bg-natural-accent hover:border-natural-primary/5 transition-all">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-natural-primary shadow-sm group-hover:scale-110 transition-transform">
              <step.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-natural-heading mb-1">{step.title}</h4>
              <p className="text-xs text-[#6b6b54] leading-relaxed m-0">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Understanding the Academic Cycle</h2>
      <p>
        The transition to university life brings a significant shift in academic demands and social dynamics. Especially for RIT Dubai students, managing technical "Midterm Madness" requires systematic planning.
      </p>

      <blockquote>
        "Your mental health is just as important as your GPA. In fact, one often sustains the other."
      </blockquote>

      <h2>Actionable Resources</h2>
      <p>
        RIT Dubai provides dedicated counseling services via student affairs. Isolation is the primary driver of prolonged burnout; we encourage all students to utilize the "Peer Network" listed in our sidebar.
      </p>
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

