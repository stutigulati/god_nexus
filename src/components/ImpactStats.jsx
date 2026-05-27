import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, ShieldCheck, Flame, Building2, MapPin } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const METRIC_BLOCKS = [
  { label: 'IIT-trained Builders', value: '250+', sub: 'CORE_ENGINEERS', icon: Flame, color: 'text-neon-green', border: 'border-neon-green/30' },
  { label: 'Enterprise Systems', value: '50+', sub: 'DEPLOYED_PRODUCTION', icon: Server, color: 'text-cyan-400', border: 'border-cyan-400/30' },
  { label: 'Secure Requests', value: '2M+', sub: 'SECURE_P2P_CALLS', icon: ShieldCheck, color: 'text-purple-400', border: 'border-purple-400/30' },
  { label: 'Custom Codebases', value: '100%', sub: 'ZERO_TEMPLATES_MINT', icon: Code, color: 'text-yellow-400', border: 'border-yellow-400/30' },
  { label: 'Partner Institutes', value: '80+', sub: 'INSTITUTES_VERIFIED', icon: Building2, color: 'text-neon-emerald', border: 'border-neon-emerald/30' },
  { label: 'Reached Cities', value: '170+', sub: 'PAN_BHARAT_GRID', icon: MapPin, color: 'text-pink-400', border: 'border-pink-400/30' }
];

export default function ImpactStats() {
  return (
    <section id="metrics" className="relative py-24 px-4 md:px-12 bg-cyber-bg overflow-hidden border-b border-cyber-border/20">
      <div className="cyber-grid opacity-15 absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-neon-green tracking-widest block mb-3 animate-pulse">SYSTEM_METRICS</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase font-cyber mb-4">
            Production Scale & Impact
          </h2>
          <div className="h-0.5 w-24 bg-neon-green mx-auto mb-6 shadow-[0_0_8px_#22ff66]" />
          <p className="text-cyber-text text-sm md:text-base font-mono">
            Direct measurements of live network logs, deployed systems, and education/agricultural footprints across Bharat.
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {METRIC_BLOCKS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`glass-panel p-4 rounded-lg border ${metric.border} hover:scale-[1.03] transition-all bg-cyber-card/30 flex flex-col justify-between h-36 group`}
              >
                <div className="flex items-center justify-between border-b border-cyber-border/20 pb-2 mb-1">
                  <div className={`p-1.5 rounded bg-black/60 border border-cyber-border/40 ${metric.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[8px] text-cyber-text/50 tracking-wider">
                    {metric.sub}
                  </span>
                </div>

                <div className="font-mono mt-auto">
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-neon-green transition-colors">
                    <AnimatedCounter value={metric.value} />
                  </div>
                  <div className="text-[9px] text-cyber-text/80 uppercase tracking-widest mt-0.5 leading-tight">
                    {metric.label}
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
