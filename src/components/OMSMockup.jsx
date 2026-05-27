import React, { useState, useEffect } from 'react';
import { Kanban, MessageSquare, Play, RefreshCw, Layers, Calendar, CheckSquare } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function OMSMockup() {
  const [sprintState, setSprintState] = useState('active');
  const [tasks, setTasks] = useState([
    { id: 'OMS-101', title: 'FINE_TUNE_LLM_HYPERPARAMETERS', status: 'done', owner: 'ARJUN K.' },
    { id: 'OMS-102', title: 'DEPLOY_BLOCKCHAIN_CERTIFICATE_SMART_CONTRACT', status: 'progress', owner: 'NEHA S.' },
    { id: 'OMS-103', title: 'INTEGRATE_AGRI_MANDI_DATA_STREAM', status: 'todo', owner: 'RAVI R.' }
  ]);
  const [meetingLog, setMeetingLog] = useState('AI MEETING ASSISTANT: Meeting recording captured. generating automated MOM transcript...');
  const [percentComplete, setPercentComplete] = useState(65);

  const runSprintShift = () => {
    setSprintState('shifting');
    setMeetingLog('AI ENGINE - EXPORTING SPRINT METRICS...');
    
    setTimeout(() => {
      setTasks(prev => 
        prev.map(t => {
          if (t.id === 'OMS-102') return { ...t, status: 'done' };
          if (t.id === 'OMS-103') return { ...t, status: 'progress' };
          return t;
        })
      );
      setPercentComplete(85);
      setMeetingLog('AI ENGINE - SPRINT SHIFT COMPLETED. Task #OMS-102 is now DEPLOYED. Task #OMS-103 shifted to IN_PROGRESS.');
      setSprintState('active');
    }, 1800);
  };

  return (
    <div className="w-full relative glass-panel rounded-xl overflow-hidden shadow-2xl border border-cyber-border/40 bg-black/60 font-sans">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#050b08] border-b border-cyber-border/30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-green/80" />
          <span className="w-2 text-[10px] text-cyber-text tracking-widest font-mono">OMS - ENTERPRISE_FLOW v1.9</span>
        </div>
        <StatusBadge status={sprintState === 'shifting' ? 'SYNCING' : 'LIVE'} />
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono">
        {/* Left Panel: Kanban Task Board */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="text-xs text-neon-green/80 flex items-center justify-between">
            <span>ACTIVE_SPRINT_BOARD</span>
            <span>VELOCITY - 42 PTS</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* TODO COLUMN */}
            <div className="bg-[#020703]/80 p-3 rounded border border-cyber-border/30 min-h-[170px] flex flex-col gap-2">
              <span className="text-[9px] text-cyber-text/50 tracking-wider block border-b border-cyber-border/20 pb-1.5 uppercase">TODO</span>
              {tasks.filter(t => t.status === 'todo').map(task => (
                <div key={task.id} className="p-2.5 rounded bg-black/60 border border-cyber-border/20 text-[10px] space-y-1.5">
                  <span className="text-cyan-400 block font-bold">{task.id}</span>
                  <p className="text-white text-[9px] leading-tight truncate">{task.title}</p>
                  <span className="text-cyber-text/60 text-[8px] block">OWNER: {task.owner}</span>
                </div>
              ))}
              {tasks.filter(t => t.status === 'todo').length === 0 && (
                <div className="flex-1 flex items-center justify-center text-center text-[9px] text-cyber-text/30 italic">COLUMN_EMPTY</div>
              )}
            </div>

            {/* IN PROGRESS COLUMN */}
            <div className="bg-[#020703]/80 p-3 rounded border border-cyber-border/30 min-h-[170px] flex flex-col gap-2 relative overflow-hidden">
              {sprintState === 'shifting' && (
                <div className="absolute inset-0 bg-neon-green/5 animate-pulse flex items-center justify-center z-10">
                  <span className="text-[8px] text-neon-green tracking-widest font-bold animate-ping">SHIFTING_CARDS...</span>
                </div>
              )}
              <span className="text-[9px] text-yellow-400 tracking-wider block border-b border-cyber-border/20 pb-1.5 uppercase">PROGRESS</span>
              {tasks.filter(t => t.status === 'progress').map(task => (
                <div key={task.id} className="p-2.5 rounded bg-yellow-500/5 border border-yellow-500/30 text-[10px] space-y-1.5">
                  <span className="text-yellow-400 block font-bold">{task.id}</span>
                  <p className="text-white text-[9px] leading-tight truncate">{task.title}</p>
                  <span className="text-cyber-text/60 text-[8px] block">OWNER: {task.owner}</span>
                </div>
              ))}
            </div>

            {/* DONE COLUMN */}
            <div className="bg-[#020703]/80 p-3 rounded border border-cyber-border/30 min-h-[170px] flex flex-col gap-2">
              <span className="text-[9px] text-neon-green tracking-wider block border-b border-cyber-border/20 pb-1.5 uppercase">COMPLETED</span>
              {tasks.filter(t => t.status === 'done').map(task => (
                <div key={task.id} className="p-2.5 rounded bg-neon-green/5 border border-neon-green/30 text-[10px] space-y-1.5">
                  <span className="text-neon-emerald block font-bold">{task.id}</span>
                  <p className="text-white text-[9px] leading-tight line-through truncate">{task.title}</p>
                  <span className="text-cyber-text/60 text-[8px] block">OWNER: {task.owner}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={runSprintShift}
            disabled={sprintState === 'shifting'}
            className="w-full py-2.5 bg-neon-green/10 border border-neon-green/40 text-neon-green font-bold text-xs tracking-widest rounded hover:bg-neon-green/20 transition-all cursor-pointer active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${sprintState === 'shifting' ? 'animate-spin' : ''}`} />
            {sprintState === 'shifting' ? 'AI_PIPELINE_SYNCHRONIZING...' : 'SHIFT SPRINT / TRIGGER COMPLETE'}
          </button>
        </div>

        {/* Right Panel: Operations & Productivity */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Progress Tracker Dial */}
          <div className="p-4 bg-black/40 border border-cyber-border/20 rounded-lg flex flex-col gap-3">
            <span className="text-[9px] text-cyber-text/60 tracking-widest block uppercase">SPRINT_VELOCITY_TRACKER</span>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white">SPRINT #28 SUCCESS:</span>
              <span className="text-xs text-neon-emerald font-bold">{percentComplete}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#050b08] rounded overflow-hidden">
              <div 
                className="h-full bg-neon-green transition-all duration-500 shadow-[0_0_8px_#22ff66]"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <span className="text-[9px] text-cyber-text/50 leading-relaxed block mt-1">
              * Sprint #28 target is 80% to authorize decentralized governance deployment.
            </span>
          </div>

          {/* AI Meeting Transcript Box */}
          <div className="p-4 bg-black/40 border border-cyber-border/20 rounded-lg flex-1 flex flex-col justify-between">
            <span className="text-[9px] text-cyan-400 tracking-widest block uppercase mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> AI_MEETING_TRANSCRIPT
            </span>
            <div className="p-2.5 bg-[#050b08] rounded border border-cyber-border/30 text-[10px] text-white/90 leading-relaxed min-h-[70px] overflow-y-auto">
              {meetingLog}
            </div>
            <div className="flex justify-between items-center text-[9px] text-cyber-text mt-3 pt-2.5 border-t border-cyber-border/20">
              <span>MOM - INFERENCE_OK</span>
              <span className="text-neon-green underline cursor-pointer">EXPORT MINUTES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
