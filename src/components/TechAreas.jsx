import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Smartphone, Brain, GraduationCap, Landmark, Building2, Globe, Monitor, Code } from 'lucide-react';

const DOMAINS = [
  {
    tag: 'WEB_SOLUTIONS',
    title: 'Web Solutions',
    desc: 'Enterprise platforms, SaaS portals, and blazing-fast applications built for high performance and global scale.',
    tech: ['React', 'Next.js', 'Node.js', 'AWS Cloud'],
    mockup: 'web'
  },
  {
    tag: 'MOBILE_APPLICATIONS',
    title: 'App Solutions',
    desc: 'Native and cross-platform mobile apps. Designed with premium UX and engineered for instant responsiveness.',
    tech: ['React Native', 'Flutter', 'iOS SDK', 'Android'],
    mockup: 'mobile'
  },
  {
    tag: 'ARTIFICIAL_INTELLIGENCE',
    title: 'AI Solutions',
    desc: 'Computer vision, natural language processing, custom machine learning models, and cognitive products fine-tuned to your domain.',
    tech: ['TensorFlow', 'PyTorch', 'OCR Models', 'Custom LLMs'],
    badge: 'In Production',
    mockup: 'ai'
  },
  {
    tag: 'EDTECH_PLATFORMS',
    title: 'Education Tech',
    desc: 'Decentralized online judges, AI-powered interview simulators, placement portals, and responsive LMS core platforms.',
    tech: ['LMS Engine', 'Online Judge', 'AI Evaluator'],
    mockup: 'edtech'
  },
  {
    tag: 'GOVTECH_INFRASTRUCTURE',
    title: 'Government Solutions',
    desc: 'Blockchain-secured academic verification vaults, decentralized registry networks, and audit-ready public utilities.',
    tech: ['P2P Ledger', 'Smart Contracts', 'Security Shield'],
    mockup: 'gov'
  },
  {
    tag: 'ENTERPRISE_SYSTEMS',
    title: 'Enterprise Systems',
    desc: 'HRMS workflows, automation ERPs, and secure CRM hubs — fully customizable, white-labeled, and secure.',
    tech: ['HRMS', 'ERP Suite', 'Custom CRM', 'White-label'],
    mockup: 'enterprise'
  }
];

// Interactive 3D Card wrapper
function DomainCard({ domain, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="perspective-1000 h-full w-full group cursor-pointer"
    >
      <div 
        style={{ transform: 'translateZ(30px)' }}
        className="relative h-full glass-panel rounded-2xl p-6 md:p-8 border border-cyber-border/40 group-hover:border-neon-green/60 transition-all duration-300 flex flex-col justify-between gap-6 hover:shadow-[0_0_35px_rgba(34,255,102,0.15)] overflow-hidden"
      >
        {/* Neon Green Rim Light overlay */}
        <div className="absolute inset-0 border border-transparent group-hover:border-neon-green/30 rounded-2xl pointer-events-none transition-all duration-300" />
        
        {/* Laser scanner line on hover */}
        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-neon-green opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#22ff66] hologram-scanner" />

        {/* Glowing Background Orb */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-neon-green/5 rounded-full blur-2xl group-hover:bg-neon-green/10 transition-all duration-300 pointer-events-none" />

        {/* Header Section */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] text-neon-green tracking-[0.2em] uppercase font-bold">
            {domain.tag}
          </span>
          {domain.badge && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neon-green/10 border border-neon-green/40 text-[8px] font-mono text-neon-green font-bold uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-neon-green animate-ping" />
              {domain.badge}
            </span>
          )}
        </div>

        {/* Body Section */}
        <div className="space-y-2.5">
          <h3 className="text-xl md:text-2xl font-cyber font-black tracking-tight text-white uppercase group-hover:text-neon-green transition-colors leading-none">
            {domain.title}
          </h3>
          <p className="text-cyber-text text-xs leading-relaxed font-sans min-h-[50px]">
            {domain.desc}
          </p>
        </div>

        {/* Cinematic Animated Visual Area */}
        <div className="h-48 my-2 relative rounded-xl bg-gradient-to-br from-black/90 to-cyber-card/75 border border-cyber-border/30 overflow-hidden flex items-center justify-center">
          {/* Subtle Grid overlay */}
          <div className="cyber-grid opacity-10 absolute inset-0 pointer-events-none" />
          
          {/* Mockup Renderer */}
          <CardMockup type={domain.mockup} />

          {/* Floating ambient particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-4 left-6 w-1 h-1 rounded-full bg-neon-green/30"
            />
            <motion.div 
              animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-6 right-10 w-1.5 h-1.5 rounded-full bg-neon-emerald/30"
            />
          </div>
        </div>

        {/* Footer Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {domain.tech.map(t => (
              <span 
                key={t} 
                className="text-[9px] font-mono px-2.5 py-0.5 rounded border border-cyber-border text-cyber-text bg-black/40 hover:text-white hover:border-neon-green/40 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-neon-green text-[10px] font-mono font-bold cursor-pointer transition-all duration-300 w-fit select-none">
            <span>LEARN MORE</span>
            <motion.span
              variants={{
                hover: { x: 5 }
              }}
              className="group-hover:translate-x-1.5 transition-transform duration-300"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// 3D-Inspired SVG Scene// Upgraded High-Fidelity EdTech Mockup
function EdTechMockup() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 7);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-between p-4 overflow-hidden">
      {/* Background Cyber Radar Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-40 h-40 border border-dashed border-neon-green/30 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-32 h-32 border border-dotted border-neon-green/20 rounded-full absolute"
        />
      </div>

      {/* Floating Code block on Left */}
      <div className="relative z-10 space-y-1 font-mono text-[8px] md:text-[9px] select-none text-left opacity-75 max-w-[120px] md:max-w-[140px]">
        <div className="text-cyan-400 font-bold tracking-wider">CODE_STREAM</div>
        <div className="text-cyber-text/60">#include &lt;compiler&gt;</div>
        <div className="text-white">int main() {"{"}</div>
        <div className="text-neon-green pl-2 animate-pulse">evaluate_solution();</div>
        <div className="text-white">{"}"}</div>
      </div>

      {/* Center: Glowing 3D Graduation Cap Hologram */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 flex items-center justify-center select-none z-0">
        {/* Pulse expanding ring */}
        <motion.div
          animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-20 h-20 border border-neon-green/30 rounded-full"
        />

        <motion.div
          animate={{ 
            y: [-5, 5, -5], 
            rotateY: [-15, 15, -15],
            rotateX: [10, -10, 10]
          }}
          style={{ transformStyle: 'preserve-3d' }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative drop-shadow-[0_0_20px_rgba(34,255,102,0.7)]"
        >
          <svg viewBox="0 0 100 100" className="w-18 h-18 text-neon-green">
            {/* Diamond mortarboard top */}
            <polygon points="50 20, 88 34, 50 48, 12 34" fill="rgba(34, 255, 102, 0.15)" stroke="currentColor" strokeWidth="1.6" />
            {/* Tassel */}
            <path d="M50 34 L50 42 L68 52 L68 65" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <polygon points="65 65, 71 65, 68 72" fill="currentColor" />
            {/* Skull cap bottom */}
            <path d="M30 42 L30 55 C30 65, 70 65, 70 55 L70 42" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </motion.div>
      </div>

      {/* Floating Compilation Ticker / AI logs on Right */}
      <div className="relative z-10 space-y-1 font-mono text-[8px] md:text-[9px] select-none text-right max-w-[120px] md:max-w-[140px]">
        {step >= 0 && (
          <div className="flex items-center justify-end gap-1 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping" />
            <span className="font-extrabold tracking-wider uppercase text-[6px] md:text-[7px]">ONLINE_JUDGE</span>
          </div>
        )}
        {step >= 1 && <div className="text-cyan-400 font-bold uppercase tracking-wider animate-pulse text-[7px] md:text-[8px]">[ RUNNING_TESTS ]</div>}
        {step >= 2 && <div className="text-neon-green font-semibold">TEST #1: OK (6ms)</div>}
        {step >= 3 && <div className="text-neon-green font-semibold">TEST #2: OK (9ms)</div>}
        {step >= 4 && <div className="text-neon-green font-semibold">TEST #3: OK (11ms)</div>}
        {step >= 5 && <div className="text-yellow-400 font-extrabold animate-pulse text-[7.5px] md:text-[8.5px]">AI_SCORE: 100/100</div>}
        {step >= 6 && <div className="text-neon-emerald font-black tracking-widest uppercase bg-neon-green/10 border border-neon-green/30 px-1 py-0.5 rounded text-[7px] md:text-[8px] w-fit ml-auto animate-bounce">VERIFIED</div>}
      </div>
    </div>
  );
}

function GovTechMockup() {
  const [txStep, setTxStep] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTxStep((prev) => (prev + 1) % 6);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-between p-4 overflow-hidden select-none">
      
      {/* Background circular radar grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20 z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute w-44 h-44 rounded-full border border-dashed border-neon-green/20"
        />
        <div className="absolute w-32 h-32 rounded-full border border-neon-green/10" />
      </div>

      {/* Network mesh connection wires */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Curved connection lines between distributed blocks */}
        <path d="M 25 30 Q 15 55 25 75" fill="none" stroke="rgba(34,255,102,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />
        <path d="M 25 75 Q 50 82 75 75" fill="none" stroke="rgba(34,255,102,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />
        <path d="M 75 75 Q 85 50 75 30" fill="none" stroke="rgba(34,255,102,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />
        <path d="M 75 30 Q 50 20 25 30" fill="none" stroke="rgba(34,255,102,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />

        {/* Animated active packet pulses traveling */}
        <motion.circle
          cx="0" cy="0" r="1.5" fill="#22ff66"
          className="glow-shadow-green-strong"
          animate={{
            cx: [25, 17, 21, 25],
            cy: [30, 52, 68, 75],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="0" cy="0" r="1.5" fill="#00ff88"
          animate={{
            cx: [25, 48, 68, 75],
            cy: [75, 80, 78, 75],
          }}
          transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        <motion.circle
          cx="0" cy="0" r="1.5" fill="#22ff66"
          animate={{
            cx: [75, 71, 52, 25],
            cy: [75, 52, 25, 30],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
      </svg>

      {/* Distributed 3D Isometric Nodes */}
      <div className="absolute left-6 top-6 select-none z-10 pointer-events-none">
        <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(34,255,102,0.3)]">
          <polygon points="20 5, 33 11.5, 20 18, 7 11.5" fill="rgba(34,255,102,0.15)" stroke="#22ff66" strokeWidth="0.8" />
          <polygon points="7 11.5, 20 18, 20 30, 7 23.5" fill="rgba(5,11,8,0.8)" stroke="#22ff66" strokeWidth="0.8" />
          <polygon points="20 18, 33 11.5, 33 23.5, 20 30" fill="rgba(2,7,3,0.85)" stroke="#22ff66" strokeWidth="0.8" />
          <text x="20" y="15" textAnchor="middle" fill="#ffffff" fontSize="4.5" fontFamily="monospace" fontWeight="bold">#B_01</text>
        </svg>
      </div>

      <div className="absolute left-6 bottom-6 select-none z-10 pointer-events-none">
        <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(34,255,102,0.3)]">
          <polygon points="20 5, 33 11.5, 20 18, 7 11.5" fill="rgba(34,255,102,0.15)" stroke="#22ff66" strokeWidth="0.8" />
          <polygon points="7 11.5, 20 18, 20 30, 7 23.5" fill="rgba(5,11,8,0.8)" stroke="#22ff66" strokeWidth="0.8" />
          <polygon points="20 18, 33 11.5, 33 23.5, 20 30" fill="rgba(2,7,3,0.85)" stroke="#22ff66" strokeWidth="0.8" />
          <text x="20" y="15" textAnchor="middle" fill="#ffffff" fontSize="4.5" fontFamily="monospace" fontWeight="bold">#B_02</text>
        </svg>
      </div>

      <div className="absolute right-36 bottom-6 select-none z-10 pointer-events-none">
        <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(34,255,102,0.3)]">
          <polygon points="20 5, 33 11.5, 20 18, 7 11.5" fill="rgba(34,255,102,0.15)" stroke="#22ff66" strokeWidth="0.8" />
          <polygon points="7 11.5, 20 18, 20 30, 7 23.5" fill="rgba(5,11,8,0.8)" stroke="#22ff66" strokeWidth="0.8" />
          <polygon points="20 18, 33 11.5, 33 23.5, 20 30" fill="rgba(2,7,3,0.85)" stroke="#22ff66" strokeWidth="0.8" />
          <text x="20" y="15" textAnchor="middle" fill="#ffffff" fontSize="4.5" fontFamily="monospace" fontWeight="bold">#B_03</text>
        </svg>
      </div>

      {/* Central Hologram Capitol Dome Silhouette */}
      <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center select-none z-0">
        <motion.div
          animate={{ y: [-1, 1, -1], scale: [0.97, 1, 0.97] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex items-center justify-center text-neon-green/60 drop-shadow-[0_0_8px_rgba(34,255,102,0.3)]"
        >
          <svg viewBox="0 0 60 60" className="w-12 h-12">
            <ellipse cx="30" cy="22" rx="7" ry="8" fill="rgba(5,11,8,0.4)" stroke="currentColor" strokeWidth="0.8" />
            <rect x="19" y="30" width="22" height="3" fill="#020703" stroke="currentColor" strokeWidth="1" />
            {/* Pillars */}
            {[22, 25, 28, 31, 34, 37, 40].map(x => (
              <line key={x} x1={x} y1="33" x2={x} y2="43" stroke="currentColor" strokeWidth="0.8" />
            ))}
            <rect x="15" y="43" width="30" height="3" fill="#020703" stroke="currentColor" strokeWidth="1" />
          </svg>
        </motion.div>
      </div>

      {/* Right Column: Secure Public Trust Identity Dashboard & Cryptographic Shield */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 z-10 max-w-[150px] md:max-w-[180px]">
        {/* Cryptographic Shield Vector */}
        <div className="relative w-10 h-11 select-none flex-shrink-0">
          <svg viewBox="0 0 50 60" className="w-full h-full drop-shadow-[0_0_15px_rgba(34,255,102,0.5)]">
            <path 
              d="M25 5 L45 14 L45 32 Q45 48 25 56 Q5 48 5 32 L5 14 Z"
              fill="rgba(34,255,102,0.15)" 
              stroke="#22ff66" 
              strokeWidth="2.0" 
            />
            <path 
              d="M16 28 L23 35 L34 20" 
              fill="none" 
              stroke="#22ff66" 
              strokeWidth="3.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          {/* Specular scanline */}
          <motion.div 
            className="absolute left-0 w-full h-[1.5px] bg-neon-green/90 shadow-[0_0_8px_#22ff66] pointer-events-none"
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Security Shield details & logs */}
        <div className="flex flex-col justify-center font-mono select-none space-y-1 text-right">
          <div className="font-extrabold uppercase text-[7.5px] md:text-[8.5px] text-neon-green tracking-wider leading-none">DISTRIBUTED_TRUST</div>
          <div className="text-cyber-text opacity-70 text-[6.5px] md:text-[7.5px] leading-tight">AES_256 - ENCRYPTED</div>
          
          <div className="border-t border-neon-green/20 pt-1 mt-1 font-mono text-[6px] md:text-[7px] text-cyber-text/80 space-y-0.5">
            {txStep >= 0 && <div className="truncate text-white">TX: 0x7F8B - REQUEST</div>}
            {txStep >= 1 && <div className="truncate text-cyan-400">RESOLVING CERT...</div>}
            {txStep >= 2 && <div className="truncate text-neon-green">LEDGER VALIDATED</div>}
            {txStep >= 4 && <div className="truncate text-neon-emerald font-black uppercase tracking-wider text-[5.5px] bg-neon-green/10 border border-neon-green/30 px-1 py-0.5 rounded mt-0.5 animate-pulse w-fit ml-auto">ON-CHAIN SECURED</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3D-Inspired SVG Scenes
function CardMockup({ type }) {
  switch (type) {
    case 'web':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Rotating coordinates rings */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute w-44 h-44 border border-dashed border-neon-green/10 rounded-full" 
          />
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute w-32 h-32 border border-double border-neon-green/5 rounded-full" 
          />

          {/* 3D Laptop Chassis */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-44 h-24 bg-black border border-neon-green/45 rounded-lg shadow-[0_0_25px_rgba(34,255,102,0.25)] flex overflow-hidden z-10"
          >
            {/* Dark SaaS sidebar */}
            <div className="w-9 bg-[#050b08] border-r border-cyber-border/40 p-1.5 space-y-1.5 font-mono select-none">
              <div className="h-1 w-3/4 bg-neon-green/50 rounded" />
              <div className="h-0.5 w-full bg-cyber-text/20 rounded" />
              <div className="h-0.5 w-2/3 bg-cyber-text/20 rounded" />
              <div className="h-0.5 w-3/4 bg-cyber-text/20 rounded" />
              <div className="h-0.5 w-1/2 bg-cyber-text/20 rounded" />
            </div>

            {/* Dashboard screens */}
            <div className="flex-1 p-2 space-y-1.5 flex flex-col justify-between font-mono select-none">
              <div className="flex items-center justify-between text-[4px] border-b border-cyber-border/20 pb-0.5">
                <span className="text-white font-bold">SaaS_TELEMETRY</span>
                <span className="text-neon-emerald">OK</span>
              </div>

              {/* Glowing charts */}
              <div className="h-10 w-full rounded bg-black/80 border border-cyber-border/30 overflow-hidden flex items-end p-1 relative">
                <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,25 Q15,5 30,20 T60,5 T90,25 L100,15 L100,30 L0,30 Z" fill="rgba(34,255,102,0.15)" />
                  <path d="M0,25 Q15,5 30,20 T60,5 T90,25 L100,15" fill="none" stroke="#22ff66" strokeWidth="1" />
                </svg>
                <div className="absolute top-0.5 left-1 text-[3.5px] text-neon-green">ACTIVE_REVENUE</div>
              </div>

              {/* Data lines */}
              <div className="h-1.5 bg-[#050b08] border border-cyber-border/30 rounded flex items-center justify-between px-1 text-[3px] text-cyber-text/60">
                <span>PORT_SPEED: FAST</span>
                <span>MEMBER_SYNC</span>
              </div>
            </div>
            {/* Screen scanner lines */}
            <div className="absolute left-0 w-full h-0.5 bg-neon-green/30 hologram-scanner" />
          </motion.div>

          {/* Orbit paths */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-52 h-14 rounded-full border border-neon-green/10 transform rotate-12" />
          </div>
        </div>
      );
    case 'mobile':
      return (
        <div className="relative w-full h-full flex items-center justify-center gap-4">
          {/* iOS Device Frame */}
          <motion.div
            animate={{ y: [0, -6, 0], rotate: -4 }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            className="w-16 h-28 bg-[#020703] border border-neon-green/45 rounded-xl shadow-[0_0_20px_rgba(34,255,102,0.25)] p-1.5 flex flex-col justify-between font-mono text-[5px] relative"
          >
            {/* Status bar */}
            <div className="flex justify-between items-center text-[3.5px] text-cyber-text/50">
              <span>9:41</span>
              <span className="w-4 h-0.5 bg-cyber-text/30 rounded-full" />
            </div>

            {/* Glowing screen widgets */}
            <div className="bg-[#050b08] border border-cyber-border/30 rounded p-1 flex-1 my-1 flex flex-col justify-between relative overflow-hidden">
              <div className="h-1 w-2/3 bg-neon-green/40 rounded mb-0.5" />
              {/* Central pulsing dashboard icon */}
              <div className="h-8 bg-neon-green/5 border border-neon-green/20 rounded flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-neon-green animate-pulse" />
              </div>
              <div className="h-1 w-full bg-cyber-text/10 rounded mt-0.5" />
            </div>
            
            <div className="h-0.5 w-8 mx-auto bg-cyber-text/30 rounded-full" />
            <div className="absolute inset-0 border border-neon-green/10 rounded-xl pointer-events-none" />
          </motion.div>

          {/* Android Device Frame */}
          <motion.div
            animate={{ y: [0, 6, 0], rotate: 4 }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } }}
            className="w-16 h-28 bg-[#020703] border border-neon-green/45 rounded-xl shadow-[0_0_20px_rgba(34,255,102,0.25)] p-1.5 flex flex-col justify-between font-mono text-[5px] relative"
          >
            <div className="flex justify-between items-center text-[3.5px] text-cyber-text/50">
              <span className="w-1 h-1 rounded-full bg-cyber-text/30" />
              <span>100%</span>
            </div>

            {/* Glowing screen widgets */}
            <div className="bg-[#050b08] border border-cyber-border/30 rounded p-1 flex-1 my-1 flex flex-col justify-between">
              <div className="h-1 w-1/2 bg-neon-green/40 rounded mb-0.5" />
              <div className="grid grid-cols-2 gap-1 my-0.5">
                <div className="h-3.5 bg-neon-green/10 border border-neon-green/20 rounded" />
                <div className="h-3.5 bg-neon-green/20 border border-neon-green/20 rounded" />
              </div>
              <div className="h-1 w-3/4 bg-cyber-text/10 rounded" />
            </div>
            
            <div className="h-0.5 w-1/2 mx-auto bg-cyber-text/30 rounded-full" />
            <div className="absolute inset-0 border border-neon-green/10 rounded-xl pointer-events-none" />
          </motion.div>

          {/* Orbiting wireframe rings */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute w-44 h-44 rounded-full border border-dashed border-neon-green/5 pointer-events-none"
          >
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_6px_#22ff66]" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_6px_#22ff66]" />
          </motion.div>
        </div>
      );
    case 'ai':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Holographic glowing brain mesh */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <svg viewBox="0 0 120 100" className="w-32 h-26 drop-shadow-[0_0_25px_rgba(34,255,102,0.65)]">
              <g stroke="#22ff66" strokeWidth="0.8" fill="none">
                {/* Overlapping paths */}
                <path d="M40 25 Q25 15 25 35 Q15 45 25 60 Q20 75 45 80 Q60 90 75 80 Q95 75 95 60 Q105 45 95 35 Q95 15 75 20 Q60 10 45 25 Z" opacity="0.8" />
                
                {/* Connected nodes */}
                <motion.circle cx="45" cy="35" r="2.5" fill="#22ff66" animate={{ scale: [1, 1.8, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.circle cx="60" cy="30" r="2.5" fill="#22ff66" animate={{ scale: [1.8, 1, 1.8] }} transition={{ duration: 2.2, repeat: Infinity }} />
                <motion.circle cx="75" cy="38" r="2.5" fill="#22ff66" />
                <motion.circle cx="50" cy="55" r="2.5" fill="#22ff66" />
                <motion.circle cx="70" cy="58" r="2.5" fill="#22ff66" />
                <motion.circle cx="60" cy="72" r="2.5" fill="#22ff66" />

                {/* Synapses lasers */}
                <line x1="45" y1="35" x2="60" y2="30" stroke="#00ff88" strokeWidth="1" />
                <line x1="60" y1="30" x2="75" y2="38" stroke="#00ff88" strokeWidth="1" />
                <line x1="45" y1="35" x2="50" y2="55" />
                <line x1="60" y1="30" x2="50" y2="55" />
                <line x1="60" y1="30" x2="70" y2="58" />
                <line x1="75" y1="38" x2="70" y2="58" />
                <line x1="50" y1="55" x2="60" y2="72" />
                <line x1="70" y1="58" x2="60" y2="72" />
              </g>
              {/* Holographic stand */}
              <path d="M25 88 L60 95 L95 88 L60 81 Z" fill="rgba(34,255,102,0.15)" stroke="#22ff66" strokeWidth="0.8" />
            </svg>
          </motion.div>

          {/* Floating parameters overlay */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute right-3 top-3 bg-black/85 border border-neon-green/30 rounded p-1 font-mono text-[4px] text-cyber-text"
          >
            <div className="h-0.5 w-6 bg-neon-green/60 rounded mb-0.5" />
            <span className="block text-white">INFERENCE: 98%</span>
          </motion.div>
        </div>
      );
    case 'edtech':
      return <EdTechMockup />;
    case 'gov':
      return <GovTechMockup />;
    case 'enterprise':
      return (
        <div className="relative w-full h-full flex items-center justify-center gap-4">
          {/* Main CRM analytics dashboard */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-36 h-22 bg-[#020703] border border-neon-green/45 rounded-lg shadow-[0_0_20px_rgba(34,255,102,0.25)] p-2.5 font-mono text-[5px] z-10"
          >
            <div className="flex items-center justify-between mb-1.5 border-b border-cyber-border/20 pb-1">
              <span className="text-white font-bold">WORKFLOW_COCKPIT</span>
              <span className="text-[4px] text-cyber-text/60">●●●</span>
            </div>
            
            <div className="grid grid-cols-3 gap-1 mb-1.5">
              <div className="bg-[#050b08] border border-neon-green/20 rounded p-1">
                <div className="h-0.5 w-full bg-cyber-text/30 rounded mb-1" />
                <div className="h-3 flex items-end gap-0.5">
                  <div className="flex-1 bg-neon-green/40 h-1/2 rounded-sm" />
                  <div className="flex-1 bg-neon-green/60 h-3/4 rounded-sm" />
                  <div className="flex-1 bg-neon-green/80 h-full rounded-sm" />
                </div>
              </div>
              <div className="bg-[#050b08] border border-neon-green/10 rounded p-1 flex items-center justify-center">
                <span className="text-[4.5px] font-bold text-neon-emerald">94.8%</span>
              </div>
              <div className="bg-[#050b08] border border-neon-green/10 rounded p-1 flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5 text-neon-green" />
              </div>
            </div>

            <div className="flex items-end gap-0.5 h-5 mt-1">
              {[30, 50, 75, 40, 60, 90, 45, 80].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-neon-green/50 rounded-sm" />
              ))}
            </div>
          </motion.div>

          {/* Admin companion portal phone mockup */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="w-12 h-20 bg-black border border-neon-green/30 rounded p-1 space-y-1 shadow-[0_0_12px_rgba(34,255,102,0.15)] flex flex-col justify-between font-mono text-[4px]"
          >
            <div className="h-0.5 w-1/3 mx-auto bg-cyber-text/30 rounded-full" />
            <div className="h-3.5 bg-neon-green/20 rounded border border-neon-green/30" />
            <div className="grid grid-cols-2 gap-0.5">
              <div className="h-2.5 bg-[#050b08] border border-cyber-border/40 rounded" />
              <div className="h-2.5 bg-[#050b08] border border-cyber-border/40 rounded" />
            </div>
            <div className="h-0.5 w-2/3 mx-auto bg-cyber-text/30 rounded-full" />
          </motion.div>
        </div>
      );
    default:
      return null;
  }
}

export default function TechAreas() {
  return (
    <section id="tech-areas" className="relative py-28 px-4 md:px-12 bg-black overflow-hidden border-b border-cyber-border/20 select-none">
      
      {/* Immersive background graphics */}
      <div className="cyber-grid opacity-15 absolute inset-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-neon-green/40 shadow-[0_0_4px_#22ff66]" />
            <span className="font-mono text-xs text-neon-green tracking-[0.35em] uppercase font-black">WHAT WE BUILD</span>
            <div className="h-[1px] w-12 bg-neon-green/40 shadow-[0_0_4px_#22ff66]" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-cyber font-black text-white tracking-tight uppercase mb-4 leading-none select-none">
            MULTIPLE DOMAINS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-emerald text-neon-glow">
              INFINITE SOLUTIONS.
            </span>
          </h2>
          
          <p className="text-cyber-text text-sm md:text-base font-mono max-w-2xl mx-auto mt-6">
            Purpose-built enterprise platforms, automated intelligence, and scalable infrastructure engineered to power Bharat.
          </p>
        </motion.div>

        {/* 3D Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOMAINS.map((domain, index) => (
            <DomainCard key={domain.title} domain={domain} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
