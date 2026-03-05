export default function DecisionCard({ option, onSelect }) {
  return (
    <div
      onClick={() => onSelect(option.id)}
      className="
        group relative 
        bg-[#080808] 
        border border-white/5 
        rounded-sm 
        p-6 
        cursor-pointer 
        transition-all duration-300 
        hover:border-purple-500/50 
        hover:bg-[#0c0c0c]
        hover:shadow-[0_0_20px_rgba(112,0,255,0.05)]
      "
    >
      {/* 1. SELECTION GLOW BAR (Left-side accent) */}
      <div className="absolute left-0 top-0 w-[2px] h-0 bg-purple-600 transition-all duration-300 group-hover:h-full"></div>

      <div className="flex items-start gap-5">
        {/* 2. OPTION INDEX BOX */}
        <div className="flex flex-col items-center shrink-0">
          <span className="text-[9px] font-mono text-slate-600 mb-1 uppercase tracking-tighter">Index</span>
          <div className="w-10 h-10 flex items-center justify-center border border-white/10 font-mono text-sm text-slate-400 group-hover:text-purple-400 group-hover:border-purple-500/40 transition-colors">
            {option.id}
          </div>
        </div>

        {/* 3. CONTENT AREA */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-black text-white uppercase tracking-wider group-hover:text-purple-300 transition-colors">
              {option.title}
            </h3>
            {/* Status Indicator */}
            <span className="opacity-0 group-hover:opacity-100 text-[9px] font-mono text-purple-600 animate-pulse transition-opacity uppercase tracking-widest">
              Ready_To_Deploy
            </span>
          </div>

          <div className="p-3 bg-black/40 border-l border-white/5 group-hover:border-purple-500/30 transition-colors">
            <p className="text-[11px] text-slate-500 font-mono leading-relaxed group-hover:text-slate-300 transition-colors">
              {">"} {option.logic}
            </p>
          </div>
        </div>
      </div>

      {/* 4. CORNER DECORATION (Visual Polish) */}
      <div className="absolute bottom-0 right-0 w-4 h-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <div className="absolute bottom-1 right-1 w-2 h-[1px] bg-white"></div>
        <div className="absolute bottom-1 right-1 w-[1px] h-2 bg-white"></div>
      </div>
    </div>
  )
}