import React from 'react';
import { Cpu, ShieldCheck, Heart, Terminal, ArrowUp } from 'lucide-react';
import logoImg from '../assets/logo.png';

const SERVICES = [
  { name: 'AI_INFERENCE_CORE', status: 'ONLINE - OK' },
  { name: 'P2P_CONSENSUS_NODE', status: 'ONLINE - SECURE' },
  { name: 'ERP_CLOUD_GATEWAY', status: 'ONLINE - SYNCED' },
  { name: 'AGRI_MANDI_STREAM', status: 'ONLINE - OK' }
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020703] border-t border-cyber-border/40 py-12 px-4 md:px-12 font-mono text-[10px] text-cyber-text">
      {/* Grid Overlay */}
      <div className="cyber-grid opacity-10 absolute inset-0 pointer-events-none" />

      {/* Neon green glowing divider line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-green to-transparent shadow-[0_0_10px_#22ff66]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Side: Brand details */}
        <div className="md:col-span-4 space-y-4">
          <a href="#home" onClick={scrollToTop} className="flex items-center gap-3 group select-none">
            <img src={logoImg} alt="Geeks of Gurukul" className="h-11 md:h-12 w-auto object-contain transition-all group-hover:scale-[1.02]" />
          </a>

          <p className="font-sans text-xs leading-relaxed max-w-sm text-cyber-text/80">
            Engineering next-generation education, agriculture, governance and enterprise platforms. Building secure, decentralized, and scalable digital solutions for Bharat.
          </p>

          <div className="flex items-center gap-2 text-cyber-text/50 text-[9px] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-neon-emerald" />
            <span>ENCRYPTED SECURE CONNECTION</span>
          </div>
        </div>

        {/* Center Side: Navigation Menu */}
        <div className="md:col-span-3 space-y-3">
          <h5 className="text-[10px] text-white font-bold tracking-wider uppercase">PLATFORM_INDEX</h5>
          <ul className="space-y-2 text-cyber-text/90 font-sans text-xs">
            <li><a href="#home" className="hover:text-neon-green transition-colors font-mono tracking-widest uppercase text-[10px]">#01_HOME</a></li>
            <li><a href="#products" className="hover:text-neon-green transition-colors font-mono tracking-widest uppercase text-[10px]">#02_PRODUCTS</a></li>
            <li><a href="#ai-labs" className="hover:text-neon-green transition-colors font-mono tracking-widest uppercase text-[10px]">#03_AI_LABS</a></li>
            <li><a href="#metrics" className="hover:text-neon-green transition-colors font-mono tracking-widest uppercase text-[10px]">#04_METRICS</a></li>
            <li><a href="#contact" className="hover:text-neon-green transition-colors font-mono tracking-widest uppercase text-[10px]">#05_CONTACT</a></li>
          </ul>
        </div>

        {/* Right Side: Microservice Status Checker */}
        <div className="md:col-span-5 space-y-3">
          <h5 className="text-[10px] text-cyan-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" /> CLOUD_MICROSERVICES_STATUS
          </h5>
          <div className="p-3.5 bg-black/60 border border-cyber-border/40 rounded-lg space-y-2">
            {SERVICES.map((s) => (
              <div key={s.name} className="flex justify-between items-center text-[9px]">
                <span className="text-cyber-text">{s.name}</span>
                <div className="flex items-center gap-1.5 font-bold text-neon-emerald">
                  <span className="w-1 h-1 rounded-full bg-neon-emerald animate-ping" />
                  <span>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Bottom copyright and scroll top */}
      <div className="max-w-7xl mx-auto border-t border-cyber-border/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-[9px] text-cyber-text/60">
        <div>
          <span>© {new Date().getFullYear()} GEEKS_OF_GURUKUL | INC_PLATFORMS_DIVISION. ALL RIGHTS SECURED.</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            BUILT FOR BHARAT WITH <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
          </span>
          <button 
            onClick={scrollToTop}
            className="p-1.5 rounded border border-cyber-border/40 text-cyber-text hover:text-neon-green hover:border-neon-green transition-all cursor-pointer"
            title="SCROLL TO ROOT"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
