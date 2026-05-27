import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, Calendar, CreditCard, Bell, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

const MODULES = [
  { id: 'admissions', label: 'Admissions', icon: GraduationCap },
  { id: 'faculty', label: 'Faculty Hub', icon: Users },
  { id: 'exams', label: 'Exam Manager', icon: Calendar },
  { id: 'billing', label: 'Fee Portal', icon: CreditCard }
];

export default function LiveDashboardMockup() {
  const [activeTab, setActiveTab] = useState('admissions');
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    { text: 'NEW STUDENT: ADM_2026_094 verified.', time: 'Just now' },
    { text: 'EXAM ROSTER: Semester 4 schedule updated.', time: '2m ago' }
  ]);
  const [studentCount, setStudentCount] = useState(12490);

  const handleTabChange = (tabId) => {
    setLoading(true);
    setActiveTab(tabId);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    // Pulse student count
    const interval = setInterval(() => {
      setStudentCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full relative glass-panel rounded-xl overflow-hidden shadow-2xl border border-cyber-border/40 bg-black/60 font-sans">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#050b08] border-b border-cyber-border/30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-green/80" />
          <span className="w-2 text-[10px] text-cyber-text tracking-widest font-mono">ERP - CORE_PORTAL v2.8</span>
        </div>
        <StatusBadge status={loading ? "SYNCING" : "LIVE"} />
      </div>

      <div className="flex flex-col md:flex-row min-h-[380px]">
        {/* ERP Sidebar */}
        <div className="w-full md:w-48 bg-black/50 border-b md:border-b-0 md:border-r border-cyber-border/20 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible scrollbar-none">
          <div className="hidden md:block text-[9px] font-mono text-cyber-text/50 px-2 py-1 tracking-widest mb-2 uppercase">
            APPLICATIONS
          </div>
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeTab === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => handleTabChange(mod.id)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap md:whitespace-normal ${
                  isActive 
                    ? 'bg-neon-green/10 text-neon-green border-l-2 border-neon-green glow-shadow-green font-bold' 
                    : 'text-cyber-text hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-neon-green' : 'text-cyber-text'}`} />
                <span>{mod.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Pane */}
        <div className="flex-1 p-5 flex flex-col justify-between relative min-h-[300px]">
          {/* Subtle grid background */}
          <div className="cyber-grid opacity-25 absolute inset-0 pointer-events-none" />

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center font-mono text-xs text-neon-green gap-2">
              <span className="w-6 h-6 border-2 border-neon-green border-t-transparent rounded-full animate-spin" />
              <span>PULLING_SECURE_RECORDS_FROM_DB...</span>
            </div>
          ) : (
            <div className="relative z-10 flex-1 flex flex-col gap-4">
              {/* Dynamic stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-[#050b08]/80 p-3 rounded border border-cyber-border/30">
                  <span className="block text-[9px] font-mono text-cyber-text/60 tracking-wider">SYSTEM_LEARNERS</span>
                  <span className="text-sm font-mono text-white font-bold block mt-0.5 tracking-wide">
                    {studentCount.toLocaleString()}
                  </span>
                </div>
                <div className="bg-[#050b08]/80 p-3 rounded border border-cyber-border/30">
                  <span className="block text-[9px] font-mono text-cyber-text/60 tracking-wider">FACULTY_ACTIVE</span>
                  <span className="text-sm font-mono text-neon-emerald font-bold block mt-0.5 tracking-wide">821 - OK</span>
                </div>
                <div className="bg-[#050b08]/80 p-3 rounded border border-cyber-border/30 col-span-2 sm:col-span-1">
                  <span className="block text-[9px] font-mono text-cyber-text/60 tracking-wider">ACTIVE_NETWORK</span>
                  <span className="text-sm font-mono text-cyan-400 font-bold block mt-0.5 tracking-wide">99.98% SPEED</span>
                </div>
              </div>

              {/* Dynamic Panel Content Based on Active Tab */}
              <div className="flex-1 bg-black/40 border border-cyber-border/20 rounded p-4">
                {activeTab === 'admissions' && (
                  <div className="space-y-3 font-mono">
                    <div className="flex items-center justify-between text-xs border-b border-cyber-border/20 pb-2">
                      <span className="text-white font-bold flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-neon-green" /> ADMISSION REGISTRY
                      </span>
                      <span className="text-neon-green text-[10px]">LIVE_FEED</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px] items-center p-2 rounded bg-neon-green/5 border border-neon-green/10">
                        <span className="text-white">AMIT PAL - B.TECH CSE</span>
                        <span className="text-neon-emerald">DOCS_OK - ENROLLED</span>
                      </div>
                      <div className="flex justify-between text-[11px] items-center p-2 rounded bg-neon-green/5 border border-neon-green/10">
                        <span className="text-white">DIVYA SEN - MBA AGRI</span>
                        <span className="text-neon-emerald">DOCS_OK - ENROLLED</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'faculty' && (
                  <div className="space-y-3 font-mono">
                    <div className="flex items-center justify-between text-xs border-b border-cyber-border/20 pb-2">
                      <span className="text-white font-bold flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-neon-green" /> ACADEMIC DIRECTORY
                      </span>
                      <span className="text-cyan-400 text-[10px]">ACTIVE_LECTURES</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="p-2 border border-cyber-border/30 rounded bg-[#050b08]">
                        <span className="text-cyber-text block">PROF. DR. ROY</span>
                        <span className="text-white block font-bold mt-1">AI LABS MANAGER</span>
                        <span className="text-neon-green animate-pulse text-[8px] mt-0.5 block">SYS_ENGAGED</span>
                      </div>
                      <div className="p-2 border border-cyber-border/30 rounded bg-[#050b08]">
                        <span className="text-cyber-text block">PROF. SHALINI</span>
                        <span className="text-white block font-bold mt-1">BLOCKCHAIN DEPT</span>
                        <span className="text-neon-green animate-pulse text-[8px] mt-0.5 block">SYS_ENGAGED</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'exams' && (
                  <div className="space-y-3 font-mono">
                    <div className="flex items-center justify-between text-xs border-b border-cyber-border/20 pb-2">
                      <span className="text-white font-bold flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-neon-green" /> EXAMINATION SCHEDULER
                      </span>
                      <span className="text-yellow-400 text-[10px]">TERM_END_FINALS</span>
                    </div>
                    {/* SVG Attendance/Performance Graph */}
                    <div className="relative h-20 w-full mt-2">
                      <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="glow-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22ff66" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#22ff66" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,25 Q15,5 30,18 T60,5 T90,20 L100,10 L100,30 L0,30 Z"
                          fill="url(#glow-grad)"
                        />
                        <path
                          d="M0,25 Q15,5 30,18 T60,5 T90,20 L100,10"
                          fill="none"
                          stroke="#22ff66"
                          strokeWidth="1"
                          className="stroke-dash"
                        />
                      </svg>
                      <div className="absolute top-1 left-2 text-[9px] text-neon-green/70">STUDENT_PERFORMANCE_INDEX</div>
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div className="space-y-3 font-mono">
                    <div className="flex items-center justify-between text-xs border-b border-cyber-border/20 pb-2">
                      <span className="text-white font-bold flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-neon-green" /> FEE PORTAL OVERVIEW
                      </span>
                      <span className="text-purple-400 text-[10px]">RECONCILED_LEDGER</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] p-2 bg-[#050b08] border border-cyber-border/30 rounded">
                      <span className="text-cyber-text">REVENUE_COLLECTION</span>
                      <span className="text-white font-bold">94.8% COMPLETE</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-cyan-400">
                      <span>AUDIT_STATUS - VERIFIED</span>
                      <span className="underline cursor-pointer flex items-center gap-1">VIEW_LEDGERS <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Live System Feeds Ticker */}
          <div className="border-t border-cyber-border/20 pt-3 flex items-center gap-3 font-mono text-[9px] text-cyber-text/80">
            <Bell className="w-3.5 h-3.5 text-neon-green animate-bounce" />
            <div className="flex-1 overflow-hidden h-3.5 relative">
              <div className="absolute w-full animate-pulse truncate">
                SYS_MSG - {notifications[0].text} ({notifications[0].time})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
