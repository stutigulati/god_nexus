import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Database, RefreshCw, Cpu, Layers, HelpCircle, HardDrive } from 'lucide-react';

const BLOCKCHAIN_FEATURES = [
  { title: 'Degree Verification', desc: 'Prevents credentials fraud by matching certificate signatures directly against decentralized nodes.', icon: Shield },
  { title: 'Immutable Certificate Storage', desc: 'Degrees are cryptographically hashed and minted on-chain, ensuring lifetime integrity.', icon: Database },
  { title: 'Smart Contracts Ledger', desc: 'Self-executing ledger contracts automate verification requests instantly without manual overhead.', icon: Cpu },
  { title: 'Decentralized Trust Layer', desc: 'No central database vulnerabilities. Nodes audit signatures in parallel to keep transactions safe.', icon: Layers }
];

export default function BlockchainSection() {
  return (
    <section id="blockchain" className="relative py-24 px-4 md:px-12 bg-black overflow-hidden border-b border-cyber-border/20">
      <div className="cyber-grid opacity-15 absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-neon-green tracking-widest block mb-3 animate-pulse">TRUST_INFRASTRUCTURE</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase font-cyber mb-4">
            Trust Built on Immutable Systems
          </h2>
          <div className="h-0.5 w-24 bg-neon-green mx-auto mb-6 shadow-[0_0_8px_#22ff66]" />
          <p className="text-cyber-text text-sm md:text-base font-mono">
            How we engineer high-grade, decentralized platforms that secure certificates and eliminate document forgery in Bharat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Chain Visualization */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="font-mono text-xs text-cyan-400 tracking-wider block uppercase">LIVE_CHAIN_BLOCKS</span>
            
            {/* Animated block sequence */}
            <div className="space-y-4 relative">
              {/* Vertical line connecting blocks */}
              <div className="absolute left-[37px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-neon-green via-cyan-400 to-cyber-border/40 pointer-events-none -z-10" />

              {/* Block 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-4 rounded-lg border border-neon-green/30 bg-black/80 flex items-start gap-4 hover:border-neon-green transition-all"
              >
                <div className="p-2.5 rounded bg-neon-green/10 border border-neon-green/30 text-neon-green font-mono text-xs font-bold w-12 h-12 flex items-center justify-center flex-shrink-0">
                  #03
                </div>
                <div className="font-mono text-[10px] space-y-1 w-full overflow-hidden">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-bold">BLOCK_HEIGHT: 2,492,109</span>
                    <span className="text-neon-emerald">CONSENSUS_OK</span>
                  </div>
                  <p className="text-cyber-text truncate">HASH: 0x8a92f02b3c10aef78dcd5b118029c8e1a53b</p>
                  <p className="text-cyber-text/60">TS: {new Date().toISOString()}</p>
                </div>
              </motion.div>

              {/* Block 2 */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-panel p-4 rounded-lg border border-cyan-400/30 bg-black/80 flex items-start gap-4 hover:border-cyan-400 transition-all"
              >
                <div className="p-2.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs font-bold w-12 h-12 flex items-center justify-center flex-shrink-0">
                  #02
                </div>
                <div className="font-mono text-[10px] space-y-1 w-full overflow-hidden">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-bold">BLOCK_HEIGHT: 2,492,108</span>
                    <span className="text-cyan-400">CONSENSUS_OK</span>
                  </div>
                  <p className="text-cyber-text truncate">HASH: 0x4df9c3098e20ab7183fcb9e28f110c93a02d</p>
                  <p className="text-cyber-text/60">TS: 2026-05-27T11:40:02Z</p>
                </div>
              </motion.div>

              {/* Block 3 */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-panel p-4 rounded-lg border border-cyber-border/40 bg-black/80 flex items-start gap-4 hover:border-cyber-border transition-all"
              >
                <div className="p-2.5 rounded bg-black/80 border border-cyber-border/40 text-cyber-text/70 font-mono text-xs font-bold w-12 h-12 flex items-center justify-center flex-shrink-0">
                  #01
                </div>
                <div className="font-mono text-[10px] space-y-1 w-full overflow-hidden">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-bold text-cyber-text/80">GENESIS_BLOCK</span>
                    <span className="text-cyber-text/50">ARCHIVED</span>
                  </div>
                  <p className="text-cyber-text/60 truncate">HASH: 0x0a24df823901bce75d89ef23b08e2f47021b</p>
                  <p className="text-cyber-text/50">TS: 2026-05-01T00:00:00Z</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Features explanation */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BLOCKCHAIN_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="glass-panel p-5 rounded-lg border border-cyber-border/40 hover:border-neon-green/40 bg-cyber-card/40 transition-all duration-300"
                >
                  <div className="p-2.5 rounded bg-neon-green/5 text-neon-green w-10 h-10 flex items-center justify-center mb-4 border border-cyber-border/40">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2 font-mono">{feat.title}</h3>
                  <p className="text-[11px] text-cyber-text leading-relaxed font-sans">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
