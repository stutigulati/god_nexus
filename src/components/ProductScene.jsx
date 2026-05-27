import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, PlaySquare, FileText } from 'lucide-react';

export default function ProductScene({ product, index }) {
  const { title, description, tags, features, MockupComponent, status } = product;
  const isEven = index % 2 === 0;

  return (
    <section className="relative flex items-center justify-center py-10 md:py-16 px-4 md:px-12 border-b border-cyber-border/20 overflow-hidden">
      {/* Subtle tech background detail */}
      <div className="cyber-grid opacity-10 absolute inset-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Product Storytelling (Order switches based on index) */}
        <motion.div 
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        >
          {/* Header & Status Indicator */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-neon-green tracking-widest">FLAGSHIP_PRODUCT_0{index + 1}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping" />
            <span className="font-mono text-[10px] text-cyber-text tracking-widest uppercase border border-cyber-border/40 px-2 py-0.5 rounded bg-black/40">
              SYS - {status}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-cyber">
            {title}
          </h2>

          <p className="text-cyber-text text-sm md:text-base leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="font-mono text-[10px] text-neon-emerald border border-neon-emerald/20 px-2.5 py-1 rounded bg-[#0b3d1f]/10 shadow-[inset_0_0_6px_rgba(0,255,136,0.05)]"
              >
                #{tag.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Features checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-b border-cyber-border/20 py-4 my-2">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
                <span className="font-mono text-[11px] text-white/95 leading-normal tracking-wide">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Mockup Frame */}
        <motion.div 
          initial={{ opacity: 0, x: isEven ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
        >
          {MockupComponent && <MockupComponent />}
        </motion.div>

      </div>
    </section>
  );
}
