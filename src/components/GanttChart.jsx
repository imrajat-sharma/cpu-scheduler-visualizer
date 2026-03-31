import { getProcessColor, IDLE_COLOR } from "../utils/colors";

export default function GanttChart({ gantt, processes }) {
  if (!gantt || gantt.length === 0) return null;

  const totalTime = gantt[gantt.length - 1].end;
  const minBlockWidth = 48;

  const idxMap = {};
  processes.forEach((p, i) => (idxMap[p.id] = i));

  const color = (pid) =>
    pid === "idle" ? IDLE_COLOR : getProcessColor(idxMap[pid] ?? 0);

  return (
    <div
      className="glass-card p-6 animate-slide-up"
      style={{ animationDelay: "0.2s" }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">📊</span> Gantt Chart
      </h2>

      <div className="overflow-x-auto pb-4">
        <div className="inline-flex flex-col" style={{ minWidth: "100%" }}>
          {/* Bars */}
          <div className="flex items-stretch" style={{ minHeight: 64 }}>
            {gantt.map((block, i) => {
              const dur = block.end - block.start;
              const c = color(block.processId);
              const px = Math.max(minBlockWidth, (dur / totalTime) * 800);
              const idle = block.processId === "idle";

              return (
                <div
                  key={i}
                  className="relative flex items-center justify-center border-r border-gray-900/50
                             transition-all duration-300 hover:scale-y-110 cursor-default group"
                  style={{
                    width: px,
                    minWidth: minBlockWidth,
                    background: idle
                      ? `repeating-linear-gradient(45deg,${c.bg}30,${c.bg}30 4px,transparent 4px,transparent 8px)`
                      : `linear-gradient(135deg,${c.bg}dd,${c.dark}dd)`,
                    borderBottom: `3px solid ${c.bg}`,
                  }}
                >
                  <span
                    className={`font-bold text-sm z-10 ${
                      idle ? "text-gray-400 italic" : "text-white"
                    }`}
                    style={{
                      textShadow: idle ? "none" : "0 1px 4px rgba(0,0,0,.5)",
                    }}
                  >
                    {idle ? "IDLE" : `P${block.processId}`}
                  </span>

                  {/* tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800
                                  text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity
                                  whitespace-nowrap border border-gray-600 z-20">
                    {idle ? "Idle" : `P${block.processId}`}: {dur} unit
                    {dur > 1 ? "s" : ""}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time axis */}
          <div className="flex relative" style={{ height: 24 }}>
            {gantt.map((block, i) => {
              const dur = block.end - block.start;
              const px = Math.max(minBlockWidth, (dur / totalTime) * 800);
              return (
                <div
                  key={i}
                  className="relative"
                  style={{ width: px, minWidth: minBlockWidth }}
                >
                  <span className="absolute left-0 -translate-x-1/2 text-[11px] font-mono text-gray-400 top-1">
                    {block.start}
                  </span>
                  {i === gantt.length - 1 && (
                    <span className="absolute right-0 translate-x-1/2 text-[11px] font-mono text-gray-400 top-1">
                      {block.end}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-700/50">
        {processes.map((p, i) => {
          const c = getProcessColor(i);
          return (
            <div key={p.id} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: c.bg,
                  boxShadow: `0 0 6px ${c.bg}40`,
                }}
              />
              <span className="text-xs text-gray-300 font-medium">{p.name}</span>
            </div>
          );
        })}
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm"
            style={{
              background:
                "repeating-linear-gradient(45deg,#37415130,#37415130 2px,transparent 2px,transparent 4px)",
              border: "1px solid #4B5563",
            }}
          />
          <span className="text-xs text-gray-400 italic">Idle</span>
        </div>
      </div>
    </div>
  );
}