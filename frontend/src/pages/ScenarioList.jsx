import { useEffect, useState } from "react";
import { getScenarios } from "../services/api";
import { useNavigate } from "react-router-dom";

function ScenarioList() {
  const [scenarios, setScenarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await getScenarios();
      setScenarios(data);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-slate-300 font-sans selection:bg-purple-500/30">
      
      {/* 1. TOP UTILITY BAR */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.5)]"></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white">
                Core_Infrastructure // v1.0
              </span>
            </div>
          </div>
          <div className="flex gap-6 font-mono text-[10px] text-slate-500 uppercase">
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16">
        
        {/* 2. PAGE TITLE */}
        <header className="mb-12 border-l-2 border-purple-600 pl-6">
          <div className="inline-block px-2 py-1 mb-3 border border-purple-500/20 bg-purple-500/5 rounded-sm">
            <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest">Incidents </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Failure <span className="text-purple-600 not-italic">Logs</span>
          </h1>
          <p className="mt-2 text-slate-500 text-xs font-mono uppercase tracking-widest opacity-70">
            Total active incidents: {scenarios.length}
          </p>
        </header>

        {/* 3. SINGLE COLUMN GRID (Gap-border style) */}
        <div className="flex flex-col gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden shadow-2xl">
          {scenarios.map((s) => (
            <div
              key={s._id}
              onClick={() => navigate(`/simulate/${s._id}`)}
              className="group relative bg-[#050505] p-6 cursor-pointer transition-all duration-300 hover:bg-[#080808] flex flex-col md:flex-row md:items-center gap-6"
            >

              {/* Main Content (Center) */}
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                  {s.title}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-1 italic font-light">
                  "{s.context}"
                </p>
              </div>

              {/* Action & Metadata (Right) */}
              <div className="flex items-center gap-8 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-[9px] text-slate-600 uppercase font-mono font-bold tracking-tighter">Priority</p>
                  <p className="text-[10px] text-red-500 font-mono font-bold">CRITICAL</p>
                </div>
                
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 group-hover:bg-purple-600 group-hover:border-purple-600 transition-all duration-300">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Execute</span>
                  <span className="text-white">→</span>
                </div>
              </div>
              
              {/* Vertical Hover Indicator */}
              <div className="absolute left-0 top-0 w-2px h-0 bg-purple-600 transition-all duration-500 group-hover:h-full"></div>
            </div>
          ))}
        </div>

        {/* 4. FOOTER DECORATION */}
        <div className="mt-8 flex justify-center opacity-20">
          <div className="h-1px w-full bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
        </div>
      </main>
    </div>
  );
}

export default ScenarioList;