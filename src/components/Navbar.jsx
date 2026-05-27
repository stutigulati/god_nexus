import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Platforms', href: '#products' },
  { label: 'AI Labs', href: '#ai-labs' },
  { label: 'Metrics', href: '#metrics' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Determine active nav item
      const scrollPos = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveItem(item.href);
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveItem(href);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-panel border-b border-cyber-border/40 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
        : 'bg-transparent py-5 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo block */}
        <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-3 group select-none">
          <img src={logoImg} alt="Geeks of Gurukul" className="h-10 md:h-11 w-auto object-contain transition-all group-hover:scale-[1.02]" />
        </a>

        {/* Desktop nav menu */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative px-3.5 py-2 font-mono text-[11px] tracking-widest uppercase transition-all duration-300 font-bold ${
                  isActive ? 'text-neon-green text-neon-glow' : 'text-cyber-text hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span 
                    layoutId="navActiveLine"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-neon-green shadow-[0_0_8px_#22ff66]"
                  />
                )}
              </a>
            );
          })}
        </div>



        {/* Hamburger Trigger for Mobile */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded border border-cyber-border/30 bg-black/40 text-white cursor-pointer hover:bg-neon-green/10"
        >
          {isOpen ? <X className="w-5 h-5 text-neon-green" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full glass-panel border-t border-cyber-border/30 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`py-3.5 px-4 font-mono text-xs uppercase tracking-widest font-bold border rounded border-transparent transition-all ${
                    activeItem === item.href 
                      ? 'bg-neon-green/10 border-neon-green/30 text-neon-green font-extrabold shadow-[inset_0_0_8px_rgba(34,255,102,0.1)]' 
                      : 'text-cyber-text hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center justify-between border-t border-cyber-border/20 pt-4 px-2">
                <span className="font-mono text-[9px] text-cyber-text">SYSTEM_INTEGRITY: SECURED</span>
                <ShieldCheck className="w-4 h-4 text-neon-emerald" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
