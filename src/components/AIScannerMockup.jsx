import React, { useState, useEffect } from 'react';
import { Brain, FileSpreadsheet, Percent, AlertCircle, Edit3, ArrowRight, Play } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function AIScannerMockup() {
  const [grading, setGrading] = useState(false);
  const [gradeProgress, setGradeProgress] = useState(100);
  const [score, setScore] = useState(8.5);
  const [confidence, setConfidence] = useState(96.8);
  const [feedback, setFeedback] = useState('EVALUATION COMPLETE - Student shows high logic depth. Minor equation simplification step omitted in Question 2B.');
  const [ocrText, setOcrText] = useState('Solve: 2x^2 + 5x - 3 = 0. Answer: (2x-1)(x+3)=0 -> x=1/2, x=-3.');

  const triggerGrading = () => {
    setGrading(true);
    setGradeProgress(0);
    setScore(0);
    setConfidence(0);
    setFeedback('AI AGENT INITIALIZING EXAM PARSER...');
    setOcrText('INITIALIZING OCR READERS...');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setGradeProgress(progress);

      if (progress === 30) {
        setOcrText('EXTRACTING HANDWRITING: "Solve: 2x^2 + 5x - 3 = 0..."');
      }
      if (progress === 60) {
        setOcrText('COMPARING TO RUBRIC MODULE #MATH_SEC_A...');
        setFeedback('AI EVALUATING LOGIC STEPS AGAINST ANSWER KEYS...');
      }
      if (progress === 80) {
        setOcrText('EXTRACTED OK - CALCULATING CONFIDENCE FACTOR...');
      }

      if (progress >= 100) {
        clearInterval(interval);
        setGrading(false);
        setScore(9.0);
        setConfidence(98.4);
        setFeedback('EVALUATION COMPLETE - Exact formula derivation matched. Bounding boxes confirmed 100% logic alignment. Excellent response.');
        setOcrText('Solve: 2x^2 + 5x - 3 = 0. Student steps: Factorization verified. Roots x=0.5 and x=-3.0 are mathematically accurate.');
      }
    }, 200);
  };

  return (
    <div className="w-full relative glass-panel rounded-xl overflow-hidden shadow-2xl border border-cyber-border/40 bg-black/60 font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#050b08] border-b border-cyber-border/30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-green/80" />
          <span className="w-2 text-[10px] text-cyber-text tracking-widest font-mono">GRADE_AI - OCR_ENGINE v3.4</span>
        </div>
        <StatusBadge status={grading ? 'ANALYZING' : 'LIVE'} />
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Panel: OCR Bounding Sheet */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="text-xs font-mono text-neon-green/80 flex items-center justify-between">
            <span>ANSWER_SHEET_OCR_SCANNER</span>
            <span>MODEL_CONFIDENCE: {confidence}%</span>
          </div>

          {/* Canvas sheet container */}
          <div className="relative p-4 rounded-lg border border-cyber-border/40 bg-[#020703] overflow-hidden min-h-[180px] font-mono text-xs">
            <div className="cyber-grid opacity-20 absolute inset-0 pointer-events-none" />

            {/* Scanner Line */}
            {grading && (
              <div 
                className="absolute left-0 w-full h-0.5 bg-neon-green shadow-[0_0_8px_#22ff66]" 
                style={{
                  top: `${gradeProgress}%`,
                  transition: 'top 0.2s linear'
                }}
              />
            )}

            {/* Simulated bounding boxes over text */}
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-[9px] px-1 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Q1_BLOCK</span>
                <span className="text-cyber-text/50">EXTRACTED_BOUNDING_BOX:</span>
              </div>
              <div className={`p-3 rounded border transition-all duration-300 ${
                grading ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-neon-green/30 bg-neon-green/5'
              }`}>
                <p className="text-white italic">{ocrText}</p>
                <div className="mt-2 flex justify-between items-center text-[9px] text-cyber-text/70">
                  <span>HASH_VERIFIED - 0x4B3A</span>
                  <span className={grading ? 'text-yellow-400' : 'text-neon-emerald font-bold'}>
                    {grading ? 'SCANNING...' : 'MATCH_FOUND (98.4%)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={triggerGrading}
            disabled={grading}
            className="w-full py-2.5 bg-neon-green/10 border border-neon-green/40 text-neon-green font-bold text-xs tracking-widest font-mono rounded hover:bg-neon-green/20 transition-all cursor-pointer active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5" />
            {grading ? 'RUNNING OCR ENGINE...' : 'START GRADING PROCESS'}
          </button>
        </div>

        {/* Right Panel: Grading & Reports Panel */}
        <div className="md:col-span-5 flex flex-col gap-4 font-mono">
          <div className="p-4 bg-black/40 border border-cyber-border/20 rounded-lg flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-[10px] text-cyber-text/60 mb-2">
                <span>SCORING_MATRIX</span>
                <span>RUBRIC_V1</span>
              </div>

              {/* Huge score indicator */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-white tracking-tight">{score}</span>
                <span className="text-cyber-text/50 text-sm">/ 10 MARKS</span>
              </div>

              {/* Confidence factor bar */}
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-[10px] text-cyber-text">
                  <span>AI_CONFIDENCE_THRESHOLD</span>
                  <span className="text-neon-green">{confidence}%</span>
                </div>
                <div className="w-full h-1 bg-[#050b08] rounded overflow-hidden">
                  <div 
                    className="h-full bg-neon-green transition-all duration-500 shadow-[0_0_8px_#22ff66]" 
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>

              {/* AI Written Feedback */}
              <div className="space-y-1">
                <span className="text-[10px] text-cyber-text/60 tracking-wider block">AUTO_FEEDBACK_TRANSCRIPT</span>
                <div className="p-2.5 bg-[#050b08] rounded border border-cyber-border/30 text-[10px] text-white/90 leading-relaxed min-h-[60px]">
                  {feedback}
                </div>
              </div>
            </div>

            {/* Rubric metrics */}
            <div className="mt-3 pt-3 border-t border-cyber-border/20 text-[9px] text-cyber-text/80 space-y-1.5">
              <div className="flex justify-between">
                <span>MATHEMATICAL_STEPS:</span>
                <span className="text-neon-emerald">COMPLIANT (5/5)</span>
              </div>
              <div className="flex justify-between">
                <span>ROOT_VERIFICATION:</span>
                <span className="text-neon-emerald">COMPLIANT (4/4)</span>
              </div>
              <div className="flex justify-between text-[10px] text-cyan-400 pt-1">
                <span>FINAL_REPORT_STATUS:</span>
                <span>READY_FOR_EXPORT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
