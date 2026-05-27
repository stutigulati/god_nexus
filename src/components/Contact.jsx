import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal as TerminalIcon, ShieldAlert, Wifi, Cpu, Layers, CheckCircle2, RefreshCw } from 'lucide-react';

// System Terminal Panel Component
function TerminalPanel() {
  const [logs, setLogs] = useState([]);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const logContainerRef = useRef(null);

  const rawLogs = [
    'root@gog_infra:~# init secure_transmission_channel --secure',
    'SYS - ENCRYPTING HANDSHAKE OVERRIDE... OK',
    'SECURE_TUNNEL - PINPOINTING P2P ROUTING PATHS...',
    'NET - CONNECTING TO DISTRIBUTED BHARAT NODES...',
    'LEDGER - RESOLVING COMPLIANCE MUTATION INTEGRITY...',
    'SYS - HANDSHAKE SYNCHRONIZATION: STABILIZED',
    'SECURITY_SHIELD - SHA-256 E2EE ESTABLISHED',
    'TUNNEL - PORTAL STANDING BY FOR TRANSMISSION SIGNAL...'
  ];

  useEffect(() => {
    if (activeLogIndex < rawLogs.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, rawLogs[activeLogIndex]]);
        setActiveLogIndex(prev => prev + 1);
      }, activeLogIndex === 0 ? 500 : Math.random() * 800 + 400);
      return () => clearTimeout(timer);
    } else {
      // Loop logs after standing standby
      const loopTimer = setTimeout(() => {
        setLogs([rawLogs[0]]);
        setActiveLogIndex(1);
      }, 10000);
      return () => clearTimeout(loopTimer);
    }
  }, [activeLogIndex]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div
      whileHover={{ y: -4, borderColor: 'rgba(34, 255, 102, 0.4)' }}
      transition={{ duration: 0.4 }}
      className="relative glass-panel rounded-2xl p-6 border border-cyber-border/40 bg-black/60 overflow-hidden flex flex-col justify-between h-[460px] shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] group"
    >
      {/* Scanline overlay */}
      <div className="scanline absolute inset-0 pointer-events-none opacity-20" />
      <div className="cyber-grid opacity-10 absolute inset-0 pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-cyber-border/30 pb-3.5 mb-4">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-neon-green" />
          <span className="font-mono text-[10px] text-white/90 tracking-widest font-black uppercase">
            // TELEMETRY_CONSOLE v4.0.8
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
          <span className="font-mono text-[8px] text-neon-green uppercase font-bold tracking-widest">
            TUNNEL_READY
          </span>
        </div>
      </div>

      {/* Scrolling Log Output */}
      <div 
        ref={logContainerRef}
        className="flex-1 font-mono text-[10px] space-y-2.5 overflow-y-auto max-h-[285px] pr-2 scrollbar-thin text-cyber-text"
      >
        {logs.map((log, index) => {
          const isCommand = log.startsWith('root@');
          const isOk = log.includes('OK') || log.includes('STABILIZED') || log.includes('ESTABLISHED');
          return (
            <div key={index} className={`leading-relaxed pl-2 border-l-2 ${
              isCommand 
                ? 'border-neon-emerald text-neon-emerald bg-neon-green/5 py-0.5' 
                : isOk 
                ? 'border-neon-green text-white font-semibold' 
                : 'border-cyber-border text-cyber-text/80'
            }`}>
              {log}
            </div>
          );
        })}
        {/* Blinking Cursor */}
        <div className="flex items-center gap-1 pl-2">
          <span className="text-neon-green font-bold">&gt;</span>
          <span className="w-1.5 h-3 bg-neon-green animate-[blink_1.2s_step-start_infinite] shadow-[0_0_6px_#22ff66]" />
        </div>
      </div>

      {/* Graphic Diagnostic overlay */}
      <div className="mt-6 pt-4 border-t border-cyber-border/20 flex items-center justify-between font-mono text-[8px] text-cyber-text/50">
        <div>
          <span className="block text-white/60 font-bold">LATENCY_WAVEFORM</span>
          <div className="flex items-end gap-0.5 h-6 mt-1.5">
            {[30, 60, 45, 80, 50, 70, 95, 60, 40, 55].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [`${h * 0.7}%`, `${h}%`, `${h * 0.7}%`] }}
                transition={{ duration: 1.5 + (i * 0.1), repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 bg-neon-green/30 rounded-sm"
              />
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="block font-bold text-neon-green">E2EE SHIELD</span>
          <span className="block text-[7px] text-cyber-text/30 mt-1">SSL - SHA256_ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
}

// Custom Input Field
function InputField({ label, name, type = 'text', value, onChange, placeholder, required = true }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 w-full font-mono relative">
      <span className="text-[10px] text-white font-extrabold tracking-widest uppercase select-none">
        {label}
      </span>
      <div className="relative w-full">
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows="3"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="w-full bg-transparent text-xs text-white p-2.5 pl-0 focus:outline-none resize-none font-mono tracking-wide placeholder-cyber-text/30 leading-relaxed"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="w-full bg-transparent text-xs text-white py-2.5 pl-0 focus:outline-none font-mono tracking-wide placeholder-cyber-text/30"
          />
        )}
        
        {/* Glow focus line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyber-border/40" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: focused ? '100%' : '0%' }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute bottom-0 left-0 h-[1.5px] bg-neon-green shadow-[0_0_10px_#22ff66]"
        />
      </div>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', org: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, transmitting, success
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('transmitting');
    setProgress(0);

    // Simulate encryption and broadcasting cycles
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStatus('success');
      }
    }, 180);
  };

  return (
    <section id="contact" className="relative py-24 px-4 md:px-12 bg-[#020703] overflow-hidden border-b border-cyber-border/20 select-none">
      
      {/* Ambient background glows */}
      <div className="cyber-grid opacity-15 absolute inset-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-neon-green/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Decorative Rotating Tech Circles */}
      <div className="absolute -right-24 top-12 w-64 h-64 border border-dashed border-cyber-border/10 rounded-full animate-spin pointer-events-none -z-10" style={{ animationDuration: '80s' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 relative">
          
          <span className="font-mono text-xs text-neon-green tracking-[0.25em] block mb-3 uppercase select-none">
            CONTACT_PORTAL
          </span>
          
          <h2 className="text-4xl md:text-6xl font-cyber font-black tracking-tight text-white uppercase mb-4 leading-none select-none">
            BUILD THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-emerald text-neon-glow">IMPOSSIBLE</span>
          </h2>
          
          <p className="text-cyber-text text-sm md:text-base font-mono max-w-xl mx-auto select-none">
            Ready to engineer your next flagship platform? Send us a secure transmission signal.
          </p>
        </div>

        {/* Form & Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto relative z-10">
          
          {/* Left Side: System Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center animate-height"
          >
            <div className="flex flex-col gap-1.5 mb-2 font-mono text-[9px] text-white/70 font-bold uppercase pl-1 select-none">
              <span>SYSTEM_FEED_DASHBOARD</span>
            </div>
            <TerminalPanel />
          </motion.div>

          {/* Right Side: Transmission Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center animate-height"
          >
            <div className="flex flex-col gap-1.5 mb-2 font-mono text-[9px] text-white/70 font-bold uppercase pl-1 select-none">
              <span>SECURE_PACKET_MINTING_PANEL</span>
            </div>
            
            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(34, 255, 102, 0.4)' }}
              transition={{ duration: 0.4 }}
              className="relative glass-panel rounded-2xl p-6 md:p-8 border border-cyber-border/40 bg-[#050b08]/80 h-[460px] shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              <div className="cyber-grid opacity-10 absolute inset-0 pointer-events-none" />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex-1 flex flex-col items-center justify-center text-center gap-5 py-12"
                  >
                    <div className="p-4 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green shadow-[0_0_20px_rgba(34,255,102,0.2)] animate-bounce">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <div className="space-y-2 font-mono">
                      <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">
                        TRANSMISSION_BROADCASTED
                      </h4>
                      <p className="text-cyber-text/80 font-sans text-xs leading-relaxed max-w-sm mx-auto">
                        Your secure message block has been encrypted and committed onto our operational backlog. Our tech engineers will return your signal shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFormData({ name: '', org: '', email: '', message: '' });
                        setStatus('idle');
                      }}
                      className="px-4 py-2 border border-cyber-border/40 hover:border-neon-green/40 rounded font-mono text-[10px] text-cyber-text hover:text-neon-green transition-all cursor-pointer font-bold select-none active:scale-95"
                    >
                      RESET_SIGNAL_FLOW
                    </button>
                  </motion.div>
                ) : status === 'transmitting' ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex-1 flex flex-col items-center justify-center text-center gap-4 py-16"
                  >
                    <RefreshCw className="w-8 h-8 text-neon-green animate-spin" />
                    <div className="space-y-1.5 font-mono">
                      <h4 className="text-xs font-bold text-neon-green tracking-widest uppercase animate-pulse">
                        BROADCASTING_ENCRYPTED_PACKETS...
                      </h4>
                      <span className="text-[9px] text-cyber-text/50 uppercase tracking-wider block">
                        progress: {progress}% - WRITING_ON_TIMELINE
                      </span>
                    </div>
                    <div className="w-48 h-1 bg-[#020703] border border-cyber-border/30 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-green shadow-[0_0_8px_#22ff66]" style={{ width: `${progress}%` }} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5 flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField
                          label="IDENTIFIER"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="ENTER YOUR NAME"
                        />
                        <InputField
                          label="ORGANIZATION_NODE"
                          name="org"
                          value={formData.org}
                          onChange={handleChange}
                          placeholder="ENTER INSTITUTION / STARTUP"
                        />
                      </div>
                      <InputField
                        label="CONTACT_CHANNEL"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ENTER SECURE EMAIL ADDRESS"
                      />
                      <InputField
                        label="TRANSMISSION_SIGNAL"
                        name="message"
                        type="textarea"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="TRANSMIT YOUR PLATFORM SCHEMATICS / INQUIRY..."
                      />
                    </div>

                    <div className="space-y-2 mt-2">
                      <span className="font-mono text-[9px] text-white/70 font-bold uppercase tracking-widest pl-1 block">
                        READY_TO_TRANSMIT
                      </span>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01, boxShadow: '0 0 25px rgba(34, 255, 102, 0.4)' }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full flex items-center justify-center gap-2 py-3 text-xs font-mono font-bold tracking-[0.25em] text-black bg-gradient-to-r from-neon-emerald via-neon-green to-neon-emerald rounded-lg cursor-pointer shadow-[0_0_15px_rgba(34,255,102,0.25)] select-none transition-all duration-300"
                      >
                        <Send className="w-4 h-4" />
                        INITIATE SECURE TRANSMISSION
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
