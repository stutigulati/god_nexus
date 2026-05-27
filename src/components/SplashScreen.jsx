/**
 * SplashScreen — GOG Nexus Platform boot sequence
 *
 * Phases:
 *  1. scan-line sweep (0.3s)
 *  2. terminal boot lines typed in (1.8s)
 *  3. GOG brand reveal — logo + wordmark + tagline (1.4s)
 *  4. iris-collapse exit + hand-off (0.7s)
 *
 * Total: ~4.2 seconds, then calls onComplete()
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BG    = '#020703';
const GREEN = '#22ff66';
const MONO  = '"Share Tech Mono", monospace';
const BODY  = '"Outfit", sans-serif';

// ── terminal lines ─────────────────────────────────────────────────────────
const BOOT = [
  { text: 'GOG NEXUS PLATFORM v2.0.1 — BOOT SEQUENCE INITIATED', ok: false },
  { text: 'LOADING AI INFERENCE ENGINE...', ok: true },
  { text: 'MOUNTING BLOCKCHAIN CONSENSUS LAYER...', ok: true },
  { text: 'INITIALISING MULTI-DOMAIN ECOSYSTEM...', ok: true },
  { text: 'SYNCING PLATFORM NODES (75/75)...', ok: true },
  { text: 'ALL SYSTEMS NOMINAL. ENTERING NEXUS.', ok: false, highlight: true },
];

// ── Scanline sweep ─────────────────────────────────────────────────────────
function Scanline() {
  return (
    <motion.div
      initial={{ top: '-4px' }}
      animate={{ top: '100vh' }}
      transition={{ duration: 0.55, ease: 'linear' }}
      style={{
        position: 'absolute', left: 0, right: 0,
        height: '3px',
        background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
        boxShadow: `0 0 24px 4px rgba(34,255,102,0.45)`,
        zIndex: 5,
        pointerEvents: 'none',
      }}
    />
  );
}

// ── Hex logo mark ──────────────────────────────────────────────────────────
function HexLogo() {
  return (
    <svg width="88" height="100" viewBox="0 0 88 100" fill="none">
      {/* outer hex */}
      <polygon
        points="44,2 84,24 84,76 44,98 4,76 4,24"
        stroke={GREEN} strokeWidth="1.5"
        fill="rgba(34,255,102,0.04)"
      />
      {/* inner hex */}
      <polygon
        points="44,14 72,30 72,70 44,86 16,70 16,30"
        stroke="rgba(34,255,102,0.3)" strokeWidth="0.8"
        fill="none"
      />
      {/* G letterform */}
      <text
        x="44" y="62"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="36"
        fontWeight="700"
        fill={GREEN}
        style={{ filter: `drop-shadow(0 0 8px ${GREEN})` }}
      >G</text>
      {/* corner dots */}
      {[
        [44,2],[84,24],[84,76],[44,98],[4,76],[4,24]
      ].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5"
          fill={GREEN} opacity="0.8"
          style={{ filter: `drop-shadow(0 0 5px ${GREEN})` }}
        />
      ))}
    </svg>
  );
}

// ── Neon grid background ───────────────────────────────────────────────────
function NeonGrid() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundImage: `
        linear-gradient(rgba(34,255,102,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34,255,102,0.04) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
    }} />
  );
}

// ── Corner brackets ────────────────────────────────────────────────────────
function CornerBrackets() {
  const size = 28, thick = 2, color = 'rgba(34,255,102,0.45)';
  const corners = [
    { top: 24, left: 28 },
    { top: 24, right: 28 },
    { bottom: 24, left: 28 },
    { bottom: 24, right: 28 },
  ];
  return (
    <>
      {corners.map((pos, i) => {
        const isRight = 'right' in pos;
        const isBottom = 'bottom' in pos;
        return (
          <div key={i} style={{
            position: 'absolute', ...pos,
            width: size, height: size,
            borderTop: !isBottom ? `${thick}px solid ${color}` : 'none',
            borderBottom: isBottom ? `${thick}px solid ${color}` : 'none',
            borderLeft: !isRight ? `${thick}px solid ${color}` : 'none',
            borderRight: isRight ? `${thick}px solid ${color}` : 'none',
            zIndex: 10,
          }} />
        );
      })}
    </>
  );
}

// ─── MAIN SPLASH ──────────────────────────────────────────────────────────
export default function SplashScreen({ onComplete }) {
  const [phase, setPhase]     = useState('scan');    // scan→boot→brand→exit
  const [lines, setLines]     = useState([]);
  const [exiting, setExiting] = useState(false);
  const timers                = useRef([]);

  const t = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  useEffect(() => {
    // Phase 1 — scan completes at ~600ms
    t(() => setPhase('boot'), 600);

    // Phase 2 — boot lines appear
    let delay = 650;
    BOOT.forEach((line, i) => {
      t(() => setLines(prev => [...prev, line]), delay);
      delay += i === 0 ? 200 : 280;
    });

    // Phase 3 — brand reveal
    t(() => setPhase('brand'), delay + 150);

    // Phase 4 — exit
    t(() => {
      setExiting(true);
      t(onComplete, 750);
    }, delay + 1700);

    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: BG,
      zIndex: 10000, overflow: 'hidden',
    }}>
      <NeonGrid />
      <CornerBrackets />

      {/* ── scanline sweep ── */}
      {phase === 'scan' && <Scanline />}

      {/* ── radial glow ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(34,255,102,0.06) 0%, transparent 100%)',
      }} />

      {/* ── boot terminal ── */}
      <AnimatePresence>
        {phase === 'boot' && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            style={{
              position: 'absolute', inset: 0, zIndex: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <div style={{ width: '520px', maxWidth: '88vw' }}>
              {/* terminal header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '1.2rem', paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(34,255,102,0.15)',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,80,80,0.7)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,200,0,0.7)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(34,255,102,0.7)' }} />
                <span style={{
                  fontFamily: MONO, fontSize: '0.6rem',
                  letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)',
                  marginLeft: '8px',
                }}>
                  GOG-NEXUS — /boot/init.sh
                </span>
              </div>

              {/* lines */}
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start',
                    gap: '10px', marginBottom: '0.42rem',
                  }}
                >
                  {/* status icon */}
                  <span style={{
                    fontFamily: MONO,
                    fontSize: '0.65rem',
                    color: line.ok ? GREEN : (line.highlight ? GREEN : 'rgba(255,255,255,0.35)'),
                    marginTop: '1px', flexShrink: 0,
                  }}>
                    {line.ok ? '✓' : (line.highlight ? '▶' : '·')}
                  </span>
                  <p style={{
                    fontFamily: MONO,
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em',
                    lineHeight: 1.6,
                    margin: 0,
                    color: line.highlight
                      ? GREEN
                      : line.ok
                        ? 'rgba(34,255,102,0.65)'
                        : 'rgba(255,255,255,0.38)',
                    ...(line.highlight ? {
                      textShadow: `0 0 12px rgba(34,255,102,0.5)`,
                    } : {}),
                  }}>
                    {line.text}
                  </p>
                </motion.div>
              ))}

              {/* cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.85 }}
                style={{ fontFamily: MONO, fontSize: '0.68rem', color: GREEN }}
              >
                _
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── brand reveal ── */}
      <AnimatePresence>
        {phase === 'brand' && !exiting && (
          <motion.div
            key="brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 25,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0',
            }}
          >
            {/* hex logo */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: '1.8rem' }}
            >
              <HexLogo />
            </motion.div>

            {/* wordmark */}
            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: BODY,
                fontWeight: 800,
                fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                letterSpacing: '-0.01em',
                margin: 0,
                background: `linear-gradient(135deg, #ffffff 40%, ${GREEN} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 28px rgba(34,255,102,0.28))`,
              }}
            >
              GEEKS OF GURUKUL
            </motion.h1>

            {/* sub label */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.22 }}
              style={{
                fontFamily: MONO,
                fontSize: 'clamp(0.6rem, 1.2vw, 0.78rem)',
                letterSpacing: '0.5em',
                color: 'rgba(34,255,102,0.55)',
                margin: '0.9rem 0 2.4rem',
              }}
            >
              NEXUS PLATFORM
            </motion.p>

            {/* entering line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 0.9, delay: 0.35, ease: 'easeInOut' }}
              style={{
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
                marginBottom: '1.4rem',
                boxShadow: `0 0 8px rgba(34,255,102,0.4)`,
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              style={{
                fontFamily: MONO,
                fontSize: '0.62rem',
                letterSpacing: '0.35em',
                color: 'rgba(255,255,255,0.28)',
              }}
            >
              ENTERING PLATFORM
            </motion.p>

            {/* animated dots */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '1.2rem' }}>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    repeat: Infinity, duration: 1.2,
                    delay: i * 0.2, ease: 'easeInOut',
                  }}
                  style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: GREEN,
                    boxShadow: `0 0 8px ${GREEN}`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── iris collapse exit ── */}
      <AnimatePresence>
        {exiting && (
          <>
            {/* horizontal bars pinch to center */}
            <motion.div
              key="top-bar"
              initial={{ height: 0 }}
              animate={{ height: '50vh' }}
              exit={{}}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                background: BG, zIndex: 50,
              }}
            />
            <motion.div
              key="bottom-bar"
              initial={{ height: 0 }}
              animate={{ height: '50vh' }}
              exit={{}}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: BG, zIndex: 50,
              }}
            />
            {/* neon seam line at center */}
            <motion.div
              key="seam"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.65, times: [0, 0.4, 1] }}
              style={{
                position: 'absolute', top: '50%', left: 0, right: 0,
                height: '2px', marginTop: '-1px',
                background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
                boxShadow: `0 0 16px rgba(34,255,102,0.7)`,
                zIndex: 55,
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
