import React, { useState, useEffect, useRef } from 'react';
import { Shield, FileText, CheckCircle2, AlertTriangle, Cpu, Link, RefreshCw } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function BlockchainVerificationMockup() {
  const [status, setStatus] = useState('VERIFIED');
  const [isTampered, setIsTampered] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(100);
  const [logs, setLogs] = useState([
    'SYS - NODE_RUNNER INITIALIZED',
    'NET - BROADCASTING STATE 0x8a92...a3e2',
    'LEDGER - HEAD BLOCK 2,492,109 DEPLOYED'
  ]);
  const logContainerRef = useRef(null);

  const triggerVerification = (tamperState = false) => {
    setAnimating(true);
    setVerificationProgress(0);
    setStatus('SYNCING');
    
    // Reset logs
    const initialLogs = [
      'SYS - NODE_RUNNER REBOOTING',
      tamperState 
        ? 'ALERT - RE-VERIFYING LEDGER WITH SECURITY_OVERRIDE_ENABLED' 
        : 'NET - SOLVING BLOCK HASH 0x4df9c3...20ab'
    ];
    setLogs(initialLogs);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setVerificationProgress(progress);
      
      if (progress === 30) {
        setLogs(prev => [...prev, 'LEDGER - DECRYPTING DEGREE SIGNATURES...']);
      }
      if (progress === 60) {
        setLogs(prev => [...prev, tamperState 
          ? 'CRITICAL - BLOCK #2492109 MD5 SIGNATURE MISMATCH DETECTED' 
          : 'NET - CONSENSUS REACHED (99.8% NODES VERIFIED)']);
      }
      if (progress === 80) {
        setLogs(prev => [...prev, tamperState 
          ? 'SYS - SHIELD_PROTOCOL INITIATING QUARANTINE' 
          : 'SYS - BROADCASTING MUTATION HASH TO P2P ROUTER']);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setAnimating(false);
        setIsTampered(tamperState);
        setStatus(tamperState ? 'PROCESSING' : 'VERIFIED');
        setLogs(prev => [
          ...prev, 
          tamperState 
            ? 'INTEGRITY_FAIL - SECURE VERIFICATION FLAGGED TAMPERED DOCUMENT'
            : 'SUCCESS - IMPRINT WRITTEN ONTO IMMUTABLE LEDGER'
        ]);
      }
    }, 250);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full relative glass-panel rounded-xl overflow-hidden shadow-2xl border border-cyber-border/40 bg-black/60">
      {/* Top Cyber Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#050b08] border-b border-cyber-border/30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="font-mono text-[10px] text-cyber-text tracking-wider ml-2">CORE_LEDGER_SYSTEM v4.0.2</span>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Mockup Interactive Upload and Certificate Status */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="text-xs font-mono text-neon-green/80 flex items-center justify-between">
            <span>CREDENTIAL_INTEGRITY_INDEX</span>
            <span>SHIELD_V4.9</span>
          </div>

          {/* Interactive Certificate View */}
          <div className={`relative p-5 rounded-lg border transition-all duration-500 overflow-hidden ${
            isTampered 
              ? 'bg-red-950/20 border-red-500/40 glow-shadow-red' 
              : 'bg-neon-green/5 border-neon-green/20 glow-shadow-green'
          }`}>
            {/* Grid overlay */}
            <div className="cyber-grid opacity-30 absolute inset-0 pointer-events-none" />

            {/* Scanner Animation Line */}
            {animating && (
              <div className={`absolute w-full left-0 h-0.5 z-10 ${
                isTampered ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-neon-green shadow-[0_0_8px_#22ff66]'
              }`} style={{
                top: `${verificationProgress}%`,
                transition: 'top 0.25s linear'
              }} />
            )}

            <div className="relative flex items-start gap-4">
              <div className={`p-3 rounded-lg ${isTampered ? 'bg-red-950/50 text-red-500' : 'bg-neon-green/10 text-neon-green'}`}>
                <FileText className="w-8 h-8" />
              </div>
              <div className="flex-1 font-mono">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold tracking-wide text-white">DEGREE_HOLDER - RAHUL SHARMA</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${
                    isTampered ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-neon-green/10 text-neon-green border-neon-green/20'
                  }`}>
                    {isTampered ? 'FAILED' : 'LEDGER_OK'}
                  </span>
                </div>
                <p className="text-[11px] text-cyber-text mt-1">INSTITUTION: INDIAN INSTITUTE OF TECHNOLOGY (IIT)</p>
                <p className="text-[10px] text-cyber-text/70 mt-0.5">MAJOR: B.TECH COMPUTER SCIENCE & ENGINEERING</p>
                <div className="mt-4 pt-3 border-t border-cyber-border/30 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-cyber-text/60">BLOCKCHAIN_MUTATION_HASH</p>
                    <p className={`text-[10px] truncate max-w-[190px] font-mono ${isTampered ? 'text-red-400' : 'text-neon-emerald'}`}>
                      {isTampered ? '0xERR_CORRUPT_SIGNATURE_MISMATCH' : '0x8f3c5b9e02c1103f6789e81b2a95c81d2f09a'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-[9px] text-cyber-text/60">STAMP_VALIDATION</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {isTampered ? (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                          <span className="text-[10px] text-red-400 font-bold">TAMPERED</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-neon-emerald" />
                          <span className="text-[10px] text-neon-green font-bold">IMMUTABLE</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons for Interactive Simulation */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            <button
              onClick={() => triggerVerification(false)}
              disabled={animating}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono rounded bg-neon-green/10 border border-neon-green/40 text-neon-green hover:bg-neon-green/20 transition-all cursor-pointer font-bold tracking-wider active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${animating && !isTampered ? 'animate-spin' : ''}`} />
              RE-VERIFY OK
            </button>
            <button
              onClick={() => triggerVerification(true)}
              disabled={animating}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono rounded bg-red-950/20 border border-red-500/40 text-red-400 hover:bg-red-950/40 transition-all cursor-pointer font-bold tracking-wider active:scale-95 disabled:opacity-50"
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${animating && isTampered ? 'animate-pulse' : ''}`} />
              FORCE TAMPER TEST
            </button>
          </div>
        </div>

        {/* Right Side: Blockchain Nodes Connection Log & Chain Timeline */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="text-xs font-mono text-cyan-400 flex items-center justify-between">
            <span>P2P_BLOCKCHAIN_NODES</span>
            <span className="animate-pulse">ACTIVE_PEERS: 8</span>
          </div>

          {/* Block Connection Animation Visual */}
          <div className="flex justify-between items-center bg-[#050b08] p-3 rounded-lg border border-cyber-border/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 to-cyan-500/5 pointer-events-none" />
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-full ${isTampered ? 'bg-red-500/10 text-red-500 border border-red-500/30' : 'bg-neon-green/10 text-neon-green border border-neon-green/30'} ${animating ? 'animate-pulse' : ''}`}>
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono text-cyber-text mt-1">NODE_01</span>
            </div>
            <Link className={`w-4 h-4 text-cyber-border ${animating ? 'animate-pulse text-neon-green' : ''}`} />
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-full ${isTampered ? 'bg-red-500/10 text-red-500 border border-red-500/30' : 'bg-neon-green/10 text-neon-green border border-neon-green/30'} ${animating ? 'animate-pulse' : ''}`}>
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono text-cyber-text mt-1">NODE_02</span>
            </div>
            <Link className={`w-4 h-4 text-cyber-border ${animating ? 'animate-pulse text-neon-green' : ''}`} />
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-full ${isTampered ? 'bg-red-500/10 text-red-500 border border-red-500/30' : 'bg-neon-green/10 text-neon-green border border-neon-green/30'} ${animating ? 'animate-pulse' : ''}`}>
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono text-cyber-text mt-1">NODE_03</span>
            </div>
          </div>

          {/* Scrolling Terminal Node Logs */}
          <div className="flex-1 min-h-[140px] flex flex-col glass-panel rounded-lg overflow-hidden border border-cyber-border/40 font-mono text-[10px] bg-black/80">
            <div className="px-3 py-1.5 bg-[#050b08] border-b border-cyber-border/30 text-[9px] text-cyber-text flex items-center justify-between">
              <span>TERMINAL_LOGS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping" />
            </div>
            <div 
              ref={logContainerRef}
              className="p-3 flex-1 overflow-y-auto space-y-1.5 max-h-[140px] text-cyber-text/90 scrollbar-thin"
            >
              {logs.map((log, index) => (
                <div key={index} className={`leading-relaxed border-l-2 pl-2 ${
                  log.includes('CRITICAL') || log.includes('INTEGRITY_FAIL')
                    ? 'border-red-500 text-red-400 bg-red-950/10'
                    : log.includes('SUCCESS') || log.includes('VERIFIED')
                    ? 'border-neon-emerald text-neon-emerald bg-neon-green/5'
                    : 'border-cyber-border text-cyber-text'
                }`}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
