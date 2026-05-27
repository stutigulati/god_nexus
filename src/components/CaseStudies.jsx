import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowUpRight, ShieldCheck, Cpu, Sprout, Building, Users } from 'lucide-react';

const CASE_STUDIES = [
  {
    title: 'Degree Verification for Institutions',
    icon: ShieldCheck,
    color: 'text-neon-green',
    problem: 'Fake credentials and manual validation delayed job placement processing times for hundreds of graduating learners.',
    solution: 'Migrated 50,000+ certification structures onto an immutable distributed ledger with decentralized QR anchors.',
    impact: 'Credential confirmation times slashed from 14 days down to 800ms with zero security integrity compromises.',
    tech: ['P2P Nodes', 'Solidity', 'Web3 APIs', 'QR Indexers']
  },
  {
    title: 'University Automation Platform',
    icon: Building,
    color: 'text-cyan-400',
    problem: 'Siloed database panels forced faculty and admissions divisions into duplicated data-entry cycles.',
    solution: 'Designed a unified ERP SaaS dashboard routing billing, attendance, and exam management via role-based access.',
    impact: 'System administration overhead decreased by 40% while active communication speeds rose by 3x.',
    tech: ['NodeJS', 'React', 'Kubernetes', 'Redis']
  },
  {
    title: 'AI Exam Evaluation System',
    icon: Cpu,
    color: 'text-yellow-400',
    problem: 'Answer paper checking backlogs delayed final result announcements by weeks, affecting placement schedules.',
    solution: 'Deployed OCR neural pipelines scanning handwriting and matching logic against strict marking rubrics.',
    impact: 'Grading margins stabilized under 1% standard deviation and results announced within 48 hours of exams.',
    tech: ['OpenCV', 'TensorFlow', 'Fine-tuned LLMs', 'PyTorch']
  },
  {
    title: 'AgriConnect for Farmers',
    icon: Sprout,
    color: 'text-neon-emerald',
    problem: 'Rural farming sectors suffered heavy crop losses due to unmonitored soil health decay and unfair mandi pricing.',
    solution: 'Launched mobile advisory portals integrating real-time mandi prices and satellite crop scanner scans.',
    impact: 'Average household farming returns increased by 22% and disease spread reduced by 30% via early scans.',
    tech: ['React Native', 'AWS IoT', 'Computer Vision', 'GraphQL']
  },
  {
    title: 'OMS for Organizations',
    icon: Users,
    color: 'text-purple-400',
    problem: 'Distributed product groups experienced productivity loss due to scattered messaging boards and loose action logs.',
    solution: 'Engineered a centralized workflow cockpit integrating Kanban boards and AI MOM summarizers.',
    impact: 'Sprint completion velocity jumped from 60% to 85% with meeting minutes distributed instantly.',
    tech: ['React', 'Framer Motion', 'OpenAI API', 'MongoDB']
  }
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-24 px-4 md:px-12 bg-black overflow-hidden border-b border-cyber-border/20">
      <div className="cyber-grid opacity-15 absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-neon-green tracking-widest block mb-3 animate-pulse">PLATFORM_PROOFS</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase font-cyber mb-4">
            Proven Case Studies
          </h2>
          <div className="h-0.5 w-24 bg-neon-green mx-auto mb-6 shadow-[0_0_8px_#22ff66]" />
          <p className="text-cyber-text text-sm md:text-base font-mono">
            How our engineering platforms resolve complex institutional bottlenecks and create secure value.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study, idx) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-lg border border-cyber-border/40 hover:border-neon-green/50 bg-cyber-card/30 flex flex-col justify-between group transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-cyber-border/20 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded bg-black/80 border border-cyber-border/40 ${study.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[9px] text-cyber-text/50 tracking-wider">CASE_FILE_0{idx+1}</span>
                    </div>
                    <FileText className="w-4 h-4 text-cyber-text/30 group-hover:text-neon-green transition-colors" />
                  </div>

                  <h3 className="text-base font-cyber font-black tracking-tight text-white uppercase mt-2 group-hover:text-neon-green transition-colors">
                    {study.title}
                  </h3>

                  {/* Body logs */}
                  <div className="space-y-3 font-mono text-[10px] pt-2">
                    <div>
                      <span className="text-red-400 font-bold block">PROBLEM:</span>
                      <p className="text-cyber-text/90 font-sans mt-0.5 leading-relaxed">{study.problem}</p>
                    </div>
                    <div>
                      <span className="text-cyan-400 font-bold block">SOLUTION:</span>
                      <p className="text-cyber-text/90 font-sans mt-0.5 leading-relaxed">{study.solution}</p>
                    </div>
                    <div>
                      <span className="text-neon-emerald font-bold block">QUANTIFIABLE_IMPACT:</span>
                      <p className="text-white font-sans mt-0.5 leading-relaxed font-semibold">{study.impact}</p>
                    </div>
                  </div>
                </div>

                {/* Tech and CTA footer */}
                <div className="mt-6 pt-4 border-t border-cyber-border/20">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {study.tech.map(t => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded border border-cyber-border/40 text-cyber-text bg-black/40">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-2 border border-neon-green/30 text-neon-green font-mono text-xs font-bold tracking-wider rounded hover:bg-neon-green/10 transition-all cursor-pointer">
                    EXPLORE DOSSIER
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
