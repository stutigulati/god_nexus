import React from 'react';

const STATUS_CONFIGS = {
  LIVE: {
    text: 'SYS_STATUS - LIVE',
    color: 'text-neon-green',
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/30',
    glow: 'shadow-[0_0_10px_rgba(34,255,102,0.3)]',
    dotColor: 'bg-neon-green animate-pulse'
  },
  VERIFIED: {
    text: 'INTEGRITY - VERIFIED',
    color: 'text-neon-emerald',
    bg: 'bg-neon-emerald/10',
    border: 'border-neon-emerald/30',
    glow: 'shadow-[0_0_10px_rgba(0,255,136,0.3)]',
    dotColor: 'bg-neon-emerald animate-ping'
  },
  SYNCING: {
    text: 'DB_SYNC - RUNNING',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/30',
    glow: 'shadow-[0_0_10px_rgba(34,211,238,0.3)]',
    dotColor: 'bg-cyan-400 animate-spin'
  },
  PROCESSING: {
    text: 'THREAD_EXEC - BUSY',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30',
    glow: 'shadow-[0_0_10px_rgba(250,204,21,0.3)]',
    dotColor: 'bg-yellow-400 animate-pulse'
  },
  SECURED: {
    text: 'BLOCKCHAIN - SECURED',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/30',
    glow: 'shadow-[0_0_10px_rgba(192,132,252,0.3)]',
    dotColor: 'bg-purple-400'
  },
  ANALYZING: {
    text: 'AI_MODEL - INFERENCE',
    color: 'text-neon-green',
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/30',
    glow: 'shadow-[0_0_10px_rgba(34,255,102,0.3)]',
    dotColor: 'bg-neon-green animate-ping'
  },
  DEPLOYED: {
    text: 'CLOUD - DEPLOYED',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30',
    glow: 'shadow-[0_0_10px_rgba(96,165,250,0.3)]',
    dotColor: 'bg-blue-400 animate-pulse'
  }
};

export default function StatusBadge({ status = 'LIVE', className = '' }) {
  const config = STATUS_CONFIGS[status.toUpperCase()] || STATUS_CONFIGS.LIVE;

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded border glass-panel font-mono text-xs uppercase tracking-widest ${config.color} ${config.bg} ${config.border} ${config.glow} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      <span>{config.text}</span>
    </div>
  );
}
