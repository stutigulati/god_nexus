import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Eye, BrainCircuit, Activity, Sliders, MessageSquare, Workflow, Users, HelpCircle, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

const AI_MODULES = [
  { 
    id: 'cv', 
    name: 'Computer Vision Systems', 
    icon: Eye, 
    latency: '4ms', 
    status: 'ACTIVE', 
    desc: 'Edge-optimized OCR text extraction, question layout parsers, and crop defect diagnostic scan feeds.',
    scenario: 'Instant Exam Script & Crop Grading',
    userPrompt: 'Upload answer sheet portfolio stack & scan leaf specimens.',
    aiResponse: 'Scanned 120 mathematical exam papers in 1.2s. Extracted handwriting bounding boxes. Leaf diagnostics: Leaf rust negative.',
    value: 'Saves educators over 40+ hours per semester and flags crop sickness 8 days before spread.'
  },
  { 
    id: 'nlp', 
    name: 'Natural Language Processing', 
    icon: MessageSquare, 
    latency: '12ms', 
    status: 'ACTIVE', 
    desc: 'Context-aware multilingual grammar translation checkers, essay scoring algorithms, and summarization engines.',
    scenario: 'Decentralized Board Minutes Synthesis',
    userPrompt: 'Submit raw 60-minute meeting recording audio.',
    aiResponse: 'Transcribed speech in English/Hindi. Synthesized main resolutions, highlighted financial allocations, and assigned 12 action items.',
    value: 'Allows organizations to publish audit-ready meeting summaries instantly, improving execution speed.'
  },
  { 
    id: 'predictive', 
    name: 'Predictive Analytics', 
    icon: Activity, 
    latency: '8ms', 
    status: 'ACTIVE', 
    desc: 'Yield-prediction mandi models, student retention scoring registers, and operational risk charts.',
    scenario: 'Mandi Crop Price Optimizer',
    userPrompt: 'Crop: Wheat. Region: Delhi-NCR. Release timing index.',
    aiResponse: 'Projected market demand spikes by +6.8% next Monday due to local logistical shifts. Recommended release holding till June 2nd.',
    value: 'Boosts farming household returns by timing crop sales to peak market pricing indices.'
  },
  { 
    id: 'automation', 
    name: 'Workflow Automation', 
    icon: Workflow, 
    latency: '3ms', 
    status: 'ACTIVE', 
    desc: 'SaaS sprint pipelines, automatic MOM transcript summarizers, and attendance syncing logs.',
    scenario: 'Smart Admissions Portals Syncing',
    userPrompt: 'Enroll 40 new applicants from rural high schools.',
    aiResponse: 'Compiled student profiles. Dispatched encrypted digital ID cards. Logged credential signatures on blockchain network ledger.',
    value: 'Reduces manual institutional registration cycles down to zero, enabling immediate program onboarding.'
  },
  { 
    id: 'finetuning', 
    name: 'Custom LLM Fine-tuning', 
    icon: Sliders, 
    latency: '24ms', 
    status: 'ACTIVE', 
    desc: 'Domain fine-tuning on academic curriculums and agricultural advisory lexicons.',
    scenario: 'Curriculum-Aligned Tutoring Bot',
    userPrompt: 'Feed grade 10 state mathematics syllabus textbook.',
    aiResponse: 'Model fine-tuned and aligned. Chatbot prompt safety caps calibrated to explain quadratic formulas using age-appropriate logic.',
    value: 'Provides students with highly specific, curriculum-mapped tutoring sessions available 24/7.'
  },
  { 
    id: 'assistants', 
    name: 'AI Assistants', 
    icon: BrainCircuit, 
    latency: '6ms', 
    status: 'ACTIVE', 
    desc: 'Academic advisor chatbots, Mandi transaction agents, and organizational productivity checkers.',
    scenario: '24/7 Student Advisory Desk',
    userPrompt: "What is the fee structure schedule for the computer science module?",
    aiResponse: 'CS Term-1 fee of ₹45,000 is due by July 15th. Click here to open the secure ledger payment portal directly.',
    value: 'Slashes student inquiry queue times by 95% while addressing thousands of parallel student queries.'
  }
];

function AIMockupVisual({ type }) {
  switch (type) {
    case 'cv':
      return (
        <svg viewBox="0 0 100 100" className="w-28 h-28 text-neon-green drop-shadow-[0_0_15px_rgba(34,255,102,0.3)]">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3" opacity="0.3" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <path d="M 25 35 L 25 25 L 35 25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 65 25 L 75 25 L 75 35" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 25 65 L 25 75 L 35 75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 65 75 L 75 75 L 75 65" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <motion.line
            x1="20" y1="50" x2="80" y2="50"
            stroke="#22ff66" strokeWidth="2.5"
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle cx="50" cy="50" r="3" fill="#00ff88" animate={{ scale: [1, 2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <motion.circle cx="38" cy="42" r="1.5" fill="#22ff66" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.circle cx="62" cy="58" r="1.5" fill="#22ff66" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
        </svg>
      );
    case 'nlp':
      return (
        <svg viewBox="0 0 100 100" className="w-28 h-28 text-neon-green">
          <g fill="#22ff66" opacity="0.9">
            {[18, 30, 42, 54, 66, 78].map((x, idx) => (
              <motion.rect
                key={idx}
                x={x - 2.5}
                y={50}
                width={5}
                height={12}
                rx={2.5}
                animate={{
                  y: [38, 20, 44, 38],
                  height: [24, 60, 12, 24]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: idx * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </g>
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" opacity="0.3" />
        </svg>
      );
    case 'predictive':
      return (
        <svg viewBox="0 0 100 100" className="w-28 h-28 text-cyan-400">
          <path d="M 12 12 L 12 88 L 88 88" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <line x1="12" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3" opacity="0.2" />
          <motion.path
            d="M 12 75 Q 30 35 48 65 T 74 25 L 88 45"
            fill="none"
            stroke="#22ff66"
            strokeWidth="2.5"
            animate={{
              strokeDasharray: ["0, 200", "200, 0"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.circle
            cx="74" cy="25" r="4"
            fill="#22ff66"
            animate={{ scale: [1, 2, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.circle cx="48" cy="65" r="3.5" fill="#00ff88" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        </svg>
      );
    case 'automation':
      return (
        <svg viewBox="0 0 100 100" className="w-28 h-28 text-neon-green">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '38px 38px' }}
          >
            <circle cx="38" cy="38" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <line key={deg} x1="38" y1="14" x2="38" y2="20" stroke="currentColor" strokeWidth="3" transform={`rotate(${deg} 38 38)`} />
            ))}
          </motion.g>
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '66px 66px' }}
          >
            <circle cx="66" cy="66" r="13" fill="none" stroke="#00ff88" strokeWidth="1.8" />
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(deg => (
              <line key={deg} x1="66" y1="48" x2="66" y2="53" stroke="#00ff88" strokeWidth="2.5" transform={`rotate(${deg} 66 66)`} />
            ))}
          </motion.g>
        </svg>
      );
    case 'finetuning':
      return (
        <svg viewBox="0 0 100 100" className="w-28 h-28 text-yellow-400">
          <g stroke="currentColor" strokeWidth="1" opacity="0.3">
            <line x1="20" y1="28" x2="80" y2="28" />
            <line x1="20" y1="50" x2="80" y2="50" />
            <line x1="20" y1="72" x2="80" y2="72" />
          </g>
          <motion.circle cx="45" cy="28" r="4.5" fill="#22ff66" animate={{ cx: [30, 70, 45] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.circle cx="65" cy="50" r="4.5" fill="#22ff66" animate={{ cx: [75, 25, 65] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
          <motion.circle cx="35" cy="72" r="4.5" fill="#22ff66" animate={{ cx: [20, 60, 35] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />
        </svg>
      );
    case 'assistants':
      return (
        <svg viewBox="0 0 100 100" className="w-28 h-28 text-purple-400">
          <motion.circle
            cx="50" cy="50" r="16"
            fill="rgba(34, 255, 102, 0.15)"
            stroke="#22ff66"
            strokeWidth="2.5"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.ellipse
            cx="50" cy="50" rx="38" ry="12"
            fill="none" stroke="#22ff66" strokeWidth="1"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.ellipse
            cx="50" cy="50" rx="38" ry="12"
            fill="none" stroke="#22ff66" strokeWidth="1.5"
            animate={{ rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function AILabs() {
  const [selectedModule, setSelectedModule] = useState(AI_MODULES[0]);

  return (
    <section id="ai-labs" className="relative py-24 px-4 md:px-12 bg-cyber-bg overflow-hidden border-b border-cyber-border/20">
      <div className="cyber-grid opacity-15 absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-neon-green tracking-widest block mb-3 animate-pulse">COGNITIVE_LABS</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase font-cyber mb-4">
            AI Products We Craft
          </h2>
          <div className="h-0.5 w-24 bg-neon-green mx-auto mb-6 shadow-[0_0_8px_#22ff66]" />
          <p className="text-cyber-text text-sm md:text-base font-mono">
            Deploying domain-specific neural architectures that automate operations and analyze complex data indices.
          </p>
        </div>

        {/* Command Center Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: AI Module List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="font-mono text-xs text-cyan-400 tracking-wider block mb-1 uppercase">ACTIVE_MODELS_TELEMETRY</span>
            {AI_MODULES.map((mod) => {
              const Icon = mod.icon;
              const isSelected = selectedModule.id === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className={`w-full p-3.5 rounded-lg border text-left font-mono transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? 'bg-neon-green/10 border-neon-green/60 text-white glow-shadow-green' 
                      : 'bg-cyber-card/40 border-cyber-border/40 text-cyber-text hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded ${isSelected ? 'bg-neon-green/20 text-neon-green' : 'bg-black/60 text-cyber-text'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider">{mod.name}</h4>
                      <span className="text-[9px] text-cyber-text/60 mt-0.5 block">LATENCY: {mod.latency}</span>
                    </div>
                  </div>
                  <span className={`text-[8px] px-2 py-0.5 rounded border ${
                    isSelected ? 'bg-neon-green/20 text-neon-green border-neon-green/30' : 'bg-[#050b08] text-cyber-text/60 border-cyber-border/40'
                  }`}>
                    {mod.status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic SVG & Interesting Application Playbook */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            
            {/* Holographic Diagnostic Center */}
            <div className="relative glass-panel rounded-xl p-6 border border-cyber-border/40 bg-black/50 flex-1 flex flex-col md:flex-row gap-6 items-center justify-between overflow-hidden">
              <div className="cyber-grid opacity-10 absolute inset-0 pointer-events-none" />
              
              <div className="flex-1 space-y-3 font-mono relative z-10">
                <span className="text-[10px] text-neon-green font-bold block">NEURAL_DIAGNOSTICS</span>
                <h3 className="text-base font-cyber font-black tracking-wider text-white uppercase">{selectedModule.name}</h3>
                <p className="text-[11px] text-cyber-text leading-relaxed font-sans mt-2">{selectedModule.desc}</p>
                <div className="pt-2">
                  <StatusBadge status="ANALYZING" />
                </div>
              </div>

              {/* Graphic Spinning Core specific to selected module */}
              <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0 bg-black/40 border border-cyber-border/30 rounded-full">
                <div className="absolute inset-0 rounded-full border border-dashed border-cyber-border/30 animate-spin" style={{ animationDuration: '40s' }} />
                <AIMockupVisual type={selectedModule.id} />
              </div>
            </div>

            {/* Interesting Application Playbook Panel */}
            <div className="glass-panel rounded-xl overflow-hidden border border-cyber-border/40 bg-black font-mono text-[10px] min-h-[160px] flex flex-col justify-between">
              
              <div className="px-4 py-2.5 bg-[#050b08] border-b border-cyber-border/30 flex items-center justify-between text-[9px] text-cyber-text">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-neon-green" /> 
                  PLATFORM_INTEGRATION | REAL_WORLD_USE_CASE
                </span>
                <span className="text-neon-emerald">READY_FOR_TELEMETRY - OK</span>
              </div>

              <div className="p-4 flex-1 space-y-3 text-xs leading-relaxed text-cyber-text font-sans">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start border-l-2 border-neon-green pl-3.5 bg-neon-green/5 py-2">
                  <div className="md:col-span-4 font-mono text-[10px] font-black text-white uppercase tracking-wider">
                    SCENARIO:
                  </div>
                  <div className="md:col-span-8 text-white font-semibold">
                    {selectedModule.scenario}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start pl-3.5 py-1">
                  <div className="md:col-span-4 font-mono text-[10px] text-neon-green font-bold">
                    [USER_PROMPT] &gt;
                  </div>
                  <div className="md:col-span-8 italic text-cyber-text">
                    "{selectedModule.userPrompt}"
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start pl-3.5 py-1">
                  <div className="md:col-span-4 font-mono text-[10px] text-cyan-400 font-bold">
                    [AI_RESPONSE] &gt;
                  </div>
                  <div className="md:col-span-8 text-white font-mono text-[11px] leading-tight">
                    {selectedModule.aiResponse}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start border-t border-cyber-border/10 pt-2.5 pl-3.5">
                  <div className="md:col-span-4 font-mono text-[10px] text-yellow-400 font-bold">
                    HUMAN_VALUE:
                  </div>
                  <div className="md:col-span-8 text-neon-emerald font-semibold">
                    {selectedModule.value}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
