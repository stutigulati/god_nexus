import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

/* ─── CONFIG ─────────────────────────────────────── */
const TOTAL_FRAMES   = 280;
const SECTION_VH     = 500; // 800vh scroll distance

const STORY_BEATS = [
  {
    range: [0, 0.16],
    position: 'center',
    label: 'GOG_TECHNOLOGIES',
    heading: ['Engineering the', 'Future of Bharat'],
    body: 'We build next-generation digital products and AI-powered platforms that turn ideas into real-world impact.',
    cta: true,
  },
  {
    range: [0.22, 0.38],
    position: 'left',
    label: 'WHAT_WE_BUILD',
    heading: ['AI & Cloud', 'Platforms'],
    body: 'From intelligent automation to scalable cloud infrastructure — every system is engineered for performance, security, and growth.',
  },
  {
    range: [0.44, 0.60],
    position: 'right',
    label: 'OUR_SOLUTIONS',
    heading: ['Custom Software', 'Real Challenges'],
    body: 'Tailored enterprise solutions, blockchain-secured workflows, and data analytics that drive measurable business outcomes.',
  },
  {
    range: [0.66, 0.80],
    position: 'left',
    label: 'IMPACT_AT_SCALE',
    heading: ['Powering 500+', 'Clients Worldwide'],
    body: 'Deployed across 20+ countries, our platforms are trusted by enterprises, governments, and fast-moving startups alike.',
  },
  {
    range: [0.86, 1.0],
    position: 'center',
    label: 'BEGIN_YOUR_JOURNEY',
    heading: ['Build Smarter.', 'Move Faster.'],
    body: "Ready to transform your ideas into impact? Let's engineer the future together.",
    ctaFinal: true,
  },
];

const frameUrl = (n) =>
  `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   Strategy: position:fixed canvas — bypasses
   overflow-x:hidden sticky bug completely
═══════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef   = useRef(null);
  const canvasRef    = useRef(null);
  const imagesRef    = useRef([]);
  const currentFrame = useRef(0);
  const targetFrame  = useRef(0);
  const animRef      = useRef(null);

  const [loaded,      setLoaded]     = useState(false);
  const [loadPct,     setLoadPct]    = useState(0);
  const [visible,     setVisible]    = useState(false); // fixed layer visible?
  const [activeBeats, setActive]     = useState([STORY_BEATS[0]]);

  /* ── 1. Preload all frames ── */
  useEffect(() => {
    let done = 0;
    const imgs = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        done++;
        setLoadPct(Math.round((done / TOTAL_FRAMES) * 100));
        if (done === TOTAL_FRAMES) setLoaded(true);
      };
      img.src = frameUrl(i + 1);
      return img;
    });
    imagesRef.current = imgs;
    return () => imgs.forEach(i => { i.onload = i.onerror = null; });
  }, []);

  /* ── 2. Draw frame on canvas ── */
  const drawFrame = useCallback((idx) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[Math.max(0, Math.min(Math.round(idx), TOTAL_FRAMES - 1))];
    if (!canvas || !img?.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width, ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  /* ── 3. Continuous lerp animation loop ── */
  useEffect(() => {
    const loop = () => {
      const diff = targetFrame.current - currentFrame.current;
      if (Math.abs(diff) > 0.5) {
        currentFrame.current += diff * 0.22;
        drawFrame(currentFrame.current);
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [drawFrame]);

  /* ── 4. Canvas = full window size ── */
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      drawFrame(currentFrame.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  /* ── 5. Scroll handler — uses fixed positioning trick ── */
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop    = section.offsetTop;
      const sectionHeight = section.offsetHeight;           // SECTION_VH * vh
      const scrollY       = window.scrollY;
      const vh            = window.innerHeight;

      // Is the fixed canvas layer visible?
      const inSection = scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight - vh;
      setVisible(inSection || scrollY < sectionTop + vh); // show from entry

      if (scrollY < sectionTop) {
        // above section — show frame 0
        targetFrame.current = 0;
        setActive([STORY_BEATS[0]]);
        return;
      }

      if (scrollY > sectionTop + sectionHeight - vh) {
        // below section — show last frame
        targetFrame.current = TOTAL_FRAMES - 1;
        setActive([]);
        return;
      }

      // inside section — map scroll to frames
      const scrolled  = scrollY - sectionTop;
      const scrollRange = sectionHeight - vh;
      const progress  = Math.max(0, Math.min(1, scrolled / scrollRange));

      targetFrame.current = progress * (TOTAL_FRAMES - 1);

      const beats = STORY_BEATS.filter(
        b => progress >= b.range[0] && progress <= b.range[1]
      );
      setActive(beats.length ? beats : []);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { if (loaded) drawFrame(0); }, [loaded, drawFrame]);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <>
      {/* ══ TALL SCROLL SPACER ══
          This is the element that creates scroll distance.
          No overflow, no sticky, just height.          */}
      <section
        ref={sectionRef}
        id="home"
        style={{ height: `${SECTION_VH}vh`, position: 'relative' }}
      />

      {/* ══ FIXED FULLSCREEN LAYER ══
          Lives outside the scroll flow — no overflow issues.
          Controlled entirely by JS scroll position.       */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: '#020703',
          overflow: 'visible',
          // pointer-events off when not in hero section
          pointerEvents: visible ? 'auto' : 'none',
          // Fade out when we leave the section
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      >
        {/* Loading screen */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              key="loader"
              className="absolute inset-0 z-50 bg-[#020703] flex flex-col items-center justify-center gap-5"
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
              <p className="font-mono text-[10px] text-[#34D562] tracking-[0.3em] uppercase">
                LOADING_SEQUENCE
              </p>
              <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#34D562] to-[#34D562] shadow-[0_0_6px_#34D562] transition-all duration-75"
                  style={{ width: `${loadPct}%` }}
                />
              </div>
              <p className="font-mono text-cyber-text text-[10px] tracking-widest">
                {loadPct}%{' — '}
                {loadPct < 35 ? 'INITIALISING' : loadPct < 75 ? 'LOADING_FRAMES' : 'RENDERING'}
              </p>
              <p className="font-cyber font-black text-3xl text-white mt-3 tracking-tight">
                GOG <span className="text-[#34D562]">TECHNOLOGIES</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />

        {/* Atmosphere */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.6) 100%)',
          }} />
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: 120,
            background: 'linear-gradient(to top, #020703, transparent)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.05,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(52,213,98,0.08) 0px, rgba(52,213,98,0.08) 1px, transparent 1px, transparent 4px)',
          }} />
        </div>

        {/* Text overlays */}
        <AnimatePresence mode="wait">
          {activeBeats.map(beat => (
            <BeatOverlay key={beat.label} beat={beat} scrollTo={scrollTo} />
          ))}
        </AnimatePresence>

        {/* Scroll hint */}
        <AnimatePresence>
          {activeBeats.some(b => b.range[0] === 0) && (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.2 } }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute', bottom: 24,
                left: '50%', transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                fontFamily: 'monospace', fontSize: 9, color: '#34D562',
                letterSpacing: '0.2em', zIndex: 20, pointerEvents: 'none',
              }}
            >
              <span>SCROLL_TO_EXPLORE</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: 20, height: 32,
                  border: '1px solid rgba(52,213,98,0.2)',
                  borderRadius: 999,
                  display: 'flex', justifyContent: 'center', paddingTop: 6,
                }}
              >
                <ChevronDown size={14} color="#34D562" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ─── Beat Overlay ─────────────────────────────── */
function BeatOverlay({ beat, scrollTo }) {
  const { position, label, heading, body, cta, ctaFinal } = beat;

  const style = {
    position: 'absolute',
    // Offset center by half navbar so content stays in view
    top: 'calc(50% - 40px)',
    transform: position === 'center'
      ? 'translate(-50%, -50%)'
      : 'translateY(-50%)',
    left:  position === 'left'   ? 'clamp(2rem, 8vw, 8rem)' :
           position === 'center' ? '50%' : 'auto',
    right: position === 'right'  ? 'clamp(2rem, 8vw, 8rem)' : 'auto',
    maxWidth: position === 'center' ? '90vw' : 'min(480px, 45vw)',
    maxHeight: 'calc(100vh - 120px)',  // never exceed viewport - navbar
    overflowY: 'visible',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: '0 1rem',
    alignItems: position === 'left'   ? 'flex-start' :
                position === 'right'  ? 'flex-end'   : 'center',
    textAlign:  position === 'left'   ? 'left' :
                position === 'right'  ? 'right': 'center',
    zIndex: 20,
  };

  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.35 } }}
    >
      <span style={{
        fontFamily: 'monospace', fontSize: 10, color: '#ffffff',
        fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
              }}>
        {label}
      </span>

      <h1 style={{
        fontFamily: 'Outfit, Inter, system-ui, sans-serif',
        fontWeight: 900,
        fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
        color: '#ffffff',
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        margin: 0,
              }}>
        {heading[0]}<br />
        <span style={{
          color: '#ffffff',
          WebkitTextFillColor: '#ffffff',
          fontWeight: 900,
        }}>
          {heading[1]}
        </span>
      </h1>

      <p style={{
        color: '#ffffff',
        fontWeight: 700,
        fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
        lineHeight: 1.7,
        maxWidth: 420,
        margin: 0,
              }}>
        {body}
      </p>

      {cta && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 4 }}>
          <a href="#case-studies" onClick={scrollTo('#case-studies')} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 28px',
            fontSize: 11, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.15em',
            color: '#000', background: '#34D562', borderRadius: 6,
            boxShadow: '0 0 10px rgba(52,213,98,0.2)',
            cursor: 'pointer', textDecoration: 'none', border: 'none',
          }}>
            EXPLORE SOLUTIONS <ArrowRight size={16} />
          </a>
          <a href="#about" onClick={scrollTo('#about')} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 28px',
            fontSize: 11, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.15em',
            color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: 6,
            border: '1px solid rgba(52,213,98,0.15)',
            cursor: 'pointer', textDecoration: 'none',
          }}>
            LEARN MORE
          </a>
        </div>
      )}

      {ctaFinal && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 4 }}>
          <a href="#contact" onClick={scrollTo('#contact')} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '16px 32px',
            fontSize: 13, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.15em',
            color: '#000', background: '#34D562', borderRadius: 6,
            boxShadow: '0 0 12px rgba(52,213,98,0.2)',
            cursor: 'pointer', textDecoration: 'none',
          }}>
            START A PROJECT <ArrowRight size={16} />
          </a>
          <a href="#products" onClick={scrollTo('#products')} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 24px',
            fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.15em',
            color: '#34D562', background: 'transparent', borderRadius: 6,
            border: '1px solid rgba(52,213,98,0.15)',
            cursor: 'pointer', textDecoration: 'none',
          }}>
            VIEW PRODUCTS
          </a>
        </div>
      )}
    </motion.div>
  );
}