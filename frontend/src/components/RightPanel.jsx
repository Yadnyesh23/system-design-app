import DecisionCard from "./DecisionCard";

export default function RightPanel({ scenario, currentPhase, selectedPath, onNext, onBack }) {
  
  // RENDER HELPERS
  const renderHeader = (subtitle, title) => (
    <div className="mb-8">
      <span className="text-[10px] font-mono text-purple-500 uppercase tracking-[0.3em]">{subtitle}</span>
      <h2 className="text-2xl font-black text-white mt-2 leading-tight uppercase italic tracking-tighter">{title}</h2>
    </div>
  );

  const renderNavButtons = (nextText = "Proceed") => (
    <div className="mt-10 pt-6 border-t border-white/5 flex gap-4">
      <button 
        onClick={onBack}
        className="flex-1 py-4 border border-white/5 text-[10px] font-mono text-slate-500 uppercase hover:bg-white/5 hover:text-white transition-all"
      >
        {"[ ]"} Step_Back
      </button>
      <button 
        onClick={() => onNext()}
        className="flex-[2] py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all"
      >
        {nextText} {"//"}
      </button>
    </div>
  );

  // --- PHASE CONTENT ---

  if (currentPhase === 1) {
    return (
      <div className="animate-in fade-in duration-500">
        {renderHeader("Gate_01 // Strategy", scenario.phase1.question)}
        <div className="grid gap-4">
          {scenario.phase1.options.map((opt) => (
            <DecisionCard key={opt.id} option={opt} onSelect={onNext} />
          ))}
        </div>
      </div>
    );
  }

  if (currentPhase === 2) {
    const subOptions = scenario.phase2[selectedPath] || [];
    return (
      <div className="animate-in slide-in-from-right-4 duration-500">
        {renderHeader(`Gate_02 // Path_${selectedPath}`, "Technical Implementation")}
        <div className="grid gap-4">
          {subOptions.map((opt) => (
            <DecisionCard key={opt.id} option={opt} onSelect={onNext} />
          ))}
        </div>
      </div>
    );
  }

  if (currentPhase === 3) {
    return (
      <div className="animate-in fade-in duration-500">
        {renderHeader("Analysis // Phase_03", scenario.phase3.title)}
        <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-sm mb-6">
          <ul className="space-y-4">
            {scenario.phase3.points.map((pt, i) => (
              <li key={i} className="flex gap-4 text-sm text-slate-300 font-light leading-relaxed">
                <span className="text-green-500 font-mono text-[10px] mt-1">0{i+1}</span> {pt}
              </li>
            ))}
          </ul>
        </div>
        {renderNavButtons("Analyze_Reflection")}
      </div>
    );
  }

  if (currentPhase === 4) {
    return (
      <div className="animate-in zoom-in-95 duration-500">
        {renderHeader("Evaluation // Phase_04", "Self-Correction & Review")}
        <div className="bg-[#080808] border border-white/5 p-6 rounded-sm">
          <p className="text-sm text-slate-400 italic mb-6">"{scenario.phase4.instruction}"</p>
          <textarea 
            className="w-full h-48 bg-black/50 border border-white/10 p-4 font-mono text-sm text-purple-400 outline-none focus:border-purple-600 transition-colors"
            placeholder="INPUT_ARCHITECTURAL_RATIONALE..."
          />
        </div>
        {renderNavButtons("Review_Signals")}
      </div>
    );
  }

  if (currentPhase === 5) {
    return (
      <div className="animate-in slide-in-from-bottom-8 duration-700">
        {renderHeader("Intelligence // Final_Debrief", "Interviewer Signal Analysis")}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 border border-white/5 bg-white/[0.01]">
            <span className="text-[9px] font-mono text-green-500 uppercase block mb-3">Strong_Signals [+]</span>
            {scenario.phase5.strongSignals.map((s, i) => <p key={i} className="text-[11px] text-slate-400 font-mono mb-2 leading-tight">_{s}</p>)}
          </div>
          <div className="p-5 border border-white/5 bg-white/[0.01]">
            <span className="text-[9px] font-mono text-red-500 uppercase block mb-3">Weak_Signals [-]</span>
            {scenario.phase5.weakSignals.map((s, i) => <p key={i} className="text-[11px] text-slate-400 font-mono mb-2 leading-tight">_{s}</p>)}
          </div>
        </div>
        <div className="p-6 bg-purple-600/5 border border-purple-600/20 text-xs font-light leading-relaxed space-y-3">
            <p><span className="text-purple-500 font-mono uppercase mr-2">[Twitter_Expects]:</span> {scenario.phase5.interviewerIntent.twitter}</p>
            <p><span className="text-purple-500 font-mono uppercase mr-2">[Uber_Expects]:</span> {scenario.phase5.interviewerIntent.uber}</p>
        </div>
        {renderNavButtons("Terminate_Session")}
      </div>
    );
  }

  return null;
}