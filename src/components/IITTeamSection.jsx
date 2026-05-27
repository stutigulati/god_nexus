import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function IITTeamSection() {
  const alumniList = [
    'IIT Kharagpur', 'IIT Guwahati', 'IIT Hyderabad', 'IIT Bombay',
    'IIT Delhi', 'IIT Madras', 'IIT Roorkee', 'IIT Alumni Network'
  ];

  // Repeat the list to ensure infinite scrolling width
  const doubleAlumniList = [...alumniList, ...alumniList, ...alumniList, ...alumniList];

  return (
    <section id="iit-force" className="relative py-28 px-4 md:px-12 bg-[#020703] overflow-hidden border-b border-cyber-border/20">
      
      {/* Visual cyber-grid layout */}
      <div className="cyber-grid opacity-10 absolute inset-0 pointer-events-none" />
      
      {/* Cinematic Glowing Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#22ff66]/5 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Section Title Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22ff66] animate-ping" />
            <span className="font-mono text-xs text-[#22ff66] tracking-[0.35em] uppercase font-black">
              ELITE_ENGINEERING_TEAM
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-cyber font-black text-white tracking-tight uppercase leading-none select-none relative mb-4">
            BUILT BY IITIANS
            <div className="absolute -inset-1 bg-[#22ff66]/10 blur-xl opacity-20 pointer-events-none -z-10" />
          </h2>

          <div className="h-[2px] w-24 bg-[#22ff66] mx-auto mb-6 shadow-[0_0_8px_#22ff66]" />

          <p className="text-cyber-text text-sm md:text-base font-mono max-w-2xl mx-auto leading-relaxed">
            Our platforms are engineered by top IIT alumni, bringing deep technical expertise, innovation, and real-world execution.
          </p>
        </motion.div>

        {/* Horizontal Marquee Statement Strip */}
        <div className="relative w-full overflow-hidden bg-black/60 border border-cyber-border/40 py-3.5 mb-16 rounded-xl flex items-center shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
          {/* Subtle gradient edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#020703] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020703] to-transparent z-10 pointer-events-none" />
          
          <motion.div
            variants={{
              animate: {
                x: [0, -1000],
                transition: {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                },
              },
            }}
            animate="animate"
            className="flex items-center gap-8 whitespace-nowrap font-mono text-[10px] text-[#22ff66] font-black uppercase tracking-[0.25em]"
          >
            {doubleAlumniList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 select-none">
                <span>{item}</span>
                <span className="text-white opacity-40">•</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Subtle Interactive Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          
          {/* Stat 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-5 rounded-xl border border-cyber-border/30 bg-cyber-card/20 flex flex-col items-center justify-center text-center group hover:border-[#22ff66]/30 transition-all duration-300"
          >
            <div className="text-3xl font-cyber font-black text-white mb-1 group-hover:text-[#22ff66] transition-colors">
              <AnimatedCounter value="250+" />
            </div>
            <div className="text-[10px] font-mono text-cyber-text tracking-widest uppercase">
              IIT Engineers Joined
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-5 rounded-xl border border-cyber-border/30 bg-cyber-card/20 flex flex-col items-center justify-center text-center group hover:border-[#22ff66]/30 transition-all duration-300"
          >
            <div className="text-3xl font-cyber font-black text-white mb-1 group-hover:text-[#22ff66] transition-colors">
              <AnimatedCounter value="50+" />
            </div>
            <div className="text-[10px] font-mono text-cyber-text tracking-widest uppercase">
              Secure Systems Built
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-5 rounded-xl border border-cyber-border/30 bg-cyber-card/20 flex flex-col items-center justify-center text-center group hover:border-[#22ff66]/30 transition-all duration-300"
          >
            <div className="text-3xl font-cyber font-black text-white mb-1 group-hover:text-[#22ff66] transition-colors">
              <AnimatedCounter value="170+" />
            </div>
            <div className="text-[10px] font-mono text-cyber-text tracking-widest uppercase">
              Cities Scaled PAN-Bharat
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
