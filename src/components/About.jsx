import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Target, Server } from 'lucide-react';

const VISION_CARDS = [
 {
title: 'SECURE INFRASTRUCTURE',
desc: 'Bespoke, custom code platforms utilizing immutable distributed ledger systems for absolute state security.',
icon: ShieldCheck
},
 {
title: 'HIGH SCALABILITY',
desc: 'Clustered microservice deployment engines handling millions of concurrent requests with minimal CPU overhead.',
icon: Server
},
 {
title: 'TARGETED IMPACT',
desc: 'Building platforms that directly improve student metrics, farmer revenues, and institutional trust levels.',
icon: Target
}
];

export default function About() {
return (
<section id="about" className="relative py-28 px-4 md:px-12 bg-cyber-bg overflow-hidden border-b border-cyber-border/20 select-none">

<div className="cyber-grid opacity-15 absolute inset-0 pointer-events-none" />
<div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[160px] pointer-events-none -z-10" />

<div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.8 }}
className="lg:col-span-5 flex flex-col gap-6"
>
<div className="flex items-center gap-2">
<span className="font-mono text-xs text-neon-green tracking-widest block uppercase">SYSTEM_MISSION</span>
<span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping" />
</div>

<h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight">
<span className="text-white">
 ENGINEERING
</span>
<br className="hidden sm:inline" />

<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-neon-green to-emerald-400 drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]">
 BHARAT'S DIGITAL BACKBONE
</span>

<br />
</h2>

<div className="h-0.5 w-20 bg-neon-green mb-2 shadow-[0_0_8px_#22ff66]" />

<p className="text-cyber-text text-sm sm:text-base leading-relaxed font-sans text-cyber-text/95">
 Geeks of Gurukul is building next-generation platforms across AI, blockchain, education technology, agriculture technology, and enterprise automation. The goal is to create secure, scalable and impactful digital systems for institutions, governments, startups and communities.
</p>

</motion.div>

{/* Right Side */}
<div className="lg:col-span-7 flex flex-col gap-4">
{VISION_CARDS.map((card, idx) => {
const Icon = card.icon;
return (
<motion.div
key={idx}
initial={{ opacity: 0, x: 40 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.6, delay: idx * 0.15 }}
whileHover={{ y: -3, borderColor: 'rgba(34, 255, 102, 0.45)' }}
className="glass-panel p-5 rounded-lg border border-cyber-border/30 hover:border-neon-emerald/50 hover:shadow-[0_0_15px_rgba(0,255,136,0.1)] transition-all group flex items-start gap-4 cursor-pointer bg-[#050b08]/50"
>
<div className="p-3 rounded bg-neon-emerald/10 border border-neon-emerald/30 group-hover:bg-neon-emerald/20 transition-all text-neon-emerald flex-shrink-0">
<Icon className="w-5 h-5" />
</div>

<div className="flex-1 font-mono">
<h3 className="text-sm font-bold text-white font-cyber uppercase tracking-wider">
{card.title}
</h3>

<p className="text-[11px] text-cyber-text mt-1.5 leading-relaxed font-sans">
{card.desc}
</p>
</div>

</motion.div>
);
})}
</div>

</div>
</section>
);
}