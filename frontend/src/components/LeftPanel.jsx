export default function LeftPanel({ scenario }) {
  if (!scenario) return null;

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-in fade-in duration-700">
      {/* SECTION HEADER */}
      <div className="mb-10 flex items-center gap-3">
        <div className="h-4 w-[2px] bg-purple-600"></div>
        <h2 className="text-xs font-mono font-black text-white uppercase tracking-[0.3em]">
          Incident_Briefing
        </h2>
      </div>

      <div className="space-y-10">
        {/* 1. ARCHIVE CONTEXT */}
        <section className="relative group">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
            Context_ID
          </p>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm group-hover:border-white/10 transition-colors">
            <p className="text-sm text-slate-300 font-medium leading-relaxed italic">
              "{scenario.context}"
            </p>
          </div>
        </section>

        {/* 2. OPERATIONAL SCENARIO */}
        <section>
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
            Telemetry_Analysis
          </p>
          <p className="text-sm text-slate-400 leading-relaxed font-light pl-3 border-l border-white/10">
            {scenario.scenario}
          </p>
        </section>

        {/* 3. CORE ISSUE (ALERT STATE) */}
        <section>
          <p className="text-[10px] font-mono text-red-900 uppercase tracking-widest mb-3 flex items-center gap-2 font-bold">
            <span className="w-1 h-1 bg-red-600 rounded-full animate-pulse"></span>
            Critical_Failure_Detected
          </p>
          <div className="p-5 bg-red-950/10 border border-red-900/20 rounded-sm relative overflow-hidden">
             {/* Subtle Red Glow Background */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 blur-3xl pointer-events-none"></div>
            
            <p className="text-base text-red-500 font-bold tracking-tight leading-snug uppercase italic relative z-10">
              {scenario.coreIssue}
            </p>
          </div>
        </section>

        {/* 4. SYSTEM STATUS (EXTRA DECORATION) */}
        <div className="pt-10 border-t border-white/5 opacity-40">
           <div className="grid grid-cols-2 gap-4 font-mono text-[9px] uppercase">
              <div className="flex flex-col">
                <span className="text-slate-600">Priority</span>
                <span className="text-white">P0_BLOCKER</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-600">Enc_Protocol</span>
                <span className="text-white">AES_256_SEC</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}