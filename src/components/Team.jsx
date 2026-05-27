import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Database, Flame, Terminal, Code2 } from 'lucide-react';

const TEAM = [
  {
    name: 'ANIKET VERMA',
    role: 'CHIEF_SYSTEM_ARCHITECT',
    sig: '0x8A92_ANIKET',
    icon: Cpu,
    color: 'text-neon-green',
    border: 'border-neon-green/30',
    tags: ['AI Labs Lead', 'Systems Dev', 'IIT Alumnus']
  },
  {
    name: 'MEGHA SHARMA',
    role: 'P2P_NETWORKS_DIRECTOR',
    sig: '0x4DF9_MEGHA',
    icon: Database,
    color: 'text-cyan-400',
    border: 'border-cyan-400/30',
    tags: ['Smart Contracts', 'Cryptography', 'Consensus Lead']
  },
  {
    name: 'RAHUL CHATTERJEE',
    role: 'SECURITY_SHIELD_ENGINEER',
    sig: '0x0A24_RAHUL',
    icon: ShieldCheck,
    color: 'text-purple-400',
    border: 'border-purple-400/30',
    tags: ['Cyber Shield v4', 'K8s Cluster', 'Audit Logs']
  },
  {
    name: 'PRIYA DESHMUKH',
    role: 'PRODUCT_EXPERIENCE_LEAD',
    sig: '0x7B1E_PRIYA',
    icon: Code2,
    color: 'text-yellow-400',
    border: 'border-yellow-400/30',
    tags: ['Vite + Motion', 'Framer Specialist', 'Holograms UX']
  }
];

export default function Team() {
  return (
    <section id="team" className="relative py-24 px-4 md:px-12 bg-cyber-bg overflow-hidden border-b border-cyber-border/20">
      <div className="cyber-grid opacity-15 absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-neon-green tracking-widest block mb-3 animate-pulse">SYSTEM_BUILDERS</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase font-cyber mb-4">
            Built by Innovators
          </h2>
          <div className="h-0.5 w-24 bg-neon-green mx-auto mb-6 shadow-[0_0_8px_#22ff66]" />
          <p className="text-cyber-text text-sm md:text-base font-mono">
            IIT-trained programmers and experience designers building government-grade technologies for Bharat.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, idx) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6, borderColor: 'rgba(34, 255, 102, 0.5)' }}
                className={`glass-panel p-5 rounded-lg border ${member.border} bg-cyber-card/40 transition-all duration-300 relative group flex flex-col justify-between min-h-[280px]`}
              >
                {/* Horizontal scanner bar on hover */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-green opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#22ff66] hologram-scanner" />

                <div className="space-y-4">
                  {/* Avatar box represented by cyber signature */}
                  <div className="h-28 rounded bg-black/60 border border-cyber-border/40 relative overflow-hidden flex items-center justify-center">
                    <div className="cyber-grid opacity-10 absolute inset-0 pointer-events-none" />
                    <Icon className={`w-10 h-10 ${member.color} animate-pulse relative z-10`} />
                    <span className="absolute bottom-2 left-2 font-mono text-[8px] text-cyber-text/50">{member.sig}</span>
                  </div>

                  {/* Identity */}
                  <div className="font-mono">
                    <h3 className="text-sm font-cyber font-black tracking-tight text-white uppercase group-hover:text-neon-green transition-colors">
                      {member.name}
                    </h3>
                    <span className={`text-[9px] font-bold tracking-widest block mt-0.5 ${member.color}`}>
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Sub tags */}
                <div className="mt-4 pt-3 border-t border-cyber-border/20">
                  <div className="flex flex-wrap gap-1">
                    {member.tags.map(t => (
                      <span key={t} className="text-[8px] font-mono px-2 py-0.5 rounded border border-cyber-border/30 text-cyber-text/80 bg-black/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
