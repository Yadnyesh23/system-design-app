import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getScenario } from "../services/api";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

export default function Simulator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [currentPhase, setCurrentPhase] = useState(1);
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    async function load() {
      if (!id || id === "undefined") return;
      try {
        const data = await getScenario(id);
        setScenario(data);
      } catch (err) {
        console.error("System Boot Failure:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleNext = (choiceId) => {
    if (currentPhase === 1) {
      setSelectedPath(choiceId);
      setCurrentPhase(2);
    } else if (currentPhase < 5) {
      setCurrentPhase(prev => prev + 1);
    } else {
      navigate("/");
    }
  };

  const handleBack = () => {
    if (currentPhase === 1) {
      navigate("/"); // Exit if at start
    } else {
      if (currentPhase === 2) setSelectedPath(null); // Reset path if going back to choice
      setCurrentPhase(prev => prev - 1);
    }
  };

  if (loading) return <div className="h-screen bg-black flex items-center justify-center font-mono text-purple-500">INITIALIZING_VIRTUAL_INSTANCE...</div>;

  return (
    <div className="h-screen bg-[#020202] text-slate-300 flex flex-col overflow-hidden font-sans">
      {/* HUD with BACK button */}
      <nav className="h-14 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={handleBack}
            className="group flex items-center gap-2 font-mono text-[10px] text-slate-500 hover:text-white transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">{"<"}</span> BACK_
          </button>
          <div className="w-[1px] h-4 bg-white/10"></div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-black text-white uppercase tracking-widest">
              {scenario.title.replace(/\s+/g, '_')}
            </span>
          </div>
        </div>
        
        {/* Step Indicator */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step}
              className={`h-1 w-6 transition-colors ${step <= currentPhase ? 'bg-purple-600' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </nav>

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        <aside className="lg:w-[35%] border-r border-white/5 bg-[#050505] overflow-y-auto hidden lg:block">
          <div className="p-8">
            <LeftPanel scenario={scenario} />
          </div>
        </aside>

        <main className="flex-1 bg-[#020202] overflow-y-auto relative">
          <div className="relative z-10 p-6 lg:p-12 max-w-4xl mx-auto w-full">
            <RightPanel 
              scenario={scenario} 
              currentPhase={currentPhase}
              selectedPath={selectedPath}
              onNext={handleNext}
              onBack={handleBack}
            />
          </div>
        </main>
      </div>
    </div>
  );
}