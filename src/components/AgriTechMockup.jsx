import React, { useState, useEffect } from 'react';
import { Sprout, CloudSun, DollarSign, MessageSquare, AlertCircle, Scan, Cpu } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function AgriTechMockup() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [npkData, setNpkData] = useState({ N: 68, P: 42, K: 50 });
  const [mandiPrices, setMandiPrices] = useState([
    { crop: 'WHEAT', price: '₹2,450/q', change: '+2.4%' },
    { crop: 'PADDY', price: '₹2,180/q', change: '+1.8%' },
    { crop: 'MUSTARD', price: '₹5,600/q', change: '-0.5%' },
    { crop: 'COTTON', price: '₹7,200/q', change: '+4.1%' }
  ]);

  const runCropScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        health: '94%',
        diagnosis: 'LEAF RUST NEGATIVE - OPTIMAL',
        action: 'APPLY NITROGEN STAGED WATERING',
        moisture: '18.4%'
      });
      setNpkData({ N: 72, P: 44, K: 51 });
    }, 2000);
  };

  return (
    <div className="w-full relative glass-panel rounded-xl overflow-hidden shadow-2xl border border-cyber-border/40 bg-black/60 font-sans">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#050b08] border-b border-cyber-border/30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-green/80" />
          <span className="w-2 text-[10px] text-cyber-text tracking-widest font-mono">AGRICONNECT - INTEL_CORE v1.2</span>
        </div>
        <StatusBadge status={isScanning ? 'ANALYZING' : 'LIVE'} />
      </div>

      {/* Main Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Side: Holographic Scanner Display */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <div className="text-xs font-mono text-neon-green/80 flex items-center justify-between">
            <span>AI_CROP_DIAGNOSTICS</span>
            <span>GRID_SCAN_LENS</span>
          </div>

          <div className="relative aspect-video rounded-lg border border-cyber-border/40 bg-[#020703] overflow-hidden flex items-center justify-center">
            {/* Holographic grid and concentric circles */}
            <div className="cyber-grid opacity-20 absolute inset-0 pointer-events-none" />
            <div className="tech-orbit w-32 h-32 border-neon-green/20 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="tech-orbit w-48 h-48 border-dashed border-neon-green/10 animate-spin" style={{ animationDuration: '40s' }} />
            
            {/* Leaf/Sprout Icon inside Holographic Lens */}
            <div className={`p-4 rounded-full relative z-10 transition-all ${
              isScanning ? 'scale-110 text-neon-green animate-pulse' : 'text-neon-emerald'
            }`}>
              <Sprout className="w-16 h-16 filter drop-shadow-[0_0_12px_currentColor]" />
            </div>

            {/* AI Scan line */}
            {isScanning && (
              <div className="absolute left-0 w-full h-0.5 bg-neon-green shadow-[0_0_8px_#22ff66] hologram-scanner" />
            )}

            {/* Scan Overlay Tags */}
            <div className="absolute top-2 left-2 font-mono text-[9px] text-cyber-text/80 bg-black/60 px-1.5 py-0.5 rounded border border-cyber-border/20">
              COORD - 28.6139° N, 77.2090° E
            </div>
            <div className="absolute bottom-2 right-2 font-mono text-[9px] text-neon-green bg-black/60 px-1.5 py-0.5 rounded border border-neon-green/20">
              {isScanning ? 'CALIBRATING...' : 'SCANNER_READY'}
            </div>
          </div>

          <button
            onClick={runCropScan}
            disabled={isScanning}
            className="w-full py-2.5 bg-neon-emerald/10 border border-neon-emerald/30 rounded text-xs font-mono text-neon-emerald font-bold tracking-widest hover:bg-neon-emerald/20 transition-all cursor-pointer active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Scan className="w-4 h-4" />
            {isScanning ? 'ANALYZING CROP GENOME...' : 'TRIGGER DIAGNOSTIC SCAN'}
          </button>
        </div>

        {/* Right Side: Mandi Prices, Weather and Health Results */}
        <div className="md:col-span-6 flex flex-col gap-4">
          {/* NPK Dashboard & Scan results */}
          <div className="p-4 bg-black/40 border border-cyber-border/20 rounded-lg flex-1 flex flex-col justify-between font-mono">
            {scanResult ? (
              <div className="space-y-2">
                <span className="text-[10px] text-neon-green/80 block">HEALTH_REPORT_GENERATED</span>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white">CROP HEALTH STATUS:</span>
                  <span className="text-neon-emerald font-bold text-sm bg-neon-green/10 px-2 py-0.5 rounded border border-neon-green/20">
                    {scanResult.health} EXCELLENT
                  </span>
                </div>
                <div className="p-2.5 rounded bg-neon-green/5 border border-neon-green/15 text-[10px] space-y-1">
                  <p className="text-white font-semibold">DIAGNOSIS: {scanResult.diagnosis}</p>
                  <p className="text-cyber-text">ACTION: {scanResult.action}</p>
                  <p className="text-cyber-text">LEAF MOISTURE: {scanResult.moisture}</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-3 text-cyber-text/70">
                <AlertCircle className="w-8 h-8 text-cyber-border mb-2" />
                <span className="text-[11px]">NO ACTIVE SCANS - TRIGGER LEFT SCANNER TO PULL CROP INTELLIGENCE</span>
              </div>
            )}

            {/* N-P-K Soil Matrix Indicators */}
            <div className="mt-4 pt-3 border-t border-cyber-border/20">
              <span className="text-[9px] text-cyber-text/60 block mb-2 tracking-widest">SOIL_CHEMICAL_RATIO (NPK)</span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-1.5 rounded bg-[#050b08] border border-cyber-border/30">
                  <span className="text-cyber-text block text-[9px]">NITROGEN</span>
                  <span className="text-white font-bold block mt-0.5">{npkData.N}%</span>
                </div>
                <div className="p-1.5 rounded bg-[#050b08] border border-cyber-border/30">
                  <span className="text-cyber-text block text-[9px]">PHOSPHORUS</span>
                  <span className="text-white font-bold block mt-0.5">{npkData.P}%</span>
                </div>
                <div className="p-1.5 rounded bg-[#050b08] border border-cyber-border/30">
                  <span className="text-cyber-text block text-[9px]">POTASSIUM</span>
                  <span className="text-white font-bold block mt-0.5">{npkData.K}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mandi Ticker Widget */}
          <div className="bg-[#050b08] border border-cyber-border/30 rounded-lg p-3 font-mono">
            <span className="text-[9px] text-cyber-text/50 block tracking-widest uppercase mb-1.5">
              LIVE_AGRI_MANDI_TICKER (DELHI_NCR)
            </span>
            <div className="flex gap-4 overflow-x-auto scrollbar-none py-1">
              {mandiPrices.map((m, idx) => (
                <div key={idx} className="flex-shrink-0 bg-black/60 px-2.5 py-1 rounded border border-cyber-border/20 text-[10px] flex items-center gap-2">
                  <span className="text-white font-bold">{m.crop}</span>
                  <span className="text-cyber-text">{m.price}</span>
                  <span className={m.change.startsWith('+') ? 'text-neon-green' : 'text-red-500'}>
                    {m.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
