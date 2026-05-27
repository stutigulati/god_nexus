import React from 'react';
import { motion } from 'framer-motion';

// react-icons/si — all verified available
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiNodedotjs, SiPython,
  SiDocker, SiMongodb, SiPostgresql, SiGraphql,
  SiRedis, SiGit, SiTailwindcss, SiFirebase,
  SiFlutter, SiKubernetes, SiGithub, SiVercel,
  SiTerraform, SiSupabase, SiPrisma, SiLinux,
} from 'react-icons/si';

// AWS — not in react-icons/si, use official SVG via img tag
const AwsIcon = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
    alt="AWS"
    style={{ width: 22, height: 22, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
  />
);

const TECH_STACK = [
  { name: 'HTML5',       Icon: SiHtml5,       color: '#E34F26' },
  { name: 'CSS3',        Icon: SiCss,        color: '#1572B6' },
  { name: 'JavaScript',  Icon: SiJavascript,  color: '#F7DF1E' },
  { name: 'TypeScript',  Icon: SiTypescript,  color: '#3178C6' },
  { name: 'React',       Icon: SiReact,       color: '#61DAFB' },
  { name: 'Next.js',     Icon: SiNextdotjs,   color: '#ffffff' },
  { name: 'Node.js',     Icon: SiNodedotjs,   color: '#339933' },
  { name: 'Python',      Icon: SiPython,      color: '#3776AB' },
  { name: 'Docker',      Icon: SiDocker,      color: '#2496ED' },
  { name: 'AWS',         Icon: AwsIcon,       color: '#FF9900', isImg: true },
  { name: 'MongoDB',     Icon: SiMongodb,     color: '#47A248' },
  { name: 'PostgreSQL',  Icon: SiPostgresql,  color: '#4169E1' },
  { name: 'GraphQL',     Icon: SiGraphql,     color: '#E10098' },
  { name: 'Redis',       Icon: SiRedis,       color: '#DC382D' },
  { name: 'Git',         Icon: SiGit,         color: '#F05032' },
  { name: 'Tailwind',    Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Firebase',    Icon: SiFirebase,    color: '#FFCA28' },
  { name: 'Flutter',     Icon: SiFlutter,     color: '#02569B' },
  { name: 'Kubernetes',  Icon: SiKubernetes,  color: '#326CE5' },
  { name: 'GitHub',      Icon: SiGithub,      color: '#ffffff' },
  { name: 'Vercel',      Icon: SiVercel,      color: '#ffffff' },
  { name: 'Terraform',   Icon: SiTerraform,   color: '#844FBA' },
  { name: 'Supabase',    Icon: SiSupabase,    color: '#3ECF8E' },
  { name: 'Linux',       Icon: SiLinux,       color: '#FCC624' },
];

const DOUBLED = [...TECH_STACK, ...TECH_STACK];

export default function TechStackSlider() {
  return (
    <section className="relative py-14" style={{ background: 'transparent' }}>

      {/* Header */}
      <div className="text-center mb-8 px-4">
        <span className="font-mono text-[10px] text-[#34D562] tracking-[0.25em] uppercase block mb-3">
          
        </span>
        <h2 className="font-cyber font-black text-3xl md:text-4xl text-white tracking-tight">
          Technologies We Build With
        </h2>
        <p className="text-white/50 text-sm mt-2 font-sans">
          A battle-tested stack powering every platform we ship.
        </p>
      </div>

      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #020703, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #020703, transparent)' }} />

      {/* Single infinite marquee row */}
      <div className="overflow-hidden">
        <motion.div
          className="flex items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          {DOUBLED.map((tech, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 mx-2 select-none"
              style={{ background: 'transparent', width: 100, height: 100 }}
            >
              {tech.isImg
                ? <AwsIcon />
                : <tech.Icon size={24} style={{ color: tech.color, flexShrink: 0 }} />
              }
              <span className="font-sans text-[10px] font-semibold text-white/65 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}